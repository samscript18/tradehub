'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin, Star, Share2, Car } from 'lucide-react';
import { DeliveryMap } from '../delivery-map';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getCustomerOrder } from '@/lib/services/customer.service';
import Loader from '@/components/common/loaders';
import { avatar1 } from '@/public/images';
import BackButton from '@/components/common/button/back-button';

export default function TrackOrderDeliveryPage() {
	const { orderId } = useParams<{ orderId: string }>();
	const { data: order, isLoading } = useQuery({
		queryFn: () => getCustomerOrder(orderId),
		queryKey: ['get-customer-order', orderId],
	});
	return (
		<>
			{isLoading ? (
				<div className="flex justify-center items-center gap-4">
					<Loader />
					<p className="font-medium">Fetching orders...</p>
				</div>
			) : (
				<div className="px-4 py-4">
					<BackButton text='Back' />
					<div className="flex items-center justify-between mb-8">
						<div>
							<h1 className="text-2xl font-bold my-4">Track Your Delivery</h1>
							<p className="text-sm">
								ORDER ID: <span className="text-primary"> ORD-{order?.orderId.toUpperCase()}</span>
							</p>
						</div>
						<Button
							variant="ghost"
							size="sm"
							className="text-gray-200 text-xs hover:bg-[#181A20] hover:text-[#ffffff90] cursor-pointer">
							<Share2 className="w-4 h-4 mr-2" />
							Share
						</Button>
					</div>

					<div className="mb-8">
						<div className="flex items-center justify-center">
							<div className="flex flex-col items-center">
								<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
									<div className="w-3 h-3 bg-white rounded-full"></div>
								</div>
							</div>
							<div className="flex-1 h-0.5 bg-primary"></div>
							<div className="flex flex-col items-center">
								<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
									<div className="w-3 h-3 bg-white rounded-full"></div>
								</div>
							</div>
							<div className="flex-1 h-0.5 bg-primary"></div>
							<div className="flex flex-col items-center">
								<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
									<div className="w-3 h-3 bg-white rounded-full"></div>
								</div>
							</div>
							<div className="flex-1 h-0.5 bg-gray-600"></div>
							<div className="flex flex-col items-center">
								<div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
									<div className="w-3 h-3 bg-gray-400 rounded-full"></div>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-between mt-2">
							<span className="text-sm text-gray-300">Confirmed</span>
							<span className="text-sm text-gray-300">Processing</span>
							<span className="text-sm text-white font-medium">On the way</span>
							<span className="text-sm text-gray-300">Delivered</span>
						</div>
					</div>

					<div className="bg-[#181A20] text-white p-6 mb-4 rounded-xl">
						<h1 className="font-semibold mb-4">Delivery Details</h1>

						<div className="grid md:grid-cols-2 gap-8">
							<div>
								<h2 className="text-gray-400 text-sm mb-4">Delivery Address</h2>
								<div className="flex items-start gap-3">
									<MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
									<div className="text-gray-300 text-xs leading-relaxed capitalize">
										<div>{order?.address.street}</div>
										<div>
											{order?.address.city}, {order?.address.state}
											<div>{order?.address.postalcode}</div>
										</div>
										<div>{order?.address.country}</div>
									</div>
								</div>
							</div>

							<div>
								<h2 className="text-gray-400 text-sm mb-4">Package Details</h2>
								<div className="space-y-3 text-gray-300 text-xs">
									<div>
										<span className="text-gray-400">Order ID: </span>
										<span>ORD-{order?.orderId.toUpperCase()}</span>
									</div>
									<div className="flex gap-1">
										<span className="text-gray-400">Products: </span>
										<span className="space-y-1">
											{order?.merchantOrders?.map((order, index) => (
												<div key={index}>
													{order.products.map((item, idx) => {
														return (
															<div key={idx}>
																{item.product}
																{` (${item.quantity}${item.quantity > 1 ? 'x' : ''})`}
															</div>
														);
													})}
												</div>
											))}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<Card className="bg-[#181A20] border-[#181A20]">
						<CardContent className="px-4 pb-4">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-semibold text-white">Delivery Location</h3>
								<Button variant="ghost" size="sm" className="text-primary hover:text-blue-300">
									<MapPin className="w-4 h-4 mr-1" />
									Live Tracking
								</Button>
							</div>
							<div className="relative rounded-lg overflow-hidden h-80 bg-gray-700">
								<DeliveryMap />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-[#181A20] border-[#181A20] mt-4">
						<CardContent className="p-4">
							<p className="text-white font-semibold mb-3">Delivery Agent</p>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<Avatar className="w-12 h-12 mr-4">
										<AvatarImage src={String(avatar1)} alt="Michael Johnson" />
										<AvatarFallback>MJ</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-semibold text-white">Michael Johnson</p>
										<div className="flex items-center mt-1">
											<Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
											<span className="text-sm text-white">4.9</span>
										</div>
										<p className="text-xs text-gray-400 mt-1">
											<span>
												<Car className="w-4 h-4 text-gray-400 inline-flex mr-2 mb-0.5" />
											</span>
											White Toyota Prius • ABC 123
										</p>
									</div>
								</div>
								<Button className="bg-primary hover:bg-primary text-sm cursor-pointer">
									<Phone className="w-4 h-4 mr-2" />
									Contact Driver
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</>
	);
}
