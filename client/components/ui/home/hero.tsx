'use client';

import Button from '@/components/common/button';
import { heroImg } from '@/public/images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Hero = () => {
	const router = useRouter();

	const words = ['Empowering', 'Local', 'Merchants.', 'Delivering', 'to', 'Your', 'Doorstep.'];

	const stats = [
		{ label: 'Products', value: '1,000+' },
		{ label: 'Merchants', value: '500+' },
		{ label: 'Satisfaction', value: '98%' },
	];

	return (
		<section
			id="home"
			className="relative pt-[8rem] pb-16 px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-center md:justify-between items-center gap-12 overflow-hidden"
		>
			{/* Background orbs */}
			<motion.div
				className="absolute top-20 left-[-100px] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
				animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
				transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
			/>
			<motion.div
				className="absolute bottom-0 right-[-80px] w-[300px] h-[300px] rounded-full bg-blue-400/5 blur-[100px] pointer-events-none"
				animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
				transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
			/>

			<div className="flex flex-col w-full md:max-w-[540px] text-center md:text-start z-10">
				{/* Badge */}
				<motion.div
					className="mb-6 inline-flex justify-center md:justify-start"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium backdrop-blur-sm">
						<motion.span
							animate={{ scale: [1, 1.3, 1] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							🚀
						</motion.span>
						Now supporting 500+ local merchants
					</span>
				</motion.div>

				{/* Heading with word-by-word animation */}
				<motion.h1
					className="text-[33px] md:text-[2.8rem] font-bold leading-[1.2] tracking-tight"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
				>
					{words.map((word, i) => (
						<motion.span
							key={i}
							className={`inline-block mr-[0.3em] ${i < 3 ? 'bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent' : 'text-white'}`}
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
							}}
						>
							{word}
						</motion.span>
					))}
				</motion.h1>

				{/* Description */}
				<motion.p
					className="text-slate-400 text-sm mt-6 leading-relaxed"
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					Connect with trusted local sellers and get same-day delivery. Support your community while shopping
					conveniently.
				</motion.p>

				{/* Stats row */}
				<motion.div
					className="flex items-center gap-4 mt-6 justify-center md:justify-start"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 1 }}
				>
					{stats.map((stat, i) => (
						<span key={i} className="flex items-center gap-4">
							<span className="text-center">
								<p className="text-primary font-bold text-lg leading-tight">{stat.value}</p>
								<p className="text-slate-400 text-[11px]">{stat.label}</p>
							</span>
							{i < stats.length - 1 && <span className="w-px h-8 bg-slate-700" />}
						</span>
					))}
				</motion.div>

				{/* Buttons */}
				<motion.div
					className="w-full md:w-[70%] flex gap-4 md:gap-6 mt-10"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 1.3 }}
				>
					<Button
						fullWidth
						variant="outline"
						className="rounded-xl border-slate-600 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
						onClick={() => router.push('/login')}
					>
						Shop Now
					</Button>
					<Button
						fullWidth
						variant="filled"
						className="hidden! md:block! px-2 rounded-xl shadow-[0_0_25px_rgba(45,107,239,0.4)] hover:shadow-[0_0_35px_rgba(45,107,239,0.6)] transition-all duration-300"
						onClick={() => router.push('/sign-up?role=merchant')}
					>
						Become a Merchant
					</Button>
					<Button
						fullWidth
						variant="filled"
						className="md:hidden! block! px-2 rounded-xl shadow-[0_0_25px_rgba(45,107,239,0.4)] transition-all duration-300"
						onClick={() => router.push('/sign-up?role=merchant')}
					>
						Sell as Merchant
					</Button>
				</motion.div>
			</div>

			{/* Hero Image with float animation */}
			<motion.div
				className="z-10"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.7, delay: 0.8 }}
			>
				<motion.div
					animate={{ y: [0, -14, 0] }}
					transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
					className="relative"
				>
					{/* Glow behind image */}
					<div className="absolute inset-0 rounded-3xl bg-primary/15 blur-[60px] scale-90 -z-10" />
					<Image src={heroImg} alt="hero-img" width={550} height={450} className="mt-8 md:mt-0 drop-shadow-2xl" />
				</motion.div>
			</motion.div>
		</section>
	);
};
export default Hero;
