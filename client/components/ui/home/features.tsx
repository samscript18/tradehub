'use client';

import { Features as FeaturesData } from '@/lib/data';
import { motion } from 'framer-motion';

const Features = () => {
	return (
		<section id="features" className="px-4 sm:px-8 lg:px-12 py-16 bg-[#0A0C1B]">
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
				Why Choose TradeHub
			</motion.h2>
			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 gap-8"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
				transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}>
				{FeaturesData.map((feature) => {
					return (
						<motion.div
							className="flex flex-col justify-start items-start bg-[#111326] p-4 rounded-md hover:scale-[1.05] transition-all duration-300 cursor-pointer shadow-md"
							key={feature.id}
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
								{feature.icon}
							</div>
							<h3 className="font-medium mt-4.5">{feature.name}</h3>
							<p className="text-gray-400 text-sm mt-2.5">{feature.description}</p>
						</motion.div>
					);
				})}
			</motion.div>
		</section>
	);
};
export default Features;
