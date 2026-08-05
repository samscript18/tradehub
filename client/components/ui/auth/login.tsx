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
import { motion } from 'framer-motion';

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
				router.push('/customer/home');
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
			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md mx-auto p-6 md:p-8 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-3xl shadow-2xl relative overflow-hidden"
			>
				{/* Top subtle glow */}
				<div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

				<div className="flex flex-col items-center text-center">
					<Logo />
					<h2 className="text-xl md:text-2xl font-bold text-white mt-6 mb-2 flex items-center gap-2">
						Welcome to TradeHub <WavingHand />
					</h2>
					<p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-xs">
						Connect with trusted local sellers. Support your community while shopping conveniently.
					</p>
				</div>

				<form className="mt-8 space-y-5" onSubmit={handleSubmit(submit)}>
					<div className="space-y-4">
						<TextField
							label="Email Address / Phone Number"
							InputProps={{
								placeholder: 'e.g. johndoe@gmail.com',
								...register('credential', {
									required: {
										value: true,
										message: 'This field is required',
									},
								}),
								className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
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
								className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
							}}
							helperText={errors?.password?.message}
						/>
					</div>

					<div className="flex justify-between items-center text-xs md:text-sm">
						<div className="flex justify-start gap-2 items-center cursor-pointer">
							<Checkbox
								checked={rememberMe}
								onCheckedChange={(checked) => {
									setValue('rememberMe', checked as boolean);
								}}
								id="remember-me"
								className="accent-primary cursor-pointer border-slate-600 rounded"
							/>
							<label htmlFor="remember-me" className="text-slate-300 cursor-pointer select-none">
								Remember me
							</label>
						</div>
						<Link href="/forgot-password" className="text-primary hover:underline transition-colors font-medium">
							Forgot Password?
						</Link>
					</div>

					<Button
						loading={_signingIn}
						fullWidth
						variant="filled"
						size="medium"
						className="mt-6 bg-primary hover:bg-primary/95 text-white py-3 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-300"
					>
						Log In
					</Button>
				</form>

				<div className="relative flex py-4 items-center">
					<div className="flex-grow border-t border-slate-800"></div>
					<span className="flex-shrink mx-4 text-slate-500 text-xs uppercase tracking-wider font-semibold">or</span>
					<div className="flex-grow border-t border-slate-800"></div>
				</div>

				<Button
					onClick={async () => {
						setIsPending(true);
						_googleSignIn();
						setIsPending(false);
					}}
					fullWidth
					variant="outline"
					icon={<FaGoogle className="w-4 h-4 mr-2" />}
					iconPosition="left"
					loading={isPending}
					loaderSize
					className="flex justify-center items-center py-2.5 rounded-xl border-slate-700/80 hover:border-slate-600 text-slate-300 hover:text-white hover:bg-slate-900/40 transition-all duration-300"
				>
					Continue with Google
				</Button>

				<p className="text-center text-xs md:text-sm text-slate-400 mt-6">
					New to TradeHub?{' '}
					<Link href="/sign-up" className="text-primary font-medium hover:underline transition-colors">
						Create an account
					</Link>
				</p>
			</motion.div>
		</AuthLayout>
	);
};

export default LoginPage;
