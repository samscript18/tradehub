'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
	Instagram,
	ChevronDown,
	Pipette,
	FileText,
	AlertTriangle,
	Clock,
	X,
	Home,
	Settings,
	Badge,
	DollarSign,
} from 'lucide-react';
import Image from 'next/image';
import bannerImg from '@/public/images/background-banner.png';

const MerchantProfilePage = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		businessName: 'Marcus & Sons Grocery',
		storeCategory: 'grocery-food',
		businessEmail: 'marcus@marcusandsons.com',
		phoneNumber: '(555) 123-4567',
		businessAddress: '123 Market Street, Brooklyn, NY 11201',
		websiteUrl: 'www.marcusandsons.com',
		instagramHandle: '@marcusandsons',
		facebookHandle: 'Marcus & Sons Grocery',
		twitterHandle: '@marcusandsons',
		storeDescription:
			'Marcus & Sons Grocery is a family-owned business serving the Brooklyn community since 1985. We specialize in fresh produce, organic goods, and culturally diverse products.',
		features: {
			deliveryAvailable: true,
			inStorePickup: true,
			blackOwnedBusiness: true,
			communityPartner: true,
			acceptEBT: false,
			wheelchairAccessible: false,
		},
		operatingHours: {
			monday: { open: '09:00', close: '18:00' },
			tuesday: { open: '09:00', close: '18:00' },
			wednesday: { open: '09:00', close: '18:00' },
			thursday: { open: '09:00', close: '18:00' },
			friday: { open: '09:00', close: '18:00' },
			saturday: { open: '09:00', close: '18:00' },
			sunday: { open: '', close: '' },
		},
		bankingDetails: {
			accountHolderName: 'John Smith',
			bankName: 'Chase Bank',
			accountNumber: '****-****-4567',
			routingNumber: '021000021',
			accountType: 'Checking',
			currency: 'NGN - Naira',
			lastVerified: 'Jan 22, 2024',
		},
		businessMetrics: {
			memberSince: 'January 2020',
			totalSales: '₦125,430',
			averageRating: '4.8/5.0 (234 reviews)',
		},
	});

	const [activeTab, setActiveTab] = useState('basic-info');

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const tabs = [
		{ id: 'basic-info', label: 'Basic Info', icon: <Home className="w-4 h-4 mr-2" /> },
		{ id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4 mr-2" /> },
		{ id: 'banking', label: 'Banking', icon: <DollarSign className="w-4 h-4 mr-2" /> },
		{ id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4 mr-2" /> },
	];

	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white">
			<div className="relative h-64 w-full overflow-hidden rounded-lg">
				<Image src={bannerImg} alt="Store Banner" className="w-full h-full object-cover" />
				<div className="absolute inset-0 bg-black/40" />
				<Button
					variant="secondary"
					size="sm"
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-lg border-white/10 text-white hover:bg-black/60 flex items-center gap-2">
					<Upload className="w-4 h-4" />
					Update Store Banner
				</Button>
			</div>

			<div className="relative -mt-12 mb-8">
				<div className="flex items-end gap-4 px-6">
					<div className="relative">
						<Avatar className="w-24 h-24 border-4 border-[#0a0a0a]">
							<AvatarImage src={'/images/avatar1.png'} alt="Marcus Johnson" />
							<AvatarFallback className="text-2xl bg-blue-600 text-white">MJ</AvatarFallback>
						</Avatar>
						<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
							<Pipette className="w-3 h-3 text-white" />
						</div>
					</div>
					<div className="pb-2">
						<div className="flex items-center gap-2 mb-1">
							<h1 className="text-2xl font-semibold text-white">Marcus & Sons Grocery</h1>
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

			<div className="border-b border-gray-800 mb-8">
				<div className="flex space-x-8 px-6">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`pb-4 px-1 text-sm font-medium transition-colors relative flex items-center ${
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
									value={formData.storeCategory}
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
									value={formData.businessAddress}
									onChange={(e) => handleInputChange('businessAddress', e.target.value)}
									className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg"
								/>
							</div>

							<div className="space-y-2">
								<Label className="text-white text-sm">Operating Hours</Label>
								<div className="flex items-center gap-2 text-gray-400 text-sm bg-[#1a1a1a] border border-gray-700 rounded-lg h-12 px-3">
									<Clock className="w-4 h-4" />
									<span>Mon-Sat: 8:00 AM - 8:00 PM</span>
								</div>
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

							<div className="space-y-4">
								<Label className="text-white text-sm">Social Media</Label>
								<div className="space-y-3">
									<div className="relative">
										<Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-500" />
										<Input
											value={formData.instagramHandle}
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
											value={formData.facebookHandle}
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
											value={formData.twitterHandle}
											onChange={(e) => handleInputChange('twitterHandle', e.target.value)}
											className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg pl-10"
											placeholder="@username"
										/>
									</div>
								</div>
							</div>
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
						<Button
							variant="outline"
							className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-2 rounded-lg">
							Cancel
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
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="accountHolderName" className="text-white text-sm">
									Account Holder Name
								</Label>
								<Input
									id="accountHolderName"
									value={formData.bankingDetails.accountHolderName}
									onChange={(e) => {
										const newBankingDetails = { ...formData.bankingDetails };
										newBankingDetails.accountHolderName = e.target.value;
										setFormData({
											...formData,
											bankingDetails: newBankingDetails,
										});
									}}
									className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="accountNumber" className="text-white text-sm">
									Account Number
								</Label>
								<Input
									id="accountNumber"
									value={formData.bankingDetails.accountNumber}
									onChange={(e) => {
										const newBankingDetails = { ...formData.bankingDetails };
										newBankingDetails.accountNumber = e.target.value;
										setFormData({
											...formData,
											bankingDetails: newBankingDetails,
										});
									}}
									className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="accountType" className="text-white text-sm">
									Account Type
								</Label>
								<Select
									value={formData.bankingDetails.accountType}
									onValueChange={(value) => {
										const newBankingDetails = { ...formData.bankingDetails };
										newBankingDetails.accountType = value;
										setFormData({
											...formData,
											bankingDetails: newBankingDetails,
										});
									}}>
									<SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg">
										<SelectValue />
										<ChevronDown className="w-4 h-4" />
									</SelectTrigger>
									<SelectContent className="bg-[#1a1a1a] border-gray-700">
										<SelectItem value="Checking">Checking</SelectItem>
										<SelectItem value="Savings">Savings</SelectItem>
										<SelectItem value="Business">Business</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="bankName" className="text-white text-sm">
									Bank Name
								</Label>
								<Input
									id="bankName"
									value={formData.bankingDetails.bankName}
									onChange={(e) => {
										const newBankingDetails = { ...formData.bankingDetails };
										newBankingDetails.bankName = e.target.value;
										setFormData({
											...formData,
											bankingDetails: newBankingDetails,
										});
									}}
									className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="routingNumber" className="text-white text-sm">
									Routing Number
								</Label>
								<Input
									id="routingNumber"
									value={formData.bankingDetails.routingNumber}
									onChange={(e) => {
										const newBankingDetails = { ...formData.bankingDetails };
										newBankingDetails.routingNumber = e.target.value;
										setFormData({
											...formData,
											bankingDetails: newBankingDetails,
										});
									}}
									className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="currency" className="text-white text-sm">
									Currency
								</Label>
								<Select
									value={formData.bankingDetails.currency}
									onValueChange={(value) => {
										const newBankingDetails = { ...formData.bankingDetails };
										newBankingDetails.currency = value;
										setFormData({
											...formData,
											bankingDetails: newBankingDetails,
										});
									}}>
									<SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg">
										<SelectValue />
										<ChevronDown className="w-4 h-4" />
									</SelectTrigger>
									<SelectContent className="bg-[#1a1a1a] border-gray-700">
										<SelectItem value="USD - US Dollar">USD - US Dollar</SelectItem>
										<SelectItem value="EUR - Euro">EUR - Euro</SelectItem>
										<SelectItem value="GBP - British Pound">GBP - British Pound</SelectItem>
										<SelectItem value="CAD - Canadian Dollar">CAD - Canadian Dollar</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between pt-4 border-t border-gray-800">
						<p className="text-sm text-gray-400">Last verified: {formData.bankingDetails.lastVerified}</p>
						<Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
							Update Banking Info
						</Button>
					</div>
				</div>
			)}

			{activeTab === 'reviews' && (
				<div className="px-6 py-12">
					<div className="text-center">
						<p className="text-gray-400">Reviews section coming soon...</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default MerchantProfilePage;
