'use client';

import { Stories as StoriesData } from '@/lib/data';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Stories = () => {
	return (
		<section id="stories" className="relative px-4 sm:px-8 lg:px-12 py-20 bg-[#111326] overflow-hidden">
			{/* Background glow */}
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

			<div className="text-center mb-16 relative z-10">
				<motion.span
					className="inline-block px-4 py-1 text-xs font-medium rounded-full border border-primary/30 bg-primary/10 text-primary mb-4"
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
				>
					Testimonials
				</motion.span>
				<motion.h2
					className="text-2xl md:text-3xl font-bold text-white"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					Community Stories
				</motion.h2>
				<motion.p
					className="text-slate-400 text-sm mt-3"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					What our community says about us
				</motion.p>
			</div>

			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1 }}
				variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
			>
				{StoriesData.map((story) => {
					return (
						<motion.div
							className="group relative flex flex-col justify-start items-start bg-white/[0.02] backdrop-blur-md border border-white/[0.07] hover:border-primary/30 p-6 rounded-2xl cursor-pointer hover:shadow-[0_8px_40px_rgba(45,107,239,0.10)] hover:-translate-y-1 transition-all duration-400 overflow-hidden"
							key={story.id}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
							}}
						>
							{/* Large decorative quote mark */}
							<div className="absolute top-4 right-5 text-6xl font-black text-primary/10 leading-none select-none pointer-events-none">&ldquo;</div>

							{/* User info */}
							<div className="flex justify-start gap-3 w-full">
								<Image src={story.img} alt="user-img" width={44} height={44} className="object-cover rounded-full w-11 h-11 border-2 border-primary/20" />
								<div className="space-y-0.5">
									<h4 className="font-semibold text-sm text-slate-100">{story.name}</h4>
									<p className="text-slate-500 text-[12px]">{story.country}</p>
								</div>
							</div>

							{/* Divider */}
							<div className="w-full h-px bg-white/[0.05] my-4" />

							{/* Stars */}
							<motion.div
								className="flex justify-start gap-1"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
							>
								{[...Array(5)].map((_, i) => (
									<motion.div
										key={i}
										variants={{
											hidden: { opacity: 0, scale: 0.5 },
											visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
										}}
									>
										<FaStar size={13} className="text-amber-400" />
									</motion.div>
								))}
							</motion.div>

							<p className="text-slate-300 text-sm mt-3 leading-relaxed">{story.comment}</p>
						</motion.div>
					);
				})}
			</motion.div>
		</section>
	);
};
export default Stories;
