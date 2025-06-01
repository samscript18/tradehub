'use client';

import Button from '@/components/common/button';
import { heroImg } from '@/public/images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Hero = () => {
	const router = useRouter();
	return (
		<section
			id="home"
			className="pt-[8rem] pb-12 px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-center md:justify-between items-center gap-8">
			<div className="flex flex-col w-full md:max-w-[540px] text-center md:text-start">
				<motion.h1
					className="text-[33px] md:text-4xl font-bold leading-12 tracking-wide"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					variants={{
						hidden: { opacity: 0, x: -50 },
						visible: { opacity: 1, x: 0 },
					}}>
					Empowering Local Merchants. Delivering to Your Doorstep.
				</motion.h1>
				<motion.p
					className="text-gray-400 text-sm mt-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					variants={{
						hidden: { opacity: 0, x: -50 },
						visible: { opacity: 1, x: 0 },
					}}>
					Connect with trusted local sellers and get same-day delivery. Support your community while shopping
					conveniently.
				</motion.p>
				<motion.div
					className="w-full md:w-[70%] flex gap-4 md:gap-8 mt-10"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 1.5 }}
					variants={{
						hidden: { opacity: 0, x: -10 },
						visible: { opacity: 1, x: 0 },
					}}>
					<Button fullWidth variant="outline" onClick={() => router.push('/login')}>
						Shop Now
					</Button>
					<Button
						fullWidth
						variant="filled"
						className="hidden! md:block! px-2"
						onClick={() => router.push('/sign-up?role=merchant')}>
						Become a Merchant
					</Button>
					<Button
						fullWidth
						variant="filled"
						className="md:hidden! block! px-2"
						onClick={() => router.push('/sign-up?role=merchant')}>
						Sell as Merchant
					</Button>
				</motion.div>
			</div>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 0.5, delay: 1 }}
				variants={{
					hidden: { opacity: 0, y: -30 },
					visible: { opacity: 1, y: 0 },
				}}>
				<Image src={heroImg} alt="hero-img" width={550} height={450} className="mt-8 md:mt-0" />
			</motion.div>
		</section>
	);
};
export default Hero;
