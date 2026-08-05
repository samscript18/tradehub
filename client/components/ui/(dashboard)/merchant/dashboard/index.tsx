"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Plus, DollarSign, Package, ShoppingCart, Banknote, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMerchantOrders, getProducts, getWalletBalance, getWalletHistory } from "@/lib/services/merchant.service";
import DotLoader from "@/components/ui/dot-loader";
import { formatNaira } from "@/lib/helpers";
import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const statusStyles: Record<string, { variant: "default" | "secondary"; className: string }> = {
	pending: {
		variant: "secondary",
		className: "bg-amber-600/20 text-amber-400 border border-amber-600/30 capitalize rounded-lg px-2 py-0.5 text-xs font-semibold",
	},
	confirmed: {
		variant: "secondary",
		className: "bg-blue-600/20 text-blue-400 border border-blue-600/30 capitalize rounded-lg px-2 py-0.5 text-xs font-semibold",
	},
	processing: {
		variant: "secondary",
		className: "bg-cyan-600/20 text-cyan-400 border border-cyan-600/30 capitalize rounded-lg px-2 py-0.5 text-xs font-semibold",
	},
	shipped: {
		variant: "secondary",
		className: "bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 capitalize rounded-lg px-2 py-0.5 text-xs font-semibold",
	},
	in_transit: {
		variant: "secondary",
		className: "bg-sky-600/20 text-sky-400 border border-sky-600/30 capitalize rounded-lg px-2 py-0.5 text-xs font-semibold",
	},
	delivered: {
		variant: "default",
		className: "bg-green-600/20 text-green-400 border border-green-600/30 capitalize rounded-lg px-2 py-0.5 text-xs font-semibold",
	},
	cancelled: {
		variant: "secondary",
		className: "bg-red-600/20 text-red-400 border border-red-600/30 capitalize rounded-lg px-2 py-0.5 text-xs font-semibold",
	},
	returned: {
		variant: "secondary",
		className: "bg-gray-600/20 text-gray-400 border border-gray-600/30 capitalize rounded-lg px-2 py-0.5 text-xs font-semibold",
	},
	default: {
		variant: "secondary",
		className: "bg-gray-600/20 text-gray-400 border border-gray-600/30 capitalize rounded-lg px-2 py-0.5 text-xs font-semibold",
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
			icon: <DollarSign className="w-5 h-5 text-blue-400" />,
			borderClass: "border-t-[3px] border-t-blue-500",
			bgClass: "bg-blue-500/10",
		},
		{
			title: "Total Sales",
			value: `${formatNaira(totalSales)}`,
			icon: <Banknote className="w-5 h-5 text-emerald-400" />,
			borderClass: "border-t-[3px] border-t-emerald-500",
			bgClass: "bg-emerald-500/10",
		},
		{
			title: "Total Orders",
			value: `${merchantOrders?.data.length || 0}`,
			icon: <ShoppingCart className="w-5 h-5 text-amber-400" />,
			borderClass: "border-t-[3px] border-t-amber-500",
			bgClass: "bg-amber-500/10",
		},
		{
			title: "Total Products",
			value: `${data?.data?.length || 0}`,
			icon: <Package className="w-5 h-5 text-purple-400" />,
			borderClass: "border-t-[3px] border-t-purple-500",
			bgClass: "bg-purple-500/10",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 15 },
		show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
	};

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="show"
			className="min-h-screen text-white p-4 md:p-6 space-y-8 dashboard-enter"
		>
			{/* Welcome Header */}
			<motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
						Welcome back, Merchant 👋
					</h1>
					<p className="text-slate-400 text-sm mt-1">Here is what is happening with your store today.</p>
				</div>
				<Button
					size="sm"
					className="bg-primary hover:bg-primary/90 text-white cursor-pointer rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
					onClick={() => router.push("/merchant/products/upload")}
				>
					<Plus className="w-4 h-4" />
					Add Product
				</Button>
			</motion.div>

			{/* Stats Grid */}
			<motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<Card
						key={index}
						onClick={() => {
							if (index < 1) router.push("/merchant/profile?activeTab=banking");
						}}
						className={`dashboard-panel dashboard-glow-hover py-5 cursor-pointer rounded-2xl border-slate-800/80 bg-slate-900/30 backdrop-blur-sm ${stat.borderClass}`}
					>
						<CardContent className="px-6 pb-0">
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.title}</p>
									<p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
								</div>
								<div className={`p-3 rounded-xl ${stat.bgClass}`}>
									{stat.icon}
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</motion.div>

			{/* Chart & Upload Row */}
			<motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-6 gap-6">
				<Card className="dashboard-panel rounded-2xl border-slate-800/80 bg-slate-900/30 backdrop-blur-sm lg:col-span-4">
					<CardHeader>
						<CardTitle className="text-white text-lg font-bold">Sales Performance</CardTitle>
						<p className="text-slate-400 text-xs">Weekly sales distribution for order totals</p>
					</CardHeader>
					<CardContent>
						<div className="h-80 dashboard-input rounded-xl p-2 border-slate-800 bg-slate-950/20">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={salesData}>
									<defs>
										<linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
											<stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2}/>
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
									<XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 11 }} />
									<YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 11 }} />
									<Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }} />
									<Bar dataKey="sales" fill="url(#colorSales)" radius={[6, 6, 0, 0]} barSize={32} />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card className="dashboard-panel rounded-2xl border-slate-800/80 bg-slate-900/30 backdrop-blur-sm lg:col-span-2 flex flex-col justify-between">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<div>
							<CardTitle className="text-white text-lg font-bold">Upload Product</CardTitle>
							<p className="text-slate-400 text-xs">Manage active display products</p>
						</div>
					</CardHeader>
					<CardContent className="flex-1 flex flex-col justify-between">
						<div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[220px] pr-1 py-1 scrollbar-thin">
							{isLoading ? (
								<div className="col-span-2 flex items-center justify-center py-10">
									<DotLoader />
								</div>
							) : (
								data?.data?.map((product, index) => (
									<div key={index} className="group aspect-square bg-slate-950/40 rounded-xl border border-slate-800 overflow-hidden relative cursor-pointer hover:border-primary/40 transition-colors">
										<Image src={product.images[0] || ""} width={120} height={120} alt={`Product ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
										<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
											<p className="text-[10px] text-white font-medium truncate">{product.name}</p>
											<p className="text-[10px] text-primary font-bold">{formatNaira(product.variants[0]?.price || 0)}</p>
										</div>
									</div>
								))
							)}
						</div>
						<Button
							onClick={() => router.push("/merchant/products")}
							variant="outline"
							className="w-full border-slate-700 hover:border-primary/50 text-slate-300 hover:text-white rounded-xl mt-4 flex items-center justify-center gap-2"
						>
							View All Products
							<ArrowRight className="w-4 h-4" />
						</Button>
					</CardContent>
				</Card>
			</motion.div>

			{/* Orders & Transactions Section */}
			<motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Orders */}
				<Card className="dashboard-panel rounded-2xl border-slate-800/80 bg-slate-900/30 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center justify-between pb-3">
						<div>
							<CardTitle className="text-white text-lg font-bold">Recent Orders</CardTitle>
							<p className="text-slate-400 text-xs">Customer order request history</p>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => router.push("/merchant/orders")}
							className="text-primary hover:text-primary/80 hover:bg-primary/5 font-semibold text-xs rounded-lg flex items-center gap-1"
						>
							All Orders
							<ArrowRight className="w-3.5 h-3.5" />
						</Button>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow className="border-slate-800 hover:bg-transparent">
										<TableHead className="text-slate-400 text-xs font-semibold">Order ID</TableHead>
										<TableHead className="text-slate-400 text-xs font-semibold">Customer</TableHead>
										<TableHead className="text-slate-400 text-xs font-semibold">Amount</TableHead>
										<TableHead className="text-slate-400 text-xs font-semibold">Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{isGettingMerchantOrders ? (
										<DotLoader isTable colSpan={4} />
									) : (
										merchantOrders?.data?.slice(0, 5).map((order) => {
											const style = statusStyles[order.status] || statusStyles.default;
											return (
												<TableRow key={order._id} className="border-slate-800/60 hover:bg-slate-900/20 transition-colors">
													<TableCell className="text-white font-semibold text-sm">#{order._id.substring(18).toUpperCase()}</TableCell>
													<TableCell className="text-slate-300 text-sm">
														{order.customer.firstName} {order.customer.lastName}
													</TableCell>
													<TableCell className="text-slate-300 text-sm font-semibold">{formatNaira(order.price)}</TableCell>
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
						</div>
					</CardContent>
				</Card>

				{/* Wallet History */}
				<Card className="dashboard-panel rounded-2xl border-slate-800/80 bg-slate-900/30 backdrop-blur-sm">
					<CardHeader className="flex flex-row items-center justify-between pb-3">
						<div>
							<CardTitle className="text-white text-lg font-bold">Wallet History</CardTitle>
							<p className="text-slate-400 text-xs">Recent transaction logs</p>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => router.push("/merchant/profile?activeTab=banking")}
							className="text-primary hover:text-primary/80 hover:bg-primary/5 font-semibold text-xs rounded-lg flex items-center gap-1"
						>
							Statement
							<ArrowRight className="w-3.5 h-3.5" />
						</Button>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow className="border-slate-800 hover:bg-transparent">
										<TableHead className="text-slate-400 text-xs font-semibold">Txn Ref</TableHead>
										<TableHead className="text-slate-400 text-xs font-semibold">Type</TableHead>
										<TableHead className="text-slate-400 text-xs font-semibold">Amount</TableHead>
										<TableHead className="text-slate-400 text-xs font-semibold">Status</TableHead>
										<TableHead className="text-slate-400 text-xs font-semibold">Date</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{isLoadingWalletHistory ? (
										<DotLoader isTable colSpan={5} />
									) : (
										walletHistory?.slice(0, 5).map((txn) => {
											const isCredit = txn.type === "credit";
											return (
												<TableRow key={txn._id} className="border-slate-800/60 hover:bg-slate-900/20 transition-colors">
													<TableCell className="text-white font-semibold text-sm">#{txn.reference.substring(0, 8).toUpperCase()}</TableCell>
													<TableCell className="text-slate-300 text-sm capitalize">{txn.type}</TableCell>
													<TableCell className={`text-sm font-semibold ${isCredit ? "text-emerald-400" : "text-rose-400"}`}>
														{isCredit ? "+" : "-"}{formatNaira(txn.amount)}
													</TableCell>
													<TableCell>
														<Badge
															variant={txn.status === "successful" ? "default" : "secondary"}
															className={
																txn.status === "successful"
																	? "bg-green-600/20 text-green-400 border border-green-600/30 capitalize rounded-lg px-2 py-0.5 text-xs font-semibold"
																	: "bg-red-600/20 text-red-400 border border-red-600/30 capitalize rounded-lg px-2 py-0.5 text-xs font-semibold"
															}
														>
															{txn.status}
														</Badge>
													</TableCell>
													<TableCell className="text-slate-400 text-xs">{new Date(txn.createdAt).toLocaleDateString()}</TableCell>
												</TableRow>
											);
										})
									)}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</motion.div>
	);
};

export default MerchantDashboard;
