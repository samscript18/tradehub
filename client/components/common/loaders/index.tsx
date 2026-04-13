import { LoaderIcon } from "lucide-react";
import { FC } from "react";

interface Props {
	size?: number;
	text?: string;
}

const Loader: FC<Props> = ({ size = 22, text }) => {
	return (
		<div role="status" aria-live="polite" className="inline-flex items-center justify-center gap-3 rounded-xl dashboard-input border border-slate-700/70 px-4 py-2.5 shadow-md">
			<LoaderIcon className="animate-spin text-primary" size={size} />
			{text && <p className="text-sm text-slate-100">{text}</p>}
		</div>
	);
};

export default Loader;
