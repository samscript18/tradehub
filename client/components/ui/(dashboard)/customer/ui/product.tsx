'use client';

import Button from '@/components/common/button';
import { formatNaira } from '@/lib/helpers';
import { useCart } from '@/lib/store/cart.store';
import { Product as IProduct } from '@/lib/types/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Product = (product: IProduct) => {
	const { addItem, items } = useCart();

	const isInCart = items.some((item) => item._id === product._id);

	return (
		<Link href={`/customer/products/${product._id}`}>
			<motion.div
				className="flex flex-col h-full min-w-[155px] sm:min-w-[170px] md:w-[230px] rounded-md hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md"
				variants={{
					hidden: {
						opacity: 0,
						y: 30,
					},
					visible: {
						opacity: 1,
						y: 0,
						transition: {
							duration: 0.8,
						},
					},
				}}>
				<Image
					src={product.images[0]}
					alt={product.name}
					width={350}
					height={180}
					className="w-full h-full rounded-t-xl"
				/>
				<div className="bg-[#1E2A3B] p-2 space-y-2 shadow-md rounded-b-xl">
					<h3 className="text-[13px] font-bold">{product.name}</h3>
					<p className="text-xs text-gray-300">{product.merchant.storeName}</p>
					<div className="flex max-lg:flex-col justify-between items-start lg:items-center">
						<h4 className="text-sm font-bold">{formatNaira(product.variants[0].price)}</h4>
						<div className="max-lg:hidden">
							<Button
								onClick={() => {
									addItem(product, 1);
								}}
								variant="filled"
								disabled={isInCart}
								className="px-4 py-1.5 w-full font-normal mt-1 text-xs">
								Add to cart
							</Button>
						</div>
						<div className="lg:hidden w-full">
							<Button
								onClick={() => {
									addItem(product, 1);
								}}
								fullWidth
								disabled={isInCart}
								variant="filled"
								className="px-4 py-1.5 w-full font-normal mt-1 text-xs">
								Add to cart
							</Button>
						</div>
					</div>
				</div>
			</motion.div>
		</Link>
	);
};
export default Product;
