"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CheckCircle, Package } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markAllAsRead, markAsRead } from "@/lib/services/notification.service";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/lib/store/auth.store";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const router = useRouter();
	const { data: notifications, isLoading } = useQuery({
		queryFn: () => getNotifications(),
		queryKey: ["get-notifications"],
	});

	const { mutateAsync: _markAsRead } = useMutation({
		mutationKey: ["mark-as-read"],
		mutationFn: markAsRead,
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
		},
	});

	const { mutateAsync: _markAllAsRead, isPending: _isMarkingAllAsRead } = useMutation({
		mutationKey: ["mark-all-as-read"],
		mutationFn: markAllAsRead,
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
		},
	});

	const getNotificationRoute = (notification: {
		type: string;
		relatedOrderId?: string;
		relatedOrderGroupId?: string;
	}) => {
		if (!user?.role) return undefined;

		if (user.role === "merchant") {
			if (notification.relatedOrderId) {
				return `/merchant/orders/${notification.relatedOrderId}`;
			}

			if (notification.relatedOrderGroupId) {
				return "/merchant/orders";
			}

			if (notification.type.startsWith("order_") || notification.type.startsWith("payment_")) {
				return "/merchant/orders";
			}

			return undefined;
		}

		if (user.role === "customer") {
			if (notification.relatedOrderGroupId) {
				return `/customer/orders/${notification.relatedOrderGroupId}`;
			}

			if (notification.relatedOrderId) {
				return "/customer/orders";
			}

			if (notification.type.startsWith("order_") || notification.type.startsWith("payment_")) {
				return "/customer/orders";
			}
		}

		return undefined;
	};

	const handleNotificationClick = async (notification: {
		_id: string;
		type: string;
		relatedOrderId?: string;
		relatedOrderGroupId?: string;
	}) => {
		await _markAsRead(notification._id);

		const route = getNotificationRoute(notification);
		if (route) {
			router.push(route);
		}
	};

	return (
		<div className="space-y-6 p-4 md:p-6">
			<div className="dashboard-panel rounded-2xl p-5 md:p-7 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-white">Notifications</h1>
					<p className="text-sm text-slate-300 mt-2">Stay updated with order, payment, and delivery activity.</p>
				</div>
				<div className="flex items-center gap-4">
					<Button
						variant="link"
						onClick={() => {
							if (user?._id) {
								_markAllAsRead(user?._id);
							}
						}}
						className="text-blue-400 hover:text-blue-300 p-0"
					>
						{_isMarkingAllAsRead ? <div className="animate-bounce">...</div> : "Mark all as read"}
					</Button>
				</div>
			</div>

			{isLoading ? (
				<div className="dashboard-panel rounded-2xl p-8 flex justify-center items-center text-center mt-2">
					<p className="text-white text-sm">Loading notifications...</p>
				</div>
			) : notifications && notifications.length > 0 ? (
				<Tabs defaultValue="notifications" className="w-full">
					<TabsContent value="notifications" className="mt-6">
						<div className="space-y-4">
							{notifications?.map((notification) => (
								<div
									key={notification._id}
									onClick={() => handleNotificationClick(notification)}
									className="dashboard-panel dashboard-glow-hover rounded-2xl p-3 md:p-4 cursor-pointer border border-slate-700/70"
								>
									<div className="flex items-center gap-4">
										{notification.type === "order_placed" || notification.type === "payment_successful" ? (
											<CheckCircle className="h-5 w-5 text-primary" />
										) : (
											<Package className="h-5 w-5 text-green-500" />
										)}
										<div className="flex-1">
											<div className="flex items-center md:gap-2">
												<p className="text-white font-medium text-[13px]">{notification.message}</p>
												{!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full"></div>}
											</div>
											<p className="text-[13px] text-slate-400 mt-1">{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</p>
										</div>
									</div>
									{/* <Button onClick={() => router.push(``)} size="sm" className="text-[13px] bg-primary hover:bg-primary max-md:ml-auto">
										View
									</Button> */}
								</div>
							))}
						</div>
					</TabsContent>
				</Tabs>
			) : (
				<div className="dashboard-panel rounded-2xl p-8 flex justify-center items-center text-center">
					<p className="text-white text-sm">You do not have any notifications at the moment.</p>
				</div>
			)}
		</div>
	);
}
