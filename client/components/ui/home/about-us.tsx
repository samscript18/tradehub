'use client';

import { aboutImg } from '@/public/images';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AboutData, AboutInfo } from '@/lib/data';

const AboutUs = () => {
	return (
		<section id="about-us" className="py-16 px-4 sm:px-8 lg:px-12 bg-[#0A0C1B]">
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
				Who We Are
			</motion.h2>
			<motion.p
				className="text-gray-400 text-sm mt-2.5 text-center"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 0.5, delay: 0.7 }}
				variants={{
					hidden: { opacity: 0, y: 30 },
					visible: { opacity: 1, y: 0 },
				}}>
				Built for locals. Powered by community
			</motion.p>
			<div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-8 mt-16">
				<div className="flex flex-col w-full md:max-w-[550px]">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.75 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}
						className="bg-[#111326] p-4 rounded-md shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer mb-10 space-y-8">
						<motion.p
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5, delay: 0.85 }}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0 },
							}}
							className="text-sm tracking-wide leading-6">
							TradeHub is revolutionizing local commerce by creating meaningful connections between neighborhood
							merchants and nearby buyers. We&#39;re building a digital marketplace that preserves the personal
							touch of local shopping while providing modern convenience. We are your neighborhood&#39;s digital
							marketplace, bridging the gap between local merchants and community buyers. We&#39;re transforming
							how communities shop and support local businesses, making it easier than ever to keep commerce close
							to home.
						</motion.p>
					</motion.div>
					<motion.div
						className="grid grid-cols-1 mt-8 gap-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ staggerChildren: 0.2, delayChildren: 0.7 }}>
						{AboutData.map((about) => {
							return (
								<motion.div
									className="flex justify-start items-start bg-[#111326] p-3 rounded-md hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md"
									key={about.id}
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
									<div className="flex justify-center items-center w-10 h-10 p-3 rounded-full bg-primary hover:scale-[1.05] transition-all duration-300 cursor-pointer mr-4 md:mr-8">
										{about.icon}
									</div>
									<div className="space-y-2">
										<h3 className="font-medium">{about.name}</h3>
										<p className="text-gray-400 text-sm tracking-wide leading-6">{about.description}</p>
									</div>
								</motion.div>
							);
						})}
					</motion.div>
				</div>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					variants={{
						hidden: { opacity: 0, y: -30 },
						visible: { opacity: 1, y: 0 },
					}}>
					<motion.div
						className="w-full"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 1 }}
						variants={{
							hidden: { opacity: 0, x: 30 },
							visible: { opacity: 1, x: 0 },
						}}>
						<Image src={aboutImg} alt={'about-img'} width={550} height={450} className="object-contain" />
					</motion.div>
					<motion.div
						className="grid grid-cols-2 gap-4 mt-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ staggerChildren: 0.2, delayChildren: 0.7 }}>
						{AboutInfo.map((info) => {
							return (
								<motion.div
									className="flex flex-col justify-center items-center p-2.5 bg-[#111326] rounded-md hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md"
									key={info.id}
									variants={{
										hidden: {
											opacity: 0,
										},
										visible: {
											opacity: 1,
											transition: {
												duration: 1.1,
											},
										},
									}}>
									<div className="flex justify-center items-center w-10 h-10 p-1.5 rounded-full bg-primary hover:scale-[1.05] transition-all duration-300 cursor-pointer">
										{info.icon}
									</div>
									<h3 className="font-bold text-xl mt-4.5">{info.value}</h3>
									<p className="text-center text-gray-400 text-[12px] mt-2.5 capitalize">{info.title}</p>
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
