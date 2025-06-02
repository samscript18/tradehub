'use client';

import { useAuth } from '@/lib/store/auth.store';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SessionCheckLoader from '@/components/common/loaders/session-check';
import CustomerDashboardSidebar from '@/components/layout/(dashboard)/customer/sidebar';
import CustomerDashboardNavbar from '@/components/layout/(dashboard)/customer/navbar';
import MerchantDashboardSidebar from '@/components/layout/(dashboard)/merchant/sidebar';
import MerchantDashboardNavbar from '@/components/layout/(dashboard)/merchant/navbar';
import { usePathname, useRouter } from 'next/navigation';
import CustomerDashboardFooter from '@/components/layout/(dashboard)/customer/footer';
import MerchantDashboardFooter from '@/components/layout/(dashboard)/merchant/footer';

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const router = useRouter();
	const pathname = usePathname();
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

	return (
		<>
			{user?.role === 'customer' ? (
				<main className="flex min-h-screen">
					<CustomerDashboardSidebar />
					<div className="w-full flex-1 bg-[#B0B0B0]/10 h-screen flex flex-col">
						<CustomerDashboardNavbar />
						<div className="overflow-y-scroll">
							<div className="flex-1 pb-4">{children}</div>
							<CustomerDashboardFooter />
						</div>
					</div>
				</main>
			) : (
				<main className="flex min-h-screen">
					<MerchantDashboardSidebar />
					<div className="w-full flex-1 bg-[#B0B0B0]/10 h-screen flex flex-col">
						<MerchantDashboardNavbar />
						<div className="overflow-y-scroll">
							<div className="flex-1 pb-4">{children}</div>
							<MerchantDashboardFooter />
						</div>
					</div>
				</main>
			)}
		</>
	);
};
export default DashboardLayout;
