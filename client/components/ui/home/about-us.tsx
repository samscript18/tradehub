'use client';

import { aboutImg } from '@/public/images';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AboutData, AboutInfo } from '@/lib/data';

const AboutUs = () => {
	return (
		<section id="about-us" className="relative py-20 px-4 sm:px-8 lg:px-12 bg-[#0A0C1B] overflow-hidden">
			{/* Background decoration */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/4 blur-[120px] rounded-full pointer-events-none" />

			{/* Section heading */}
			<div className="text-center mb-16 relative z-10">
				<motion.span
					className="inline-block px-4 py-1 text-xs font-medium rounded-full border border-primary/30 bg-primary/10 text-primary mb-4"
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
				>
					Our Story
				</motion.span>
				<motion.h2
					className="text-2xl md:text-3xl font-bold text-white"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					Who We Are
				</motion.h2>
				<motion.p
					className="text-slate-400 text-sm mt-3"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					Built for locals. Powered by community.
				</motion.p>
			</div>

			<div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-10 mt-4 relative z-10">
				{/* Left: Text + Feature cards */}
				<div className="flex flex-col w-full md:max-w-[550px]">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="relative bg-white/[0.02] backdrop-blur-md border-l-[3px] border-l-primary/60 border border-white/[0.06] p-5 rounded-r-2xl rounded-bl-2xl shadow-md hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,107,239,0.12)] transition-all duration-400 cursor-pointer mb-8 space-y-4"
					>
						<p className="text-sm tracking-wide leading-7 text-slate-300">
							TradeHub is revolutionizing local commerce by creating meaningful connections between neighborhood
							merchants and nearby buyers. We&apos;re building a digital marketplace that preserves the personal
							touch of local shopping while providing modern convenience. We are your neighborhood&apos;s digital
							marketplace, bridging the gap between local merchants and community buyers.
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 mt-4 gap-4"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
						variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
					>
						{AboutData.map((about) => {
							return (
								<motion.div
									className="group flex justify-start items-start bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-primary/30 p-4 rounded-2xl hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(45,107,239,0.10)] transition-all duration-400 cursor-pointer"
									key={about.id}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
									}}
								>
									<motion.div
										className="flex-shrink-0 flex justify-center items-center w-10 h-10 p-2 rounded-xl bg-primary/15 border border-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_16px_rgba(45,107,239,0.25)] transition-all duration-400 mr-4"
										whileHover={{ scale: 1.1 }}
									>
										{about.icon}
									</motion.div>
									<div className="space-y-1.5">
										<h3 className="font-semibold text-slate-100">{about.name}</h3>
										<p className="text-slate-400 text-sm tracking-wide leading-6">{about.description}</p>
									</div>
								</motion.div>
							);
						})}
					</motion.div>
				</div>

				{/* Right: Image + Stats */}
				<motion.div
					className="w-full md:max-w-[520px]"
					initial={{ opacity: 0, x: 30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<div className="relative">
						<div className="absolute inset-0 rounded-3xl bg-primary/10 blur-[60px] scale-90 -z-10" />
						<Image src={aboutImg} alt={'about-img'} width={550} height={450} className="object-contain drop-shadow-xl" />
					</div>

					<motion.div
						className="grid grid-cols-2 gap-4 mt-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.4 }}
						variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
					>
						{AboutInfo.map((info) => {
							return (
								<motion.div
									className="group flex flex-col justify-center items-center p-4 bg-white/[0.02] border border-white/[0.06] hover:border-primary/30 rounded-2xl hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(45,107,239,0.10)] transition-all duration-400 cursor-pointer"
									key={info.id}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
									}}
								>
									<motion.div
										className="flex justify-center items-center w-10 h-10 p-1.5 rounded-xl bg-primary/15 border border-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_16px_rgba(45,107,239,0.25)] transition-all duration-400"
										whileHover={{ scale: 1.1 }}
									>
										{info.icon}
									</motion.div>
									<h3 className="font-bold text-2xl mt-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">{info.value}</h3>
									<p className="text-center text-slate-400 text-[12px] mt-1.5 capitalize">{info.title}</p>
								</motion.div>
							);
						})}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};
export default AboutUs;
