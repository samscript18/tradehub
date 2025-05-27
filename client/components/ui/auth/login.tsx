'use client';
import Button from '@/components/common/button';
import { Checkbox } from '@/components/common/inputs/checkbox';
import TextField, { PasswordTextField } from '@/components/common/inputs/text-field';
import Logo from '@/components/common/logo';
import WavingHand from '@/components/common/waving-hand';
import AuthLayout from '@/components/layout/auth/auth-layout';
import { googleSignIn, loginUser } from '@/lib/services/auth.service';
import { useAuth } from '@/lib/store/auth.store';
import { LoginType } from '@/lib/types/auth';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const LoginPage = () => {
	const router = useRouter();
	const { setToken } = useAuth();
	const {
		handleSubmit,
		register,
		formState: { errors },
		watch,
		setValue,
	} = useForm<LoginType>();

	const rememberMe = watch('rememberMe');

	const [isPending, setIsPending] = useState<boolean>(false);

	const { mutateAsync: _signIn, isPending: _signingIn } = useMutation({
		mutationKey: ['auth', 'sign-in'],
		mutationFn: loginUser,
		onSuccess(data) {
			toastSuccess('Signed in successfully');
			setToken(data?.meta.accessToken as string, data?.meta.refreshToken as string);
			if (data.user.role === 'customer') {
				router.push('/customer/dashboard');
			} else {
				router.push('/merchant/dashboard');
			}
		},
	});

	const { mutate: _googleSignIn } = useMutation({
		mutationKey: ['auth', 'google-sign-in'],
		mutationFn: () => googleSignIn(),
		onError: () => {
			toastError('Google sign in failed');
		},
	});

	const submit = async (e: LoginType) => {
		await _signIn(e);
	};

	return (
		<AuthLayout>
			<>
				<Logo />
				<h1 className="text-xl md:text-3xl font-bold my-4">
					Welcome to TradeHub <WavingHand />
				</h1>
				<p className="text-sm text-gray-400">
					Connect with trusted local sellers. Support your community while shopping conveniently.
				</p>

				<form className="mt-8 space-y-8" onSubmit={handleSubmit(submit)}>
					<TextField
						label="Email address/Phone Number"
						InputProps={{
							placeholder: 'e.g johndoe@gmail.com',
							...register('credential', {
								required: {
									value: true,
									message: 'This field is required',
								},
							}),
							className: 'text-sm',
						}}
						helperText={errors?.credential?.message}
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
							className: 'text-sm',
						}}
						helperText={errors?.password?.message}
					/>

					<div className="flex justify-between items-center">
						<div className="flex justify-start gap-2 items-center">
							<Checkbox
								checked={rememberMe}
								onCheckedChange={(checked) => {
									setValue('rememberMe', checked as boolean);
								}}
								id="remember-me"
								className="accent-primary cursor-pointer"
							/>
							<label htmlFor="remember-me" className="text-sm">
								Remember me
							</label>
						</div>
						<Link href="/forgot-password" className="max-w-fit ml-auto text-sm text-primary mt-3">
							Forgot Password?
						</Link>
					</div>

					<Button loading={_signingIn} fullWidth variant="filled" size="medium" className="mt-8">
						<>Log In</>
					</Button>
				</form>
				<div className="flex flex-col justify-center items-center">
					<p className="text-sm text-gray-400 mt-3">or</p>
					<div className="w-full flex gap-12 justify-center items-center mt-3">
						<Button
							onClick={async () => {
								setIsPending(true);
								_googleSignIn();
								setIsPending(false);
							}}
							fullWidth
							variant="outline"
							icon={<FaGoogle />}
							iconPosition="left"
							loading={isPending}
							loaderSize
							className="flex justify-center items-center">
							Google
						</Button>
						<Button
							fullWidth
							variant="outline"
							icon={<FaXTwitter />}
							iconPosition="left"
							className="flex justify-center items-center">
							X
						</Button>
					</div>
				</div>
				<p className="max-w-fit mx-auto text-sm mt-6">
					New to TradeHub?{' '}
					<Link href="/sign-up" className="text-primary">
						Create an account
					</Link>
				</p>
			</>
		</AuthLayout>
	);
};

export default LoginPage;
