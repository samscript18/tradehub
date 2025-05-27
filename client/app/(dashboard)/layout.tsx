'use client';

import { useAuth } from '@/lib/store/auth.store';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const { fetchUser, setToken } = useAuth();
	useEffect(() => {
		const access_token = Cookies.get('access_token');
		const refresh_token = Cookies.get('refresh_token');
		if (access_token && refresh_token) {
			setToken(access_token, refresh_token);
		}
		fetchUser();
	}, []);

	return <div>{children}</div>;
};
export default DashboardLayout;
