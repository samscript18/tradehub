'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share, Phone, MapPin, Clock, Star } from 'lucide-react';
import { DeliveryMap } from '../delivery-map';
import { DeliveryStatus } from '../delivery-status';

export default function TrackDeliveryPage() {
	return (
		<div className="px-4">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-2xl font-semibold mb-1">Track Your Delivery</h1>
					<p className="text-blue-400 text-sm">Order #ORD-2847439</p>
				</div>
				<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
					<Share className="w-4 h-4 mr-2" />
					Share
				</Button>
			</div>

			{/* Progress Steps */}
			<div className="mb-8">
				<div className="flex items-center justify-between mb-4">
					<div className="flex flex-col items-center">
						<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2">
							<div className="w-3 h-3 bg-white rounded-full"></div>
						</div>
						<span className="text-sm text-gray-300">Confirmed</span>
					</div>
					<div className="flex-1 h-0.5 bg-blue-500 mx-4"></div>
					<div className="flex flex-col items-center">
						<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2">
							<div className="w-3 h-3 bg-white rounded-full"></div>
						</div>
						<span className="text-sm text-gray-300">Preparing</span>
					</div>
					<div className="flex-1 h-0.5 bg-blue-500 mx-4"></div>
					<div className="flex flex-col items-center">
						<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2">
							<div className="w-3 h-3 bg-white rounded-full"></div>
						</div>
						<span className="text-sm text-white font-medium">On the way</span>
					</div>
					<div className="flex-1 h-0.5 bg-gray-600 mx-4"></div>
					<div className="flex flex-col items-center">
						<div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mb-2">
							<div className="w-3 h-3 bg-gray-400 rounded-full"></div>
						</div>
						<span className="text-sm text-gray-500">Delivered</span>
					</div>
				</div>
			</div>

			{/* Real-time Status */}
			<DeliveryStatus />

			{/* Estimated Delivery */}
			<Card className="bg-gray-800 border-gray-700 mb-6">
				<CardContent className="p-4">
					<div className="flex items-center">
						<Clock className="w-5 h-5 text-blue-400 mr-3" />
						<div>
							<p className="text-sm text-gray-400">Estimated Delivery</p>
							<p className="text-xl font-semibold">2:45 PM</p>
							<p className="text-sm text-gray-400">Today, October 16</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Delivery Agent */}
			<Card className="bg-gray-800 border-gray-700 mb-6">
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Avatar className="w-12 h-12 mr-4">
								<AvatarImage src="/placeholder.svg" alt="Michael Johnson" />
								<AvatarFallback>MJ</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-sm text-gray-400 mb-1">Delivery Agent</p>
								<p className="font-semibold">Michael Johnson</p>
								<div className="flex items-center mt-1">
									<Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
									<span className="text-sm">4.9</span>
								</div>
								<p className="text-xs text-gray-400 mt-1">White Toyota Prius • ABC 123</p>
							</div>
						</div>
						<Button className="bg-blue-600 hover:bg-blue-700">
							<Phone className="w-4 h-4 mr-2" />
							Contact Driver
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Delivery Location */}
			<Card className="bg-gray-800 border-gray-700">
				<CardContent className="p-4">
					<div className="flex items-center justify-between mb-4">
						<h3 className="font-semibold">Delivery Location</h3>
						<Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
							<MapPin className="w-4 h-4 mr-1" />
							Live Tracking
						</Button>
					</div>
					<div className="relative rounded-lg overflow-hidden mb-4 h-80 bg-gray-700">
						<DeliveryMap />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

