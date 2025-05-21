'use client';

import Button from '@/components/common/button';
import { heroImg } from '@/public/images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Hero = () => {
	const router = useRouter();
	return (
		<section
			id="home"
			className="pt-[8rem] pb-12 px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-center md:justify-between items-center gap-8">
			<div className="flex flex-col w-full md:max-w-[540px] text-center md:text-start">
				<h1 className="text-[33px] md:text-4xl font-bold leading-12 tracking-wide">
					Empowering Local Merchants. Delivering to Your Doorstep.
				</h1>
				<p className="text-gray-400 text-sm mt-8">
					Connect with trusted local sellers and get same-day delivery. Support your community while shopping
					conveniently.
				</p>
				<div className="w-full md:w-[70%] flex gap-4 md:gap-8 mt-10">
					<Button fullWidth variant="outline" onClick={() => router.push('/login')}>
						Shop Now
					</Button>
					<Button fullWidth variant="filled" onClick={() => router.push('/sign-up?role=merchant')}>
						Become a Merchant
					</Button>
				</div>
			</div>
			<Image src={heroImg} alt="hero-img" width={550} height={450} className="mt-8 md:mt-0" />
		</section>
	);
};
export default Hero;
