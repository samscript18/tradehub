"use client";

import Button from "@/components/common/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCustomerOrders } from "@/lib/services/customer.service";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatNaira } from "@/lib/helpers";
import { useRouter } from "next/navigation";

const statusStyles: Record<string, { variant: "default" | "secondary"; className: string }> = {
	pending: {
		variant: "secondary",
		className: "bg-amber-600/20 text-amber-400 border-amber-600/30 capitalize",
	},
	confirmed: {
		variant: "secondary",
		className: "bg-blue-600/20 text-blue-400 border-blue-600/30 capitalize",
	},
	processing: {
		variant: "secondary",
		className: "bg-cyan-600/20 text-cyan-400 border-cyan-600/30 capitalize",
	},
	shipped: {
		variant: "secondary",
		className: "bg-indigo-600/20 text-indigo-400 border-indigo-600/30 capitalize",
	},
	in_transit: {
		variant: "secondary",
		className: "bg-sky-600/20 text-sky-400 border-sky-600/30 capitalize",
	},
	delivered: {
		variant: "default",
		className: "bg-green-600/20 text-green-400 border-green-600/30 capitalize",
	},
	cancelled: {
		variant: "secondary",
		className: "bg-red-600/20 text-red-400 border-red-600/30 capitalize",
	},
	returned: {
		variant: "secondary",
		className: "bg-gray-600/20 text-gray-400 border-gray-600/30 capitalize",
	},
	default: {
		variant: "secondary",
		className: "bg-gray-600/20 text-gray-400 border-gray-600/30 capitalize",
	},
};

const OrderListSkeleton = () => (
	<div className="space-y-4">
		{Array.from({ length: 3 }, (_, idx) => (
			<div key={idx} className="dashboard-panel dashboard-shimmer rounded-2xl p-6 space-y-4">
				<div className="h-4 w-44 rounded-md bg-slate-700/60" />
				<div className="flex items-center gap-4">
					<div className="h-14 w-14 rounded-full bg-slate-700/50" />
					<div className="flex-1 space-y-2">
						<div className="h-4 w-3/5 rounded-md bg-slate-700/60" />
						<div className="h-3 w-2/5 rounded-md bg-slate-700/40" />
					</div>
				</div>
			</div>
		))}
	</div>
);

