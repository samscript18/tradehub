'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
	link?: string;
	text?: string;
}

const BackButton: FC<Props> = ({ link, text }) => {
	const { back, push } = useRouter();

	return (
		<span
			onClick={() => (link ? push(link) : back())}
			className="cursor-pointer flex items-center gap-2">
			<ArrowLeft className="w-4 h-4 text-primary" />
			<p className="text-sm font-medium text-primary">{text}</p>
		</span>
	);
};

export default BackButton;
