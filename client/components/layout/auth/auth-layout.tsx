import React, { FC, ReactNode } from 'react';
import Image from 'next/image';
import { authImg } from '@/public/images';
import { motion } from 'framer-motion';

interface Props {
	children: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
	return (
		<main className="flex flex-col items-center min-h-screen bg-[#090d12]">
			{/* Background orbs */}
			<div className="fixed top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" />
			<div className="fixed bottom-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none z-0" />

			<div className="relative z-10 w-full min-h-screen flex justify-between items-stretch max-md:flex-col">
				{/* Left panel - decorative */}
				<div className="hidden md:flex w-full md:max-w-[45%] min-h-screen bg-gradient-to-br from-[#0f1629] to-[#111326] border-r border-white/[0.05] px-8 py-10 flex-col justify-center items-center gap-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<div className="relative mb-8">
							<div className="absolute inset-0 rounded-3xl bg-primary/15 blur-[50px] scale-90 -z-10" />
							<Image src={authImg} alt="auth-img" width={420} height={420} className="object-cover rounded-2xl shadow-2xl" />
						</div>
						<h1 className="text-2xl md:text-3xl font-bold text-white">Connect. Trade. Thrive</h1>
						<p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xs mx-auto">
							Connect with your local community marketplace and start trading today.
						</p>
						{/* Trust badges */}
						<div className="flex items-center justify-center gap-4 mt-8">
							{['500+ Merchants', '98% Satisfaction', 'Safe & Secure'].map((badge, i) => (
								<span key={i} className="px-3 py-1 text-[11px] rounded-full bg-primary/15 border border-primary/20 text-primary font-medium">
									{badge}
								</span>
							))}
						</div>
					</motion.div>
				</div>

				{/* Right panel - form */}
				<motion.div
					className="w-full md:flex-1 min-h-screen py-10 px-4 md:px-12 flex flex-col justify-center overflow-y-auto"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{children}
				</motion.div>
			</div>
		</main>
	);
};

export default AuthLayout;
