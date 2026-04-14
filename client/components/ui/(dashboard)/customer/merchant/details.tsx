"use client";

import Button from "@/components/common/button";
import Loader from "@/components/common/loaders";
import { getMerchantById, getProducts } from "@/lib/services/customer.service";
import { formatNaira } from "@/lib/helpers";
import { avatar1 } from "@/public/images";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
	merchantId: string;
};

const MerchantStoreDetailsPage = ({ merchantId }: Props) => {
	const { data: merchant, isPending: isPendingMerchant } = useQuery({
		queryFn: () => getMerchantById(merchantId),
		queryKey: ["get-merchant", merchantId],
		enabled: Boolean(merchantId),
	});

	const { data: productsResponse, isPending: isPendingProducts } = useQuery({
		queryFn: () => getProducts({ page: 1, limit: 50 }),
		queryKey: ["get-products-for-merchant", merchantId],
		enabled: Boolean(merchantId),
	});

	const products = useMemo(() => {
		if (!productsResponse?.data?.length) return [];
		return productsResponse.data.filter((product) => product.merchant._id === merchantId);
	}, [merchantId, productsResponse?.data]);

	if (isPendingMerchant) {
		return (
			<section className="px-4 md:px-6 py-5">
				<div className="dashboard-panel rounded-2xl p-8 flex justify-center items-center gap-4">
					<Loader />
					<p className="font-medium">Fetching store...</p>
				</div>
			</section>
		);
	}

	if (!merchant) {
		return (
			<section className="px-4 md:px-6 py-5">
				<div className="dashboard-panel rounded-2xl p-8 text-center">
					<p className="font-semibold text-white">Store not found</p>
					<Link href="/customer/merchant" className="inline-block mt-4 text-primary text-sm">
						Back to all stores
					</Link>
				</div>
			</section>
		);
	}

	return (
		<section className="px-4 md:px-6 py-5 space-y-6">
			<div className="dashboard-panel rounded-2xl overflow-hidden">
				<Image src={merchant.storeLogo || avatar1} alt={merchant.storeName} width={1200} height={300} className="w-full h-48 md:h-64 object-cover" />
				<div className="p-5 md:p-7 space-y-3">
					<h1 className="text-2xl md:text-3xl font-bold text-white">{merchant.storeName}</h1>
					<p className="text-sm text-slate-300 max-w-3xl">{merchant.storeDescription || "This store has no description yet."}</p>
					<div className="flex flex-wrap gap-2">
						{merchant.storeCategory?.map((category) => (
							<span key={category} className="text-[11px] bg-primary/15 text-primary px-2 py-1 rounded-full">
								{category}
							</span>
						))}
					</div>
				</div>
			</div>

			<div className="dashboard-panel rounded-2xl p-5 md:p-7">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold text-white">Products from this store</h2>
					<Link href="/customer/products" className="text-sm text-primary">
						Browse all products
					</Link>
				</div>

				{isPendingProducts ? (
					<div className="flex justify-center items-center gap-4 py-8">
						<Loader />
						<p className="font-medium">Fetching products...</p>
					</div>
				) : !products.length ? (
					<div className="text-center py-8">
						<p className="font-semibold text-white">No products found for this store yet.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{products.map((product) => (
							<div key={product._id} className="dashboard-panel rounded-2xl overflow-hidden">
								<Image src={product.images[0] || avatar1} alt={product.name} width={500} height={250} className="w-full h-44 object-cover" />
								<div className="p-4 space-y-3">
									<h3 className="text-sm md:text-base font-semibold text-white">{product.name}</h3>
									<p className="text-xs text-slate-300 line-clamp-2">{product.description}</p>
									<p className="text-sm font-bold text-primary">{formatNaira(product.variants?.[0]?.price || 0)}</p>
									<Link href={`/customer/products/${product._id}`}>
										<Button fullWidth variant="filled" className="w-full rounded-xl text-xs py-2">
											View Product
										</Button>
									</Link>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default MerchantStoreDetailsPage;
