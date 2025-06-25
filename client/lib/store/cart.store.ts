import { create } from 'zustand';
import { Product, ProductVariant } from '@/lib/types/types';

interface CartItem extends Product {
  quantity: number;
  selectedVariant: {
    size: string;
    color?: string;
    price: number;
  };
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Product, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  subtotal: () => number;
  total: () => number;
  deliveryFee: () => number;
  loadItems: () => void;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  deliveryFee: () => get().items.length > 0 ? 3000 : 0,

  loadItems: () => {
    const savedItems = localStorage.getItem('cart-items');
    if (savedItems) {
      set({ items: JSON.parse(savedItems) });
    }
  },

  addItem: (product: Product, quantity: number, variant?: ProductVariant) => {
    const cartItem: CartItem = {
      ...product,
      quantity,
      selectedVariant: variant ? {
        size: variant.size,
        color: variant.color,
        price: variant.price
      } : {
        size: product.variants[0].size,
        color: product.variants[0].color,
        price: product.variants[0].price
      }
    };

    const newItems = [...get().items, cartItem];
    localStorage.setItem('cart-items', JSON.stringify(newItems));
    set({ items: newItems });
  },

  removeItem: (id) => {
    const newItems = get().items.filter((item) => item._id !== id);
    localStorage.setItem('cart-items', JSON.stringify(newItems));
    set({ items: newItems });
  },

  updateQuantity: (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    const newItems = newQuantity === 0
      ? get().items.filter((item) => item._id !== id)
      : get().items.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      );

    localStorage.setItem('cart-items', JSON.stringify(newItems));
    set({ items: newItems });
  },

  subtotal: () =>
    get().items.reduce((sum, item) => {
      const price = item.selectedVariant.price;
      return sum + price * item.quantity;
    }, 0),

  total: () => get().subtotal() + get().deliveryFee(),
}));