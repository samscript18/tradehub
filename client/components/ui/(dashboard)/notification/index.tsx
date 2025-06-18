'use client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { CheckCircle, Package } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getNotifications, markAllAsRead, markAsRead } from '@/lib/services/notification.service';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/lib/store/auth.store';

export default function NotificationsPage() {
	const { user } = useAuth();
	const { data: notifications, isLoading } = useQuery({
		queryFn: () => getNotifications(),
		queryKey: ['get-notifications'],
	});

	const { mutateAsync: _markAsRead, isPending: _isMarkingAsRead } = useMutation({
		mutationKey: ['mark-as-read'],
		mutationFn: markAsRead,
	});

	const { mutateAsync: _markAllAsRead, isPending: _isMarkingAllAsRead } = useMutation({
		mutationKey: ['mark-all-as-read'],
		mutationFn: markAllAsRead,
	});

	return (
		<div className="space-y-4 p-4">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-white">Notifications</h1>
				<div className="flex items-center gap-4">
					<Button
						variant="link"
						onClick={() => {
							if (user?._id) {
								_markAllAsRead(user?._id);
							}
						}}
						className="text-blue-400 hover:text-blue-300 p-0">
						{_isMarkingAllAsRead ? <div className="animate-bounce">...</div> : 'Mark all as read'}
					</Button>
					{/* <Select defaultValue="all">
						<SelectTrigger className="w-48 bg-gray-800 border-gray-700">
							<SelectValue />
						</SelectTrigger>
						<SelectContent className="bg-gray-800 border-gray-700">
							<SelectItem value="all">All Notifications</SelectItem>
							<SelectItem value="unread">Unread Only</SelectItem>
							<SelectItem value="read">Read Only</SelectItem>
						</SelectContent>
					</Select> */}
				</div>
			</div>

			<p className="text-gray-400 text-sm max-md:hidden">Stay updated with your latest activities</p>

			{isLoading ? (
				<div className="flex justify-center items-center text-center mt-6">
					<p className="text-white text-sm">Loading Notifications...</p>
				</div>
			) : notifications && notifications.length > 0 ? (
				<Tabs defaultValue="notifications" className="w-full">
					<TabsContent value="notifications" className="mt-6">
						<div className="space-y-4">
							{notifications?.map((notification) => (
								<div
									key={notification._id}
									onClick={() => _markAsRead(notification._id)}
									className="bg-gray-800 rounded-lg p-2 md:p-4 cursor-pointer border border-gray-700 flex max-md:flex-col items-center justify-between">
									<div className="flex items-center gap-4">
										{notification.type === 'order_placed' || notification.type === 'payment_successful' ? (
											<CheckCircle className="h-5 w-5 text-blue-500" />
										) : (
											<Package className="h-5 w-5 text-green-500" />
										)}
										<div className="flex-1">
											<div className="flex items-center md:gap-2">
												<p className="text-white font-medium text-[13px]">{notification.message}</p>
												{(!notification.isRead || _isMarkingAsRead) && (
													<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
												)}
											</div>
											<p className="text-[13px] text-gray-400 mt-1">
												{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
											</p>
										</div>
									</div>
									<Button size="sm" className="text-[13px] bg-primary hover:bg-primary max-md:ml-auto">
										View
									</Button>
								</div>
							))}
						</div>
					</TabsContent>
				</Tabs>
			) : (
				<div className="flex justify-center items-center text-center">
					<p className="text-white text-sm">You do not have any notifications at the moment.</p>
				</div>
			)}
		</div>
	);
}
