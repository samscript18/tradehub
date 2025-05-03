import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import BackButton from '../Button/back-button';
import { getCustomers } from '@/lib/services/Customer.service';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import SidebarComp from '../Sidebar';
import Button from '../Button';
import { useModal } from '@/lib/providers/ModalProvider';
import { FaPlus } from 'react-icons/fa';
import CreateCustomerPage from '@/components/UI/Customers/create';
import { queryClient } from '@/lib/providers';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import useOrderStore from '@/lib/store/order.store';

interface Props {}

const SelectCustomers: FC<Props> = ({}) => {
	const { showSidebar } = useSidebar();

	return (
		<div className="space-y-2">
			<label className="block text-[.9rem]">Select Customer</label>
			<div
				onClick={() => showSidebar(<SelectedCustomerUI />)}
				className="rounded-md px-4 py-3 border flex items-center justify-between cursor-pointer">
				<h1>Select Customer</h1>

				<span>
					<BiChevronRight size={25} className="text-gray-500" />
				</span>
			</div>
		</div>
	);
};

export const SelectedCustomerUI = () => {
	const { hideSidebar } = useSidebar();
	const { showModal, hideModal } = useModal();

	const { data: Customers, isPending: loading } = useQuery({
		queryKey: ['Customers'],
		queryFn: getCustomers,
	});

	const { selectedCustomer, toggleSelectedCustomer } = useOrderStore();

	return (
		<SidebarComp onClose={hideSidebar} width={'40%'}>
			<div className="w-full bg-white p-8">
				<BackButton onBack={hideSidebar} />

				<div className="flex items-center justify-between">
					<p className="mt-4 font-bold text-lg mb-4">Select Customer</p>

					<Button
						onClick={() =>
							showModal(
								<CreateCustomerPage
									isModal
									onSuccess={() => {
										queryClient.invalidateQueries({
											predicate: (q) => q.queryKey.includes('Customers'),
										});
										hideModal();
									}}
									modalClass="max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl"
								/>
							)
						}
						icon={<FaPlus />}>
						Add new Customer
					</Button>
				</div>

				{loading ? (
					<div className="py-16 flex items-center justify-center">
						<div className="size-16 animate-spin border-8 border-transparent border-t-accent rounded-full"></div>
					</div>
				) : Customers?.data.length === 0 ? (
					<div className="py-16 flex items-center justify-center">
						<div className="text-center space-y-2">
							<p className="text-3xl font-bold">Oops!</p>

							<p className="text-gray-500 text-sm">No Customers found.</p>

							<Button
								onClick={() =>
									showModal(
										<CreateCustomerPage
											isModal
											onSuccess={() => {
												queryClient.invalidateQueries({
													predicate: (q) => q.queryKey.includes('Customers'),
												});
												hideModal();
											}}
											modalClass="max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl"
										/>
									)
								}
								className="mx-auto"
								variant="filled">
								Add new Customer
							</Button>
						</div>
					</div>
				) : (
					<div className="space-y-1 select-none">
						{Customers?.data &&
							Customers?.data?.map((c, index) => (
								<div
									key={index}
									className={cn(
										`border cursor-pointer duration-300 flex items-center gap-4 rounded-lg p-2 ${
											c._id === selectedCustomer?._id ? 'border-accent' : 'border-gray-200'
										}`
									)}
									onClick={() => {
										toggleSelectedCustomer?.(c);
										hideSidebar();
									}}>
									<div className="size-10 rounded-full flex items-center justify-center border border-gray-200 relative overflow-hidden">
										<Image
											src={c.profilePicture}
											alt="profile picture"
											width={100}
											height={100}
											className="w-full h-full absolute top-0 left-0 object-cover"
										/>
									</div>

									<div>
										<p className="text-sm font-medium">
											{c.firstName} {c.lastName}
										</p>
										<div className="text-xs text-gray-500">
											<p>{c.email}</p>
											<p>{c.phoneNumber}</p>
										</div>
									</div>

									{/* <input
                type="checkbox"
                checked={is_selected}
                className="size-4 cursor-pointer accent-accent"
              />
              <div className="flex items-center gap-2">
                {c.firstName} {c.lastName} -{" "}
                {`${c.email || c.phoneNumber}`}
              </div> */}
								</div>
							))}
					</div>
				)}
			</div>
		</SidebarComp>
	);
};

export default SelectCustomers;
