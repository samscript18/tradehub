'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUnreadNotificationsCount } from '@/lib/services/notification.service';
import { useAuth } from '@/lib/store/auth.store';
import { useQuery } from '@tanstack/react-query';
import { Search, User, Bell } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MerchantDashboardNavbar = () => {
	const router = useRouter();
	const { user } = useAuth();
	const { data: unreadNotificationsCount } = useQuery({
		queryFn: () => getUnreadNotificationsCount(),
		queryKey: ['get-unread-notifications-count'],
		refetchInterval: 3600,
	});

	return (
		<nav className="flex justify-between items-center bg-background/60 py-4 px-4 md:px-6">
			<div className="flex-1 max-w-md md:mx-8">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
					<Input
						placeholder="Search for products"
						className="pl-10 bg-[#181A20] border-gray-600 text-white placeholder-gray-400 focus:outline-none focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0"
					/>
				</div>
			</div>
			<div className="flex items-center space-x-1.5 md:space-x-4 max-md:ml-4">
				<Button
					onClick={() => router.push('/notifications')}
					variant="ghost"
					size="icon"
					className="hover:bg-primary hover:text-white cursor-pointer relative">
					<Bell className="w-5 h-5" />
					{typeof unreadNotificationsCount === 'number' && unreadNotificationsCount > 0 && (
						<span className="absolute top-1 right-1.5 bg-primary text-white text-xs font-bold rounded-full w-3 h-3 flex items-center justify-center border-2 border-background"></span>
					)}
				</Button>
				{user?.profilePicture ? (
					<Image
						src={user?.profilePicture as string}
						onClick={() => router.push('/merchant/profile')}
						alt="profile-img"
						width={35}
						height={35}
						className="w-[35px] h-[35px] object-center object-cover rounded-full cursor-pointer max-md:w-[25px] max-md:h-[25px]"
					/>
				) : (
					<Button
						onClick={() => router.push('/merchant/profile')}
						variant="ghost"
						size="icon"
						className="hover:bg-primary hover:text-white cursor-pointer">
						<User className="w-8 h-8 max-md:w-5 max-md:h-5" />
					</Button>
				)}
			</div>
		</nav>
	);
};
export default MerchantDashboardNavbar;
