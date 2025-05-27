'use client';

import { useAuth } from '@/lib/store/auth.store';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SessionCheckLoader from '@/components/common/loaders/session-check';

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const [isPending, setIsPending] = useState<boolean>(true);
	const { fetchUser, setToken } = useAuth();
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

	return <>{isPending ? <SessionCheckLoader /> : <div>{children}</div>}</>;
};
export default DashboardLayout;
