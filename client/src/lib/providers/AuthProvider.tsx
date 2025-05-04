'use client';

import LogoLoader from '@/components/Common/Loaders/logo.loader';
import { useSession } from 'next-auth/react';
import React, { FC, ReactNode, useEffect } from 'react';
import useUserStore from '../store/user.store';
import { getUserInfo } from '../services/user.service';
import { usePathname } from 'next/navigation';

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { status, data: session } = useSession();
	const { setUser } = useUserStore();
	const pathname = usePathname();
	const publicRoutes = ['/'];
	const isPublic = publicRoutes.includes(pathname);

	useEffect(() => {
		if (!isPublic && session?.user) {
			console.log('get user');
			// getUserInfo().then((user) => {
			// 	if (user) setUser(user);
			// });
		}
	}, [session, setUser, isPublic]);

	if (!isPublic && status === 'loading') return <LogoLoader />;

	return <div>{children}</div>;
};

export default AuthProvider;
