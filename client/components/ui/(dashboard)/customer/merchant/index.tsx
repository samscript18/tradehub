"use client";

import Button from "@/components/common/button";
import Loader from "@/components/common/loaders";
import { getMerchants } from "@/lib/services/customer.service";
import { avatar1 } from "@/public/images";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const MerchantStoresPage = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	const { data, isPending } = useQuery({
		queryFn: () => getMerchants({ page, limit: 12 }),
		queryKey: ["get-merchants", page],
	});

	const merchants = useMemo(() => data?.data ?? [], [data?.data]);
	const totalPages = data?.meta?.totalPages || 1;

	const categories = useMemo(() => {
		const allCategories = merchants.flatMap((merchant) => merchant.storeCategory || []);
		return ["all", ...Array.from(new Set(allCategories))];
	}, [merchants]);

	const filteredMerchants = useMemo(() => {
		const query = search.trim().toLowerCase();

		return merchants.filter((merchant) => {
			const matchesSearch =
				!query ||
				merchant.storeName.toLowerCase().includes(query) ||
				(merchant.storeDescription || "").toLowerCase().includes(query);

			const matchesCategory = selectedCategory === "all" || (merchant.storeCategory || []).includes(selectedCategory);

			return matchesSearch && matchesCategory;
		});
	}, [merchants, search, selectedCategory]);

	return (
		<section className="px-4 md:px-6 py-5 space-y-6">
			<div className="dashboard-panel rounded-2xl p-5 md:p-7">
				<h1 className="text-2xl md:text-3xl font-bold text-white">All Stores</h1>
				<p className="text-sm text-slate-300 mt-2">Browse all merchants and visit any store to discover products.</p>
			</div>

			<div className="dashboard-panel rounded-2xl p-4 md:p-5 space-y-4">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search store name or description"
						className="pl-10 dashboard-input border-slate-700/70 rounded-xl text-white placeholder:text-slate-400"
					/>
				</div>

				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={`px-3 py-1.5 rounded-full text-xs border transition-colors cursor-pointer ${
								selectedCategory === category
									? "border-primary bg-primary/20 text-primary"
									: "border-slate-700 text-slate-300 hover:border-slate-500"
							}`}
						>
							{category === "all" ? "All Categories" : category}
						</button>
					))}
				</div>
			</div>

			{isPending ? (
				<div className="dashboard-panel rounded-2xl p-8 flex justify-center items-center gap-4">
					<Loader />
					<p className="font-medium">Fetching stores...</p>
				</div>
			) : !merchants.length ? (
				<div className="dashboard-panel rounded-2xl p-8 text-center">
					<p className="font-semibold text-white">No stores found</p>
				</div>
			) : !filteredMerchants.length ? (
				<div className="dashboard-panel rounded-2xl p-8 text-center">
					<p className="font-semibold text-white">No matching stores</p>
					<p className="text-sm text-slate-300 mt-2">Try another search term or category.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
					{filteredMerchants.map((merchant) => (
						<div key={merchant._id} className="dashboard-panel rounded-2xl overflow-hidden">
							<Image
								src={merchant.storeLogo || avatar1}
								alt={merchant.storeName}
								width={500}
								height={220}
								className="w-full h-44 object-cover"
							/>
							<div className="p-4 space-y-3">
								<h2 className="text-lg font-semibold text-white">{merchant.storeName}</h2>
								<p className="text-xs text-slate-300 line-clamp-2">{merchant.storeDescription || "Local merchant store"}</p>
								<div className="flex flex-wrap gap-2">
									{merchant.storeCategory?.slice(0, 3).map((category) => (
										<span key={category} className="text-[11px] bg-primary/15 text-primary px-2 py-1 rounded-full">
											{category}
										</span>
									))}
								</div>
								<Link href={`/customer/merchant/${merchant._id}`}>
									<Button fullWidth variant="filled" className="w-full text-xs py-2 rounded-xl">
										View Store
									</Button>
								</Link>
							</div>
						</div>
					))}
				</div>
			)}

			{!!merchants.length && !search.trim() && selectedCategory === "all" && (
				<div className="dashboard-panel rounded-2xl p-4 flex justify-center">
					<div className="flex items-center space-x-2">
						<Button
							variant="outline"
							icon={<ChevronLeft className="w-4 h-4 text-white" />}
							iconPosition="left"
							className="dashboard-input border-slate-700 text-white"
							disabled={page === 1}
							onClick={() => setPage((prev) => Math.max(1, prev - 1))}
						/>
						{Array.from({ length: totalPages }, (_, i) => (
							<Button
								key={i + 1}
								className={`${page === i + 1 ? "bg-primary text-white border border-primary" : "dashboard-input border-slate-700 text-white"} text-sm w-8 h-8`}
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
							className="dashboard-input border-slate-700 text-white"
							disabled={page === totalPages}
							onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
						/>
					</div>
				</div>
			)}
		</section>
	);
};

export default MerchantStoresPage;
