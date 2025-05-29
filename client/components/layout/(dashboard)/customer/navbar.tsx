'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, User, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CustomerDashboardNavbar = () => {
	const router = useRouter();
	return (
		<nav className="flex justify-between items-center bg-background/60 py-4 px-4 md:px-6 lg:px-12">
			<div className="flex-1 max-w-md md:mx-8">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
					<Input
						placeholder="Search for products, services, or merchants"
						className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0"
					/>
				</div>
			</div>
			<div className="flex items-center space-x-1.5 md:space-x-4 max-md:ml-4">
				<Button
					onClick={() => router.push('/notifications')}
					variant="ghost"
					size="icon"
					className="hover:bg-primary hover:text-white cursor-pointer">
					<Bell className="w-5 h-5" />
				</Button>
				<Button
					onClick={() => router.push('/customer/cart')}
					variant="ghost"
					size="icon"
					className="hover:bg-primary hover:text-white cursor-pointer">
					<ShoppingCart className="w-5 h-5" />
				</Button>
				<Button
					onClick={() => router.push('/customer/profile')}
					variant="ghost"
					size="icon"
					className="hover:bg-primary hover:text-white cursor-pointer">
					<User className="w-5 h-5" />
				</Button>
			</div>
		</nav>
	);
};
export default CustomerDashboardNavbar;
