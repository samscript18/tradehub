import { Star } from 'lucide-react';

export const Rating = (rating: number) => {
	return (
		<div className="flex">
			{Array.from({ length: 5 }, (_, i) => (
				<Star
					key={i}
					className={`w-3 h-3 ${
						i < Math.floor(rating)
							? 'fill-yellow-400 text-yellow-400'
							: i < rating
							? 'fill-yellow-400/80 text-yellow-400'
							: 'fill-gray-200 text-gray-200'
					}`}
				/>
			))}
		</div>
	);
};
