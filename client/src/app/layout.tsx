import type { Metadata } from 'next';
import './globals.css';
import { monaSans } from '@/lib/utils/fonts';
import Providers from '@/lib/providers';

export const metadata: Metadata = {
	title: {
		default: 'TradeHub - E-Commerce App',
		template: '%s | TradeHub',
	},
	description:
		'TradeHub is a web-based e-commerce platform that connects local merchants and vendors to buyers, offering seamless payments, product listings, and delivery services.',
	keywords: [
		'TradeHub',
		'e-commerce platform',
		'local vendors',
		'online marketplace',
		'small businesses',
		'merchant tools',
		'buy local products',
		'Nigeria commerce',
		'vendor platform',
		'digital marketplace',
	],
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${monaSans.className} antialiased bg-white dark:text-white dark:bg-black duration-200`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
