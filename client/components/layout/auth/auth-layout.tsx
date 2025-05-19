import Logo from '@/components/common/logo';
import Link from 'next/link';
import React, { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
	return (
		<main className="md:py-4 md:px-12 md:h-screen flex items-center min-w-screen relative overflow-y-auto scrollbar-none">
			<div className="w-full h-full flex justify-between items-center gap-x-8 rounded-xl md:border-2 border-gray-200 max-md:flex-col">
				<div className="w-full h-full bg-gray-100  pt-5 md:pt-20 pb-10 p-8 flex flex-col">
					<Link href={'/'}>
						<Logo width={200} />
					</Link>
					<h1 className="text-xl md:text-4xl font-bold mt-8 mb-4">Documents warehouse</h1>
					<p className="text-gray-400 text-lg max-md:text-md">
						Funaab lecture notes and past questions at your fingertips 🫰🏽
					</p>
				</div>

				<div className="w-full h-full p-8 flex flex-col md:pt-20 pt-6 md:overflow-y-scroll">{children}</div>
			</div>
		</main>
	);
};

export default AuthLayout;
