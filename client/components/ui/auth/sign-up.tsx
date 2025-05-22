'use client';
import Button from '@/components/common/button';
import TextField, { PasswordTextField } from '@/components/common/inputs/text-field';
import WavingHand from '@/components/common/waving-hand';
import AuthLayout from '@/components/layout/auth/auth-layout';
import { signUpUser } from '@/lib/services/auth.service';
import { SignUp } from '@/lib/types/auth';
import { REGEX } from '@/lib/utils/regex';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignUpPage = () => {
	const router = useRouter();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SignUp>({});

	const { mutateAsync: _signUp, isPending: _loading } = useMutation({
		mutationKey: ['auth', 'sign-up'],
		mutationFn: signUpUser,
		onSuccess() {
			toast.success('Signed up successfully');
			router.push('/search');
		},
	});

	const submit = (e: SignUp) => {
		_signUp(e);
	};

	return (
		<AuthLayout>
			<>
				<h1 className="text-xl md:text-[2.5rem] font-bold">
					Hi, FUNAABite <WavingHand />
				</h1>
				<p className="text-sm text-gray-400">
					Create your digifest account to get full and personalized access <br /> to notes and past questions.
				</p>

				<form
					onSubmit={handleSubmit(submit)}
					className="mt-8 md:mt-16 space-y-8 md:grid grid-cols-1 md:grid-cols-2 gap-6">
					<TextField
						label="First Name"
						InputProps={{
							placeholder: 'e.g John',
							...register('firstName', {
								required: {
									value: true,
									message: 'This field is required',
								},
							}),
						}}
						helperText={errors?.firstName?.message}
					/>

					<TextField
						label="Last Name"
						InputProps={{
							placeholder: 'e.g Doe',
							...register('lastName', {
								required: {
									value: true,
									message: 'This field is required',
								},
							}),
						}}
						helperText={errors?.lastName?.message}
					/>

					<TextField
						label="Email Address"
						InputProps={{
							placeholder: 'e.g johndoe@gmail.com',
							type: 'email',
							...register('email', {
								required: {
									value: true,
									message: 'This field is required',
								},
								pattern: {
									value: REGEX.EMAIL,
									message: 'Enter a valid email address',
								},
							}),
						}}
						helperText={errors?.email?.message}
					/>

					<TextField
						label="Phone number"
						InputProps={{
							placeholder: 'e.g 08012642233',
							type: 'tel',
							...register('phoneNumber', {
								required: {
									value: true,
									message: 'This field is required',
								},
								pattern: {
									value: REGEX.PHONE_NUMBER,
									message: 'Enter a valid phone number',
								},
							}),
						}}
						helperText={errors?.phoneNumber?.message}
					/>

					<PasswordTextField
						className="col-span-2"
						label="Password"
						InputProps={{
							...register('password', {
								required: {
									value: true,
									message: 'This field is required',
								},
								minLength: {
									value: 8,
									message: 'Password must not be less than 8 characters',
								},
								pattern: {
									value: REGEX.PASSWORD,
									message: 'Enter a valid password',
								},
							}),
						}}
						helperText={errors?.password?.message}
					/>

					<Button fullWidth variant="filled" size="medium" className="col-span-2" loading={_loading}>
						Sign Up
					</Button>
				</form>

				<p className="max-w-fit text-[.9rem] mt-3">
					Alright have an account?{' '}
					<Link href="/login" className="text-primary">
						Log in
					</Link>
				</p>
			</>
		</AuthLayout>
	);
};

export default SignUpPage;
