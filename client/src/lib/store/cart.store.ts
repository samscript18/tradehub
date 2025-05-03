// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { Product } from "../@types";
// import { toast } from "sonner";

// export type CartProduct = Product & { quantity?: number };

// interface CartStore {
//   items: CartProduct[];

//   addToCart: (product: CartProduct) => void;
//   removeFromCart: (product: CartProduct) => void;
//   clearCart: () => void;
//   getCartTotal: () => number;
//   checkExists: (productId: string) => boolean;
//   toggleProduct: (product: CartProduct) => void;
//   getCartItem: (productId: string) => CartProduct | undefined;

//   increaseQuantity: (productId: string) => void;
//   decreaseQuantity: (productId: string) => void;
//   setQuantity: (productId: string, quantity: number) => void;

//   calculateTotal: () => number;
// }

// const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],

//       addToCart: (product) =>
//         set((state) => {
//           const exists = state.items.find((item) => item._id === product._id);
//           if (exists) return state;

//           toast.dismiss(product._id);
//           toast.success(product.name + " added to cart", { id: product._id });

//           return { items: [...state.items, product] };
//         }),

//       removeFromCart: (product) => {
//         set((state) => {
//           const exists = state.items.find((item) => item._id === product._id);
//           const newItems = state.items.filter(
//             (item) => item._id !== product._id
//           );

//           toast.dismiss(`remove-${product._id}`);
//           toast.success(exists?.name + " removed from cart", {
//             id: `remove-${product._id}`,
//           });
//           return { items: newItems };
//         });
//       },

//       clearCart: () => {
//         set({ items: [] });
//       },

//       getCartTotal: () => {
//         return get().items.reduce((acc, item) => acc + item.price, 0);
//       },

//       checkExists: (productId) => {
//         return get().items.some((item) => item._id === productId);
//       },

//       toggleProduct: (product) => {
//         const exists = get().items.find((item) => item._id === product._id);
//         if (exists) {
//           get().removeFromCart(product);
//         } else {
//           get().addToCart(product);
//         }
//       },

//       getCartItem: (productId) => {
//         return get().items.find((item) => item._id === productId);
//       },

//       increaseQuantity: (productId) => {
//         set((state) => {
//           const item = state.items.find((item) => item._id === productId);
//           if (item) item.quantity = item.quantity! + 1;
//           return { items: state.items };
//         });
//       },

//       decreaseQuantity: (productId) => {
//         set((state) => {
//           const item = state.items.find((item) => item._id === productId);
//           if (item && item.quantity! > 1) item.quantity = item.quantity! - 1;
//           return { items: state.items };
//         });
//       },

//       setQuantity: (productId, quantity) => {
//         set((state) => {
//           const item = state.items.find((item) => item._id === productId);
//           if (item) item.quantity = quantity;
//           return { items: state.items };
//         });
//       },

//       calculateTotal: () => {
//         return get().items.reduce(
//           (acc, item) =>
//             acc +
//             (item.quantity || 1) *
//               (item.is_discounted ? item.discountedPrice || 0 : item.price),
//           0
//         );
//       },
//     }),
//     { name: "cart-store" }
//   )
// );

// export default useCartStore;
