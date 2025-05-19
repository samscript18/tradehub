import Link from 'next/link';
import React, { FC } from 'react';
import { SiSinglestore } from 'react-icons/si';

interface Props {
	width?: number;
	height?: number;
}

const Logo: FC<Props> = () => {
	return (
		<Link href={'/'} className="text-primary flex items-center gap-1">
			<SiSinglestore />
			<span>TradeHub</span>
		</Link>
	);
};

export default Logo;
