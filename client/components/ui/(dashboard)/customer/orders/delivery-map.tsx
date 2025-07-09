'use client';

import { useEffect, useState } from 'react';
import { MapPin, Navigation, Truck } from 'lucide-react';

interface Location {
	lat: number;
	lng: number;
}

interface DeliveryData {
	driverLocation: Location;
	destination: Location;
	route: Location[];
	estimatedDistance: string;
	estimatedTime: string;
}

export function DeliveryMap() {
	const [deliveryData, setDeliveryData] = useState<DeliveryData>({
		driverLocation: { lat: 32.7767, lng: -96.797 }, // Current driver position
		destination: { lat: 32.7849, lng: -96.8028 }, // Delivery destination
		route: [
			{ lat: 32.7767, lng: -96.797 },
			{ lat: 32.778, lng: -96.7985 },
			{ lat: 32.782, lng: -96.801 },
			{ lat: 32.7849, lng: -96.8028 },
		],
		estimatedDistance: '2.5 miles',
		estimatedTime: '8 mins',
	});

	// Simulate real-time location updates
	useEffect(() => {
		const interval = setInterval(() => {
			setDeliveryData((prev) => ({
				...prev,
				driverLocation: {
					lat: prev.driverLocation.lat + (Math.random() - 0.5) * 0.001,
					lng: prev.driverLocation.lng + (Math.random() - 0.5) * 0.001,
				},
			}));
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	// Convert coordinates to SVG positions (simplified projection)
	const mapBounds = {
		minLat: 32.77,
		maxLat: 32.79,
		minLng: -96.81,
		maxLng: -96.79,
	};

	const coordToSVG = (lat: number, lng: number) => {
		const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
		const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
		return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
	};

	const driverPos = coordToSVG(deliveryData.driverLocation.lat, deliveryData.driverLocation.lng);
	const destPos = coordToSVG(deliveryData.destination.lat, deliveryData.destination.lng);

	return (
		<div className="relative w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
			{/* Map Background with Street Pattern */}
			<svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
				{/* Street grid */}
				<defs>
					<pattern id="streets" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
						<rect width="10" height="10" fill="rgba(59, 130, 246, 0.1)" />
						<path d="M 0 5 L 10 5" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="0.2" />
						<path d="M 5 0 L 5 10" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="0.2" />
					</pattern>
				</defs>
				<rect width="100" height="100" fill="url(#streets)" />

				{/* Main roads */}
				<path d="M 0 30 L 100 35" stroke="rgba(156, 163, 175, 0.4)" strokeWidth="0.8" />
				<path d="M 0 60 L 100 65" stroke="rgba(156, 163, 175, 0.4)" strokeWidth="0.8" />
				<path d="M 25 0 L 30 100" stroke="rgba(156, 163, 175, 0.4)" strokeWidth="0.8" />
				<path d="M 70 0 L 75 100" stroke="rgba(156, 163, 175, 0.4)" strokeWidth="0.8" />

				{/* Delivery route */}
				<path
					d={`M ${driverPos.x} ${driverPos.y} Q ${(driverPos.x + destPos.x) / 2} ${
						Math.min(driverPos.y, destPos.y) - 10
					} ${destPos.x} ${destPos.y}`}
					stroke="#3B82F6"
					strokeWidth="0.8"
					fill="none"
					strokeDasharray="2,1"
					className="animate-pulse"
				/>
			</svg>

			{/* Driver Location */}
			<div
				className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
				style={{ left: `${driverPos.x}%`, top: `${driverPos.y}%` }}>
				<div className="relative">
					<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
						<Truck className="w-3 h-3 text-white" />
					</div>
					<div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
						Michael&#38;s Location
					</div>
					{/* Pulsing circle animation */}
					<div className="absolute inset-0 w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-30"></div>
				</div>
			</div>

			{/* Destination */}
			<div
				className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
				style={{ left: `${destPos.x}%`, top: `${destPos.y}%` }}>
				<div className="relative">
					<div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
						<MapPin className="w-3 h-3 text-white" />
					</div>
					<div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
						Your Location
					</div>
				</div>
			</div>

			{/* Live Tracking Indicator */}
			<div className="absolute top-4 left-4 bg-gray-900 bg-opacity-90 rounded-lg p-3 flex items-center gap-2">
				<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
				<span className="text-sm text-white font-medium">Live Tracking</span>
			</div>

			{/* Distance and Time Info */}
			<div className="absolute bottom-4 right-4 bg-gray-900 bg-opacity-90 rounded-lg p-3">
				<div className="flex items-center gap-2 mb-1">
					<Navigation className="w-4 h-4 text-blue-400" />
					<span className="text-sm text-gray-300">Estimated Distance</span>
				</div>
				<p className="text-blue-400 font-semibold">{deliveryData.estimatedDistance}</p>
				<p className="text-xs text-gray-400">{deliveryData.estimatedTime} away</p>
			</div>

			{/* Map Controls */}
			<div className="absolute top-4 right-4 flex flex-col gap-2">
				<button className="w-8 h-8 bg-gray-900 bg-opacity-90 rounded text-white text-sm font-bold hover:bg-opacity-100 transition-all">
					+
				</button>
				<button className="w-8 h-8 bg-gray-900 bg-opacity-90 rounded text-white text-sm font-bold hover:bg-opacity-100 transition-all">
					−
				</button>
			</div>
		</div>
	);
}
