'use client';
import Button from '@/components/common/button';
import SelectField from '@/components/common/inputs/select-field';
import { storeCategories, newProducts } from '@/lib/data';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';

const SearchPage = () => {
	return (
	<section className="px-4">
		<div className="flex items-center justify-between mb-6">
			<div className="flex items-center space-x-4">
				<Button
					variant="outline"
					icon={<SlidersHorizontal className="w-4 h-4" />}
					iconPosition="left"
					size="small"
					className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-xs">
					Filters
				</Button>

				<div className="grid grid-cols-3 space-x-4">
					<SelectField
						width={'min-w-[50px]'}
						data={storeCategories}
						placeholder="Categories"
						inputClassName="bg-[#2a2a2a] border-[#3a3a3a] text-xs"
						onSelect={(option) => {
							console.log('Selected option:', option.value);
						}}
					/>

					<SelectField
						width={'min-w-[50px]'}
						data={[
							{
								label: 'Price Range',
								value: 'price range',
								id: 'price range',
							},
						]}
						placeholder="Price Range"
						inputClassName="bg-[#2a2a2a] border-[#3a3a3a] text-xs"
						onSelect={(option) => {
							console.log('Selected option:', option.value);
						}}
					/>

					<SelectField
						width={'min-w-[50px]'}
						data={[
							{
								label: '5',
								value: '5',
								id: '5',
							},
							{
								label: '4',
								value: '4',
								id: '4',
							},
							{
								label: '3',
								value: '3',
								id: '3',
							},
							{
								label: '2',
								value: '2',
								id: '2',
							},
							{
								label: '1',
								value: '1',
								id: '1',
							},
						]}
						placeholder="Rating"
						inputClassName="bg-[#2a2a2a] border-[#3a3a3a] text-xs"
						onSelect={(option) => {
							console.log('Selected option:', option.value);
						}}
					/>
				</div>
			</div>

			<div className="flex items-center">
				<span className="text-xs text-gray-200 mr-2">Sort by:</span>
				<SelectField
					width={'min-w-[50px]'}
					data={[
						{
							label: 'Recommended',
							value: 'recommended',
							id: 'recommended',
						},
						{
							label: 'Relevance',
							value: 'relevance',
							id: 'relevance',
						},
					]}
					placeholder="Sort by"
					inputClassName="bg-[#2a2a2a] border-[#3a3a3a] text-xs"
					onSelect={(option) => {
						console.log('Selected option:', option.value);
					}}
				/>
			</div>
		</div>
		<p className="text-xs text-gray-200 mb-6">Showing 24 of 156 results</p>
		<motion.div
			className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.5 }}
			transition={{ staggerChildren: 0.2, delayChildren: 0.7 }}>
			{newProducts.map((product) => {
				return (
					<motion.div
						className="flex flex-col w-[230px] rounded-md hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md"
						key={product.id}
						variants={{
							hidden: {
								opacity: 0,
								y: 30,
							},
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.8,
								},
							},
						}}>
						<Image
							src={product.img}
							alt={product.name}
							width={350}
							height={180}
							className="w-full h-full rounded-t-xl"
						/>
						<div className="bg-[#1E2A3B] p-2 space-y-2 shadow-md rounded-b-xl">
							<h3 className="text-[13px] font-bold">{product.name}</h3>
							<p className="text-xs text-gray-300">{product.merchant}</p>
							<div className="flex justify-between items-center">
								<h4 className="text-sm font-bold">{product.price}</h4>
								<Button variant="filled" className="px-4 py-1.5 w-full font-normal mt-1 text-xs">
									Add to cart
								</Button>
							</div>
						</div>
					</motion.div>
				);
			})}
		</motion.div>
		<div className="flex justify-center mt-10">
			<div className="flex items-center space-x-2">
				<Button
					variant="outline"
					icon={<ChevronLeft className="w-4 h-4" />}
					iconPosition="left"
					className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm py-2.5"></Button>
				<Button className="bg-primary hover:bg-primary text-white text-sm w-8 h-8">1</Button>
				<Button variant="outline" className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm w-8 h-8">
					2
				</Button>
				<Button variant="outline" className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm w-8 h-8">
					3
				</Button>
				<Button variant="outline" className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm w-8 h-8">
					4
				</Button>
				<Button variant="outline" className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm w-8 h-8">
					5
				</Button>
				<Button
					variant="outline"
					icon={<ChevronRight className="w-4 h-4" />}
					iconPosition="right"
					className="bg-[#2a2a2a] border-[#3a3a3a] text-white text-sm py-2.5"></Button>
			</div>
		</div>
	</section>
);
};
export default SearchPage;
