import { SiSinglestore } from "react-icons/si";

const SessionCheckLoader = () => {
	return (
		<div className="fixed inset-0 dashboard-shell flex items-center justify-center px-6">
			<div className="dashboard-panel rounded-3xl px-8 py-10 w-full max-w-md">
				<div className="flex flex-col items-center text-center gap-4">
					<div className="h-20 w-20 rounded-3xl bg-primary/15 border border-primary/40 flex items-center justify-center shadow-[0_0_35px_rgba(45,107,239,0.35)]">
						<SiSinglestore size={42} className="text-primary animate-pulse" />
					</div>
					<h2 className="font-bold text-3xl md:text-4xl tracking-tight text-white">
						Trade<span className="text-primary">Hub</span>
					</h2>
					<p className="text-sm text-slate-300">Syncing your dashboard experience...</p>
				</div>

				<div className="mt-6 space-y-3">
					<div className="dashboard-muted-panel dashboard-shimmer rounded-xl h-3" />
					<div className="dashboard-muted-panel dashboard-shimmer rounded-xl h-3 w-10/12" />
					<div className="dashboard-muted-panel dashboard-shimmer rounded-xl h-3 w-8/12" />
				</div>
			</div>
		</div>
	);
};

export default SessionCheckLoader;
