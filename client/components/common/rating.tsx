// 'use client';
// import ReactRating from 'react-rating';
// import { FaRegStar, FaStar } from 'react-icons/fa6';
// import React, { useMemo } from 'react';
// import { cn } from '@/lib/utils';

import { Star } from 'lucide-react';

// interface RatingProps {
// 	initialRating?: number;
// 	readonly?: boolean;
// 	className?: string;
// 	size?: 'sm' | 'md' | 'lg';
// }

// const RatingComponent = ReactRating as unknown as React.ComponentType<{
// 	initialRating?: number;
// 	readonly?: boolean;
// 	emptySymbol: React.ReactNode;
// 	fullSymbol: React.ReactNode;
// 	fractions?: number;
// }>;

// export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
// 	({ initialRating = 0, readonly = true, className = '', size = 'sm' }, ref) => {
// 		const sizeClasses = {
// 			sm: 'w-3 h-3',
// 			md: 'w-4 h-4',
// 			lg: 'w-5 h-5',
// 		};

// 		const starSize = sizeClasses[size];

// 		const emptySymbol = useMemo(
// 			() => <FaRegStar className={cn('text-gray-400', starSize)} />,
// 			[starSize]
// 		);

// 		const fullSymbol = useMemo(
// 			() => <FaStar className={cn('text-yellow-500', starSize)} />,
// 			[starSize]
// 		);

// 		return (
// 			<div ref={ref} className={cn('flex items-center', className)}>
// 				<RatingComponent
// 					initialRating={initialRating}
// 					readonly={readonly}
// 					emptySymbol={emptySymbol}
// 					fullSymbol={fullSymbol}
// 					fractions={2}
// 				/>
// 			</div>
// 		);
// 	}
// );

// Rating.displayName = 'Rating';

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
