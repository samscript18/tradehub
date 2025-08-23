'use client';
import SessionCheckLoader from '@/components/common/loaders/session-check';
import { signInWithAccessToken } from '@/lib/services/auth.service';
import { useAuth } from '@/lib/store/auth.store';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const AuthCallbackPage = () => {
	const params = useSearchParams();
	const accessToken = params.get('accessToken');
	const email = params.get('email');
	const { setToken } = useAuth();
	const router = useRouter();

	const mutation = useMutation({
		mutationKey: ['auth', 'sign-in-with-token'],
		mutationFn: signInWithAccessToken,
		onSuccess(data) {
			toast.success(`${data.message}`);
			setToken(data?.data?.meta.accessToken as string, data?.data?.meta.refreshToken as string);
			router.push(`${data.data.user.role === 'customer' ? '/customer/home' : '/merchant/dashboard'}`);
		},
		onError() {
			toast.error('Authentication failed. Please try signing in again.');
			router.push('/login');
		},
	});

	useEffect(() => {
		if (accessToken && email) {
			mutation.mutate({ email, token: accessToken });
		}
	}, []);

	return (
		<main className="flex items-center justify-center min-h-screen">
			<SessionCheckLoader />
		</main>
	);
};

export default AuthCallbackPage;
