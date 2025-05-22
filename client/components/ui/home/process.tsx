'use client';

import { OperationProcess } from '@/lib/data';
import { motion } from 'framer-motion';

const Process = () => {
	return (
		<section id="process" className="px-4 sm:px-8 lg:px-12 py-16 bg-[#111326]">
			<motion.h2
				className="text-2xl font-bold mx-auto text-center"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 0.5, delay: 0.5 }}
				variants={{
					hidden: { opacity: 0, y: 30 },
					visible: { opacity: 1, y: 0 },
				}}>
				How TradeHub Works
			</motion.h2>
			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 gap-8"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
				transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}>
				{OperationProcess.map((process) => {
					return (
						<motion.div
							className="flex flex-col justify-center items-center"
							key={process.id}
							variants={{
								hidden: {
									opacity: 0,
									y: 30,
								},
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.8,
									},
								},
							}}>
							<div className="flex justify-center items-center w-10 h-10 p-1.5 rounded-full bg-primary hover:scale-[1.05] transition-all duration-300 cursor-pointer">
								{process.icon}
							</div>
							<h3 className="font-medium mt-4.5">{process.name}</h3>
							<p className="text-center text-gray-400 text-sm mt-2.5">{process.description}</p>
						</motion.div>
					);
				})}
			</motion.div>
		</section>
	);
};
export default Process;
