'use client';

import Button from '@/components/common/button';
import { useRouter } from 'next/navigation';

const CTA = () => {
	const router = useRouter();
	return (
		<section id='cta' className="px-4 sm:px-8 lg:px-12 py-16 bg-[#0A0C1B]">
			<div className="flex flex-col justify-center items-center bg-primary rounded-md shadow-md p-8 space-y-6">
				<h2 className="text-2xl font-bold mx-auto text-center">Join the Movement. Trade Locally.</h2>
				<p className="text-sm max-w-[550px] text-center">
					Be part of a growing community that supports local businesses and strengthens our economy.
				</p>
				<Button
					variant="filled"
					className="bg-white border border-white text-primary hover:text-white"
					onClick={() => router.push('/sign-up')}>
					Get Started
				</Button>
			</div>
		</section>
	);
};
export default CTA;
