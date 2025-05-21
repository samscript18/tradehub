import { OperationProcess } from '@/lib/data';

const Process = () => {
	return (
		<section id='process' className="px-4 sm:px-8 lg:px-12 py-16 bg-[#111326]">
			<h2 className="text-2xl font-bold mx-auto text-center">How TradeHub Works</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 gap-8">
				{OperationProcess.map((process) => {
					return (
						<div className="flex flex-col justify-center items-center" key={process.id}>
							<div className="flex justify-center items-center w-10 h-10 p-1.5 rounded-full bg-primary hover:scale-[1.05] transition-all duration-300 cursor-pointer">
								{process.icon}
							</div>
							<h3 className="font-medium mt-4.5">{process.name}</h3>
							<p className="text-center text-gray-400 text-sm mt-2.5">{process.description}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};
export default Process;
