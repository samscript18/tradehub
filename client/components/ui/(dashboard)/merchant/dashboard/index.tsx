"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Plus, DollarSign, Package, ShoppingCart, Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMerchantOrders, getProducts, getWalletBalance, getWalletHistory } from "@/lib/services/merchant.service";
import DotLoader from "@/components/ui/dot-loader";
import { formatNaira } from "@/lib/helpers";
import { useMemo } from "react";
import Image from "next/image";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

const MerchantDashboard = () => {
	const router = useRouter();

	const { data: wallet } = useQuery({
		queryFn: () => getWalletBalance(),
		queryKey: ["get-merchant-wallet-balance"],
	});

	const { data, isLoading } = useQuery({
		queryFn: () => getProducts({ page: 1, limit: 4 }),
		queryKey: ["get-merchant-products"],
	});

	const { data: merchantOrders, isLoading: isGettingMerchantOrders } = useQuery({
		queryFn: () =>
			getMerchantOrders({
				page: 1,
				limit: Number(10),
			}),

		queryKey: ["get-merchant-orders"],
	});

	const { data: walletHistory, isLoading: isLoadingWalletHistory } = useQuery({
		queryFn: () => getWalletHistory(),
		queryKey: ["get-merchant-wallet-history"],
	});

	const totalSales = merchantOrders?.data.reduce((acc, order) => acc + order.price, 0) || 0;

	const salesData = useMemo(() => {
		const salesByDay = daysOfWeek.map((day) => ({ day, sales: 0 }));

		if (merchantOrders?.data) {
			merchantOrders.data.forEach((order) => {
				const date = new Date(order.createdAt);
				const dayIndex = date.getDay();
				salesByDay[dayIndex].sales += order.price;
			});
		}

		return [...salesByDay.slice(1), salesByDay[0]];
	}, [merchantOrders?.data]);

	const stats = [
		{
			title: "Wallet Balance",
			value: `${wallet?.balance ? formatNaira(wallet.balance) : formatNaira(0)}`,
			icon: <DollarSign className="w-5 h-5" />,
		},
		{
			title: "Total Sales",
			value: `${formatNaira(totalSales)}`,
			icon: <Banknote className="w-5 h-5" />,
		},
		{
			title: "Total Orders",
			value: `${merchantOrders?.data.length || 0}`,
			icon: <ShoppingCart className="w-5 h-5" />,
		},
		{
			title: "Total Products",
			value: `${data?.data?.length || 0}`,
			icon: <Package className="w-5 h-5" />,
		},
	];

	return (
		<div className="min-h-screen text-white p-4 md:p-6 space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<Card
						key={index}
						onClick={() => {
							if (index < 1) router.push("/merchant/profile?activeTab=banking");
						}}
						className="dashboard-panel dashboard-glow-hover py-4 cursor-pointer rounded-2xl border-slate-700/60"
					>
						<CardContent className="px-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-slate-300 text-sm font-medium">{stat.title}</p>
									<p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
								</div>
								<div className="text-primary">{stat.icon}</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				<div className="lg:col-span-2">
					<Card className="dashboard-panel rounded-2xl border-slate-700/60">
						<CardHeader>
							<CardTitle className="text-white">Sales Performance</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="h-80 dashboard-input rounded-xl p-2 border-slate-700/70">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={salesData}>
										<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
										<XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
										<YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
										<Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-2">
					<Card className="dashboard-panel h-full rounded-2xl border-slate-700/60">
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle className="text-white">Upload New Product</CardTitle>
							<Button size="sm" className="bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-xl" onClick={() => router.push("/merchant/products/upload")}>
								<Plus className="w-4 h-4 mr-1" />
								Upload Product
							</Button>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-4 gap-2 overflow-y-scroll dashboard-input rounded-xl p-2 border-slate-700/70">
								{isLoading ? (
									<DotLoader />
								) : (
									data?.data?.map((product, index) => (
										<div key={index} className="aspect-square bg-slate-900/80 rounded-lg border border-slate-700/80">
											<Image src={product.images[index] || ""} width={100} height={100} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
										</div>
									))
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				<div className="lg:col-span-4">
					<Card className="dashboard-panel rounded-2xl border-slate-700/60">
						<CardHeader>
							<CardTitle className="text-white">Recent Orders</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow className="border-slate-700/70">
										<TableHead className="text-slate-300">Order ID</TableHead>
										<TableHead className="text-slate-300">Customer</TableHead>
										<TableHead className="text-slate-300">Amount</TableHead>
										<TableHead className="text-slate-300">Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{isGettingMerchantOrders ? (
										<DotLoader isTable colSpan={4} />
									) : (
										merchantOrders?.data?.map((order) => {
											const style = statusStyles[order.status] || statusStyles.default;
											return (
												<TableRow key={order._id} className="border-slate-700/70">
													<TableCell className="text-white font-medium">#{order._id.toUpperCase()}</TableCell>
													<TableCell className="text-slate-200">
														{order.customer.firstName} {order.customer.lastName}
													</TableCell>
													<TableCell className="text-slate-200">{formatNaira(order.price)}</TableCell>
													<TableCell>
														<Badge variant={style.variant} className={style.className}>
															{order.status}
														</Badge>
													</TableCell>
												</TableRow>
											);
										})
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				<div className="lg:col-span-4"></div>
				<Card className="dashboard-panel rounded-2xl border-slate-700/60 col-span-4">
					<CardHeader>
						<CardTitle className="text-white">Wallet History</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow className="border-slate-700/70">
									<TableHead className="text-slate-300">Txn Ref</TableHead>
									<TableHead className="text-slate-300">Type</TableHead>
									<TableHead className="text-slate-300">Amount</TableHead>
									<TableHead className="text-slate-300">Status</TableHead>
									<TableHead className="text-slate-300">Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{isLoadingWalletHistory ? (
									<DotLoader isTable colSpan={5} />
								) : (
									walletHistory?.map((txn) => (
										<TableRow key={txn._id} className="border-slate-700/70">
											<TableCell className="text-white font-medium">{txn.reference}</TableCell>
											<TableCell className="text-slate-200 capitalize">{txn.type}</TableCell>
											<TableCell className="text-slate-200">{formatNaira(txn.amount)}</TableCell>
											<TableCell>
												<Badge
													variant={txn.status === "successful" ? "default" : "secondary"}
													className={
														txn.status === "successful"
															? "bg-green-600/20 text-green-400 border-green-600/30 capitalize"
															: "bg-red-600/20 text-red-400 border-red-600/30 capitalize"
													}
												>
													{txn.status}
												</Badge>
											</TableCell>
											<TableCell className="text-slate-400">{new Date(txn.createdAt).toLocaleDateString()}</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default MerchantDashboard;
