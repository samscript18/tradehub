import HomePage from '@/components/ui/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Home',
	description:
		'TradeHub is a web-based e-commerce platform that connects local merchants and vendors to buyers, offering seamless payments, product listings, and delivery services.',
};

const Page = () => <HomePage />;

export default Page;
