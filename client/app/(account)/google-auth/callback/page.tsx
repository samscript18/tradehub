'use client';

import DotLoader from '@/components/ui/dot-loader';
import { signInWithAccessToken } from '@/lib/services/auth.service';
import { toastSuccess } from '@/lib/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
	const { push } = useRouter();
	const access_token = useSearchParams().get('access_token');
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
			if (access_token) {
				await _signIn({ access_token });
			} else {
				push('/login');
			}
		};
		storeToken();
	}, [push, access_token, _signIn]);

	return (
		<div className="flex justify-center items-center h-screen">
			<DotLoader />
		</div>
	);
}
