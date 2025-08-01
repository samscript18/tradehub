'use client';

import Button from '@/components/common/button';
import { motion } from 'framer-motion';
import Product from '../ui/product';
import { ChevronLeft, ChevronRight, Plus, SlidersHorizontal } from 'lucide-react';
import SelectField from '@/components/common/inputs/select-field';
import { useQuery } from '@tanstack/react-query';
import { getProductsFilters } from '@/lib/services/customer.service';
import Loader from '@/components/common/loaders';
import { useState } from 'react';
import { getProducts } from '@/lib/services/merchant.service';
import { useRouter } from 'next/navigation';

const ProductsPage = () => {
	const [filter, setFilter] = useState<{
		category?: string;
		priceRange?: { label: string; min: number; max: number | null };
		rating?: string;
	}>({});
	const [page, setPage] = useState<number>(1);
	const router = useRouter();

	const { data: filters } = useQuery({
		queryFn: () => getProductsFilters(),
		queryKey: ['get-products-filters'],
	});

	const queryFilter: {
		category?: string;
		priceRange?: { min: number; max: number | null };
	} = {};

	if (filter.category) {
		queryFilter['category'] = String(filter.category);
	}

	if (filter.priceRange) {
		queryFilter['priceRange'] = { min: filter.priceRange.min, max: filter.priceRange.max };
	}

	const { data, isPending } = useQuery({
		queryFn: () =>
			getProducts({
				page,
				limit: Number(10),
				...queryFilter,
			}),

		queryKey: ['get-merchant-products', filter, page],
	});

	const totalPages = data?.meta?.totalPages || 1;

	return (
		<section className="px-4">
			<div className="max-md:w-full flex max-md:flex-col items-start md:items-center justify-between mb-6">
				<div className="w-full max-md:space-y-4 space-x-10 grid grid-cols-1 md:grid-cols-4">
					<div className="mt-2 md:col-span-1">
						<Button
							variant="outline"
							icon={<SlidersHorizontal className="w-4 h-4" />}
							iconPosition="left"
							size="small"
							className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-xs">
							Filters
						</Button>
					</div>

					<div className="max-md:w-full w-full grid grid-cols-1 md:grid-cols-2 max-md:space-y-4 gap-x-4 max-md:mt-2 md:col-span-2 md:mt-2">
						<SelectField
							width={'w-full md:min-w-[50px]'}
							data={
								filters?.category
									? filters.category.map((category: string) => ({
											label: category,
											value: category,
											id: category,
									  }))
									: []
							}
							placeholder="Categories"
							value={filter.category || ''}
							inputClassName="bg-[#2a2a2a] border-[#3a3a3a] text-xs"
							onSelect={(option) => {
								setFilter((prev) => ({ ...prev, category: String(option.value) }));
							}}
						/>

						<SelectField
							width={'w-full md:min-w-[50px]'}
							data={
								filters?.priceRange
									? filters.priceRange.map((range) => ({
											label: range.label,
											value: { label: range.label, min: range.min, max: range.max },
											id: range.label,
									  }))
									: []
							}
							value={filter.priceRange?.label || ''}
							placeholder="Price Range"
							inputClassName="bg-[#2a2a2a] border-[#3a3a3a] text-xs"
							onSelect={(option) => {
								setFilter((prev) => ({
									...prev,
									priceRange: option.value as { label: string; min: number; max: number | null },
								}));
							}}
						/>
					</div>

					<div className="mt-2 md:col-span-1 flex justify-end">
						<Button
							className="bg-primary hover:bg-blue-700 text-white cursor-pointer"
							onClick={() => router.push('/merchant/products/upload')}
							icon={<Plus className="w-4 h-4 mr-1" />}
							iconPosition="left">
							Upload Product
						</Button>
					</div>
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
						icon={<ChevronLeft className="w-4 h-4 text-white" />}
						iconPosition="left"
						className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm py-2.5 max-[350px]:px-5"
						disabled={page === 1}
						onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					/>
					{Array.from({ length: totalPages }, (_, i) => (
						<Button
							key={i + 1}
							className={`${
								page === i + 1
									? 'bg-primary hover:bg-primary text-white'
									: 'bg-[#2a2a2a] border-[#3a3a3a] text-white'
							} text-sm w-8 h-8`}
							variant={page === i + 1 ? undefined : 'outline'}
							onClick={() => setPage(i + 1)}>
							{i + 1}
						</Button>
					))}
					<Button
						variant="outline"
						icon={<ChevronRight className="w-4 h-4 text-white" />}
						iconPosition="right"
						className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm py-2.5 max-[350px]:px-5"
						disabled={page === totalPages}
						onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
					/>
				</div>
			</div>
		</section>
	);
};
export default ProductsPage;