export default function OrderHistoryPage() {
	const router = useRouter();
	const [params, setParams] = useState<{
		search?: string;
	}>({});
	const [page, setPage] = useState<number>(1);
	const [searchValue, setSearchValue] = useState<string>();
	const queryParams: {
		search?: string;
	} = {};

	if (params?.search) queryParams["search"] = params.search;

	const { data, isLoading } = useQuery({
		queryFn: () =>
			getCustomerOrders({
				page,
				limit: Number(10),
				...queryParams,
			}),

		queryKey: ["get-customer-orders", params.search, page],
	});

	const totalPages = data?.meta?.totalPages || 0;
	return (
		<div className="px-4 md:px-6 py-5 space-y-6">
			<section className="dashboard-panel rounded-2xl p-5 md:p-7">
				<div className="flex flex-col gap-2">
					<p className="text-xs tracking-[0.18em] uppercase text-slate-400">Customer Workspace</p>
					<h1 className="text-2xl md:text-3xl font-bold text-white">Order History</h1>
					<p className="text-sm text-slate-300">Track active deliveries and review all completed purchases.</p>
				</div>
			</section>

			<div className="flex flex-col sm:flex-row gap-4">
				<Select defaultValue="today">
					<SelectTrigger className="w-full sm:w-48 dashboard-input border-slate-700 rounded-xl">
						<SelectValue className="cursor-pointer" />
					</SelectTrigger>
					<SelectContent className="dashboard-panel border-slate-700 cursor-pointer">
						<SelectItem value="today" className="text-white">
							Today
						</SelectItem>
						<SelectItem value="7days" className="text-white">
							Last 7 days
						</SelectItem>
						<SelectItem value="1month" className="text-white">
							Last month
						</SelectItem>
						<SelectItem value="3month" className="text-white">
							Last 3 months
						</SelectItem>
					</SelectContent>
				</Select>

				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
					<Input
						placeholder="Search order id"
						className="pl-10 dashboard-input rounded-xl border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") setParams({ search: searchValue });
						}}
					/>
				</div>

				<Button
					variant="outline"
					className="dashboard-input rounded-xl border-slate-700 text-sm text-slate-200 hover:bg-slate-800/90 hover:text-white cursor-pointer"
					onClick={() => setParams({ search: searchValue })}
					icon={<Filter className="w-4 h-4 mr-2" />}
					iconPosition="left"
				>
					Filter
				</Button>
			</div>

			<div className="space-y-4 mb-2">
				{isLoading ? (
					<OrderListSkeleton />
				) : !data?.data?.length ? (
					<div className="dashboard-panel rounded-2xl p-10 text-center">
						<p className="text-lg font-semibold text-white mb-2">No orders found</p>
						<p className="text-sm text-slate-300">Try another search keyword or date filter.</p>
					</div>
				) : (
					<motion.div className="grid grid-cols-1 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}>
						{data?.data?.map((order) => {
							const style = statusStyles[order.status] || statusStyles.default;

							return (
								<Card key={order.orderId} className="dashboard-panel dashboard-glow-hover rounded-2xl cursor-pointer" onClick={() => router.push(`/customer/orders/${order.orderId}`)}>
									<CardContent className="p-5 md:p-6">
										<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
											<div className="">
												<div className="flex gap-3 flex-wrap items-center">
													<h3 className="text-xs max-md:text-center text-slate-400 mb-2 tracking-[0.18em]">ORDER ID</h3>
													<h3 className="text-xs max-md:text-center text-slate-200 mb-2 font-medium">{order.orderId.toUpperCase()}</h3>
												</div>
												<div className="flex max-md:flex-col max-md:items-center items-start gap-4">
													<div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-slate-700/70">
														<Image
															src={order.merchantOrders[0].merchant.logo || ""}
															alt={order.merchantOrders[0].merchant.name || ""}
															width={64}
															height={64}
															className="w-full h-full object-cover rounded-full"
														/>
													</div>

													<div className="flex-1 max-md:text-center">
														<div className="flex gap-4 flex-wrap max-md:justify-center max-md:items-center">
															{order.merchantOrders?.map((order) => {
																return (
																	<h3 key={order.merchant._id} className="font-semibold text-white text-lg mb-1">
																		{order.merchant.name}
																	</h3>
																);
															})}
														</div>

														<div className="text-sm text-gray-400 space-y-1">
															{order.merchantOrders?.map((order, index) => {
																return (
																	<div key={index} className="text-slate-300/90">
																		{order.products.map((item, idx) => {
																			return (
																				<div key={idx}>
																					{item.product}
																					{` (${item.quantity}${item.quantity > 1 ? "x" : ""})`}
																				</div>
																			);
																		})}
																	</div>
																);
															})}
														</div>
													</div>
												</div>
											</div>

											<div className="flex flex-col lg:items-end gap-4">
												<div className="flex items-center justify-between lg:flex-col lg:items-end gap-4">
													<span className="text-2xl font-bold text-primary">{formatNaira(order.price)}</span>
													<Badge variant={style.variant} className={style.className}>
														{order.status}
													</Badge>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</motion.div>
				)}
			</div>

			{/* Pagination */}
			<div className="dashboard-panel rounded-2xl p-4 md:p-5 flex max-md:flex-col max-md:gap-4 items-center justify-between">
				<p className="text-sm text-slate-300">
					Showing {data?.meta?.page} - {data?.meta?.totalPages} of {data?.meta?.count} orders
				</p>

				<div className="flex items-center gap-2">
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
			</div>
		</div>
	);
}
