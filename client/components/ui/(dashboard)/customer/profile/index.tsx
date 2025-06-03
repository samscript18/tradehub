'use client';

import React, { useState } from 'react';
import { ChevronRight, Shield, ShieldCheck, Globe, Bell, Moon } from 'lucide-react';
import { Switch } from '@/components/common/switch';
import { useAuth } from '@/lib/store/auth.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SettingItem {
	icon: React.ReactNode;
	title: string;
	subtitle?: string;
	value?: string;
	onClick?: () => void;
	switch?: boolean;
	checked?: boolean;
	onToggle?: () => void;
}

const ProfilePage = () => {
	const { user } = useAuth();

	const [notifications, setNotifications] = useState(true);
	const [darkMode, setDarkMode] = useState(true);

	const personalInfo: SettingItem[] = [
		{
			icon: null,
			title: 'Full Name',
			value: `${user?.firstName} ${user?.lastName}`,
			onClick: () => console.log('Edit full name'),
		},
		{
			icon: null,
			title: 'Email Address',
			value: user?.email,
			onClick: () => console.log('Edit email'),
		},
		{
			icon: null,
			title: 'Phone Number',
			value: user?.phoneNumber,
			onClick: () => console.log('Edit phone'),
		},
		{
			icon: null,
			title: 'Location',
			value: 'Abeokuta, Ogun State',
			onClick: () => console.log('Edit location'),
		},
	];

	const securitySettings: SettingItem[] = [
		{
			icon: <Shield className="w-5 h-5 text-primary" />,
			title: 'Change Password',
			subtitle: 'Update your password',
			onClick: () => console.log('Change password'),
		},
		{
			icon: <ShieldCheck className="w-5 h-5 text-primary" />,
			title: 'Two-Factor Authentication',
			subtitle: 'Add an extra layer of security',
			onClick: () => console.log('Setup 2FA'),
		},
	];

	const accountPreferences: SettingItem[] = [
		{
			icon: <Globe className="w-5 h-5 text-primary" />,
			title: 'Language',
			value: 'English (US)',
			onClick: () => console.log('Change language'),
		},
		{
			icon: <Bell className="w-5 h-5 text-primary" />,
			title: 'Notifications',
			value: notifications ? 'Enabled' : 'Disabled',
			switch: true,
			checked: notifications,
			onToggle: () => setNotifications(!notifications),
		},
		{
			icon: <Moon className="w-5 h-5 text-primary" />,
			title: 'Dark Mode',
			value: darkMode ? 'On' : 'Off',
			switch: true,
			checked: darkMode,
			onToggle: () => setDarkMode(!darkMode),
		},
	];

	const SettingSection = ({ title, items }: { title: string; items: SettingItem[] }) => (
		<div className="bg-[#181A20] rounded-lg shadow-lg p-4 md:p-6 space-y-4">
			<h2 className="font-semibold mb-4">{title}</h2>
			<div className="space-y-3">
				{items.map((item, index) => (
					<div
						key={index}
						className={`w-full flex items-center justify-between bg-[#22252d] p-2 md:p-4 rounded-lg transition-colors ${
							item.switch ? 'cursor-default' : 'cursor-pointer group'
						}`}
						onClick={!item.switch ? item.onClick : undefined}>
						<div className="flex items-center gap-4">
							{item.icon}
							<div className="text-left">
								<div className="font-medium text-sm">{item.title}</div>
								{item.subtitle && <div className="text-gray-400 text-xs">{item.subtitle}</div>}
								{item.value && !item.subtitle && <div className="text-gray-400 text-xs">{item.value}</div>}
							</div>
						</div>
						<div className="flex items-center gap-2">
							{item.switch ? (
								<Switch
									checked={item.checked}
									onCheckedChange={item.onToggle}
									className="data-[state=checked]:bg-primary"
								/>
							) : (
								<>
									{item.value && item.subtitle && <span className="text-gray-400 text-sm">{item.value}</span>}
									<ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
								</>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<div className="min-h-screen">
			<div className="px-4 py-8 space-y-8">
				<div className="bg-[#181A20] rounded-lg p-8 text-center">
					<div className="relative inline-block mb-4">
						<div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
							<Avatar className="w-24 h-24">
								<AvatarImage src={user?.profilePicture} alt="Marcus Johnson" />
								<AvatarFallback className="text-xl bg-primary text-white">MJ</AvatarFallback>
							</Avatar>
						</div>
					</div>

					<h1 className="text-xl font-bold text-white mb-2">
						{user?.firstName && user?.lastName ? `${user?.firstName} ${user?.lastName}` : 'John Smilga'}
					</h1>
					<p className="text-gray-400 text-sm">Update your profile information and settings</p>
				</div>

				{/* Personal Information */}
				<SettingSection title="Personal Information" items={personalInfo} />

				{/* Security Settings */}
				<SettingSection title="Security Settings" items={securitySettings} />

				{/* Account Preferences */}
				<SettingSection title="Account Preferences" items={accountPreferences} />
			</div>
		</div>
	);
};

export default ProfilePage;
