"use client";

import Button from "@/components/common/button";
import { motion } from "framer-motion";
import Product from "../ui/product";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import SelectField from "@/components/common/inputs/select-field";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsFilters } from "@/lib/services/customer.service";
import { useState } from "react";

const ProductGridSkeleton = () => (
	<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-4">
		{Array.from({ length: 8 }, (_, idx) => (
			<div key={idx} className="dashboard-panel dashboard-shimmer rounded-2xl overflow-hidden">
				<div className="h-44 bg-slate-700/50" />
				<div className="p-3 space-y-2">
					<div className="h-4 rounded-md bg-slate-700/60" />
					<div className="h-3 w-2/3 rounded-md bg-slate-700/50" />
					<div className="h-8 rounded-xl bg-slate-700/50" />
				</div>
			</div>
		))}
	</div>
);

const ProductsPage = () => {
	const [filter, setFilter] = useState<{
		category?: string;
		priceRange?: { label: string; min: number; max: number | null };
		rating?: string;
	}>({});
	const [page, setPage] = useState<number>(1);

	const { data: filters } = useQuery({
		queryFn: () => getProductsFilters(),
		queryKey: ["get-products-filters"],
	});

	const queryFilter: {
		category?: string;
		priceRange?: { min: number; max: number | null };
	} = {};

	if (filter.category) {
		queryFilter["category"] = String(filter.category);
	}

	if (filter.priceRange) {
		queryFilter["priceRange"] = { min: filter.priceRange.min, max: filter.priceRange.max };
	}

	const { data, isPending } = useQuery({
		queryFn: () =>
			getProducts({
				page,
				limit: Number(10),
				...queryFilter,
				// rating: filter.rating,
			}),

		queryKey: ["get-products", filter, page],
	});

	const totalPages = data?.meta?.totalPages || 1;

	return (
		<section className="px-4 md:px-6 py-5 space-y-6">
			<div className="dashboard-panel rounded-2xl p-5 md:p-7">
				<h1 className="text-2xl md:text-3xl font-bold text-white">Browse Products</h1>
				<p className="text-sm text-slate-300 mt-2">Discover handpicked products from trusted merchants.</p>
			</div>
			<div className="max-md:w-full dashboard-panel rounded-2xl p-4 flex max-md:flex-col items-start md:items-center justify-between">
				<div className="max-md:w-full flex max-md:flex-col items-start md:items-center max-md:space-y-4 space-x-4">
					<div className="flex justify-center items-center mt-2">
						<Button variant="outline" icon={<SlidersHorizontal className="w-4 h-4" />} iconPosition="left" size="small" className="dashboard-input border-slate-700 text-white text-xs rounded-xl">
							Filters
						</Button>
					</div>

					<div className="max-md:w-full grid grid-cols-1 md:grid-cols-3 max-md:space-y-4 space-x-4 max-md:mt-2">
						<SelectField
							width={"w-full md:min-w-[50px]"}
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
							value={filter.category || ""}
							inputClassName="dashboard-input border-slate-700 text-xs"
							onSelect={(option) => {
								setFilter((prev) => ({ ...prev, category: String(option.value) }));
							}}
						/>

						<SelectField
							width={"w-full md:min-w-[50px]"}
							data={
								filters?.priceRange
									? filters.priceRange.map((range) => ({
											label: range.label,
											value: { label: range.label, min: range.min, max: range.max },
											id: range.label,
										}))
									: []
							}
							value={filter.priceRange?.label || ""}
							placeholder="Price Range"
							inputClassName="dashboard-input border-slate-700 text-xs"
							onSelect={(option) => {
								setFilter((prev) => ({
									...prev,
									priceRange: option.value as { label: string; min: number; max: number | null },
								}));
							}}
						/>

						<SelectField
							width={"w-full md:min-w-[50px]"}
							data={[
								{
									label: "5",
									value: "5",
									id: "5",
								},
								{
									label: "4",
									value: "4",
									id: "4",
								},
								{
									label: "3",
									value: "3",
									id: "3",
								},
								{
									label: "2",
									value: "2",
									id: "2",
								},
								{
									label: "1",
									value: "1",
									id: "1",
								},
							]}
							placeholder="Rating"
							inputClassName="dashboard-input border-slate-700 text-xs"
							onSelect={(option) => {
								console.log("Selected option:", option.value);
							}}
						/>
					</div>
				</div>

				<div className="max-md:w-full flex items-center max-md:mt-4">
					<span className="max-md:w-[30%] text-xs text-gray-200 mr-2">Sort by:</span>
					<SelectField
						width={"w-full md:min-w-[50px]"}
						data={[
							{
								label: "Recommended",
								value: "recommended",
								id: "recommended",
							},
							{
								label: "Relevance",
								value: "relevance",
								id: "relevance",
							},
						]}
						placeholder="Sort by"
						inputClassName="dashboard-input border-slate-700 text-xs"
						onSelect={(option) => {
							console.log("Selected option:", option.value);
						}}
					/>
				</div>
			</div>
			<p className="text-xs text-slate-300">
				Showing {data?.data.length} of {data?.meta?.count} results
			</p>
			{isPending ? (
				<ProductGridSkeleton />
			) : !data?.data?.length ? (
				<div className="dashboard-panel rounded-2xl p-8 text-center">
					<p className="font-semibold text-white">No products found</p>
					<p className="text-sm text-slate-300 mt-2">Adjust filters and try again.</p>
				</div>
			) : (
				<motion.div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}>
					{data?.data?.map((product) => {
						return <Product key={product._id} {...product} />;
					})}
				</motion.div>
			)}
			<div className="dashboard-panel rounded-2xl p-4 flex justify-center mt-2 max-md:mb-4">
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						icon={<ChevronLeft className="w-4 h-4 text-white" />}
						iconPosition="left"
						className="dashboard-input border-slate-700 text-white text-sm py-2.5 max-[350px]:px-5"
						disabled={page === 1}
						onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					/>
					{Array.from({ length: totalPages }, (_, i) => (
						<Button
							key={i + 1}
							className={`${page === i + 1 ? "bg-primary hover:bg-primary text-white border border-primary" : "dashboard-input border-slate-700 text-white"} text-sm w-8 h-8`}
							variant={page === i + 1 ? undefined : "outline"}
							onClick={() => setPage(i + 1)}
						>
							{i + 1}
						</Button>
					))}
					<Button
						variant="outline"
						icon={<ChevronRight className="w-4 h-4 text-white" />}
						iconPosition="right"
						className="dashboard-input border-slate-700 text-white text-sm py-2.5 max-[350px]:px-5"
						disabled={page === totalPages}
						onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
					/>
				</div>
			</div>
		</section>
	);
};
export default ProductsPage;
