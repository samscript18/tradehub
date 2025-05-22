'use client';

import Button from '@/components/common/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const CTA = () => {
	const router = useRouter();
	return (
		<section id="cta" className="px-4 sm:px-8 lg:px-12 py-16 bg-[#111326]">
			<div className="flex flex-col justify-center items-center bg-primary rounded-md shadow-md p-6 md:p-8 space-y-6">
				<motion.h2
					className="text-2xl font-bold mx-auto text-center"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: { opacity: 1, y: 0 },
					}}>
					Join the Movement. Trade Locally.
				</motion.h2>
				<motion.p
					className="text-sm w-full md:max-w-[550px] text-center"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: { opacity: 1, y: 0 },
					}}>
					Be part of a growing community that supports local businesses and strengthens our economy.
				</motion.p>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: { opacity: 1, y: 0 },
					}}>
					<Button
						variant="filled"
						className="bg-white border border-white text-primary hover:text-white"
						onClick={() => router.push('/sign-up')}>
						Get Started
					</Button>
				</motion.div>
			</div>
		</section>
	);
};
export default CTA;
