'use client';

import Loader from '@/components/common/loaders';
import { formatNaira } from '@/lib/helpers';
import { verifyTransaction } from '@/lib/services/customer.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';
import { MdOutlinePending } from 'react-icons/md';

const VerifyPayment = () => {
	const { tx_ref } = useParams<{ tx_ref: string }>();

	const { mutate, data, isPending } = useMutation({
		mutationFn: () => verifyTransaction(tx_ref),
		onSuccess: (response) => {
			if (response?.status === 'successful') {
				setTimeout(() => {
					push('/customer/orders');
				}, 5000);
			}
		},
		onError: (error) => {
			console.error('Payment verification failed:', error);
			setTimeout(() => {
				push('/customer/orders');
			}, 5000);
		},
		retry: 3,
		retryDelay: 1000,
	});

	const { push } = useRouter();

	useEffect(() => {
		setTimeout(() => {
			if (data?.status === 'successful') {
				push(`/customer/orders`);
			}
		}, 5000);
	}, [push, data?.status]);

	useEffect(() => {
		if (tx_ref) {
			mutate();
		}
	}, [tx_ref, mutate]);

	if (isPending)
		return (
			<div className="flex justify-center items-center gap-4">
				<Loader />
				<p className="font-medium">Verifying Transaction...</p>
			</div>
		);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div
				id={data?._id}
				className="flex flex-col justify-center items-center p-8 rounded-xl shadow-md text-center">
				{data?.status === 'successful' && (
					<div className="flex flex-col justify-center items-center">
						<HiOutlineCheckCircle size={100} className="text-green-700 mb-8" />
						<h2 className="sm:text-xl md:text-2xl text-green-700 pb-3 font-bold">Payment Successful!</h2>
						<p className="my-2 text-gray-600">
							Your payment of {formatNaira(data?.metadata.price)} was successful.
						</p>
						<p className="my-2 text-gray-600">Please wait a moment, we will redirect you shortly.</p>
						<Loader />
					</div>
				)}
				{data?.status === 'failed' && (
					<div className="flex flex-col justify-center items-center">
						<HiOutlineXCircle size={100} className="text-red-700 mb-8" />
						<h2 className="sm:text-xl md:text-2xl text-red-700 pb-3 font-bold">Payment Failed!</h2>
						<p className="my-2 text-gray-600">Your payment of {formatNaira(data?.metadata.price)} failed.</p>
						<p className="my-2 text-gray-600">Please wait a moment, we will redirect you shortly.</p>
						<Loader />
					</div>
				)}
				{data?.status === 'pending' && (
					<div id={data?._id} className="flex flex-col justify-center items-center">
						<MdOutlinePending size={100} className="text-gray-700 mb-8" />
						<h2 className="sm:text-xl md:text-2xl text-gray-700 pb-3 font-bold">Payment pending!</h2>
						<p className="my-2 text-gray-600">
							Your payment of {formatNaira(data?.metadata.price)} is pending.
						</p>
						<p className="my-2 text-gray-600">
							Please wait a moment to confirm your transaction or you&#39;ll be redirected shortly.
						</p>
						<Loader />
					</div>
				)}
			</div>
		</div>
	);
};
export default VerifyPayment;
