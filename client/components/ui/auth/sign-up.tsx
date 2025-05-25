'use client';
import Button from '@/components/common/button';
import TextField, { PasswordTextField } from '@/components/common/inputs/text-field';
import { Option } from '@/components/common/select-fields/multi-select-field';
import MultiSelectField from '@/components/common/select-fields/multi-select-field';
import WavingHand from '@/components/common/waving-hand';
import AuthLayout from '@/components/layout/auth/auth-layout';
import { storeCategories } from '@/lib/data';
import { RoleNames } from '@/lib/enums';
import { signUpUser } from '@/lib/services/auth.service';
import { SignUp } from '@/lib/types/auth';
import { REGEX } from '@/lib/utils/regex';
import { toastError } from '@/lib/utils/toast';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FieldErrorsImpl, useForm } from 'react-hook-form';
import { FaStore } from 'react-icons/fa';
import { MdShoppingBag } from 'react-icons/md';
import { toast } from 'sonner';

const SignUpPage = () => {
	const router = useRouter();
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [confirmPassword, setConfirmPassword] = useState<string>();
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const {
		handleSubmit,
		register,
		formState: { errors },
		watch,
		reset,
		setValue,
	} = useForm<SignUp>({
		defaultValues: { role: RoleNames.Buyer },
	});
	const password = watch('password');
	const role = watch('role');

	const { mutateAsync: _signUp, isPending: _loading } = useMutation({
		mutationKey: ['auth', 'sign-up'],
		mutationFn: signUpUser,
		onSuccess() {
			toast.success('Signed up successfully');
			router.push('/search');
		},
	});

	const submit = async (e: SignUp) => {
		if (e.password !== confirmPassword) {
			toastError('Passwords do not match');
			return;
		}

		if (role === RoleNames.Merchant && selectedCategories.length === 0) {
			toastError('Please select at least one store category');
			return;
		}

		const rest = {
			email: e.email,
			password: e.password,
			phoneNumber: e.phoneNumber,
			...(role === RoleNames.Buyer
				? {
						firstName: e.firstName,
						lastName: e.lastName,
						role: RoleNames.Buyer as RoleNames.Buyer,
				  }
				: {
						storeName: e.storeName,
						storeDescription: e.storeDescription,
						storeAddress: e.storeAddress,
						storeCategory: selectedCategories,
						role: RoleNames.Merchant as RoleNames.Merchant,
				  }),
		};
		console.log(rest);
		// await _signUp(rest);
	};

	useEffect(() => {
		const currentRole = currentIndex === 0 ? RoleNames.Buyer : RoleNames.Merchant;
		setValue('role', currentRole);
		if (role && role !== currentRole) {
			reset(
				currentRole === RoleNames.Buyer
					? { role: currentRole, firstName: '', lastName: '', email: '', phoneNumber: '', password: '' }
					: {
							role: currentRole,
							storeName: '',
							storeDescription: '',
							storeAddress: '',
							email: '',
							phoneNumber: '',
							password: '',
							storeCategory: [],
					  }
			);
			setConfirmPassword('');
			setSelectedCategories([]);
		}
	}, [currentIndex, setValue, reset, role]);

	return (
		<AuthLayout>
			<>
				<h1 className="text-xl md:text-3xl font-bold">
					Welcome to TradeHub <WavingHand />
				</h1>
				<p className="text-sm text-gray-400 mt-4">
					Create your TradeHub account to enjoy full, personalized access to features, content, and tools
					tailored just for you.
				</p>

				<div className="flex justify-between items-center bg-[#111827] p-1 rounded-full mt-6 transition-all duration-1000">
					{['Shop as Buyer', 'Sell as Merchant'].map((item, index) => {
						return (
							<div
								onClick={() => setCurrentIndex(index)}
								key={item}
								className={`w-full flex justify-center gap-2 items-center p-2.5 text-sm font-medium cursor-pointer ${
									currentIndex === index && 'bg-primary rounded-full'
								}`}>
								{index === 0 ? <MdShoppingBag size={21} /> : <FaStore size={21} />}
								{item}
							</div>
						);
					})}
				</div>

				<form onSubmit={handleSubmit(submit)} className="mt-4 md:mt-8 space-y-8 grid grid-cols-1  gap-6">
					{role === RoleNames.Buyer ? (
						<>
							<TextField
								label="First Name"
								className="col-span-2"
								InputProps={{
									placeholder: 'e.g John',
									...register('firstName', {
										required: {
											value: true,
											message: 'This field is required',
										},
									}),
									className: 'text-sm',
								}}
								helperText={errors?.firstName?.message}
							/>

							<TextField
								label="Last Name"
								className="col-span-2"
								InputProps={{
									placeholder: 'e.g Doe',
									...register('lastName', {
										required: {
											value: true,
											message: 'This field is required',
										},
									}),
									className: 'text-sm',
								}}
								helperText={errors?.lastName?.message}
							/>

							<TextField
								label="Email Address"
								className="col-span-2"
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
									className: 'text-sm',
								}}
								helperText={errors?.email?.message}
							/>

							<TextField
								label="Phone number"
								className="col-span-2"
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
									className: 'text-sm',
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

							<PasswordTextField
								className="col-span-2"
								label="Confirm Password"
								InputProps={{
									onChange(e) {
										setConfirmPassword(e.target.value);
									},
								}}
								helperText={password && password !== confirmPassword ? 'Passwords do not match' : undefined}
							/>
						</>
					) : (
						<>
							<TextField
								label="Store Name"
								className="col-span-2"
								InputProps={{
									placeholder: 'e.g T&D Store',
									...register('storeName', {
										required: {
											value: true,
											message: 'This field is required',
										},
									}),
									className: 'text-sm',
								}}
								helperText={errors?.storeName?.message}
							/>

							<TextField
								label="Store Description"
								className="col-span-2"
								InputProps={{
									placeholder: 'e.g your store description',
									...register('storeDescription', {
										required: {
											value: true,
											message: 'This field is required',
										},
									}),
									className: 'text-sm',
								}}
								helperText={errors?.storeDescription?.message}
							/>

							<TextField
								label="Store Address"
								className="col-span-2"
								InputProps={{
									placeholder: 'e.g your store address',
									...register('storeAddress', {
										required: {
											value: true,
											message: 'This field is required',
										},
									}),
									className: 'text-sm',
								}}
								helperText={errors?.storeAddress?.message}
							/>

							<div className="space-y-4 col-span-2">
								<MultiSelectField
									label="Store Categories"
									placeholder="e.g, arts and crafts"
									data={storeCategories}
									value={selectedCategories}
									onSelect={(categories: Option[]) => {
										setSelectedCategories(categories.map((category) => category.value as string));
									}}
									maxSelections={5}
									onSearch={(search: string) => {
										return storeCategories.filter((category) =>
											category.label.toLowerCase().includes(search.toLowerCase())
										);
									}}
								/>
							</div>

							<TextField
								label="Email Address"
								className="col-span-2"
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
									className: 'text-sm',
								}}
								helperText={errors?.email?.message}
							/>

							<TextField
								label="Phone number"
								className="col-span-2"
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
									className: 'text-sm',
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

							<PasswordTextField
								className="col-span-2"
								label="Confirm Password"
								InputProps={{
									onChange(e) {
										setConfirmPassword(e.target.value);
									},
								}}
								helperText={password && password !== confirmPassword ? 'Passwords do not match' : undefined}
							/>
						</>
					)}

					<Button fullWidth variant="filled" size="medium" className="col-span-2" loading={_loading}>
						Sign Up
					</Button>
				</form>

				<p className="max-w-fit mx-auto text-[.9rem] mt-3">
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
