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
import { MdShoppingBag } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

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
			router.push('/login');
		},
	});

	const { mutateAsync: _signUpMerchant, isPending: _merchantSignUpPending } = useMutation({
		mutationKey: ['auth', 'sign-up', 'merchant'],
		mutationFn: signUpMerchant,
		onSuccess() {
			toastSuccess('Signed up successfully');
			router.push('/login');
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
						role: RoleNames.Customer as RoleNames.Customer,
				  }
				: {
						storeName: e.storeName,
						storeDescription: e.storeDescription,
						defaultAddress: e.address,
						storeCategory: selectedCategories,
						role: RoleNames.Merchant as RoleNames.Merchant,
				  }),
		};
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
								street: '',
								postalcode: '',
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
			setCurrentIndex(defaultRole === RoleNames.Merchant ? 1 : 0);
		}
	}, [defaultRole, setValue]);

	return (
		<AuthLayout>
			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-xl mx-auto p-6 md:p-8 bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-3xl shadow-2xl relative overflow-hidden"
			>
				{/* Top subtle glow */}
				<div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

				<div className="flex flex-col items-center text-center">
					<Logo />
					<h2 className="text-xl md:text-2xl font-bold text-white mt-6 mb-2 flex items-center gap-2">
						Welcome to TradeHub <WavingHand />
					</h2>
					<p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
						Create your TradeHub account to enjoy full, personalized access to tools tailored just for you.
					</p>
				</div>

				{/* Role Tabs */}
				<div className="relative flex justify-between items-center bg-slate-900/60 border border-slate-800/80 p-1.5 rounded-2xl mt-8">
					{['Shop as Customer', 'Sell as Merchant'].map((item, index) => {
						const isActive = currentIndex === index;
						return (
							<button
								type="button"
								onClick={() => setCurrentIndex(index)}
								key={item}
								className={`relative w-full flex justify-center gap-2 items-center py-2.5 px-4 text-xs md:text-sm font-semibold cursor-pointer z-10 rounded-xl transition-all duration-300 ${
									isActive ? 'text-white bg-primary shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-200'
								}`}
							>
								{index === 0 ? <MdShoppingBag size={18} /> : <FaStore size={18} />}
								{item}
							</button>
						);
					})}
				</div>

				<form onSubmit={handleSubmit(submit)} className="mt-8 space-y-6">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, x: currentIndex === 0 ? -15 : 15 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: currentIndex === 0 ? 15 : -15 }}
							transition={{ duration: 0.3 }}
							className="space-y-5"
						>
							{role === RoleNames.Customer ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<TextField
										label="First Name"
										InputProps={{
											placeholder: 'e.g. John',
											...register('firstName', {
												required: {
													value: true,
													message: 'This field is required',
												},
											}),
											className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
										}}
										helperText={errors?.firstName?.message}
									/>

									<TextField
										label="Last Name"
										InputProps={{
											placeholder: 'e.g. Doe',
											...register('lastName', {
												required: {
													value: true,
													message: 'This field is required',
												},
											}),
											className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
										}}
										helperText={errors?.lastName?.message}
									/>

									<div className="md:col-span-2">
										<TextField
											label="Email Address"
											InputProps={{
												placeholder: 'e.g. johndoe@gmail.com',
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
												className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
											}}
											helperText={errors?.email?.message}
										/>
									</div>

									<div className="md:col-span-2">
										<TextField
											label="Phone number"
											InputProps={{
												placeholder: 'e.g. 08012642233',
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
												className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
											}}
											helperText={errors?.phoneNumber?.message}
										/>
									</div>

									<PasswordTextField
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
											className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
										}}
										helperText={errors?.password?.message}
									/>

									<PasswordTextField
										label="Confirm Password"
										InputProps={{
											onChange(e) {
												setConfirmPassword(e.target.value);
											},
											className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
										}}
										helperText={password && password !== confirmPassword ? 'Passwords do not match' : undefined}
									/>

									<div className="md:col-span-2">
										<TextField
											label="Street Address"
											InputProps={{
												placeholder: 'e.g. your street address',
												...register('address.street', {
													required: {
														value: true,
														message: 'This field is required',
													},
												}),
												className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
											}}
											helperText={errors?.address?.street?.message}
										/>
									</div>

									<div className="md:col-span-2">
										<SelectCountry
											onLocationSelect={(location) => {
												setValue('address.country', location.country);
												setValue('address.state', location.state);
												setValue('address.city', location.city);
											}}
										/>
									</div>

									<div className="md:col-span-2">
										<TextField
											label="Postal Code"
											InputProps={{
												type: 'tel',
												placeholder: 'e.g. 100001',
												...register('address.postalcode', {
													required: {
														value: true,
														message: 'This field is required',
													},
												}),
												className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
											}}
											helperText={errors?.address?.postalcode?.message}
										/>
									</div>
								</div>
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="md:col-span-2">
										<TextField
											label="Store Name"
											InputProps={{
												placeholder: 'e.g. T&D Store',
												...register('storeName', {
													required: {
														value: true,
														message: 'This field is required',
													},
												}),
												className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
											}}
											helperText={errors?.storeName?.message}
										/>
									</div>

									<div className="md:col-span-2">
										<TextField
											label="Store Description"
											InputProps={{
												placeholder: 'e.g. your store description',
												...register('storeDescription', {
													required: {
														value: true,
														message: 'This field is required',
													},
												}),
												className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl transition-all duration-300',
											}}
											helperText={errors?.storeDescription?.message}
											multiline
										/>
									</div>

									<div className="md:col-span-2">
										<TextField
											label="Street Address"
											InputProps={{
												placeholder: 'e.g. your street address',
												...register('address.street', {
													required: {
														value: true,
														message: 'This field is required',
													},
												}),
												className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
											}}
											helperText={errors?.address?.street?.message}
										/>
									</div>

									<div className="md:col-span-2">
										<SelectCountry
											onLocationSelect={(location) => {
												setValue('address.country', location.country);
												setValue('address.state', location.state);
												setValue('address.city', location.city);
											}}
										/>
									</div>

									<div className="md:col-span-2">
										<TextField
											label="Postal Code"
											InputProps={{
												type: 'tel',
												placeholder: 'e.g. 100001',
												...register('address.postalcode', {
													required: {
														value: true,
														message: 'This field is required',
													},
												}),
												className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
											}}
											helperText={errors?.address?.postalcode?.message}
										/>
									</div>

									<div className="md:col-span-2">
										<MultiSelectField
											label="Store Categories"
											placeholder="e.g. Arts and Crafts"
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

									<div className="md:col-span-2">
										<TextField
											label="Email Address"
											InputProps={{
												placeholder: 'e.g. merchant@gmail.com',
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
												className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
											}}
											helperText={errors?.email?.message}
										/>
									</div>

									<div className="md:col-span-2">
										<TextField
											label="Phone number"
											InputProps={{
												placeholder: 'e.g. 08012642233',
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
												className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
											}}
											helperText={errors?.phoneNumber?.message}
										/>
									</div>

									<PasswordTextField
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
											className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
										}}
										helperText={errors?.password?.message}
									/>

									<PasswordTextField
										label="Confirm Password"
										InputProps={{
											onChange(e) {
												setConfirmPassword(e.target.value);
											},
											className: 'text-sm bg-slate-950/40 border-slate-700/60 focus:border-primary text-white rounded-xl h-11 transition-all duration-300',
										}}
										helperText={password && password !== confirmPassword ? 'Passwords do not match' : undefined}
									/>
								</div>
							)}
						</motion.div>
					</AnimatePresence>

					<Button
						fullWidth
						variant="filled"
						size="medium"
						className="mt-6 bg-primary hover:bg-primary/95 text-white py-3 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-300"
						loading={_customerSignUpPending || _merchantSignUpPending}
					>
						Sign Up
					</Button>
				</form>

				<div className="relative flex py-4 items-center">
					<div className="flex-grow border-t border-slate-800"></div>
					<span className="flex-shrink mx-4 text-slate-500 text-xs uppercase tracking-wider font-semibold">or</span>
					<div className="flex-grow border-t border-slate-800"></div>
				</div>

				<Button
					onClick={() => {
						setIsPending(true);
						_googleSignIn(role);
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
					Already have an account?{' '}
					<Link href="/login" className="text-primary font-medium hover:underline transition-colors">
						Log in
					</Link>
				</p>
			</motion.div>
		</AuthLayout>
	);
};

export default SignUpPage;
