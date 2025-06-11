'use client';

import Button from '@/components/common/button';
import { storeCategories } from '@/lib/data';
import { motion } from 'framer-motion';
import Product from '../ui/product';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import SelectField from '@/components/common/inputs/select-field';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/services/customer.service';
import Loader from '@/components/common/loaders';

const ProductsPage = () => {
	const { data, isPending } = useQuery({
		queryFn: () => getProducts({ page: Number(1), limit: Number(10) }),
		queryKey: ['get-products'],
	});
	return (
		<section className="px-4">
			<div className="max-md:w-full flex max-md:flex-col items-start md:items-center justify-between mb-6">
				<div className="max-md:w-full flex max-md:flex-col items-start md:items-center max-md:space-y-4 space-x-4">
					<div className="flex justify-center items-center mt-2">
						<Button
							variant="outline"
							icon={<SlidersHorizontal className="w-4 h-4" />}
							iconPosition="left"
							size="small"
							className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-xs">
							Filters
						</Button>
					</div>

					<div className="max-md:w-full grid grid-cols-1 md:grid-cols-3 max-md:space-y-4 space-x-4 max-md:mt-2">
						<SelectField
							width={'w-full md:min-w-[50px]'}
							data={storeCategories}
							placeholder="Categories"
							inputClassName="bg-[#2a2a2a] border-[#3a3a3a] text-xs"
							onSelect={(option) => {
								console.log('Selected option:', option.value);
							}}
						/>

						<SelectField
							width={'w-full md:min-w-[50px]'}
							data={[
								{
									label: 'Price Range',
									value: 'price range',
									id: 'price range',
								},
							]}
							placeholder="Price Range"
							inputClassName="bg-[#2a2a2a] border-[#3a3a3a] text-xs"
							onSelect={(option) => {
								console.log('Selected option:', option.value);
							}}
						/>

						<SelectField
							width={'w-full md:min-w-[50px]'}
							data={[
								{
									label: '5',
									value: '5',
									id: '5',
								},
								{
									label: '4',
									value: '4',
									id: '4',
								},
								{
									label: '3',
									value: '3',
									id: '3',
								},
								{
									label: '2',
									value: '2',
									id: '2',
								},
								{
									label: '1',
									value: '1',
									id: '1',
								},
							]}
							placeholder="Rating"
							inputClassName="bg-[#2a2a2a] border-[#3a3a3a] text-xs"
							onSelect={(option) => {
								console.log('Selected option:', option.value);
							}}
						/>
					</div>
				</div>

				<div className="max-md:w-full flex items-center max-md:mt-4">
					<span className="max-md:w-[30%] text-xs text-gray-200 mr-2">Sort by:</span>
					<SelectField
						width={'w-full md:min-w-[50px]'}
						data={[
							{
								label: 'Recommended',
								value: 'recommended',
								id: 'recommended',
							},
							{
								label: 'Relevance',
								value: 'relevance',
								id: 'relevance',
							},
						]}
						placeholder="Sort by"
						inputClassName="bg-[#2a2a2a] border-[#3a3a3a] text-xs"
						onSelect={(option) => {
							console.log('Selected option:', option.value);
						}}
					/>
				</div>
			</div>
			<p className="text-xs text-gray-200 mb-6">
				Showing {data?.data.length} of {data?.meta?.count} results
			</p>
			{isPending ? (
				<div className="flex justify-center items-center gap-4">
					<Loader />
					<p className="font-medium">Fetching products...</p>
				</div>
			) : (
				<motion.div
					className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-4"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}>
					{data?.data?.map((product) => {
						return <Product key={product._id} {...product} />;
					})}
				</motion.div>
			)}
			<div className="flex justify-center mt-10 max-md:mb-4">
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						icon={<ChevronLeft className="w-4 h-4" />}
						iconPosition="left"
						className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm py-2.5 max-[350px]:px-5"
					/>
					<Button className="bg-primary hover:bg-primary text-white text-sm w-8 h-8">1</Button>
					<Button variant="outline" className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm w-8 h-8">
						2
					</Button>
					<Button variant="outline" className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm w-8 h-8">
						3
					</Button>
					<Button
						variant="outline"
						className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm w-8 h-8 max-md:hidden">
						4
					</Button>
					<Button
						variant="outline"
						className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm w-8 h-8 max-md:hidden">
						5
					</Button>
					<Button
						variant="outline"
						icon={<ChevronRight className="w-4 h-4" />}
						iconPosition="right"
						className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm py-2.5 max-[350px]:px-5"
					/>
				</div>
			</div>
		</section>
	);
};
export default ProductsPage;
