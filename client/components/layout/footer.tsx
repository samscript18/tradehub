'use client';

import Link from 'next/link';
import Logo from '../common/logo';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
	return (
	<footer className="bg-[#111326] text-gray-300 px-4 py-12 sm:px-8 lg:px-12">
		<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
				<motion.p
					className="text-sm leading-6 mt-4"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: { opacity: 1, y: 0 },
					}}>
					Empowering local commerce through technology.
				</motion.p>
			</motion.div>

			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
				transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}>
				<motion.h4
					className="text-white font-medium mb-3"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: { opacity: 1, y: 0 },
					}}>
					Quick Links
				</motion.h4>
				<ul className="space-y-2 text-sm">
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
						}}>
						<Link href="/#about-us" className="hover:underline hover:text-primary duration-300">
							About Us
						</Link>
					</motion.li>
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
						}}>
						<Link href="/#contact-us" className="hover:underline hover:text-primary duration-300">
							Contact
						</Link>
					</motion.li>
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
						}}>
						<Link href="/sign-up" className="hover:underline hover:text-primary duration-300">
							Merchant Signup
						</Link>
					</motion.li>
				</ul>
			</motion.div>

			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
				transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}>
				<motion.h4
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: { opacity: 1, y: 0 },
					}}
					className="text-white font-medium mb-3">
					Legal
				</motion.h4>
				<ul className="space-y-2 text-sm">
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
						}}>
						<Link href="#" className="hover:underline hover:text-primary duration-300">
							Terms of Service
						</Link>
					</motion.li>
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
						}}>
						<Link href="#" className="hover:underline hover:text-primary duration-300">
							Privacy Policy
						</Link>
					</motion.li>
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
						}}>
						<Link href="#" className="hover:underline hover:text-primary duration-300">
							Cookie Policy
						</Link>
					</motion.li>
				</ul>
			</motion.div>

			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
				transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}>
				<motion.h4
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: { opacity: 1, y: 0 },
					}}
					className="text-white font-medium mb-3">
					Connect
				</motion.h4>
				<ul className="text-sm flex gap-4 mt-4">
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
						className="bg-primary p-1.5 rounded-md hover:scale-[1.05] transition-all duration-300 cursor-pointer">
						<a href="#" className="hover:underline hover:text-secondary duration-300">
							<FaFacebookF className="text-white" />
						</a>
					</motion.li>
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
						className="bg-primary p-1.5 rounded-md hover:scale-[1.05] transition-all duration-300 cursor-pointer">
						<a href="#" className="hover:underline hover:text-secondary duration-300">
							<FaInstagram className="text-white" />
						</a>
					</motion.li>
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
						className="bg-primary p-1.5 rounded-md hover:scale-[1.05] transition-all duration-300 cursor-pointer">
						<a href="#" className="hover:underline hover:text-secondary duration-300">
							<FaTwitter className="text-white" />
						</a>
					</motion.li>
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
						className="bg-primary p-1.5 rounded-md hover:scale-[1.05] transition-all duration-300 cursor-pointer">
						<a href="#" className="hover:underline hover:text-secondary duration-300">
							<FaLinkedinIn className="text-white" />
						</a>
					</motion.li>
				</ul>
			</motion.div>
		</div>

		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.5 }}
			transition={{ duration: 0.5, delay: 0.8 }}
			variants={{
				hidden: { opacity: 0, y: 30 },
				visible: { opacity: 1, y: 0 },
			}}
			className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
			&copy; {new Date().getFullYear()} TradeHub. All rights reserved.
		</motion.div>
	</footer>
);
}
