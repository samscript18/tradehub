'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/button';
import { Badge } from '@/components/ui/badge';
import Product from '../../ui/product';
import { IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion';
import { Rating } from '@/components/common/rating';
import { avatar1 } from '@/public/images';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import BackButton from '@/components/common/button/back-button';
import { useCart } from '@/lib/store/cart.store';
import { useParams } from 'next/navigation';
import { formatNaira } from '@/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '@/lib/services/customer.service';
import Loader from '@/components/common/loaders';
import { ProductVariant } from '@/lib/types/types';

const ProductPage = () => {
	const { productId } = useParams<{ productId: string }>();
	const { addItem, updateQuantity } = useCart();
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
	const [selectedSize, setSelectedSize] = useState<string>('S');
	const [selectedImage, setSelectedImage] = useState<number>(0);
	const [selectedColor, setSelectedColor] = useState<string>('black');
	const [quantity, setQuantity] = useState<number>(1);
	const { data: product, isPending } = useQuery({
		queryFn: () => getProduct(productId),
		queryKey: ['get-product', productId],
	});

	const { data, isLoading } = useQuery({
		queryFn: () => getProducts({ page: 1, limit: 4 }),
		queryKey: ['get-products'],
	});

	const handleColorSelect = (colorName: string) => {
		setSelectedColor(colorName);
		const variant = product?.variants?.find(
			(v) =>
				v.size.toLowerCase() === selectedSize.toLowerCase() &&
				v.color?.toLowerCase() === colorName.toLowerCase()
		);
		if (variant) {
			setSelectedVariant(variant);
		}
	};

	const handleSizeSelect = (size: string) => {
		setSelectedSize(size);
		const variant = product?.variants?.find(
			(v) =>
				v.size.toLowerCase() === size.toLowerCase() &&
				(!v.color || v.color.toLowerCase() === selectedColor.toLowerCase())
		);
		if (variant) {
			setSelectedVariant(variant);
		}
	};

	const handleQuantityChange = (productId: string, newQuantity: number) => {
		if (newQuantity >= 1) {
			setQuantity(newQuantity);
			updateQuantity(productId, newQuantity);
		}
	};

	const getVariantPrice = () => {
		if (selectedVariant) {
			return formatNaira(selectedVariant.price);
		}

		const defaultVariant = product?.variants?.find(
			(variant) => variant.size.toLowerCase() === selectedSize.toLowerCase()
		);

		return formatNaira(defaultVariant?.price || product?.variants?.[0]?.price || 0);
	};

	console.log(selectedVariant);

	return (
		<div className="min-h-screen">
			{isPending ? (
				<div className="flex justify-center items-center gap-4">
					<Loader />
					<p className="font-medium">Fetching product details...</p>
				</div>
			) : (
				<div className="container mx-auto px-4 pt-4 pb-8 md:py-8">
					<BackButton text={'Back'} />
					<div className="grid lg:grid-cols-2 gap-8 mb-12 mt-4">
						<div className="space-y-4">
							<div className="aspect-square bg-gray-900 rounded-lg overflow-hidden">
								<Image
									src={product?.images[selectedImage] || ''}
									alt={product?.name || ''}
									width={600}
									height={600}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="hidden md:flex gap-2 overflow-x-auto">
								{product?.images?.map((image, index) => (
									<button
										key={index}
										onClick={() => setSelectedImage(index)}
										className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
											selectedImage === index ? 'border-primary' : 'border-gray-700'
										}`}>
										<Image
											src={image}
											alt={`Product view ${index + 1}`}
											width={80}
											height={80}
											className="w-full h-full object-cover"
										/>
									</button>
								))}
							</div>
							<div className="w-full flex md:hidden gap-2 overflow-x-auto">
								{product?.images.slice(0, 4).map((image, index) => (
									<button
										key={index}
										onClick={() => setSelectedImage(index)}
										className={`flex-shrink-0 w-[23%] h-18 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 ${
											selectedImage === index ? 'border-primary' : 'border-gray-700'
										}`}>
										<Image
											src={image}
											alt={`Product view ${index + 1}`}
											width={80}
											height={80}
											className="w-full h-full object-cover"
										/>
									</button>
								))}
							</div>
						</div>

						<div className="space-y-6">
							<div>
								<h2 className="text-2xl font-bold mb-2">{product?.name}</h2>

								<p className="text-gray-300 text-xs mb-4">{product?.description}</p>

								<div className="flex items-center gap-4 mb-4">
									<div className="flex items-center gap-2">
										<h3 className="text-xl font-bold text-primary">{getVariantPrice()}</h3>
										<Badge variant="secondary" className="bg-primary text-white">
											5% OFF
										</Badge>
									</div>
								</div>

								<div className="flex items-center gap-2 mb-4">
									<div className="flex">
										{Rating(4)}
									</div>
									<span className="text-xs text-gray-400">4.0 (5 reviews)</span>
								</div>

								<div className="flex items-center gap-3 mb-6">
									<div className="w-10 h-10 rounded-full">
										<Image src={avatar1} alt={'merchant-avatar'} width={80} height={80} className="w-full h-full" />
									</div>
									<div>
										<p className="font-semibold text-sm">{product?.merchant?.storeName}</p>
										<p className="text-xs text-gray-400">Top Rated Seller • 98% Positive Feedback</p>
									</div>
								</div>
							</div>
							<div className="space-y-4">
								<div className="mb-4">
									<h3 className="text-sm font-semibold mb-3">Color</h3>
									<div className="flex gap-4 md:gap-8">
										{product?.variants?.map((variant) => (
											<button
												key={variant._id}
												onClick={() => {
													if (variant.color) handleColorSelect(variant.color);
												}}
												className={`w-10 h-10 rounded-full border-2 transition-all duration-200 cursor-pointer ${
													selectedColor === variant.color ? 'border-primary scale-106' : 'border-white hover:border-gray-400'
												}`}
												style={{ backgroundColor: variant?.color?.toLowerCase() }}
												aria-label={`Select ${variant.color} color`}
											/>
										))}
									</div>
								</div>
								<div>
									<h3 className="font-semibold text-sm mb-3">Size</h3>
									<div className="flex gap-4 md:gap-8">
										{product?.variants?.map((variant) => (
											<button
												key={variant.size}
												onClick={() => handleSizeSelect(variant?.size)}
												className={`px-4 py-2 rounded-lg border text-sm cursor-pointer ${
													selectedSize === variant.size
														? 'border-primary bg-primary/20 text-primary'
														: 'border-gray-600 text-gray-300 hover:border-gray-500'
												}`}>
												{variant.size}
											</button>
										))}
									</div>
								</div>
								<div className="w-[40%]">
									<h3 className="font-semibold text-sm mb-3">Quantity</h3>
									<div className="flex items-center bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden">
										<button
											onClick={() => handleQuantityChange(productId, quantity - 1)}
											className="w-full h-10 flex items-center justify-center text-sm hover:bg-gray-800 transition-colors"
											disabled={quantity <= 1}>
											<Minus className="w-4 h-4" />
										</button>
										<div className="w-full h-10 flex items-center justify-center text-sm font-medium">{quantity}</div>
										<button
											onClick={() => handleQuantityChange(productId, quantity + 1)}
											className="w-full h-10 flex items-center justify-center text-sm hover:bg-gray-800 transition-colors">
											<Plus className="w-4 h-4" />
										</button>
									</div>
								</div>
								<div className="flex max-md:flex-col gap-3">
									<Link href={'/customer/cart'} className="w-full">
										<Button fullWidth variant="filled" className="w-full text-xs px-8 py-3">
											Buy Now
										</Button>
									</Link>
									<Button
										onClick={() => {
											addItem(product!, quantity);
											setIsDisabled(true);
										}}
										fullWidth
										disabled={isDisabled}
										variant="outline"
										className="border-gray-600 text-xs py-3 text-white disabled:text-white hover:bg-gray-800">
										Add to Cart
									</Button>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-between items-center my-6 md:mt-8">
						<motion.h2
							className="text-md font-bold"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0 },
							}}>
							You May Also Like
						</motion.h2>
						<Link href={'/customer/products'}>
							<motion.p
								className="text-xs text-primary cursor-pointer"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.5 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: { opacity: 1, y: 0 },
								}}>
								View All{' '}
								<span className="inline-block ">
									<IoIosArrowForward className="text-primary" />
								</span>
							</motion.p>
						</Link>
					</div>
					{isLoading ? (
						<div className="flex justify-center items-center gap-4">
							<Loader />
							<p className="font-medium">Fetching products...</p>
						</div>
					) : (
						<motion.div
							className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.5 }}
							transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}>
							{data?.data?.map((product) => {
								return <Product key={product._id} {...product} />;
							})}
						</motion.div>
					)}
				</div>
			)}
		</div>
	);
};

export default ProductPage;
