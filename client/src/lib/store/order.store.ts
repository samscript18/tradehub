// import { create } from "zustand";
// import { Customer } from "../@types";
// import { CartProduct } from "./cart.store";

// interface OrderStore {
//   selectedCustomer?: Customer;
//   selectedProducts: CartProduct[];

//   setSelectedCustomer: (c: Customer) => void;
//   toggleSelectedCustomer: (c: Customer) => void;

//   addProduct: (p: CartProduct) => void;
//   removeProduct: (p: CartProduct) => void;
//   toggleProduct: (p: CartProduct) => void;

//   increaseQuantity: (productId: string) => void;
//   decreaseQuantity: (productId: string) => void;
//   checkExists: (productId: string) => boolean;

//   reset: () => void;

//   calculateTotal: () => number;
// }

// const useOrderStore = create<OrderStore>((set, get) => ({
//   selectedProducts: [],

//   addProduct: (p) =>
//     set((state) => {
//       const exists = state.selectedProducts.find((sp) => sp._id === p._id);
//       if (!exists)
//         return { ...state, selectedProducts: [...state.selectedProducts, p] };
//       return state;
//     }),

//   removeProduct: (p) =>
//     set((state) => ({
//       ...state,
//       selectedProducts: state.selectedProducts.filter((sp) => sp._id !== p._id),
//     })),

//   toggleProduct: (p) =>
//     set((state) => {
//       const exists = state.selectedProducts.find((sp) => sp._id === p._id);
//       if (!exists)
//         return { ...state, selectedProducts: [...state.selectedProducts, p] };
//       return {
//         ...state,
//         selectedProducts: state.selectedProducts.filter(
//           (sp) => sp._id !== p._id
//         ),
//       };
//     }),

//   checkExists: (productId) =>
//     get().selectedProducts.some((p) => p._id === productId),

//   setSelectedCustomer: (c) =>
//     set((state) => ({ ...state, selectedCustomer: c })),
//   toggleSelectedCustomer: (c) =>
//     set((state) => ({
//       ...state,
//       selectedCustomer: state.selectedCustomer?._id === c._id ? undefined : c,
//     })),

//   increaseQuantity: (productId) =>
//     set((state) => {
//       const product = state.selectedProducts.find((p) => p._id === productId);
//       if (!product) return state;

//       if (product)
//         product.quantity = product.quantity ? product.quantity + 1 : 1;

//       return { ...state, selectedProducts: [...state.selectedProducts] };
//     }),

//   decreaseQuantity: (productId) =>
//     set((state) => {
//       const product = state.selectedProducts.find((p) => p._id === productId);
//       if (!product) return state;

//       if (product)
//         product.quantity = product.quantity ? product.quantity + 1 : 1;

//       return { ...state, selectedProducts: [...state.selectedProducts] };
//     }),

//   calculateTotal: () =>
//     get().selectedProducts.reduce(
//       (acc, p) => acc + p.price * (p.quantity || 1),
//       0
//     ),

//   reset: () => set({ selectedProducts: [], selectedCustomer: undefined }),
// }));

// export default useOrderStore;
