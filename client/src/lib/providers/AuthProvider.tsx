'use client';

import LogoLoader from '@/components/Common/Loaders/logo.loader';
import { useSession } from 'next-auth/react';
import React, { FC, ReactNode, useEffect } from 'react';
import useUserStore from '../store/user.store';
import { getUserInfo } from '../services/user.service';

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { status, data: session } = useSession();
	const { setUser } = useUserStore();

	useEffect(() => {
		if (status === 'authenticated' && session?.user) {
			getUserInfo().then((user) => {
				if (user) setUser(user);
			});
		}
	}, [status, session, setUser]);

	if (status === 'loading') return <LogoLoader />;

	return <div>{children}</div>;
};

export default AuthProvider;
