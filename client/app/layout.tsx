import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/lib/providers/providers';
import { sora } from '@/lib/utils/fonts';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: {
		default: 'TradeHub',
		template: 'TradeHub | %s',
	},
	description:
		'TradeHub is a web-based e-commerce platform that connects local merchants and vendors to buyers, offering seamless payments, product listings, and delivery services.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${sora.className} antialiased`}>
				<Providers>
					<Suspense>{children}</Suspense>
				</Providers>
			</body>
		</html>
	);
}
