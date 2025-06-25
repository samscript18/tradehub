'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight, Shield, Globe, Bell } from 'lucide-react';
import { Switch } from '@/components/common/switch';
import { useAuth } from '@/lib/store/auth.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ImageUploader from '@/components/common/inputs/image-upload';
import { useForm } from 'react-hook-form';
import { UpdateProfile } from '@/lib/types/auth';
import Button from '@/components/common/button';
import TextField, { PasswordTextField } from '@/components/common/inputs/text-field';
import { REGEX } from '@/lib/utils/regex';
import { convertBase64, convertUrl } from '@/lib/utils/file';
import { useMutation } from '@tanstack/react-query';
import { updateCustomer } from '@/lib/services/customer.service';
import {
	changeNotificationStatus,
	changePassword,
	changeProfilePicture,
} from '@/lib/services/user.service';
import { toastSuccess } from '@/lib/utils/toast';
import { BiLoaderAlt } from 'react-icons/bi';

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
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [profileImage, setProfileImage] = useState<File>();
	const [notifications, setNotifications] = useState(!user?.notificationsDisabled);
	// const [darkMode, setDarkMode] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState<string>();
	const { fetchUser } = useAuth();
	const { mutateAsync: _updateCustomerInfo, isPending: _isUpdatingCustomerInfo } = useMutation({
		mutationFn: updateCustomer,
		mutationKey: ['update-customer-info'],
	});
	const { mutateAsync: _changePassword, isPending: _isChangingPassword } = useMutation({
		mutationFn: changePassword,
		mutationKey: ['change-password'],
		onSuccess(data) {
			toastSuccess(data.message);
		},
	});
	const { mutateAsync: _changeProfilePicture, isPending: _isChangingProfilePicture } = useMutation({
		mutationFn: changeProfilePicture,
		mutationKey: ['change-profile-picture'],
		onSuccess(data) {
			toastSuccess(data.message);
		},
	});
	const { mutateAsync: _changeNotificationStatus, isPending: _isChangingNotificationStatus } =
		useMutation({
			mutationFn: changeNotificationStatus,
			mutationKey: ['change-notification-status'],
			onSuccess(data) {
				toastSuccess(data.message);
			},
		});

	const handleNotificationToggle = async () => {
		await _changeNotificationStatus();
		setNotifications(!notifications);
		fetchUser();
		setIsEdit(false);
	};

	console.log(user?.notificationsDisabled);
	console.log(notifications);

	const personalInfo: SettingItem[] = [
		{
			icon: null,
			title: 'Full Name',
			value: `${user?.firstName} ${user?.lastName}`,
			onClick: () => setIsEdit(true),
		},
		{
			icon: null,
			title: 'Email Address',
			value: user?.email,
			onClick: () => setIsEdit(true),
		},
		{
			icon: null,
			title: 'Phone Number',
			value: user?.phoneNumber,
			onClick: () => setIsEdit(true),
		},
		{
			icon: null,
			title: 'Location',
			value: `${user?.defaultAddress?.streetAddress}, ${user?.defaultAddress?.city}, ${user?.defaultAddress?.state}`,
			onClick: () => setIsEdit(true),
		},
	];

	const securitySettings: SettingItem[] = [
		{
			icon: <Shield className="w-5 h-5 text-primary" />,
			title: 'Change Password',
			subtitle: 'Update your password',
			onClick: () => setIsEdit(true),
		},
		// {
		// 	icon: <ShieldCheck className="w-5 h-5 text-primary" />,
		// 	title: 'Two-Factor Authentication',
		// 	subtitle: 'Add an extra layer of security',
		// 	onClick: () => console.log('Setup 2FA'),
		// },
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
			onToggle: handleNotificationToggle,
		},
		// {
		// 	icon: <Moon className="w-5 h-5 text-primary" />,
		// 	title: 'Dark Mode',
		// 	value: darkMode ? 'On' : 'Off',
		// 	switch: true,
		// 	checked: darkMode,
		// 	onToggle: () => setDarkMode(!darkMode),
		// },
	];

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		watch,
	} = useForm<UpdateProfile>({
		defaultValues: {
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			email: user?.email || '',
			phoneNumber: user?.phoneNumber || '',
			profilePicture: user?.profilePicture || '',
		},
	});

	const newPassword = watch('newPassword');

	const submit = async (e: UpdateProfile) => {
		await _updateCustomerInfo({
			firstName: e.firstName,
			lastName: e.lastName,
			// email: e.email,
			// phoneNumber: e.phoneNumber,
		});
		fetchUser();
		setIsEdit(false);
	};

	const updateProfilePicture = async (e: UpdateProfile['profilePicture']) => {
		if (e || profileImage) {
			const picture = await convertBase64((e as File) || profileImage);
			await _changeProfilePicture(picture);
		}
	};

	useEffect(() => {
		if (user?.notificationsDisabled) setNotifications(!user?.notificationsDisabled);
		const handleProfileImage = async () => {
			if (user?.profilePicture) {
				const profileImage = await convertUrl(user?.profilePicture);
				setProfileImage(profileImage);
			}
		};
		handleProfileImage();
	}, [user]);

	useEffect(() => {
		if (isEdit) {
			setValue('currentPassword', '');
			setValue('newPassword', '');
		}
	}, [isEdit, setValue]);

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
							{item.icon && (
								<div className="flex justify-center items-center bg-primary/10 p-1.5 rounded-full shadow-lg">
									{item.icon}
								</div>
							)}
							<div className="text-left">
								<div className="font-medium text-sm">{item.title}</div>
								{item.subtitle && <div className="text-gray-400 text-xs">{item.subtitle}</div>}
								{item.value && !item.subtitle && <div className="text-gray-400 text-xs">{item.value}</div>}
							</div>
						</div>
						<div className="flex items-center gap-2">
							{item.switch ? (
								<>
									<Switch
										checked={item.checked}
										onCheckedChange={item.onToggle}
										className="data-[state=checked]:bg-primary"
									/>
									{_isChangingNotificationStatus && item.title === 'Notifications' && (
										<BiLoaderAlt size={20} className="text-white animate-spin" />
									)}
								</>
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
		<section>
			<div onSubmit={handleSubmit(submit)} className="space-y-8  px-4 py-8">
				<div className="bg-[#181A20] rounded-lg p-8 text-center">
					{isEdit ? (
						<div className="relative inline-block mb-4">
							<div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
								<ImageUploader
									uploaded_image={profileImage}
									onUploadImage={(file: File) => {
										setProfileImage(file);
										setValue('profilePicture', file);
										updateProfilePicture(file);
									}}
									onRemoveImage={() => {
										setProfileImage(undefined);
										setValue('profilePicture', undefined);
									}}
									className={'w-24 h-24 rounded-full! p-0!'}
									loading={_isChangingProfilePicture}
								/>
							</div>
						</div>
					) : (
						<div className="relative inline-block mb-4">
							<div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
								<Avatar className="w-24 h-24">
									<AvatarImage src={user?.profilePicture} alt="profile-image" />
									<AvatarFallback className="text-xl bg-primary">
										{user?.firstName?.slice(0, 1)}
										{user?.lastName?.slice(0, 1)}
									</AvatarFallback>
								</Avatar>
							</div>
						</div>
					)}

					{isEdit ? (
						<div className="bg-[#181A20] rounded-lg p-8 text-center">
							<h1 className="text-xl font-bold text-white mb-2">Edit Profile</h1>
						</div>
					) : (
						<>
							<div className="flex justify-center items-center">
								<Button
									variant="filled"
									className="px-4 text-xs font-semibold my-4"
									onClick={() => setIsEdit(true)}>
									Edit Profile
								</Button>
							</div>

							<h1 className="text-xl font-bold text-white mb-2">
								{user?.firstName} {user?.lastName}
							</h1>
						</>
					)}
					<p className="text-gray-400 text-sm">Update your profile information and settings</p>
				</div>

				{isEdit ? (
					<div className="bg-[#181A20] rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 md:gap-8 px-4 py-6 md:p-6 space-y-8">
						<h2 className="font-semibold mb-4 col-span-2">Basic Information</h2>
						<TextField
							label="First Name"
							className="col-span-2 md:col-span-1"
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
							className="col-span-2 md:col-span-1"
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

						{/* <TextField
							label="Phone number"
							className="col-span-2 md:col-span-1"
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
						/> */}
					</div>
				) : (
					<SettingSection title="Personal Information" items={personalInfo} />
				)}

				{isEdit ? (
					<div className="bg-[#181A20] rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 md:gap-8 px-4 py-6 md:p-6 ">
						<h2 className="font-semibold mb-4 col-span-2">Password Management</h2>
						<PasswordTextField
							className="col-span-2 mb-8"
							label="Current Password"
							InputProps={{
								...register('currentPassword', {
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
							helperText={errors?.currentPassword?.message}
						/>

						<PasswordTextField
							className="col-span-2 mb-8"
							label="New Password"
							InputProps={{
								...register('newPassword', {
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
							helperText={errors?.newPassword?.message}
						/>

						<PasswordTextField
							className="col-span-2"
							label="Confirm Password"
							InputProps={{
								onChange(e) {
									setConfirmPassword(e.target.value);
								},
							}}
							helperText={newPassword && newPassword !== confirmPassword ? 'Passwords do not match' : undefined}
						/>

						<Button
							fullWidth
							loading={_isChangingPassword}
							onClick={handleSubmit(async (data) => {
								await _changePassword({ oldPassword: data.currentPassword!, newPassword: data.newPassword! });
								setIsEdit(false);
							})}
							variant="filled"
							className="py-3 text-sm font-semibold max-md:mt-4 mb-4 col-span-2">
							Update Password
						</Button>
					</div>
				) : (
					<SettingSection title="Security Settings" items={securitySettings} />
				)}

				<SettingSection title="Account Preferences" items={accountPreferences} />

				{isEdit && (
					<Button
						fullWidth
						loading={_isUpdatingCustomerInfo}
						onClick={handleSubmit(submit)}
						variant="filled"
						className="py-3 text-sm font-semibold mb-4">
						Save Changes
					</Button>
				)}
			</div>
		</section>
	);
};

export default ProfilePage;
