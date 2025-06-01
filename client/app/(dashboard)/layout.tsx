'use client';

import { useAuth } from '@/lib/store/auth.store';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SessionCheckLoader from '@/components/common/loaders/session-check';
import CustomerDashboardSidebar from '@/components/layout/(dashboard)/customer/sidebar';
import CustomerDashboardNavbar from '@/components/layout/(dashboard)/customer/navbar';
import MerchantDashboardSidebar from '@/components/layout/(dashboard)/merchant/sidebar';
import MerchantDashboardNavbar from '@/components/layout/(dashboard)/merchant/navbar';
<<<<<<< HEAD
=======
import { usePathname, useRouter } from 'next/navigation';
>>>>>>> 6840c873ce12dd83a302b496f47444b42fad929c

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
<<<<<<< HEAD
=======
	const router = useRouter();
	const pathname = usePathname();
>>>>>>> 6840c873ce12dd83a302b496f47444b42fad929c
	const [isPending, setIsPending] = useState<boolean>(true);
	const { user, fetchUser, setToken } = useAuth();
	useEffect(() => {
		setIsPending(true);
		const access_token = Cookies.get('access_token');
		const refresh_token = Cookies.get('refresh_token');
		if (access_token && refresh_token) {
			setToken(access_token, refresh_token);
		}
		fetchUser();
		setIsPending(false);
	}, []);

<<<<<<< HEAD
	if (isPending) return <SessionCheckLoader />;

=======
	useEffect(() => {
		if (!isPending && user && user.role) {
			if (user.role === 'customer' && pathname.startsWith('/merchant')) {
				router.push('/customer/home');
			} else if (user.role === 'merchant' && pathname.startsWith('/customer')) {
				router.push('/merchant/dashboard');
			}
		}
	}, [isPending, user, pathname]);

	if (isPending) return <SessionCheckLoader />;

	if (!user || !user.role) {
		router.push('/login');
		return null;
	}

>>>>>>> 6840c873ce12dd83a302b496f47444b42fad929c
	return (
		<>
			{user?.role === 'customer' ? (
				<main className="flex min-h-screen">
					<CustomerDashboardSidebar />
					<div className="w-full flex-1 bg-[#B0B0B0]/10 max-h-screen h-screen flex flex-col">
						<CustomerDashboardNavbar />
						<div className="flex-1 overflow-y-scroll px-4 md:px-6 pb-6">{children}</div>
					</div>
				</main>
			) : (
				<main className="flex min-h-screen">
					<MerchantDashboardSidebar />
					<div className="w-full flex-1 bg-[#B0B0B0]/10 max-h-screen h-screen flex flex-col">
						<MerchantDashboardNavbar />
						<div className="flex-1 overflow-y-scroll px-4 md:px-6 pb-6">{children}</div>
					</div>
				</main>
			)}
		</>
	);
};
export default DashboardLayout;
