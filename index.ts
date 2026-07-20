import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';
import path from 'path';
import { PRODUCTS, SUPERMARKETS, getPriceFor, getPricesForBasket, Product } from './data';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = Number(process.env.PORT || 3000);
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const KIMI3_API_KEY = process.env.KIMI3_API_KEY || '';
const DEFAULT_TRIP_COST = Number(process.env.TRIP_COST_KES || 100);

// In-memory user store
interface User {
  id: string;
  email: string;
  phone?: string;
  subscription: {
    status: 'active' | 'inactive';
    tier: 'premium';
    expiresAt: string; // ISO
    amountDue: number;
  };
}
const users = new Map<string, User>();

// Google client for server-side token verification
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

app.get('/api/products', (req, res) => {
  res.json({ products: PRODUCTS, markets: SUPERMARKETS });
});

// Auth: verify id_token from Google Identity Services client
app.post('/api/auth/google', async (req, res) => {
  const { id_token, devFallback } = req.body;

  if (devFallback && devFallback.email) {
    // Developer manual fallback for local testing
    const uid = `dev:${devFallback.email}`;
    const user: User = {
      id: uid,
      email: devFallback.email,
      phone: devFallback.phone,
      subscription: {
        status: 'active',
        tier: 'premium',
        expiresAt: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
        amountDue: 0
      }
    };
    users.set(uid, user);
    return res.json({ user });
  }

  if (!id_token) return res.status(400).json({ error: 'id_token required' });
  try {
    const ticket = await googleClient.verifyIdToken({ idToken: id_token, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) return res.status(401).json({ error: 'Invalid token payload' });

    const uid = payload.sub || payload.email;
    const user: User = {
      id: uid,
      email: payload.email,
      phone: payload.phone_number,
      subscription: {
        status: 'active',
        tier: 'premium',
        expiresAt: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
        amountDue: 0
      }
    };
    users.set(uid, user);
    return res.json({ user });
  } catch (err) {
    console.error('Google token verify error', err);
    return res.status(401).json({ error: 'Invalid id_token' });
  }
});

// Compare basket: calculates single cheapest market and split-optimization
app.post('/api/basket/compare', (req, res) => {
  /**
   * body: { items: [{ id, qty }], tripCost?: number }
   */
  const { items, tripCost } = req.body as { items: { id: string; qty: number }[]; tripCost?: number };
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'items required' });

  const tCost = typeof tripCost === 'number' ? tripCost : DEFAULT_TRIP_COST;

  // 1) Cheapest single market
  const singleTotals: Record<string, number> = {};
  for (const market of SUPERMARKETS) {
    let s = 0;
    for (const it of items) {
      const price = getPriceFor(it.id, market);
      s += (price ?? 0) * it.qty;
    }
    singleTotals[market] = s;
  }
  const cheapestMarket = SUPERMARKETS.reduce((acc, m) => (singleTotals[m] < singleTotals[acc] ? m : acc), SUPERMARKETS[0]);
  const cheapestSingleCost = singleTotals[cheapestMarket];

  // 2) Split (assign each item to its cheapest market)
  type Assignment = { market: string; id: string; qty: number; unitPrice: number };
  const assignments: Assignment[] = [];
  for (const it of items) {
    let bestMarket = SUPERMARKETS[0];
    let bestPrice = getPriceFor(it.id, bestMarket) ?? 0;
    for (const m of SUPERMARKETS) {
      const p = getPriceFor(it.id, m) ?? 0;
      if (p < bestPrice) {
        bestPrice = p;
        bestMarket = m;
      }
    }
    assignments.push({ market: bestMarket, id: it.id, qty: it.qty, unitPrice: bestPrice });
  }

  const grouped = new Map<string, { items: Assignment[]; subtotal: number }>();
  for (const a of assignments) {
    const cur = grouped.get(a.market) ?? { items: [], subtotal: 0 };
    cur.items.push(a);
    cur.subtotal += a.unitPrice * a.qty;
    grouped.set(a.market, cur);
  }

  const marketsUsed = Array.from(grouped.keys());
  const splitCostRaw = Array.from(grouped.values()).reduce((acc, g) => acc + g.subtotal, 0);
  const extraTrips = Math.max(0, marketsUsed.length - 1);
  const splitCostWithTrips = splitCostRaw + extraTrips * tCost;

  const splitSavings = Math.max(0, cheapestSingleCost - splitCostWithTrips);

  // Build comparison grid
  const comparisonGrid = items.map((it) => {
    const prod = PRODUCTS.find((p) => p.id === it.id) as Product | undefined;
    const perMarket: Record<string, number> = {};
    for (const m of SUPERMARKETS) {
      perMarket[m] = getPriceFor(it.id, m) ?? 0;
    }
    return {
      id: it.id,
      name: prod?.name || it.id,
      qty: it.qty,
      prices: perMarket,
      cheapestMarket: Object.entries(perMarket).reduce((a, b) => (b[1] < a[1] ? b : a))[0]
    };
  });

  res.json({
    cheapestSingle: { market: cheapestMarket, total: cheapestSingleCost },
    split: {
      marketsUsed,
      splitCostRaw,
      tripCostPerExtra: tCost,
      splitCostWithTrips,
      splitSavings
    },
    comparisonGrid,
    groupedAssignments: Object.fromEntries(Array.from(grouped.entries()).map(([k, v]) => [k, { subtotal: v.subtotal, items: v.items }]))
  });
});

// Simple KIMI3 proxy for chat-like features (server-side API key required)
app.post('/api/chat', async (req, res) => {
  if (!KIMI3_API_KEY) return res.status(500).json({ error: 'KIMI3_API_KEY not configured on server' });
  const { prompt, basket } = req.body as { prompt?: string; basket?: any };
  if (!prompt && !basket) return res.status(400).json({ error: 'prompt or basket required' });

  try {
    // Minimal example: forward prompt and basket as context to the KIMI3 API
    const body = {
      model: 'kimi-3.1',
      prompt: `User prompt: ${prompt || ''}\nBasket: ${JSON.stringify(basket || {})}\nProvide shopping advice, cheaper alternatives, and recipe suggestions.`,
      max_tokens: 600
    };
    const r = await fetch('https://api.kimi3.example/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${KIMI3_API_KEY}`
      },
      body: JSON.stringify(body)
    });
    const j = await r.json();
    return res.json({ kimi: j });
  } catch (err) {
    console.error('KIMI3 proxy error', err);
    return res.status(500).json({ error: 'KIMI3 proxy failed' });
  }
});

// Serve static frontend build if it exists (production)
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('/', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`NunuaWise server listening on port ${PORT}`);
});
