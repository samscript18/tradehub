import { create } from 'zustand';
import { Product } from '@/lib/types';
import { cartProduct1, cartProduct2, cartProduct3 } from '@/public/images';

interface CartStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  subtotal: () => number;
  total: () => number;
  deliveryFee: () => number;
  loadItems: () => void;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [
    {
      id: 1,
      name: 'Organic Sweet Potatoes',
      merchant: 'Fresh Farms Co.',
      price: 7580,
      quantity: 2,
      img: cartProduct1,
    },
    {
      id: 2,
      name: 'Heritage Chicken',
      merchant: 'Local Butcher Shop',
      price: 6555,
      quantity: 1,
      img: cartProduct2,
    },
    {
      id: 3,
      name: 'Fresh Collard Greens',
      merchant: 'Green Gardens',
      price: 4550,
      quantity: 3,
      img: cartProduct3,
    },
  ],
  deliveryFee: () => get().items.length > 0 ? 3000 : 0,

  loadItems: () => {
    const savedItems = localStorage.getItem('cart-items');
    if (savedItems) {
      set({ items: JSON.parse(savedItems) });
    }
  },

  addItem: (item) => {
    const newItems = [...get().items, item];
    localStorage.setItem('cart-items', JSON.stringify(newItems));
    set({ items: newItems });
  },

  removeItem: (id) => {
    const newItems = get().items.filter((item) => item.id !== id);
    localStorage.setItem('cart-items', JSON.stringify(newItems));
    set({ items: newItems });
  },

  updateQuantity: (id, newQuantity) => {
    const newItems = newQuantity === 0
      ? get().items.filter((item) => item.id !== id)
      : get().items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    localStorage.setItem('cart-items', JSON.stringify(newItems));
    set({ items: newItems });
  },

  subtotal: () =>
    get().items.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0),

  total: () => get().subtotal() + get().deliveryFee(),
}));