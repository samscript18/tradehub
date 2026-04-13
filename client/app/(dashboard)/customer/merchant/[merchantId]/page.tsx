"use client";

import MerchantStoreDetailsPage from '@/components/ui/(dashboard)/customer/merchant/details';
import { useParams } from 'next/navigation';

const Page = () => {
	const params = useParams<{ merchantId: string }>();

	return <MerchantStoreDetailsPage merchantId={params?.merchantId || ''} />;
};

export default Page;
