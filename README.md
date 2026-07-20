NunuaWise — Grocery price comparison and basket optimizer

Overview
- React + Vite frontend (client)
- Express + TypeScript backend (server)
- In-memory product catalog (server/src/data.ts) with 40+ realistic items
- Google Sign-In (server-side verification) and automatic provisioning of an Active Premium 1-year subscription for new users
- Split-basket optimization and comparison API
- KIMI3 AI features must be proxied through the server (server-side API key) to avoid exposing secrets

Important environment variables (do NOT commit secrets):
- GOOGLE_CLIENT_ID: your Google OAuth client ID for GSI verification
- KIMI3_API_KEY: API key for KIMI3 (store as a server-side env variable; never put this in client code)
- PORT: server port (defaults to 3000)
- TRIP_COST_KES: default extra trip cost used by the optimizer (defaults to 100)

Local setup
1. From project root run: npm run install:all
2. Start dev servers:
   - npm run dev (runs both server and client concurrently)

Build for production
- npm run build
- Server build outputs to server/dist; client build outputs to client/dist. The server is configured to serve client/dist in production.

Security notes
- The KIMI3 API key must remain on the server. The code uses process.env.KIMI3_API_KEY; do not paste the key into frontend files.
- For Vercel, set project environment variables in the dashboard (Settings -> Environment Variables): GOOGLE_CLIENT_ID and KIMI3_API_KEY

Next steps and TODOs
- Implement Google Identity Services client on the frontend (GSI button and obtain id_token) and call /api/auth/google
- Build out UI comparison matrix, split-trip visualization, premium billing UI, and AI chat UX
- Add unit tests and E2E tests before deployment

If you want, continue and I will wire the GSI client into the frontend and add the AI chat UI components (I will not include any secret keys in code).