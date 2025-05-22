'use client';

import { Stories as StoriesData } from '@/lib/data';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Stories = () => {
	return (
		<section id="stories" className="px-4 sm:px-8 lg:px-12 py-16 bg-[#111326]">
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
				Community Stories
			</motion.h2>
			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16 gap-8"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
				transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}>
				{StoriesData.map((story) => {
					return (
						<motion.div
							className="flex flex-col justify-start items-start bg-[#0A0C1B] p-4 rounded-md hover:scale-[1.05] transition-all duration-300 cursor-pointer shadow-md space-y-4"
							key={story.id}
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
							<div className="flex justify-start gap-1.5">
								<Image src={story.img} alt="user-img" width={40} height={40} className="object-contain" />
								<div className="space-y-1.5">
									<h4 className="font-medium text-sm">{story.name}</h4>
									<p className="text-gray-400 text-[12px]">{story.country}</p>
								</div>
							</div>
							<div className="flex justify-start gap-1.5">
								<FaStar size={12} className="text-primary" />
								<FaStar size={12} className="text-primary" />
								<FaStar size={12} className="text-primary" />
								<FaStar size={12} className="text-primary" />
								<FaStar size={12} className="text-primary" />
							</div>
							<p className="text-gray-400 text-sm">{story.comment}</p>
						</motion.div>
					);
				})}
			</motion.div>
		</section>
	);
};
export default Stories;
