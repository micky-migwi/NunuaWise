export type Supermarket = 'Quickmart' | 'Carrefour' | 'Naivas' | 'Cleanshelf';

export interface Product {
  id: string;
  name: string;
  category: string;
  basePriceKES: number;
  multipliers: Record<Supermarket, number>;
}

export const SUPERMARKETS: Supermarket[] = ['Quickmart', 'Carrefour', 'Naivas', 'Cleanshelf'];

// Dense in-memory product catalog (40+ items) with realistic base prices in KES and small multipliers per supermarket
export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Maize Meal (2kg)', category: 'Maize Meal', basePriceKES: 220, multipliers: { Quickmart: 1.02, Carrefour: 1.00, Naivas: 0.98, Cleanshelf: 1.05 } },
  { id: 'p2', name: 'Maize Meal (5kg)', category: 'Maize Meal', basePriceKES: 500, multipliers: { Quickmart: 1.01, Carrefour: 1.00, Naivas: 0.99, Cleanshelf: 1.04 } },
  { id: 'p3', name: 'All-purpose Flour (1kg)', category: 'Flour', basePriceKES: 150, multipliers: { Quickmart: 1.00, Carrefour: 0.98, Naivas: 1.02, Cleanshelf: 1.03 } },
  { id: 'p4', name: 'Bread (Loaf)', category: 'Bakery', basePriceKES: 70, multipliers: { Quickmart: 1.00, Carrefour: 1.01, Naivas: 0.99, Cleanshelf: 1.02 } },
  { id: 'p5', name: 'White Sugar (1kg)', category: 'Pantry', basePriceKES: 190, multipliers: { Quickmart: 1.02, Carrefour: 1.00, Naivas: 0.97, Cleanshelf: 1.05 } },
  { id: 'p6', name: 'Tea Leaves (250g)', category: 'Beverages', basePriceKES: 220, multipliers: { Quickmart: 1.00, Carrefour: 0.99, Naivas: 1.03, Cleanshelf: 1.04 } },
  { id: 'p7', name: 'Cooking Oil (2L)', category: 'Cooking Oil', basePriceKES: 480, multipliers: { Quickmart: 1.03, Carrefour: 1.00, Naivas: 0.98, Cleanshelf: 1.02 } },
  { id: 'p8', name: 'Milk (1L)', category: 'Dairy', basePriceKES: 120, multipliers: { Quickmart: 1.01, Carrefour: 1.00, Naivas: 0.99, Cleanshelf: 1.02 } },
  { id: 'p9', name: 'Eggs (6 pcs)', category: 'Dairy', basePriceKES: 180, multipliers: { Quickmart: 1.00, Carrefour: 1.02, Naivas: 0.98, Cleanshelf: 1.03 } },
  { id: 'p10', name: 'Rice (2kg)', category: 'Grains & Rice', basePriceKES: 440, multipliers: { Quickmart: 1.00, Carrefour: 0.98, Naivas: 1.01, Cleanshelf: 1.04 } },
  { id: 'p11', name: 'Sukuma Wiki (1 bunch)', category: 'Fresh Produce', basePriceKES: 40, multipliers: { Quickmart: 1.05, Carrefour: 1.00, Naivas: 0.95, Cleanshelf: 1.02 } },
  { id: 'p12', name: 'Tomatoes (1kg)', category: 'Fresh Produce', basePriceKES: 120, multipliers: { Quickmart: 1.03, Carrefour: 1.00, Naivas: 0.97, Cleanshelf: 1.04 } },
  { id: 'p13', name: 'Onions (1kg)', category: 'Fresh Produce', basePriceKES: 100, multipliers: { Quickmart: 1.02, Carrefour: 1.00, Naivas: 0.98, Cleanshelf: 1.03 } },
  { id: 'p14', name: 'Chicken (1kg)', category: 'Meat & Poultry', basePriceKES: 600, multipliers: { Quickmart: 1.01, Carrefour: 1.00, Naivas: 0.99, Cleanshelf: 1.04 } },
  { id: 'p15', name: 'Beef (1kg)', category: 'Meat & Poultry', basePriceKES: 900, multipliers: { Quickmart: 1.02, Carrefour: 1.00, Naivas: 0.98, Cleanshelf: 1.05 } },
  { id: 'p16', name: 'Salt (500g)', category: 'Pantry', basePriceKES: 60, multipliers: { Quickmart: 1.00, Carrefour: 0.99, Naivas: 1.01, Cleanshelf: 1.03 } },
  { id: 'p17', name: 'Instant Noodles (70g)', category: 'Pantry', basePriceKES: 30, multipliers: { Quickmart: 1.00, Carrefour: 1.02, Naivas: 0.98, Cleanshelf: 1.01 } },
  { id: 'p18', name: 'Cooking Gas (13kg)', category: 'Household', basePriceKES: 2100, multipliers: { Quickmart: 1.01, Carrefour: 1.00, Naivas: 0.99, Cleanshelf: 1.02 } },
  { id: 'p19', name: 'Laundry Soap (Bar)', category: 'Household', basePriceKES: 80, multipliers: { Quickmart: 1.00, Carrefour: 0.98, Naivas: 1.02, Cleanshelf: 1.03 } },
  { id: 'p20', name: 'Toothpaste (125ml)', category: 'Personal Care', basePriceKES: 180, multipliers: { Quickmart: 1.02, Carrefour: 1.00, Naivas: 0.99, Cleanshelf: 1.04 } },
  { id: 'p21', name: 'Cooking Salt (1kg)', category: 'Pantry', basePriceKES: 110, multipliers: { Quickmart: 1.00, Carrefour: 0.99, Naivas: 1.01, Cleanshelf: 1.02 } },
  { id: 'p22', name: 'Soda (2L)', category: 'Beverages', basePriceKES: 220, multipliers: { Quickmart: 1.00, Carrefour: 1.01, Naivas: 0.98, Cleanshelf: 1.03 } },
  { id: 'p23', name: 'Bread Rolls (6)', category: 'Bakery', basePriceKES: 150, multipliers: { Quickmart: 1.01, Carrefour: 1.00, Naivas: 0.99, Cleanshelf: 1.02 } },
  { id: 'p24', name: 'Butter (200g)', category: 'Dairy', basePriceKES: 240, multipliers: { Quickmart: 1.02, Carrefour: 1.00, Naivas: 0.98, Cleanshelf: 1.05 } },
  { id: 'p25', name: 'Yoghurt (500g)', category: 'Dairy', basePriceKES: 150, multipliers: { Quickmart: 1.00, Carrefour: 1.01, Naivas: 0.99, Cleanshelf: 1.03 } },
  { id: 'p26', name: 'Fresh Milk (500ml)', category: 'Dairy', basePriceKES: 70, multipliers: { Quickmart: 1.01, Carrefour: 1.00, Naivas: 0.98, Cleanshelf: 1.02 } },
  { id: 'p27', name: 'Groundnuts (1kg)', category: 'Pantry', basePriceKES: 380, multipliers: { Quickmart: 1.03, Carrefour: 1.00, Naivas: 0.97, Cleanshelf: 1.04 } },
  { id: 'p28', name: 'Sardines (Tin)', category: 'Pantry', basePriceKES: 140, multipliers: { Quickmart: 1.00, Carrefour: 0.99, Naivas: 1.02, Cleanshelf: 1.03 } },
  { id: 'p29', name: 'Cabbage (1kg)', category: 'Fresh Produce', basePriceKES: 90, multipliers: { Quickmart: 1.02, Carrefour: 1.00, Naivas: 0.98, Cleanshelf: 1.03 } },
  { id: 'p30', name: 'Bananas (1kg)', category: 'Fresh Produce', basePriceKES: 110, multipliers: { Quickmart: 1.01, Carrefour: 1.00, Naivas: 0.99, Cleanshelf: 1.02 } },
  { id: 'p31', name: 'Apples (1kg)', category: 'Fresh Produce', basePriceKES: 320, multipliers: { Quickmart: 1.04, Carrefour: 1.00, Naivas: 0.96, Cleanshelf: 1.05 } },
  { id: 'p32', name: 'Digestive Biscuits (200g)', category: 'Pantry', basePriceKES: 200, multipliers: { Quickmart: 1.00, Carrefour: 0.99, Naivas: 1.02, Cleanshelf: 1.03 } },
  { id: 'p33', name: 'Cooking Sauce (500ml)', category: 'Pantry', basePriceKES: 260, multipliers: { Quickmart: 1.01, Carrefour: 1.00, Naivas: 0.99, Cleanshelf: 1.04 } },
  { id: 'p34', name: 'Cornflakes (500g)', category: 'Pantry', basePriceKES: 420, multipliers: { Quickmart: 1.02, Carrefour: 1.00, Naivas: 0.98, Cleanshelf: 1.03 } },
  { id: 'p35', name: 'Fresh Fish (1kg)', category: 'Meat & Poultry', basePriceKES: 650, multipliers: { Quickmart: 1.03, Carrefour: 0.99, Naivas: 0.97, Cleanshelf: 1.05 } },
  { id: 'p36', name: 'Chicken Wings (500g)', category: 'Meat & Poultry', basePriceKES: 320, multipliers: { Quickmart: 1.01, Carrefour: 1.00, Naivas: 0.99, Cleanshelf: 1.02 } },
  { id: 'p37', name: 'Shampoo (500ml)', category: 'Personal Care', basePriceKES: 300, multipliers: { Quickmart: 1.02, Carrefour: 1.00, Naivas: 0.98, Cleanshelf: 1.04 } },
  { id: 'p38', name: 'Handwash (500ml)', category: 'Personal Care', basePriceKES: 220, multipliers: { Quickmart: 1.00, Carrefour: 0.99, Naivas: 1.01, Cleanshelf: 1.03 } },
  { id: 'p39', name: 'Dishwashing Liquid (750ml)', category: 'Household', basePriceKES: 250, multipliers: { Quickmart: 1.01, Carrefour: 1.00, Naivas: 0.99, Cleanshelf: 1.03 } },
  { id: 'p40', name: 'Face Mask (Pack 5)', category: 'Personal Care', basePriceKES: 120, multipliers: { Quickmart: 1.00, Carrefour: 1.02, Naivas: 0.98, Cleanshelf: 1.01 } },
  { id: 'p41', name: 'Peppermint Candy (Pack)', category: 'Pantry', basePriceKES: 50, multipliers: { Quickmart: 1.00, Carrefour: 1.01, Naivas: 0.99, Cleanshelf: 1.02 } }
];

export function getPriceFor(productId: string, market: Supermarket): number | null {
  const p = PRODUCTS.find((x) => x.id === productId);
  if (!p) return null;
  return Math.round(p.basePriceKES * p.multipliers[market]);
}

export function getPricesForBasket(basket: { id: string; qty: number }[]) {
  const grid: Record<string, Record<Supermarket, number>> = {};
  for (const item of basket) {
    grid[item.id] = {} as Record<Supermarket, number>;
    for (const m of SUPERMARKETS) {
      const price = getPriceFor(item.id, m) ?? 0;
      grid[item.id][m] = price;
    }
  }
  return grid;
}
