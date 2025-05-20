import Link from 'next/link';
import React from 'react';
import { SiSinglestore } from 'react-icons/si';

const Logo = () => {
	return (
		<Link href={'/'} className="flex items-center gap-1">
			<SiSinglestore className="text-primary" size={25}/>
			<span className="font-bold text-xl">Trade<span className='text-primary'>Hub</span></span>
		</Link>
	);
};

export default Logo;
