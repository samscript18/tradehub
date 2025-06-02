'use client';
import Button from '@/components/common/button';
import { Rating } from '@/components/common/rating';
import { categories, merchantStores, newProducts } from '@/lib/data';
import { homeBgImg } from '@/public/images';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStore } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';

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
					className="max-md:w-full flex max-lg:overflow-x-scroll gap-3 md:gap-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ staggerChildren: 0.2, delayChildren: 0.7 }}>
					{categories.map((category) => {
						return (
							<motion.div
								className="flex flex-col justify-center items-center min-w-[130px] md:w-[130px] bg-[#1E2A3B] py-3 px-1 rounded-md hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md space-y-2.5"
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
				<div className="flex justify-between items-center mt-6 md:mt-8">
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
						className="text-xs text-primary cursor-pointer"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}>
						View All{' '}
						<span className="inline-block ">
							<IoIosArrowForward className="text-primary" />
						</span>
					</motion.p>
				</div>
				<motion.div
					className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ staggerChildren: 0.2, delayChildren: 0.7 }}>
					{merchantStores.map((merchant) => {
						return (
							<motion.div
								className="flex flex-col min-w-[170px] md:w-[230px] rounded-md hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md"
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
								<Image
									src={merchant.img}
									alt={merchant.name}
									width={350}
									height={180}
									className="w-full h-full rounded-t-xl"
								/>
								<div className="bg-[#1E2A3B] p-2 space-y-2 shadow-md rounded-b-xl">
									<h3 className="text-sm font-bold">{merchant.name}</h3>
									<Rating initialRating={merchant.rating} readonly size="sm" className="gap-1" />
									<motion.div
										className="flex gap-4 flex-wrap"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: true, amount: 0.5 }}
										transition={{ staggerChildren: 0.2, delayChildren: 0.7 }}>
										{merchant.categories.map((category) => {
											return (
												<motion.div
													className="bg-primary/15 p-1.5 rounded-full shadow-md cursor-pointer flex justify-center items-center"
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
													<p className="text-[10px] text-primary">{category.name}</p>
												</motion.div>
											);
										})}
									</motion.div>
									<Button fullWidth variant="filled" className="px-4 py-1.5 w-full font-normal mt-1 text-xs">
										View Store
									</Button>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
				<div className="flex justify-between items-center mt-6 md:mt-8">
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
						New Arrivals
					</motion.h2>
					<motion.p
						className="text-xs text-primary cursor-pointer"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}>
						View All{' '}
						<span className="inline-block ">
							<IoIosArrowForward className="text-primary" />
						</span>
					</motion.p>
				</div>
				<motion.div
					className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ staggerChildren: 0.2, delayChildren: 0.7 }}>
					{newProducts.map((product) => {
						return (
							<motion.div
								className="flex flex-col min-w-[170px] md:w-[230px] rounded-md hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md"
								key={product.id}
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
								<Image
									src={product.img}
									alt={product.name}
									width={350}
									height={180}
									className="w-full h-full rounded-t-xl"
								/>
								<div className="bg-[#1E2A3B] p-2 space-y-2 shadow-md rounded-b-xl">
									<h3 className="text-[13px] font-bold">{product.name}</h3>
									<p className="text-xs text-gray-300">{product.merchant}</p>
									<div className="flex max-lg:flex-col justify-between items-start lg:items-center">
										<h4 className="text-sm font-bold">{product.price}</h4>
										<Button variant="filled" className="px-4 py-1.5 w-full font-normal mt-1 text-xs max-lg:hidden">
											Add to cart
										</Button>
										<Button
											fullWidth
											variant="filled"
											className="px-4 py-1.5 w-full font-normal mt-1 text-xs lg:hidden">
											Add to cart
										</Button>
									</div>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
				<div className="flex max-md:flex-col justify-between items-center gap-6 mt-6">
					<div className="w-full flex justify-between items-center gap-8 bg-gradient-to-r from-primary to-primary/20 rounded-md shadow-md p-3">
						<div className="space-y-2">
							<motion.h2
								className="text-xl font-bold"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.5 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: { opacity: 1, y: 0 },
								}}>
								Fast Delivery on Orders.
							</motion.h2>
							<motion.p
								className="text-xs text-gray-200"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.5 }}
								transition={{ duration: 0.5, delay: 0.5 }}
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: { opacity: 1, y: 0 },
								}}>
								Accelerated speeds on deliveries.
							</motion.p>
							<motion.div
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.5 }}
								transition={{ duration: 0.5, delay: 0.8 }}
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: { opacity: 1, y: 0 },
								}}>
								<Button
									variant="filled"
									className="bg-white border border-white text-primary hover:text-white px-4 py-2 text-xs">
									Shop Now
								</Button>
							</motion.div>
						</div>
						<div className="flex justify-center items-center">
							<FaTruck size={100} className="text-gray-200" />
						</div>
					</div>
					<div className="w-full flex justify-between items-center gap-8 bg-gradient-to-r from-primary to-primary/20 rounded-md shadow-md p-3">
						<div className="space-y-2">
							<motion.h2
								className="text-xl font-bold"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.5 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: { opacity: 1, y: 0 },
								}}>
								Local Business Week.
							</motion.h2>
							<motion.p
								className="text-xs text-gray-200"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.5 }}
								transition={{ duration: 0.5, delay: 0.5 }}
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: { opacity: 1, y: 0 },
								}}>
								Special deals and discounts.
							</motion.p>
							<motion.div
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.5 }}
								transition={{ duration: 0.5, delay: 0.8 }}
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: { opacity: 1, y: 0 },
								}}>
								<Button
									variant="filled"
									className="bg-white border border-white text-primary hover:text-white px-4 py-2 text-xs">
									Learn More
								</Button>
							</motion.div>
						</div>
						<div className="flex justify-center items-center">
							<FaStore size={100} className="text-gray-200" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default HomeDashboard;
