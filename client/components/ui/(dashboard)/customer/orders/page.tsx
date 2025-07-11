'use client';

import Button from '@/components/common/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
	Search,
	Filter,
	CheckCircle,
	Clock,
	XCircle,
	ChevronRight,
	ChevronLeft,
} from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getCustomerOrders } from '@/lib/services/customer.service';
import { useState } from 'react';
import Loader from '@/components/common/loaders';
import { motion } from 'framer-motion';
import { formatNaira } from '@/lib/helpers';
import { useRouter } from 'next/navigation';

const getStatusBadge = (status: string) => {
	switch (status) {
		case 'delivered':
			return (
				<Badge className="bg-green-600 hover:bg-green-700 text-white">
					<CheckCircle className="w-3 h-3 mr-1" />
					Delivered
				</Badge>
			);
		case 'processing':
			return (
				<Badge className="bg-blue-600 hover:bg-blue-700 text-white">
					<Clock className="w-3 h-3 mr-1" />
					Processing
				</Badge>
			);
		case 'cancelled':
			return (
				<Badge className="bg-red-600 hover:bg-red-700 text-white">
					<XCircle className="w-3 h-3 mr-1" />
					Cancelled
				</Badge>
			);
		default:
			return null;
	}
};

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

	if (params?.search) queryParams['search'] = params.search;

	const { data, isLoading } = useQuery({
		queryFn: () =>
			getCustomerOrders({
				page,
				limit: Number(10),
				...queryParams,
			}),

		queryKey: ['get-customer-orders', params.search, page],
	});

	const totalPages = data?.meta?.totalPages || 0;
	return (
		<div className="px-4 py-4">
			<h1 className="text-2xl font-bold mb-8">Order History</h1>

			<div className="flex flex-col sm:flex-row gap-4 mb-8">
				<Select defaultValue="today">
					<SelectTrigger className="w-full sm:w-48 bg-[#181A20] border-gray-700">
						<SelectValue className="cursor-pointer" />
					</SelectTrigger>
					<SelectContent className="bg-[#181A20] border-gray-700 cursor-pointer">
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
						placeholder="Search orders..."
						className="pl-10 bg-[#181A20] border-gray-700 text-white placeholder-gray-400 focus:outline-none focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') setParams({ search: searchValue });
						}}
					/>
				</div>

				<Button
					variant="outline"
					className="border-gray-700 text-sm text-gray-300 hover:bg-[#181A20] hover:text-white cursor-pointer bg-transparent"
					onClick={() => setParams({ search: searchValue })}
					icon={<Filter className="w-4 h-4 mr-2" />}
					iconPosition="left">
					Filter
				</Button>
			</div>

			<div className="space-y-4 mb-8">
				{isLoading ? (
					<div className="flex justify-center items-center gap-4">
						<Loader />
						<p className="font-medium">Fetching orders...</p>
					</div>
				) : (
					<motion.div
						className="grid grid-cols-1 gap-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}>
						{data?.data?.map((order) => (
							<Card
								key={order.orderId}
								className="bg-[#181A20] border-[#181A20] rounded-xl shadow-md cursor-pointer"
								onClick={() => router.push(`/customer/orders/${order.orderId}`)}>
								<CardContent className="px-6">
									<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
										<div className="">
											<h3 className="text-sm max-md:text-center text-gray-400 mb-4">ORD-{order.orderId.toUpperCase()}</h3>
											<div className="flex max-md:flex-col max-md:items-center items-start gap-4">
												<div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
													<Image
														src={order.merchantOrders[0].merchant.logo || ''}
														alt={order.merchantOrders[0].merchant.name || ''}
														width={64}
														height={64}
														className="w-full h-full object-cover rounded-full"
													/>
												</div>

												<div className="flex-1 max-md:text-center">
													{/* <div className="flex items-center gap-3 mb-2">
														<div className="flex items-center text-sm text-gray-400">
														<Calendar className="w-3 h-3 mr-1" />
														{order.}
													</div>
													</div> */}
													<div className="flex gap-4 flex-wrap max-md:justify-center max-md:items-center">
														{order.merchantOrders?.map((order) => {
															return (
																<h3 key={order.merchant._id} className="font-semibold text-white text-lg mb-2">
																	{order.merchant.name}
																</h3>
															);
														})}
													</div>

													<div className="text-sm text-gray-400 space-y-1">
														{order.merchantOrders?.map((order, index) => (
															<div key={index}>
																{order.products.map((item, idx) => {
																	return (
																		<div key={idx}>
																			{item.product}
																			{` (${item.quantity}${item.quantity > 1 ? 'x' : ''})`}
																		</div>
																	);
																})}
															</div>
														))}
													</div>
												</div>
											</div>
										</div>

										<div className="flex flex-col lg:items-end gap-4">
											<div className="flex items-center justify-between lg:flex-col lg:items-end gap-4">
												<span className="text-2xl font-bold text-blue-400">{formatNaira(order.price)}</span>
												{getStatusBadge(order.status)}
											</div>

											{/* <div className="flex gap-2">
												{order.status === 'delivered' && (
													<>
														<Button
															variant="outline"
															className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
															View Details
														</Button>
														<Button
															variant="outline"
															className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
															Leave Review
														</Button>
														<Button className="bg-blue-600 hover:bg-blue-700">Reorder</Button>
													</>
												)}
												{order.status === 'processing' && (
													<>
														<Button
															variant="outline"
															className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
															View Details
														</Button>
														<Button className="bg-blue-600 hover:bg-blue-700">Reorder</Button>
													</>
												)}
												{order.status === 'cancelled' && (
													<Button
														variant="outline"
														className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
														View Details
													</Button>
												)}
											</div> */}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</motion.div>
				)}
			</div>

			{/* Pagination */}
			<div className="flex max-md:flex-col max-md:gap-4 items-center justify-between">
				<p className="text-sm text-gray-400">
					Showing {data?.meta?.page} - {data?.meta?.totalPages} of {data?.meta?.count} orders
				</p>

				<div className="flex items-center gap-2">
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
			</div>
		</div>
	);
}
