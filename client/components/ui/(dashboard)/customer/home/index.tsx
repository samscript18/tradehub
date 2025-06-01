'use client';
import { categories, merchantStores } from '@/lib/data';
import { homeBgImg } from '@/public/images';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MdArrowForward } from 'react-icons/md';

const HomeDashboard = () => {
	return (
		<section>
			<div
				className="py-16 bg-cover bg-center bg-no-repeat bg-background/65"
				style={{ backgroundImage: `url(${homeBgImg.src})`, backgroundBlendMode: 'overlay' }}>
				<div className="flex flex-col justify-center items-center space-y-4">
					<motion.h2
						className="text-3xl font-bold mx-auto text-center"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}>
						Support Your Local Businesses
					</motion.h2>
					<motion.p
						className="text-sm w-full md:max-w-[550px] text-center text-gray-200"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}>
						Discover unique products from merchants in your community.
					</motion.p>
				</div>
			</div>
			<div className="px-4 sm:px-6 flex flex-col my-8 space-y-6">
				<motion.h2
					className="text-md font-bold mt-2"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: { opacity: 1, y: 0 },
					}}>
					Browse Categories
				</motion.h2>
				<motion.div
					className="flex max-md:flex-col gap-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ staggerChildren: 0.2, delayChildren: 0.7 }}>
					{categories.map((category) => {
						return (
							<motion.div
								className="flex flex-col justify-center items-center w-[130px] bg-[#1E2A3B] py-3 px-1 rounded-md hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md space-y-2.5"
								key={category.id}
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
								<div>{category.icon}</div>
								<h3 className="text-xs">{category.name}</h3>
							</motion.div>
						);
					})}
				</motion.div>
				<div className="flex justify-between items-center mt-8">
					<motion.h2
						className="text-md font-bold"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}>
						Top Local Merchants
					</motion.h2>
					<motion.p
						className="text-sm text-primary"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}>
						View All{' '}
						<span className="inline-block">
							<MdArrowForward className="text-primary" />
						</span>
					</motion.p>
				</div>
				<motion.div
					className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ staggerChildren: 0.2, delayChildren: 0.7 }}>
					{merchantStores.map((merchant) => {
						return (
							<motion.div
								className="flex flex-col w-[150px] bg-[#1E2A3B] rounded-md hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md space-y-2.5"
								key={merchant.id}
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
								<Image src={merchant.img} alt={merchant.name} width={300} height={150} />
								<div className="">
									<h3 className="text-xs">{merchant.name}</h3>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
};
export default HomeDashboard;
