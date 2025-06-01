import React, { FC, ReactNode } from 'react';
import Image from 'next/image';
import { authImg } from '@/public/images';

interface Props {
	children: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
	return (
	<main className="flex flex-col items-center md:max-h-screen">
		<div className="w-full max-h-screen flex justify-between items-center gap-x-8 rounded-xl max-md:flex-col md:overflow-y-hidden">
			<div className="w-full h-auto md:min-h-screen max-md:bg-opacity-50  bg-[#111827] px-4 py-8 md:p-8 flex flex-col">
				<div className="mx-auto">
					<Image src={authImg} alt="auth-img" width={450} height={450} className="object-cover rounded-md" />
					<h1 className="text-xl md:text-3xl font-semibold mt-4 mb-2 text-center">Connect. Trade. Thrive</h1>
					<p className="md:text-gray-400 text-md max-md:text-base text-center">
						Connect with your local community marketplace
					</p>
				</div>
			</div>

			<div className="w-full md:max-h-screen py-8 px-4 md:p-8 flex flex-col md:overflow-y-scroll">
				{children}
			</div>
		</div>
	</main>
);
};

export default AuthLayout;
