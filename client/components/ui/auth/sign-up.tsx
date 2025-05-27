'use client';
import Button from '@/components/common/button';
import TextField, { PasswordTextField } from '@/components/common/inputs/text-field';
import Logo from '@/components/common/logo';
import { Option } from '@/components/common/select-fields/multi-select-field';
import MultiSelectField from '@/components/common/select-fields/multi-select-field';
import SelectCountry from '@/components/common/select-fields/select-country';
import WavingHand from '@/components/common/waving-hand';
import AuthLayout from '@/components/layout/auth/auth-layout';
import { storeCategories } from '@/lib/data';
import { RoleNames } from '@/lib/enums';
import { googleSignIn, signUpCustomer, signUpMerchant } from '@/lib/services/auth.service';
import { SignUp } from '@/lib/types/auth';
import { REGEX } from '@/lib/utils/regex';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaStore } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdShoppingBag } from 'react-icons/md';

const SignUpPage = () => {
	const router = useRouter();
	const defaultRole = useSearchParams().get('role') as RoleNames.Customer | RoleNames.Merchant;
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [confirmPassword, setConfirmPassword] = useState<string>();
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [isPending, setIsPending] = useState<boolean>(false);

	const {
		handleSubmit,
		register,
		formState: { errors },
		watch,
		reset,
		setValue,
	} = useForm<SignUp>({
		defaultValues: { role: defaultRole ? defaultRole : RoleNames.Customer },
	});
	const password = watch('password');
	const role = watch('role');

	const { mutateAsync: _signUpCustomer, isPending: _customerSignUpPending } = useMutation({
		mutationKey: ['auth', 'sign-up', 'customer'],
		mutationFn: signUpCustomer,
		onSuccess() {
			toastSuccess('Signed up successfully');
			router.push('/customer/dashboard');
		},
	});

	const { mutateAsync: _signUpMerchant, isPending: _merchantSignUpPending } = useMutation({
		mutationKey: ['auth', 'sign-up', 'merchant'],
		mutationFn: signUpMerchant,
		onSuccess() {
			toastSuccess('Signed up successfully');
			router.push('/merchant/dashboard');
		},
	});

	const { mutate: _googleSignIn } = useMutation({
		mutationKey: ['auth', 'google-sign-in'],
		mutationFn: (role: 'customer' | 'merchant') => googleSignIn(role),
		onError: () => {
			toastError('Google sign in failed');
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
			...(role === RoleNames.Customer
				? {
						firstName: e.firstName,
						lastName: e.lastName,
						defaultAddress: e.address,
						addresses: [e.address],
						role: RoleNames.Customer as RoleNames.Customer,
				  }
				: {
						storeName: e.storeName,
						storeDescription: e.storeDescription,
						defaultAddress: e.address,
						addresses: [e.address],
						storeCategory: selectedCategories,
						role: RoleNames.Merchant as RoleNames.Merchant,
				  }),
		};
		console.log(rest);
		return;
		role === RoleNames.Customer ? await _signUpCustomer(rest) : await _signUpMerchant(rest);
	};

	useEffect(() => {
		const currentRole = currentIndex === 0 ? RoleNames.Customer : RoleNames.Merchant;
		setValue('role', currentRole);
		if (role && role !== currentRole) {
			reset(
				currentRole === RoleNames.Customer
					? { role: currentRole, firstName: '', lastName: '', email: '', phoneNumber: '', password: '' }
					: {
							role: currentRole,
							storeName: '',
							storeDescription: '',
							address: {
								country: '',
								state: '',
								city: '',
								streetAddress: '',
								zipcode: '',
							},
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

	useEffect(() => {
		if (defaultRole) {
			setValue('role', defaultRole);
			setCurrentIndex(1);
		}
	}, [defaultRole, setValue]);

	return (
		<AuthLayout>
			<>
				<Logo />
				<h1 className="text-xl md:text-3xl my-4 font-bold">
					Welcome to TradeHub <WavingHand />
				</h1>
				<p className="text-sm text-gray-400">
					Create your TradeHub account to enjoy full, personalized access to features, content, and tools
					tailored just for you.
				</p>

				<div className="hidden md:flex justify-between items-center bg-[#111827] p-1 rounded-full mt-6 transition-all duration-1000">
					{['Shop as Customer', 'Sell as Merchant'].map((item, index) => {
						return (
							<div
								onClick={() => setCurrentIndex(index)}
								key={item}
								className={`w-full flex justify-center gap-2 items-center p-2.5 text-xs md:text-sm font-medium cursor-pointer ${
									currentIndex === index && 'bg-primary rounded-full shadow-xl'
								}`}>
								{index === 0 ? <MdShoppingBag size={21} /> : <FaStore size={21} />}
								{item}
							</div>
						);
					})}
				</div>

				<div className="flex md:hidden justify-between items-center bg-[#111827] p-1 rounded-full mt-6 transition-all duration-1000">
					{['Customer', 'Merchant'].map((item: string, index) => {
						return (
							<div
								onClick={() => setCurrentIndex(index)}
								key={item}
								className={`w-full flex justify-center gap-2 items-center p-2.5 text-xs md:text-sm font-medium cursor-pointer ${
									currentIndex === index && 'bg-primary rounded-full shadow-xl'
								}`}>
								{index === 0 ? <MdShoppingBag size={21} /> : <FaStore size={21} />}
								{item}
							</div>
						);
					})}
				</div>

				<form onSubmit={handleSubmit(submit)} className="mt-8 space-y-8 grid grid-cols-1  gap-6">
					{role === RoleNames.Customer ? (
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

							<TextField
								label="Street Address"
								className="col-span-2"
								InputProps={{
									placeholder: 'e.g your street address',
									...register('address.streetAddress', {
										required: {
											value: true,
											message: 'This field is required',
										},
									}),
									className: 'text-sm',
								}}
								helperText={errors?.address?.streetAddress?.message}
							/>

							<SelectCountry
								onLocationSelect={(location) => {
									console.log(location);
									setValue('address.country', location.country);
									setValue('address.state', location.state);
									setValue('address.city', location.city);
								}}
							/>

							<TextField
								label="Zip Code"
								className="col-span-2"
								InputProps={{
									type: 'tel',
									placeholder: 'e.g your store address',
									...register('address.zipcode', {
										required: {
											value: true,
											message: 'This field is required',
										},
									}),
									className: 'text-sm',
								}}
								helperText={errors?.address?.zipcode?.message}
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
								multiline
							/>

							<TextField
								label="Street Address"
								className="col-span-2"
								InputProps={{
									placeholder: 'e.g your street address',
									...register('address.streetAddress', {
										required: {
											value: true,
											message: 'This field is required',
										},
									}),
									className: 'text-sm',
								}}
								helperText={errors?.address?.streetAddress?.message}
							/>

							<SelectCountry
								onLocationSelect={(location) => {
									console.log(location);
									setValue('address.country', location.country);
									setValue('address.state', location.state);
									setValue('address.city', location.city);
								}}
								className="col-span-2"
							/>

							<TextField
								label="Zip Code"
								className="col-span-2"
								InputProps={{
									type: 'tel',
									placeholder: 'e.g your store address',
									...register('address.zipcode', {
										required: {
											value: true,
											message: 'This field is required',
										},
									}),
									className: 'text-sm',
								}}
								helperText={errors?.address?.zipcode?.message}
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

					<Button
						fullWidth
						variant="filled"
						size="medium"
						className="col-span-2"
						loading={_customerSignUpPending || _merchantSignUpPending}>
						Sign Up
					</Button>
				</form>

				<div className="flex flex-col justify-center items-center">
					<p className="text-sm text-gray-400 mt-3">or</p>
					<div className="w-full flex gap-12 justify-center items-center mt-3">
						<Button
							onClick={() => {
								setIsPending(true);
								_googleSignIn(role);
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
