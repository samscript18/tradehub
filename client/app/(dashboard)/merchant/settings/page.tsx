const page = () => {
	return (
		<section className="px-4 md:px-6 py-5 space-y-6">
			<div className="dashboard-panel rounded-2xl p-5 md:p-7">
				<h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
				<p className="text-sm text-slate-300 mt-2">Fine-tune your merchant preferences and operational controls.</p>
			</div>
			<div className="dashboard-panel rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="dashboard-input rounded-xl p-4">
					<p className="text-sm font-semibold text-white">Store Preferences</p>
					<p className="text-xs text-slate-300 mt-2">Branding, business hours, and storefront behavior.</p>
				</div>
				<div className="dashboard-input rounded-xl p-4">
					<p className="text-sm font-semibold text-white">Security</p>
					<p className="text-xs text-slate-300 mt-2">Password, sessions, and account access controls.</p>
				</div>
				<div className="dashboard-input rounded-xl p-4">
					<p className="text-sm font-semibold text-white">Notifications</p>
					<p className="text-xs text-slate-300 mt-2">Delivery alerts, payment updates, and digest options.</p>
				</div>
			</div>
		</section>
	);
};

export default page;
