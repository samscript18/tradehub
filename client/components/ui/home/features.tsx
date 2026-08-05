'use client';

import { Features as FeaturesData } from '@/lib/data';
import { motion } from 'framer-motion';

const Features = () => {
	return (
		<section id="features" className="relative px-4 sm:px-8 lg:px-12 py-20 bg-[#0A0C1B] overflow-hidden">
			{/* Background decorations */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

			<div className="text-center mb-16 relative z-10">
				<motion.span
					className="inline-block px-4 py-1 text-xs font-medium rounded-full border border-primary/30 bg-primary/10 text-primary mb-4"
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
				>
					Our Advantages
				</motion.span>
				<motion.h2
					className="text-2xl md:text-3xl font-bold text-white"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					Why Choose TradeHub
				</motion.h2>
				<motion.div
					className="flex items-center justify-center gap-2 mt-3"
					initial={{ opacity: 0, scaleX: 0 }}
					whileInView={{ opacity: 1, scaleX: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<div className="w-12 h-px bg-primary/50" />
					<div className="w-2 h-2 rounded-full bg-primary" />
					<div className="w-12 h-px bg-primary/50" />
				</motion.div>
			</div>

			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1 }}
				variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
			>
				{FeaturesData.map((feature) => {
					return (
						<motion.div
							className="group relative flex flex-col justify-start items-start bg-white/[0.02] backdrop-blur-md border border-white/[0.07] hover:border-primary/35 p-5 rounded-2xl transition-all duration-400 cursor-pointer hover:bg-white/[0.05] hover:shadow-[0_8px_40px_rgba(45,107,239,0.12)] hover:-translate-y-1 overflow-hidden"
							key={feature.id}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
							}}
						>
							{/* Top accent border */}
							<div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

							{/* Shimmer overlay */}
							<div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

							<motion.div
								className="flex justify-center items-center w-11 h-11 p-2.5 rounded-xl bg-primary/15 border border-primary/20 group-hover:bg-primary/25 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(45,107,239,0.3)] transition-all duration-400"
								whileHover={{ scale: 1.1, rotate: 5 }}
							>
								{feature.icon}
							</motion.div>
							<h3 className="font-semibold text-slate-100 mt-5">{feature.name}</h3>
							<p className="text-slate-400 text-sm mt-2.5 leading-relaxed">{feature.description}</p>
						</motion.div>
					);
				})}
			</motion.div>
		</section>
	);
};
export default Features;
