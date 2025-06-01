'use client';

import { merchantSidebarLinks } from '@/lib/data/sidebar';
import { useSidebar } from '@/lib/store/global.store';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LuLogOut, LuMenu } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import Logo from '@/components/common/logo';
import { signOut } from '@/lib/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/lib/store/auth.store';
import Cookies from 'js-cookie';

const MerchantDashboardSidebar = () => {
	const { resetUser } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const { isSidebarOpen, toggleSidebar } = useSidebar();
	const { mutateAsync: triggerSignOut, isPending: _signingOut } = useMutation({
		mutationKey: ['auth', 'merchant-sign-out'],
		mutationFn: signOut,
		onSuccess: () => {
			resetUser();
			Cookies.remove('access_token');
			Cookies.remove('refresh_token');
			toastSuccess('Logged out successfully');
			router.push('/login');
		},
	});

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				onClick={toggleSidebar}
				className="lg:hidden fixed top-3 right-4 z-50 p-2 rounded-md bg-background text-white">
				{isSidebarOpen ? <MdClose size={24} /> : <LuMenu size={24} />}
			</button>

			{/* Overlay for mobile */}
			{isSidebarOpen && (
				<div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={toggleSidebar} />
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					'fixed lg:static top-0 left-0 h-screen z-40 py-8 px-6',
					'duration-300 overflow-y-auto bg-background',
					'lg:w-[285px] lg:translate-x-0',
					isSidebarOpen ? 'w-full translate-x-0' : 'w-[55px] -translate-x-full lg:translate-x-0',
					'scrollbar-none'
				)}>
				{/* Logo or Header */}
				{isSidebarOpen && (
					<motion.div
						className="max-md:mb-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						variants={{
							hidden: { opacity: 0, x: -30 },
							visible: { opacity: 1, x: 0 },
						}}>
						<Logo />
					</motion.div>
				)}

				{/* Navigation Links */}
				<motion.ul
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
					className="space-y-8 md:space-y-8 md:mt-8">
					{merchantSidebarLinks.map((link, index) => {
						const is_current_route = pathname.startsWith(link.href);

						return (
							<motion.div
								key={index}
								variants={{
									hidden: {
										opacity: 0,
										y: 20,
									},
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.5,
										},
									},
								}}>
								<Link
									href={link?.href}
									className={cn(
										'flex gap-4 p-4 rounded-md',
										'items-center cursor-pointer',
										'transition-all duration-300 text-sm',
										'text-gray-400 hover:bg-[#242424] hover:text-primary',
										is_current_route && 'border-[#242424] bg-[#242424] text-primary font-bold'
									)}
									onClick={() => {
										if (window.innerWidth < 1024) {
											toggleSidebar();
										}
									}}>
									<span className={cn('text-[1.1rem]', is_current_route ? 'text-primary' : '')}>{link.icon}</span>
									{/* <p className="hidden md:block">{link.name}</p> */}
									{isSidebarOpen && link.name}
								</Link>
							</motion.div>
						);
					})}

					<motion.li
						variants={{
							hidden: {
								opacity: 0,
								y: 20,
							},
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.5,
								},
							},
						}}
						className={cn(
							'py-3 px-4 text-sm flex items-center gap-4',
							'hover:text-primary hover:font-bold cursor-pointer duration-200',
							'text-gray-400 hover:bg-[#242424] hover:text-red-600',
							'rounded-md',
							_signingOut && 'text-red-600 font-bold animate-pulse'
						)}
						onClick={async () => await triggerSignOut()}>
						<LuLogOut />
						{/* <p className="hidden lg:block">Sign Out</p> */}
						{isSidebarOpen && <span>Sign Out</span>}
					</motion.li>
				</motion.ul>
			</aside>
		</>
	);
};

export default MerchantDashboardSidebar;
