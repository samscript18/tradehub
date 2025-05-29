import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import React from 'react';
import { SiSinglestore } from 'react-icons/si';

interface Props {
	className?: string;
	color?: string;
}

const Logo = ({ className, color }: Props) => {
	return (
		<Link href={'/'} className={cn('flex items-center gap-1', className)}>
			<SiSinglestore className={`${color ? color : 'text-primary'}`} size={25} />
			<span className="font-bold text-xl">
				Trade<span className={`${color ? color : 'text-primary'}`}>Hub</span>
			</span>
		</Link>
	);
};

export default Logo;
