'use client';
import Button from '@/components/common/button';
import BackButton from '@/components/common/button/back-button';
import { PasswordTextField } from '@/components/common/inputs/text-field';
import Logo from '@/components/common/logo';
import { useSearchParams } from '@/lib/hooks/useSearchParams';
import { resetPassword } from '@/lib/services/auth.service';
import { ResetPassword } from '@/lib/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ResetPasswordPage = () => {
	const router = useRouter();
	const { searchParams } = useSearchParams();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ResetPassword>({
		defaultValues: {
			token: searchParams.get('token')!,
			email: searchParams.get('email')!,
		},
	});
	const { mutateAsync: _resetPassword, isPending: _loading } = useMutation({
		mutationKey: ['auth', 'reset-password'],
		mutationFn: resetPassword,
		onSuccess() {
			toast.success('Password reset successfully');
			router.push('/login');
		},
	});

	const submit = async (e: ResetPassword) => _resetPassword(e);

	return (
		<main className="flex items-center justify-center min-h-screen">
			<section className="md:rounded-md p-8 border bg-gray-50 w-screen max-w-[600px] mx-auto max-md:min-h-screen">
				<header>
					<div className="max-w-fit md:mb-4 mb-10 flex items-center gap-2">
						<BackButton />
						<Logo />
					</div>

					<h1 className="md:text-2xl text-xl font-bold">Reset Password</h1>
					<p className="text-[.9rem] text-gray-600 mt-1">Enter your new password</p>
				</header>
				<form onSubmit={handleSubmit(submit)} className="space-y-8 mt-8">
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

					<PasswordTextField
						label="Confirm Password"
						InputProps={{
							...register('confirmPassword', {
								required: {
									value: true,
									message: 'This field is required',
								},
								validate(value: string, other_values) {
									if (value.length != 0 && other_values?.password?.length != 0 && value != other_values.password) {
										return 'Passwords do not match';
									}

									return true;
								},
							}),
						}}
						helperText={errors?.confirmPassword?.message}
					/>

					<Button variant="filled" size="medium" fullWidth loading={_loading}>
						Reset Password
					</Button>
				</form>
			</section>
		</main>
	);
};

export default ResetPasswordPage;
