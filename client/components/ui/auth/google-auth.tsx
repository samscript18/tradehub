'use client';

import DotLoader from '@/components/ui/dot-loader';
import { signInWithAccessToken } from '@/lib/services/auth.service';
import { toastSuccess } from '@/lib/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GoogleAuthPage = () => {
	const { push } = useRouter();
	const token = useSearchParams().get('token');
	const email = useSearchParams().get('email');
	const { mutateAsync: _signIn } = useMutation({
		mutationKey: ['auth', 'token-sign-in'],
		mutationFn: signInWithAccessToken,
		onSuccess(data) {
			toastSuccess('Signed in successfully');
			if (data.user.role === 'customer') {
				push('/customer/dashboard');
			} else {
				push('/merchant/dashboard');
			}
		},
	});

	useEffect(() => {
		const storeToken = async () => {
			if (token && email) {
				await _signIn({ token, email });
			} else {
				push('/login');
			}
		};
		storeToken();
	}, [push, token, email, _signIn]);

	return (
		<div className="flex justify-center items-center h-screen">
			<DotLoader />
		</div>
	);
};

export default GoogleAuthPage;
