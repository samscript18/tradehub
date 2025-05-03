// 'use client';

// import Image from 'next/image';
// import { useSidebar } from '../../../lib/providers/SideDrawersProvider';
// import useCartStore from '../../../lib/store/cart.store';
// import SidebarComp from '../../Common/Sidebar';
// import { formatNaira } from '../../../lib/utils/helpers';
// import { CiTrash } from 'react-icons/ci';
// import { AnimatePresence, motion } from 'framer-motion';
// import { BiMinus, BiPlus } from 'react-icons/bi';
// import { IoBagCheckOutline } from 'react-icons/io5';
// import { useModal } from '../../../lib/providers/ModalProvider';
// import CheckoutModal from '../Product/checkout-modal';

// const Cart = () => {
//   const { hideSidebar } = useSidebar();

//   const {
//     items,
//     removeFromCart,
//     decreaseQuantity,
//     increaseQuantity,
//     calculateTotal,
//   } = useCartStore();

//   const { showModal } = useModal();

//   return (
//     <SidebarComp
//       onClose={hideSidebar}
//       className="h-screen overflow-y-auto relative select-none"
//     >
//       <div className="pb-10">
//         {items.length ? (
//           <div className="p-3 space-y-4">
//             <p className="font-bold text-4xl">Cart</p>

//             <div className="space-y-2">
//               <AnimatePresence initial={false} mode="popLayout">
//                 {items.map((product) => (
//                   <motion.div
//                     key={product._id}
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0 }}
//                     className="w-full border border-gray-50 overflow-auto rounded-md group p-2 flex items-center justify-between gap-2 duration-300 hover:shadow-sm relative"
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="size-12 rounded-full overflow-hidden relative">
//                         <Image
//                           src={product.display_image}
//                           alt="product"
//                           width={100}
//                           height={100}
//                           className="absolute top-0 left-0 w-full h-full  object-cover"
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <div className="">
//                           <p className="font-semibold">{product.name}</p>
//                           <p className="text-sm text-gray-500">
//                             {product.quantity} x{' '}
//                             {product.is_discounted ? (
//                               <span>
//                                 {formatNaira(product.discountedPrice || 0)}{' '}
//                                 <span className="line-through text-xs">
//                                   {formatNaira(product.price)}
//                                 </span>
//                               </span>
//                             ) : (
//                               formatNaira(product.price)
//                             )}
//                           </p>
//                         </div>

//                         <p className="font-medium text-lg">
//                           {formatNaira(
//                             (product.quantity || 1) *
//                               (product.is_discounted
//                                 ? product.discountedPrice || 0
//                                 : product.price)
//                           )}
//                         </p>
//                       </div>
//                     </div>

//                     <div>
//                       <div className="flex items-center select-none text-sm">
//                         <button
//                           className="size-5 border rounded flex items-center justify-center"
//                           onClick={() => decreaseQuantity(product._id)}
//                         >
//                           <BiMinus />
//                         </button>

//                         <button className="size-5 flex items-center justify-center">
//                           <span>{product.quantity}</span>
//                         </button>

//                         <button
//                           className="size-5 border rounded flex items-center justify-center"
//                           onClick={() => increaseQuantity(product._id)}
//                         >
//                           <BiPlus />
//                         </button>
//                       </div>
//                       <button
//                         className="size-6 rounded-full text-red-500 flex items-center justify-center absolute bottom-1 right-1 group-hover:opacity-100 opacity-0 duration-300"
//                         onClick={() => removeFromCart(product)}
//                       >
//                         <CiTrash />
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           </div>
//         ) : (
//           <div className="h-screen w-full text-gray-500 flex items-center justify-center">
//             <p>Your cart is empty.</p>
//           </div>
//         )}
//       </div>

//       <div className="absolute bottom-0 left-0 w-full p-3 bg-white space-y-2 border-t border-gray-100">
//         <p className="font-semibold text-xl">
//           Total: {formatNaira(calculateTotal())}
//         </p>

//         <button
//           className="bg-accent font-medium gap-2 text-black w-full rounded-md py-3 flex items-center justify-center duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
//           onClick={() => (showModal(<CheckoutModal />), hideSidebar())}
//         >
//           <span>Checkout</span>

//           <IoBagCheckOutline size={18} />
//         </button>
//       </div>
//     </SidebarComp>
//   );
// };

// export default Cart;
