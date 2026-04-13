"use client";

import Button from "@/components/common/button";
import { formatNaira } from "@/lib/helpers";
import { Product as IProduct } from "@/lib/types/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Product = (product: IProduct) => {
	const router = useRouter();

	return (
		<Link href={`/merchant/products/${product._id}`}>
			<motion.div
				className="dashboard-panel dashboard-glow-hover flex flex-col h-full min-w-[155px] sm:min-w-[170px] md:w-[230px] rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden"
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
				}}
			>
				<Image src={product.images[0]} alt={product.name} width={350} height={180} className="w-full h-44 object-cover" />
				<div className="p-3 space-y-2">
					<h3 className="text-[13px] font-semibold text-white">{product.name}</h3>
					<p className="text-xs text-slate-300">{product.merchant.storeName}</p>
					<div className="flex max-lg:flex-col justify-between items-start lg:items-center">
						<h4 className="text-sm font-bold text-primary">{formatNaira(product.variants[0].price)}</h4>
						<div className="max-lg:hidden">
							<Button onClick={() => router.push(`/merchant/products/${product._id}`)} variant="filled" className="px-4 py-1.5 w-full font-normal mt-1 text-xs rounded-xl">
								View
							</Button>
						</div>
						<div className="lg:hidden w-full">
							<Button onClick={() => router.push(`/merchant/products/${product._id}`)} fullWidth variant="filled" className="px-4 py-1.5 w-full font-normal mt-1 text-xs rounded-xl">
								View
							</Button>
						</div>
					</div>
				</div>
			</motion.div>
		</Link>
	);
};
export default Product;
