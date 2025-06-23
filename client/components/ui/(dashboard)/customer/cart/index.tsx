'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2, Clock, MapPin, ShieldCheck } from 'lucide-react';
import Button from '@/components/common/button';
import { RadioGroup, RadioGroupItem } from '@/components/common/radio-group';
import { DeliveryAddress } from '@/lib/types/types';
import { useAuth } from '@/lib/store/auth.store';
import TextField from '@/components/common/inputs/text-field';
import { useForm } from 'react-hook-form';
import { REGEX } from '@/lib/utils/regex';
import { useCart } from '@/lib/store/cart.store';
import { Label } from '@/components/ui/label';
import { formatNaira } from '@/lib/helpers';
import { addDeliveryAddress, initiateCheckout } from '@/lib/services/customer.service';
import { useMutation } from '@tanstack/react-query';

const CartPage = () => {
	const { user } = useAuth();
	const {
		items: cartItems,
		updateQuantity,
		removeItem,
		loadItems,
		subtotal,
		deliveryFee,
		total,
	} = useCart();
	const { fetchUser } = useAuth();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [selectedAddress, setSelectedAddress] = useState<string>('0');
	const { mutateAsync, isPending } = useMutation({
		mutationFn: initiateCheckout,
		mutationKey: ['initiate-checkout'],
		onSuccess(data) {
			window.location.href = data.paymentUrl;
		},
	});
	const { mutateAsync: _addDeliveryInfo, isPending: _isAddingDeliveryInfo } = useMutation({
		mutationFn: addDeliveryAddress,
		mutationKey: ['add-delivery-info'],
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<DeliveryAddress>({});

	const submit = async (e: DeliveryAddress) => {
		await _addDeliveryInfo(e);
		fetchUser();
		setIsEdit(false);
	};

	useEffect(() => {
		loadItems();
	}, [loadItems]);

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<div className="flex items-center justify-between mb-6">
							<h1 className="text-xl font-bold">Cart</h1>
							<span className="text-gray-400 text-sm">{cartItems.length} items</span>
						</div>

						<div className="space-y-4">
							{cartItems.length === 0 ? (
								<div className="bg-[#181A20] rounded-lg shadow-lg px-4 py-16">
									<div className="flex justify-center items-center">
										<h1 className="text-lg font-bold">Sorry 😥, your cart is empty.</h1>
									</div>
								</div>
							) : (
								cartItems.map((item) => (
									<div key={item._id} className="bg-[#181A20] rounded-lg shadow-lg p-4">
										<div className="flex max-md:flex-col items-center gap-4">
											<div className="w-25 md:w-20 h-25 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
												<Image
													src={item.images[0]}
													alt={item.name}
													width={80}
													height={80}
													className="w-full h-full object-cover"
												/>
											</div>

											<div className="flex-1 min-w-0">
												<h3 className="font-semibold text-sm mb-1">{item.name}</h3>
												<p className="text-xs text-gray-400 mb-2 max-md:text-center">{item.merchant.storeName}</p>
												<p className="text-primary font-semibold max-md:text-center">
													{formatNaira(item.variants[0].price)}
												</p>
											</div>

											<div className="flex items-center gap-8">
												<div className="flex items-center gap-3">
													<button
														onClick={() => updateQuantity(item._id!, item.quantity! - 1)}
														className="p-2 bg-[#1E2028] rounded-lg shadow-md cursor-pointer">
														<Minus className="w-4 h-4" />
													</button>
													<span className="px-3 py-2 min-w-[3rem] text-sm font-semibold text-center">{item.quantity}</span>
													<button
														onClick={() => updateQuantity(item._id!, item.quantity! + 1)}
														className="p-2 bg-[#1E2028] rounded-lg shadow-md cursor-pointer">
														<Plus className="w-4 h-4" />
													</button>
												</div>

												<button
													onClick={() => removeItem(item._id!)}
													className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg cursor-pointer">
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</div>
									</div>
								))
							)}
						</div>

						<div className="mt-8 space-y-4">
							<div className="flex gap-4">
								<MapPin className="w-4 h-4 text-primary" />
								<h3 className="text-sm font-bold">Delivery Address</h3>
							</div>
							{isEdit ? (
								<form
									onSubmit={handleSubmit(submit)}
									className="mt-8 space-y-4 md:space-y-8 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#181A20] rounded-lg shadow-lg p-4 md:p-8">
									<TextField
										label="Full Name"
										className="col-span-2"
										InputProps={{
											placeholder: 'e.g John Smilga',
											...register('fullName', {
												required: {
													value: true,
													message: 'This field is required',
												},
											}),
											className: 'text-xs',
										}}
										helperText={errors?.fullName?.message}
									/>

									<TextField
										label="Phone number"
										className="col-span-2"
										InputProps={{
											placeholder: 'e.g 08012642233',
											type: 'tel',
											...register('phoneNumber', {
												required: {
													value: true,
													message: 'This field is required',
												},
												pattern: {
													value: REGEX.PHONE_NUMBER,
													message: 'Enter a valid phone number',
												},
											}),
											className: 'text-xs',
										}}
										helperText={errors?.phoneNumber?.message}
									/>
									<TextField
										label="Street Address"
										className="col-span-2"
										InputProps={{
											placeholder: 'e.g your street address',
											...register('streetAddress', {
												required: {
													value: true,
													message: 'This field is required',
												},
											}),
											className: 'text-xs',
										}}
										helperText={errors?.streetAddress?.message}
									/>

									<TextField
										label="City"
										className="col-span-2 lg:col-span-1"
										InputProps={{
											placeholder: 'e.g your city',
											...register('city', {
												required: {
													value: true,
													message: 'This field is required',
												},
											}),
											className: 'text-xs',
										}}
										helperText={errors?.city?.message}
									/>

									<TextField
										label="State"
										className="col-span-2 lg:col-span-1"
										InputProps={{
											placeholder: 'e.g your state',
											...register('state', {
												required: {
													value: true,
													message: 'This field is required',
												},
											}),
											className: 'text-xs',
										}}
										helperText={errors?.state?.message}
									/>

									<TextField
										label="Postal Code"
										className="col-span-2 lg:col-span-1"
										InputProps={{
											type: 'tel',
											placeholder: 'e.g your postalcode',
											...register('postalcode', {
												required: {
													value: true,
													message: 'This field is required',
												},
											}),
											className: 'text-xs',
										}}
										helperText={errors?.postalcode?.message}
									/>
									<Button
										fullWidth
										loading={_isAddingDeliveryInfo}
										variant="filled"
										size="medium"
										className="col-span-2 text-xs"
										type="submit">
										Save details
									</Button>
								</form>
							) : (
								<>
									<RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-4">
										{user?.addresses?.map((address, index) => (
											<div key={index} className="relative bg-[#181A20] rounded-lg shadow-lg">
												<Label
													htmlFor={index.toString()}
													className={`block p-6 rounded-lg border-1 cursor-pointer transition-all ${
														selectedAddress === index.toString() ? 'border-primary' : 'border-gray-700 hover:border-gray-600'
													}`}>
													<div className="flex items-start gap-4">
														<RadioGroupItem
															value={index.toString()}
															id={index.toString()}
															className="border-gray-600 text-primary"
														/>
														<div className="flex-1">
															<div className="font-medium text-sm mb-1">
																{address.fullName ? address.fullName : `${user.firstName} ${user.lastName}`}
															</div>
															<div className="text-gray-400 text-xs space-y-1">
																<div>{address.streetAddress}</div>
																<div>
																	{address.city}, {address.state}
																</div>
																<div>{address.postalcode}</div>
																<div>{address?.phoneNumber || user.phoneNumber}</div>
															</div>
														</div>
													</div>
												</Label>
											</div>
										))}
									</RadioGroup>

									<Button
										variant="outline"
										onClick={() => setIsEdit(true)}
										fullWidth
										icon={<Plus className="w-4 h-4" />}
										iconPosition="left"
										className="mt-6 w-full bg-[#181A20] text-xs py-3 font-medium border-gray-700 text-primary hover:bg-primary/10 hover:border-primary">
										Add New Address
									</Button>
								</>
							)}
						</div>
					</div>

					<div className="lg:col-span-1">
						<div className="bg-[#181A20] rounded-lg shadow-lg p-4 md:p-6 sticky top-[5.3rem]">
							<h2 className="text-lg font-bold mb-6">Order Summary</h2>

							<div className="space-y-3 mb-6">
								<div className="flex justify-between">
									<span className="text-gray-400 text-sm">Subtotal</span>
									<span>{formatNaira(subtotal())}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-400 text-sm">Delivery Fee</span>
									<span>{formatNaira(deliveryFee())}</span>
								</div>
								<hr className="border-gray-700" />
								<div className="flex justify-between text-lg font-semibold">
									<span className="text-sm">Total</span>
									<span className="text-primary">{formatNaira(total())}</span>
								</div>
							</div>

							<Button
								loading={isPending}
								onClick={() => {
									if (!user?.defaultAddress) return;
									const data = {
										address: {
											country: user.defaultAddress.country || '',
											state: user.defaultAddress.state || '',
											street: user.defaultAddress.streetAddress || '',
											city: user.defaultAddress.city || '',
											postalcode: user.defaultAddress.postalcode || '',
										},
										price: total(),
										products: cartItems.map((item) => ({
											productId: item._id || '',
											variant: item.selectedVariant,
											quantity: item.quantity,
											price: item.selectedVariant.price,
										})),
									};
									mutateAsync(data);
								}}
								fullWidth
								variant="filled"
								className="w-full mb-4 text-sm cursor-pointer">
								Proceed to Checkout
							</Button>

							<p className="text-xs bg-[#1E2028] py-2 px-4 text-gray-400 rounded-md">
								<span className="inline-flex items-center gap-2">
									<Clock className="w-4 h-4 text-primary" />
									Fast delivery on all orders
								</span>
							</p>

							<p className="text-xs bg-[#1E2028] py-2 px-4 text-gray-400 rounded-md mt-4">
								<span className="inline-flex items-center gap-2">
									<ShieldCheck className="w-4 h-4 text-primary" />
									Secure checkout
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
