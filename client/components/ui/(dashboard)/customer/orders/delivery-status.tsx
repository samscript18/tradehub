'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, MapPin } from 'lucide-react';

export function DeliveryStatus() {
	const [status, setStatus] = useState('On the way');
	const [lastUpdate, setLastUpdate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setLastUpdate(new Date());
		}, 30000); // Update every 30 seconds

		return () => clearInterval(interval);
	}, []);

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};
	console.log(setStatus);

	return (
		<div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
					<Truck className="w-5 h-5 text-white" />
				</div>
				<div>
					<Badge className="bg-blue-600 hover:bg-blue-700 text-white mb-1">
						<div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
						{status}
					</Badge>
					<p className="text-xs text-gray-400 flex items-center gap-1">
						<Clock className="w-3 h-3" />
						Last updated: {formatTime(lastUpdate)}
					</p>
				</div>
			</div>
			<div className="text-right">
				<p className="text-sm font-medium text-white">Driver approaching</p>
				<p className="text-xs text-gray-400 flex items-center gap-1 justify-end">
					<MapPin className="w-3 h-3" />
					0.3 miles away
				</p>
			</div>
		</div>
	);
}
