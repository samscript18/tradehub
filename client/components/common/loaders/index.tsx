import { LoaderIcon } from 'lucide-react';
import { FC } from 'react';

interface Props {
	size?: number;
	text?: string;
}

const Loader: FC<Props> = ({ size = 40, text }) => {
	return (
		<div className="flex justify-center items-center gap-8 rounded-full bg-[#242424] shadow-md animate-pulse">
			<LoaderIcon className="animate-spin text-primary" size={size} />
			<p className="text-sm text-primary">{text}</p>
		</div>
	);
};

export default Loader;
