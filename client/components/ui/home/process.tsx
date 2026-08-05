'use client';

import { OperationProcess } from '@/lib/data';
import { motion } from 'framer-motion';

const Process = () => {
	return (
		<section id="process" className="relative px-4 sm:px-8 lg:px-12 py-20 bg-[#111326] overflow-hidden">
			{/* Background glow */}
			<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

			<div className="text-center mb-4">
				<motion.span
					className="inline-block px-4 py-1 text-xs font-medium rounded-full border border-primary/30 bg-primary/10 text-primary mb-4"
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
				>
					Simple Steps
				</motion.span>
				<motion.h2
					className="text-2xl md:text-3xl font-bold text-white"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					How TradeHub Works
				</motion.h2>
				<motion.p
					className="text-slate-400 text-sm mt-3 max-w-md mx-auto"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					Getting started is quick and easy. Follow these simple steps to begin your journey.
				</motion.p>
			</div>

			<motion.div
				className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-14 gap-6"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
			>
				{/* Connecting line on desktop */}
				<div className="hidden lg:block absolute top-[52px] left-[13%] right-[13%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

				{OperationProcess.map((process, i) => {
					return (
						<motion.div
							className="flex flex-col justify-start items-center relative group"
							key={process.id}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
							}}
						>
							{/* Step number */}
							<div className="absolute -top-4 -left-2 text-[80px] font-black text-white/[0.04] leading-none select-none pointer-events-none">
								{String(i + 1).padStart(2, '0')}
							</div>

							{/* Icon */}
							<motion.div
								className="relative flex justify-center items-center w-[56px] h-[56px] p-3 rounded-2xl bg-primary/15 border border-primary/20 group-hover:border-primary/50 group-hover:bg-primary/25 group-hover:shadow-[0_0_25px_rgba(45,107,239,0.3)] transition-all duration-400 z-10"
								whileHover={{ scale: 1.1 }}
							>
								{process.icon}
							</motion.div>

							<div className="mt-6 text-center px-2">
								<h3 className="font-semibold text-slate-100 text-[15px]">{process.name}</h3>
								<p className="text-center text-slate-400 text-sm mt-2.5 leading-relaxed">{process.description}</p>
							</div>
						</motion.div>
					);
				})}
			</motion.div>
		</section>
	);
};
export default Process;
