'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Upload,
	Check,
	Globe,
	ChevronDown,
	Pipette,
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
	validateAccountInfo,
} from '@/lib/services/merchant.service';
import Loader from '@/components/common/loaders';
import TextField from '@/components/common/inputs/text-field';
import { useDebounce } from 'use-debounce';
import { deFormatValue, formatValue } from '@/lib/helpers';
import { Bank } from '@/lib/types';
import { errorHandler } from '@/lib/config/axios-error';
import { toast } from 'sonner';

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

	const [formData, setFormData] = useState({
		businessName: merchant?.storeName || '',
		storeCategory: merchant?.storeCategory || '',
		businessEmail: merchant?.user.email || '',
		phoneNumber: merchant?.user.phoneNumber || '',
		businessAddress: merchant?.defaultAddress || '',
		websiteUrl: merchant?.website || '',
		// instagramHandle: merchant?.socials.linkedin || '',
		// facebookHandle: merchant?.socials.facebook || '',
		// twitterHandle: merchant?.socials.twitter || '',
		storeDescription: merchant?.storeDescription || '',
	});

	const [activeTab, setActiveTab] = useState('basic-info');

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const tabs = [
		{ id: 'basic-info', label: 'Basic Info', icon: <Home className="w-4 h-4 mr-2" /> },
		{ id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4 mr-2" /> },
		{ id: 'banking', label: 'Banking', icon: <DollarSign className="w-4 h-4 mr-2" /> },
	];

	useEffect(() => {
		if (activeTabParams) setActiveTab(activeTabParams);
	}, [activeTabParams]);

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
						<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
							<Pipette className="w-3 h-3 text-white" />
						</div>
					</div>
					<div className="pb-2">
						<div className="flex items-center gap-2 mb-1">
							<h1 className="text-2xl font-semibold text-white">{merchant?.storeName}</h1>
							<Check className="w-5 h-5 text-blue-500" />
						</div>
						<div className="flex items-center gap-2">
							<p className="text-gray-400 text-sm">Verified Business</p>
							<Button
								size="sm"
								variant="outline"
								className="h-7 px-3 py-1 text-xs bg-amber-600/20 text-amber-400 border-amber-600/30 hover:bg-amber-600/30"
								onClick={() => router.push('/merchant/verification')}>
								Complete Verification
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full border-b border-gray-800 mb-8">
				<div className="w-full flex space-x-8 px-6">
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
				<div className="px-6 space-y-8">
					<div className="grid grid-cols-1 gap-8">
						<div className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="businessName" className="text-white text-sm">
									Business Name
								</Label>
								<Input
									id="businessName"
									value={formData.businessName}
									onChange={(e) => handleInputChange('businessName', e.target.value)}
									className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="storeCategory" className="text-white text-sm">
									Store Category
								</Label>
								<Select
									value={
										Array.isArray(formData.storeCategory)
											? formData.storeCategory[0] || ''
											: formData.storeCategory || ''
									}
									onValueChange={(value) => handleInputChange('storeCategory', value)}>
									<SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg">
										<SelectValue />
										<ChevronDown className="w-4 h-4" />
									</SelectTrigger>
									<SelectContent className="bg-[#1a1a1a] border-gray-700">
										<SelectItem value="grocery-food">Grocery & Food</SelectItem>
										<SelectItem value="restaurant">Restaurant</SelectItem>
										<SelectItem value="retail">Retail</SelectItem>
										<SelectItem value="services">Services</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="businessEmail" className="text-white text-sm">
									Business Email
								</Label>
								<Input
									id="businessEmail"
									type="email"
									value={formData.businessEmail}
									onChange={(e) => handleInputChange('businessEmail', e.target.value)}
									className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="phoneNumber" className="text-white text-sm">
									Phone Number
								</Label>
								<Input
									id="phoneNumber"
									value={formData.phoneNumber}
									onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
									className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg"
								/>
							</div>
						</div>

						<div className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="businessAddress" className="text-white text-sm">
									Business Address
								</Label>
								<Input
									id="businessAddress"
									value={
										typeof formData.businessAddress === 'string'
											? formData.businessAddress
											: formData.businessAddress?.streetAddress ?? ''
									}
									onChange={(e) => handleInputChange('businessAddress', e.target.value)}
									className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="websiteUrl" className="text-white text-sm">
									Website URL
								</Label>
								<div className="relative">
									<Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
									<Input
										id="websiteUrl"
										value={formData.websiteUrl}
										onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
										className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg pl-10"
									/>
								</div>
							</div>

							{/* <div className="space-y-4">
								<Label className="text-white text-sm">Social Media</Label>
								<div className="space-y-3">
									<div className="relative">
										<Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-500" />
										<Input
											value={formData.instagramHandle || ''}
											onChange={(e) => handleInputChange('instagramHandle', e.target.value)}
											className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg pl-10"
											placeholder="@username"
										/>
									</div>

									<div className="relative">
										<div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
											<span className="text-white text-xs font-bold">f</span>
										</div>
										<Input
											value={formData.facebookHandle || ''}
											onChange={(e) => handleInputChange('facebookHandle', e.target.value)}
											className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg pl-10"
											placeholder="Page name"
										/>
									</div>

									<div className="relative">
										<div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-400 rounded flex items-center justify-center">
											<span className="text-white text-xs font-bold">𝕏</span>
										</div>
										<Input
											value={formData.twitterHandle || ''}
											onChange={(e) => handleInputChange('twitterHandle', e.target.value)}
											className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg pl-10"
											placeholder="@username"
										/>
									</div>
								</div>
							</div> */}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="storeDescription" className="text-white text-sm">
							Store Description
						</Label>
						<Textarea
							id="storeDescription"
							value={formData.storeDescription}
							onChange={(e) => handleInputChange('storeDescription', e.target.value)}
							className="bg-[#1a1a1a] border-gray-700 text-white min-h-[120px] rounded-lg resize-none"
							placeholder="Describe your business..."
						/>
					</div>

					<div className="flex gap-4 pt-6 pb-8">
						<Button
							onClick={() => console.log('Saving changes:', formData)}
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
							Save Changes
						</Button>
					</div>
				</div>
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
											<Loader text="Fetching banks" />
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
							<div className="mt-4">
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
									className="mt-3"
								/>

								{isAccountNumberValid && (
									<div className="mt-2">
										<p className="text-[.85rem] font-bold">Account Name</p>
										<p className="text-[.85rem] pt-1">
											{resolvingAccountInfo ? <Loader text="Fetching account name..." /> : accountInfo?.account_name}
										</p>
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
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
							Withdraw
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default MerchantProfilePage;
