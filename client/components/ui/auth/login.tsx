'use client';
import Button from '@/components/common/button';
import TextField, { PasswordTextField } from '@/components/common/inputs/text-field';
import WavingHand from '@/components/common/waving-hand';
import AuthLayout from '@/components/layout/auth/auth-layout';
import { loginUser } from '@/lib/services/auth.service';
import { useAuth } from '@/lib/store/auth.store';
import { LoginType } from '@/lib/types/auth';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LoginPage = () => {
	const router = useRouter();
	const { fetchUser, setToken } = useAuth();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginType>();

	const { mutateAsync: _signIn, isPending: _signingIn } = useMutation({
		mutationKey: ['auth', 'sign-in'],
		mutationFn: loginUser,
		onSuccess() {
			toast.success('Signed in successfully');
			router.push('/search');
		},
	});

	const submit = async (e: LoginType) => {
		const data = await _signIn(e);
		setToken(data?.access_token as string);
		fetchUser();
	};

	return (
		<AuthLayout>
			<>
				<h1 className="text-xl md:text-[2.5rem] font-bold">
					Hi, FUNAABite <WavingHand />
				</h1>
				<p className="text-sm text-gray-400">
					Login to get full and personalized access to documents on digifest.
				</p>

				<form className="mt-16 space-y-8" onSubmit={handleSubmit(submit)}>
					<TextField
						label="Email address/Phone Number"
						InputProps={{
							placeholder: 'e.g johndoe@gmail.com',
							...register('email', {
								required: {
									value: true,
									message: 'This field is required',
								},
							}),
						}}
						helperText={errors?.email?.message}
					/>

					<PasswordTextField
						label="Password"
						InputProps={{
							...register('password', {
								required: {
									value: true,
									message: 'This field is required',
								},
							}),
						}}
						helperText={errors?.password?.message}
					/>

					<Button loading={_signingIn} fullWidth variant="filled" size="medium" className="mt-8">
						<>Submit</>
					</Button>
				</form>

				<div className="flex items-center space-between gap-8">
					<p className="max-w-fit text-[.9rem] mt-3">
						Do not have an account?{' '}
						<Link href="/sign-up" className="text-primary">
							Sign up
						</Link>
					</p>

					<Link href="/forgot-password" className="max-w-fit ml-auto text-[.9rem] text-primary mt-3">
						Forgot Password?
					</Link>
				</div>
			</>
		</AuthLayout>
	);
};

export default LoginPage;
