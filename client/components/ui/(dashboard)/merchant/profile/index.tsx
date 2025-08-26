'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Upload,
	Check,
	// Pipette,
	FileText,
	AlertTriangle,
	X,
	Home,
	Badge,
	DollarSign,
	// Linkedin,
} from 'lucide-react';
import Image from 'next/image';
import bannerImg from '@/public/images/background-banner.png';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	getBanks,
	getMerchant,
	getWalletBalance,
	initiateWithdraw,
	updateMerchant,
	validateAccountInfo,
} from '@/lib/services/merchant.service';
import Loader from '@/components/common/loaders';
import TextField from '@/components/common/inputs/text-field';
import { useDebounce } from 'use-debounce';
import { deFormatValue, formatValue } from '@/lib/helpers';
import { Bank } from '@/lib/types';
import { errorHandler } from '@/lib/config/axios-error';
import { toast } from 'sonner';
import { REGEX } from '@/lib/utils/regex';
import MultiSelectField, { Option } from '@/components/common/select-fields/multi-select-field';
import SelectCountry from '@/components/common/select-fields/select-country';
import { useForm } from 'react-hook-form';
import { EditMerchantProfile } from '@/lib/types/auth';
import { storeCategories } from '@/lib/data';

const MerchantProfilePage = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const searchParams = useSearchParams();
	const activeTabParams = searchParams.get('activeTab');
	const [amount, setAmount] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [debouncedSearch] = useDebounce(searchQuery, 500);
	const [selectedBank, setSelectedBank] = useState<string>('');
	const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
	const [accountNumber, setAccountNumber] = useState<string>('');
	const [bankCode, setBankCode] = useState<string>('');
	const [accountDetails, setAccountDetails] = useState<Bank>();
	const isAccountNumberValid = /^\d{10}$/.test(accountNumber);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [activeTab, setActiveTab] = useState('basic-info');

	const { data: wallet } = useQuery({
		queryFn: () => getWalletBalance(),
		queryKey: ['get-merchant-wallet-balance'],
	});

	const { data: merchant } = useQuery({
		queryFn: () => getMerchant(),
		queryKey: ['get-merchant'],
	});

	const { data: banks, isPending: searchingBanks } = useQuery({
		queryFn: () => getBanks(debouncedSearch),
		queryKey: ['useGetBanks', { debouncedSearch }],
		enabled: debouncedSearch.length > 2,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

	const { data: accountInfo, isPending: resolvingAccountInfo } = useQuery({
		queryFn: () => validateAccountInfo({ bankCode, accountNumber }),
		queryKey: ['validate-account-info', { bankCode, accountNumber }],
		enabled: bankCode.length != 0 && isAccountNumberValid,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

	const AccountWithdrawDetails =
		accountInfo?.account_number && accountInfo?.account_name && accountDetails?.code
			? {
					amount: deFormatValue(amount),
					account_number: accountInfo.account_number,
					account_name: accountInfo.account_name,
					bank_code: accountDetails.code,
			  }
			: null;

	const mutation = useMutation({
		mutationKey: ['merchant-withdraw'],
		mutationFn: () => {
			if (!AccountWithdrawDetails) throw new Error('Missing withdrawal details');
			return initiateWithdraw(AccountWithdrawDetails);
		},
		onSuccess: () => {
			toast.success('Withdrawal Placed');
			queryClient.invalidateQueries({ queryKey: ['get-merchant-wallet-balance'] });
			router.push('/merchant/dashboard');
		},
		onError: (error: Error) => {
			errorHandler(error);
		},
	});

	const updateMerchantMutation = useMutation({
		mutationKey: ['update-merchant'],
		mutationFn: (data: Partial<EditMerchantProfile>) => updateMerchant(data),
		onSuccess: () => {
			toast.success('Merchant profile info updated');
			queryClient.invalidateQueries({ queryKey: ['get-merchant'] });
		},
		onError: (error: Error) => {
			errorHandler(error);
		},
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm<Partial<EditMerchantProfile>>();

	const submit = async (e: Partial<EditMerchantProfile>) => {
		await updateMerchantMutation.mutateAsync({
			email: e.email,
			phoneNumber: e.phoneNumber,
			storeName: e.storeName,
			storeDescription: e.storeDescription,
			defaultAddress: e.defaultAddress,
			storeCategory: selectedCategories,
			addresses: merchant?.addresses,
		});
	};

	const tabs = [
		{ id: 'basic-info', label: 'Basic Info', icon: <Home className="w-4 h-4 mr-1 md:mr-2" /> },
		{ id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4 mr-1 md:mr-2" /> },
		{ id: 'banking', label: 'Banking', icon: <DollarSign className="w-4 h-4 mr-1 md:mr-2" /> },
	];

	useEffect(() => {
		if (activeTabParams) setActiveTab(activeTabParams);
	}, [activeTabParams]);

	useEffect(() => {
		if (merchant) {
			setValue('storeName', merchant?.storeName || '');
			setValue('email', merchant?.user.email || '');
			setValue('phoneNumber', merchant?.user.phoneNumber || '');
			setValue('defaultAddress.street', merchant?.defaultAddress?.street || '');
			setValue('storeDescription', merchant?.storeDescription || '');
		}
	}, [merchant, setValue]);

	return (
	<div className="min-h-screen bg-[#0a0a0a] text-white">
		<div className="relative h-64 w-full overflow-hidden rounded-lg">
			<Image src={bannerImg} alt="Store Banner" className="w-full h-full object-cover" />
			<div className="absolute inset-0 bg-black/40" />
			{/* <Button
					variant="secondary"
					size="sm"
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-lg border-white/10 text-white hover:bg-black/60 flex items-center gap-2">
					<Upload className="w-4 h-4" />
					Update Store Banner
				</Button> */}
		</div>

		<div className="relative -mt-12 mb-8">
			<div className="flex items-end gap-4 px-6">
				<div className="relative">
					<Avatar className="w-24 h-24 border-4 border-[#0a0a0a]">
						<AvatarImage src={merchant?.storeLogo} alt={merchant?.storeName} />
						<AvatarFallback className="text-2xl bg-blue-600 text-white">MJ</AvatarFallback>
					</Avatar>
					{/* <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
						<Pipette className="w-3 h-3 text-white" />
					</div> */}
				</div>
				<div className="pb-2">
					<div className="flex items-center gap-2 mb-1">
						<h1 className="text-2xl font-semibold text-white">{merchant?.storeName}</h1>
						{/* <Check className="w-5 h-5 text-blue-500" /> */}
					</div>
				</div>
			</div>
		</div>

		<div className="w-full border-b border-gray-800 mb-8">
			<div className="w-full flex space-x-4 md:space-x-8 px-6">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`w-full pb-4 px-1 text-sm font-medium transition-colors relative flex justify-center items-center cursor-pointer ${
							activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 hover:text-gray-300'
						}`}>
						{tab.icon}
						{tab.label}
						{activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
					</button>
				))}
			</div>
		</div>

		{activeTab === 'basic-info' && (
			<form onSubmit={handleSubmit(submit)} className="px-6 space-y-8">
				<div className="grid grid-cols-1 gap-8">
					<div className="space-y-6">
						<div className="space-y-2">
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
						</div>

						<div className="space-y-2">
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
								initialOptions={
									merchant?.storeCategory.map((category) => ({
										label: category,
										value: category,
										id: category,
									})) || []
								}
							/>
						</div>

						<div className="space-y-2">
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
											message: 'Enter a valid email defaultAddress',
										},
									}),
									className: 'text-sm',
								}}
								helperText={errors?.email?.message}
							/>
						</div>

						<div className="space-y-2">
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
						</div>

						<SelectCountry
							initialCountry={merchant?.defaultAddress?.country || ''}
							initialState={merchant?.defaultAddress?.state || ''}
							initialCity={merchant?.defaultAddress?.city || ''}
							onLocationSelect={(location) => {
								setValue('defaultAddress.country', location.country);
								setValue('defaultAddress.state', location.state);
								setValue('defaultAddress.city', location.city);
							}}
							className="col-span-2"
						/>
					</div>

					<div className="space-y-6">
						<div className="space-y-2">
							<TextField
								label="Street Address"
								className="col-span-2"
								InputProps={{
									placeholder: 'e.g your street defaultAddress',
									...register('defaultAddress.street', {
										required: {
											value: true,
											message: 'This field is required',
										},
									}),
									className: 'text-sm',
								}}
								helperText={errors?.defaultAddress?.street?.message}
							/>
						</div>
					</div>
				</div>

				<div className="space-y-2">
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
				</div>

				<div className="max-md:w-full flex justify-center items-center gap-4 pt-6 pb-8">
					<Button
						type="submit"
						className="max-md:w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
						{updateMerchantMutation.isPending ? 'Saving' : 'Save Changes'}{' '}
					</Button>
				</div>
			</form>
		)}

		{activeTab === 'documents' && (
			<div className="px-6 space-y-8 pb-8">
				<h2 className="text-xl font-medium">Business Documents</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
						<div className="p-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<FileText className="w-5 h-5 text-blue-400" />
								<div>
									<h3 className="font-medium">Business License</h3>
									<p className="text-xs text-gray-400">Last updated: Jan 15, 2024</p>
								</div>
							</div>
							<Badge className="bg-green-600/20 text-green-400 border-green-600/30">
								<Check className="w-3 h-3 mr-1" /> Verified
							</Badge>
						</div>
						<div className="border-t border-gray-800 p-4">
							<Button
								variant="outline"
								className="w-full bg-[#0d0d0d] border-gray-700 text-gray-300 hover:bg-gray-800">
								<Upload className="w-4 h-4 mr-2" /> Upload Document
							</Button>
						</div>
					</div>

					<div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
						<div className="p-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<FileText className="w-5 h-5 text-blue-400" />
								<div>
									<h3 className="font-medium">Tax Documents</h3>
									<p className="text-xs text-gray-400">Last updated: Jan 20, 2024</p>
								</div>
							</div>
							<Badge className="bg-amber-600/20 text-amber-400 border-amber-600/30">
								<AlertTriangle className="w-3 h-3 mr-1" /> Action Needed
							</Badge>
						</div>
						<div className="border-t border-gray-800 p-4">
							<Button
								variant="outline"
								className="w-full bg-[#0d0d0d] border-gray-700 text-gray-300 hover:bg-gray-800">
								<Upload className="w-4 h-4 mr-2" /> Upload Document
							</Button>
						</div>
					</div>

					<div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
						<div className="p-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<FileText className="w-5 h-5 text-blue-400" />
								<div>
									<h3 className="font-medium">Business Insurance</h3>
									<p className="text-xs text-gray-400">Not uploaded</p>
								</div>
							</div>
							<Badge className="bg-red-600/20 text-red-400 border-red-600/30">
								<X className="w-3 h-3 mr-1" /> Missing
							</Badge>
						</div>
						<div className="border-t border-gray-800 p-4">
							<Button
								variant="outline"
								className="w-full bg-[#0d0d0d] border-gray-700 text-gray-300 hover:bg-gray-800">
								<Upload className="w-4 h-4 mr-2" /> Upload Document
							</Button>
						</div>
					</div>

					<div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
						<div className="p-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<FileText className="w-5 h-5 text-blue-400" />
								<div>
									<h3 className="font-medium">Business Registration</h3>
									<p className="text-xs text-gray-400">Last updated: Dec 28, 2023</p>
								</div>
							</div>
							<Badge className="bg-green-600/20 text-green-400 border-green-600/30">
								<Check className="w-3 h-3 mr-1" /> Verified
							</Badge>
						</div>
						<div className="border-t border-gray-800 p-4">
							<Button
								variant="outline"
								className="w-full bg-[#0d0d0d] border-gray-700 text-gray-300 hover:bg-gray-800">
								<Upload className="w-4 h-4 mr-2" /> Upload Document
							</Button>
						</div>
					</div>
				</div>
			</div>
		)}

		{activeTab === 'banking' && (
			<div className="px-6 space-y-8 pb-8">
				<h2 className="text-xl font-medium">Banking Details</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<TextField
						label="Withdrawal Amount(₦)"
						InputProps={{
							placeholder: 'Enter amount to withdraw',
							type: 'text',
							value: amount,
							onChange: (e) => setAmount(formatValue(e.target.value)),
							className: 'focus:border-primary py-3 text-[.75rem]',
						}}
						helperText={Number(deFormatValue(amount)) > (wallet?.balance ?? 0) ? 'Insufficient balance' : ''}
						LabelProps={{ className: 'text-[.65rem] font-[500]' }}
						className="mb-4"
					/>

					<>
						<TextField
							label="Search bank name"
							InputProps={{
								placeholder: 'Enter your bank name',
								type: 'text',
								value: searchQuery,
								onChange: (e) => {
									setSearchQuery(e.target.value);
									setIsDropDownOpen(true);
								},
								className: 'focus:border-primary py-3 text-[.75rem]',
							}}
							LabelProps={{ className: 'text-[.65rem] font-[500]' }}
						/>

						{isDropDownOpen && searchQuery && (
							<div className="w-full max-h-[200px] bg-[#242424] shadow-md p-4 overflow-y-scroll">
								{searchingBanks || (!banks && debouncedSearch) ? (
									<div className="flex justify-center items-center">
										<Loader size={25} text="Fetching banks" />
									</div>
								) : (
									banks?.map((bank) => (
										<div
											key={bank.code}
											className="py-2 px-3 mb-2 bg-black shadow-md rounded-md cursor-pointer"
											onClick={() => {
												setSelectedBank(bank.name);
												setSearchQuery(bank.name);
												setBankCode(bank.code);
												setAccountDetails(bank);
												setIsDropDownOpen(false);
											}}>
											<p className="text-[.85rem] text-primary">{bank.name}</p>
										</div>
									))
								)}
							</div>
						)}
					</>

					{selectedBank && (
						<div className="mt-2">
							<p className="text-[.85rem]">
								<span className="font-bold">Selected Bank:</span> {selectedBank}
							</p>

							<TextField
								label="Enter Account Number"
								InputProps={{
									placeholder: 'Enter your 10 digits account number',
									type: 'text',
									value: accountNumber,
									onChange: (e) => setAccountNumber(e.target.value),
									className: 'focus:border-primary py-3 text-[.75rem]',
								}}
								helperText={accountNumber.length > 10 ? 'Incorrect account number' : ''}
								LabelProps={{ className: 'text-[.65rem] font-[500]' }}
								className="mt-6 mb-4"
							/>

							{isAccountNumberValid && (
								<div className="mt-2">
									<p className="text-[.85rem] font-bold">Account Name</p>
									<div className="text-[.85rem] pt-1">
										{resolvingAccountInfo ? (
											<Loader size={25} text="Fetching account name..." />
										) : (
											accountInfo?.account_name
										)}
									</div>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="flex justify-center items-center">
					<Button
						disabled={
							!accountNumber ||
							!amount ||
							!accountInfo?.account_name ||
							Number(deFormatValue(amount)) > (wallet?.balance ?? 0)
						}
						onClick={async () => {
							if (!AccountWithdrawDetails) return;
							await mutation.mutateAsync();
						}}
						className="max-md:w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
						{mutation.isPending ? 'Processing' : 'Withdraw'}
					</Button>
				</div>
			</div>
		)}
	</div>
);
};

export default MerchantProfilePage;
