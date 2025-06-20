'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navLinks } from '@/lib/data';
import { useAuth } from '@/lib/store/auth.store';
import { Loader, UserCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { signOut } from '@/lib/services/auth.service';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Logo from '../common/logo';
import Button from '../common/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { user, resetUser } = useAuth();
	const router = useRouter();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: signOut,
		mutationKey: ['signout'],
		onSuccess() {
			toast.success('Signed out successfully');
			resetUser();
		},
	});

	return (
		<header className="absolute inset-x-0 top-0 z-50">
			<nav className="flex items-center justify-between py-6 px-4 md:p-6 lg:px-12" aria-label="Global">
				<div className="flex lg:flex-1">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}>
						<Logo />
					</motion.div>
				</div>
				<div className="flex lg:hidden">
					<motion.button
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}
						type="button"
						onClick={() => setMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white">
						<span className="sr-only">Open main menu</span>
						<svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</motion.button>
				</div>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ staggerChildren: 0.2, delayChildren: 0.8 }}
					className="hidden lg:flex lg:gap-x-12">
					{navLinks.map((link) => {
						return (
							<motion.div
								variants={{
									hidden: {
										opacity: 0,
										y: 20,
									},
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.8,
										},
									},
								}}
								key={link.name}>
								<Link
									href={link.link}
									className="text-sm font-medium text-white hover:text-primary hover:underline duration-500">
									{link.name}
								</Link>
							</motion.div>
						);
					})}
				</motion.div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					{!user && (
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5, delay: 0.9 }}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0 },
							}}
							className="w-[70%] flex gap-8">
							<Button fullWidth variant="outline" className="w-full" onClick={() => router.push('/login')}>
								Log in
							</Button>
							<Button fullWidth variant="filled" className="px-4 w-full" onClick={() => router.push('/sign-up')}>
								Sign up
							</Button>
						</motion.div>
					)}

					{user && (
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-3">
								<UserCircle />

								<p className="text-[.9rem] font-medium">
									{user?.firstName} {user?.lastName}
								</p>
							</div>
							<p className="text-[1.2rem] text-primary">⦿</p>
							<div
								className={cn(
									'flex items-center gap-3 text-red-500 hover:opacity-80 cursor-pointer',
									isPending && 'animate-pulse'
								)}
								onClick={() => mutateAsync()}>
								<p className="text-[.9rem] font-medium">{isPending ? 'Signing Out' : 'Sign Out'}</p>
								{isPending && <Loader className="animate-spin" />}
							</div>
						</div>
					)}
				</div>
			</nav>

			{/* Mobile menu */}
			{menuOpen && (
				<div className="lg:hidden fixed inset-0 z-50 bg-background px-6 py-6 overflow-y-auto sm:max-w-sm sm:ring-1 sm:ring-white/10 transition-all duration-700">
					<div className="flex items-center justify-between">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0 },
							}}>
							<Logo />
						</motion.div>
						<motion.button
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0 },
							}}
							type="button"
							onClick={() => setMenuOpen(false)}
							className="-m-2.5 rounded-md p-2.5 text-white">
							<span className="sr-only">Close menu</span>
							<svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</motion.button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<motion.div
								className="space-y-6 py-6 mt-8"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.5 }}
								transition={{ staggerChildren: 0.2, delayChildren: 0.8 }}>
								{navLinks.map((link) => {
									return (
										<motion.div
											key={link.name}
											variants={{
												hidden: {
													opacity: 0,
													y: 20,
												},
												visible: {
													opacity: 1,
													y: 0,
													transition: {
														duration: 0.8,
													},
												},
											}}>
											<div
												onClick={() => {
													router.push(link.link);
													setMenuOpen(false);
												}}
												className="block rounded-lg px-3 py-2 text-base font-medium text-white hover:text-primary hover:underline duration-500">
												{link.name}
											</div>
										</motion.div>
									);
								})}
							</motion.div>
							<div className="py-6 mt-8">
								{!user && (
									<motion.div
										className="w-full flex gap-4"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: true, amount: 0.5 }}
										transition={{ duration: 0.5, delay: 0.9 }}
										variants={{
											hidden: { opacity: 0, y: 30 },
											visible: { opacity: 1, y: 0 },
										}}>
										<Button fullWidth variant="outline" onClick={() => router.push('/login')}>
											Log in
										</Button>
										<Button fullWidth variant="filled" className="px-4" onClick={() => router.push('/sign-up')}>
											Sign up
										</Button>
									</motion.div>
								)}

								{user && (
									<>
										<div className="flex items-center gap-3">
											<UserCircle />

											<p className="text-[.9rem] font-medium">
												{user?.firstName} {user?.lastName}
											</p>
										</div>

										<div
											className={cn(
												'flex items-center gap-3 mt-4 text-red-500 cursor-pointer hover:opacity-90',
												isPending && 'animate-pulse'
											)}
											onClick={() => mutateAsync()}>
											{isPending && <Loader className="animate-spin" />}
											<p className="text-[.9rem] font-medium">{isPending ? 'Signing Out' : 'Sign Out'}</p>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;
