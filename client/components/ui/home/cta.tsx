'use client';

import Button from '@/components/common/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const CTA = () => {
	const router = useRouter();
	return (
		<section id="cta" className="px-4 sm:px-8 lg:px-12 py-16 bg-[#0A0C1B]">
			<motion.div
				className="relative flex flex-col justify-center items-center rounded-3xl overflow-hidden p-10 md:p-16 text-center"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 0.6 }}
			>
				{/* Gradient background */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-blue-600/70 to-indigo-600/80" />
				{/* Animated orbs */}
				<motion.div
					className="absolute top-[-60px] left-[-60px] w-[250px] h-[250px] rounded-full bg-white/10 blur-[80px]"
					animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
					transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
				/>
				<motion.div
					className="absolute bottom-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-white/10 blur-[80px]"
					animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
					transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
				/>
				{/* Grid overlay pattern */}
				<div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:40px_40px]" />

				{/* Content */}
				<div className="relative z-10 space-y-6 max-w-lg">
					<motion.span
						className="inline-block px-4 py-1 text-xs font-medium rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm"
						initial={{ opacity: 0, y: -10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: 0.2 }}
					>
						🌟 Join thousands of happy traders
					</motion.span>

					<motion.h2
						className="text-2xl md:text-4xl font-bold text-white leading-tight"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						Join the Movement.<br />Trade Locally.
					</motion.h2>

					<motion.p
						className="text-white/80 text-sm md:text-base max-w-[500px] mx-auto"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.5 }}
					>
						Be part of a growing community that supports local businesses and strengthens our economy.
					</motion.p>

					<motion.div
						className="flex gap-4 justify-center flex-wrap"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.7 }}
					>
						<Button
							variant="filled"
							className="bg-white! border-white! text-primary! hover:text-white! hover:bg-white/10! px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
							onClick={() => router.push('/sign-up')}
						>
							Get Started — It&apos;s Free
						</Button>
						<Button
							variant="outline"
							className="border-white/40! text-white! hover:bg-white/10! px-6 rounded-xl"
							onClick={() => router.push('/login')}
						>
							Log In
						</Button>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
};
export default CTA;
