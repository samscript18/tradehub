import { FiBarChart, FiCreditCard, FiShoppingCart } from 'react-icons/fi';

export const navLinks = [
	{ title: 'Home', href: '/' },
	{
		title: 'About',
		href: '/about',
	},
	{
		title: 'How It Works',
		href: '/#how-it-works',
	},
	{
		title: 'Contact',
		href: '/#contact',
	},
];

type FAQItem = {
	question: string;
	answer: string;
};

type FAQCategories = {
	[key: string]: FAQItem[];
};

export const faqCategories: FAQCategories = {
	General: [
		{
			question: 'What is Stockly?',
			answer: 'Stockly is a store management system for inventory, sales, and financial tracking.',
		},
		{
			question: 'Is there a mobile version of Stockly?',
			answer: 'Yes, Stockly is fully responsive and works seamlessly on all devices.',
		},
		{
			question: 'Who can use Stockly?',
			answer: 'Stockly is designed for small businesses, retail shops, and e-commerce platforms.',
		},
		{
			question: 'Do I need technical knowledge to use Stockly?',
			answer: 'No, Stockly is user-friendly and requires no coding skills to manage your store.',
		},
		{
			question: 'Can I use Stockly for multiple stores?',
			answer: 'Yes, you can manage multiple stores from a single dashboard.',
		},
	],
	Payments: [
		{
			question: 'How does the payment system work?',
			answer: 'Businesses receive funds directly into their virtual bank accounts.',
		},
		{
			question: 'Can I integrate my own payment gateway?',
			answer: 'Yes, we support custom integrations with various payment providers.',
		},
		{
			question: 'Are there any transaction fees?',
			answer: 'Transaction fees vary based on your chosen payment provider.',
		},
		{
			question: 'Does Stockly support international payments?',
			answer: 'Yes, Stockly supports multiple currencies and international transactions.',
		},
		{
			question: 'How long does it take for funds to reflect in my account?',
			answer: 'Funds are processed instantly or within 24 hours, depending on the payment provider.',
		},
		{
			question: 'Can customers pay via mobile money?',
			answer: 'Yes, we support mobile money payments in supported regions.',
		},
	],
	Features: [
		{
			question: 'Does Stockly support QR code payments?',
			answer: 'Yes, businesses can generate QR codes and payment links for transactions.',
		},
		{
			question: 'Can I track my inventory with Stockly?',
			answer: 'Yes! Stockly provides real-time stock tracking and alerts.',
		},
		{
			question: 'Can I generate invoices for customers?',
			answer: 'Yes, Stockly allows you to create and send invoices instantly.',
		},
		{
			question: 'Does Stockly support automated expense tracking?',
			answer: 'Yes, you can set up automated expense tracking and periodic payments.',
		},
		{
			question: 'Can I analyze sales trends?',
			answer: 'Absolutely! Stockly provides sales analytics and financial insights.',
		},
		{
			question: 'Is there a customer loyalty program feature?',
			answer: 'Yes, businesses can reward customers with points and discounts.',
		},
	],
	Support: [
		{
			question: 'How do I contact customer support?',
			answer: 'You can reach us via email or live chat on the dashboard.',
		},
		{
			question: 'Is there a free trial available?',
			answer: 'Yes, we offer a 14-day free trial for new users.',
		},
		{
			question: 'Can I get a demo before signing up?',
			answer: 'Yes, we offer live demos upon request.',
		},
		{
			question: 'How do I reset my password?',
			answer: 'You can reset your password from the login page or contact support.',
		},
		{
			question: 'Do you provide onboarding support?',
			answer: 'Yes, we offer onboarding guides and live training sessions.',
		},
		{
			question: 'Is my business data secure?',
			answer: 'Yes, Stockly uses industry-standard encryption to keep your data safe.',
		},
	],
};

export const features = [
	{
		title: 'Smart Inventory Management',
		description: 'Track stock levels, receive restock alerts, and manage your products effortlessly.',
		icon: <FiShoppingCart className="text-primary w-10 h-10" />,
		color: '#f0f7ff',
	},
	{
		title: 'Seamless Payment Processing',
		description: 'Accept online payments securely and manage transactions with virtual bank accounts.',
		icon: <FiCreditCard className="text-primary w-10 h-10" />,
		color: '#fff8e6',
	},
	{
		title: 'Advanced Business Insights',
		description: 'Get real-time analytics on sales, revenue trends, and customer behavior.',
		icon: <FiBarChart className="text-primary w-10 h-10" />,
		color: '#fbebee',
	},
];

export const footerLinks = [
	{
		title: 'Quick Links',
		links: [
			{ name: 'About Us', href: '/about' },
			{ name: 'Features', href: '/features' },
			{ name: 'Pricing', href: '/pricing' },
			{ name: 'Contact', href: '/contact' },
		],
	},
	{
		title: 'Support',
		links: [
			{ name: 'Help Center', href: '/help' },
			{ name: 'FAQs', href: '/faq' },
			{ name: 'Terms & Conditions', href: '/terms' },
			{ name: 'Privacy Policy', href: '/privacy' },
		],
	},
	{
		title: 'Resources',
		links: [
			{ name: 'Blog', href: '/blog' },
			{ name: 'Guides', href: '/guides' },
			{ name: 'API Documentation', href: '/api-docs' },
			{ name: 'Community Forum', href: '/community' },
		],
	},
];

export const pricingPlans = [
	{
		title: 'Stockly Lite',
		price: 'N0',
		description: 'Get started with essential inventory management tools.',
		features: [
			'Basic Inventory Management',
			'Single Store Management',
			'Limited Transactions (Up to 50/month)',
			'Basic Sales Reports',
			'Community Support',
		],
		buttonText: 'Get Started',
		highlight: false,
	},
	{
		title: 'Stockly Growth',
		price: 'N7,500',
		description: 'Ideal for small and growing businesses that need more control.',
		features: [
			'Advanced Inventory Tracking',
			'Multi-Store Support',
			'1000 Transactions/Month',
			'Sales & Expense Reports',
			'Automated Payment Reconciliation',
			'Email Support',
		],
		buttonText: 'Start Free Trial',
		highlight: true,
	},
	{
		title: 'Stockly Business',
		price: 'N15,000',
		description: 'For established businesses requiring automation & insights.',
		features: [
			'Unlimited Transactions',
			'Real-Time Inventory Sync',
			'Multi-User Access (Up to 5 Users)',
			'Payment Integrations (Cards, USSD, Bank Transfers)',
			'Detailed Business Insights & Analytics',
			'Priority Email & Chat Support',
		],
		buttonText: 'Start Free Trial',
		highlight: false,
	},
	{
		title: 'Stockly Enterprise',
		price: 'Custom Pricing',
		description: 'Tailored solutions for enterprises with complex operations.',
		features: [
			'Custom Feature Development',
			'Unlimited Users & Stores',
			'AI-Powered Sales Forecasting',
			'Dedicated Account Manager',
			'24/7 Priority Support',
			'Enterprise-Grade Security & Compliance',
		],
		buttonText: 'Contact Us',
		highlight: false,
	},
];

export const reviews = [
	{
		website: 'unpablo.com',
		name: 'Pablo Escanor',
		position: 'UX Researcher',
		quote:
			'Stockly has transformed the way I manage my inventory. The payment system is seamless, and I love the real-time analytics!',
		image: '/images/people/corporate_man.jpg',
	},
	{
		website: 'techwave.io',
		name: 'Mia Rodriguez',
		position: 'Product Manager',
		quote:
			'Stockly made scaling our e-commerce store a breeze! The automated inventory tracking and secure payment processing are game-changers.',
		image: '/images/people/corporate_woman.jpg',
	},
	{
		website: 'greenmart.ng',
		name: 'Adeolu Johnson',
		position: 'Small Business Owner',
		quote:
			'Since integrating Stockly, I no longer worry about stock shortages or payment delays. Everything just works seamlessly.',
		image: '/images/people/guy_in_white_background.jpg',
	},
	{
		website: 'byteflow.dev',
		name: 'Daniel Thompson',
		position: 'Software Engineer',
		quote:
			'As a developer, I appreciate how well Stockly integrates with other tools. The API is clean, and the experience is smooth.',
		image: '/images/people/man_with_blue_stripes.jpg',
	},
	{
		website: 'localessentials.com',
		name: 'Fatima Hassan',
		position: 'Retail Store Owner',
		quote:
			"Managing my store has never been this easy. Stockly's analytics helped me increase my revenue by 30% in just two months!",
		image: '/images/people/woman_with_black_background.jpg',
	},
];

export const paymentMethods = [
	'QR/Link',
	'Online Store',
	'Cash',
	'POS',
	'Bank Transfer - Terminal',
	'Bank Transfer - Payout',
	'USSD',
];

export const randomWords = [
	'Inventory',
	'Management',
	'Stock',
	'Squad',
	'Payments',
	'Shopping',
	'Shopping',
	'Simple',
	'Comprehensive',
	'Efficient',
	'Sales',
	'Analytics',
	'Reports',
	'Insights',
	'Business',
	'Growth',
	'Store',
	'Online',
	'Offline',
	'Transactions',
	'Customers',
	'Support',
	'Automation',
	'Integration',
	'Customization',
	'Security',
	'Compliance',
];

export const quickActions: {
	icon: React.ReactNode;
	name: string;
	href: string;
}[] = [
	{
		icon: <FiCreditCard className="text-secondary" size={20} />,
		name: 'Add a new product',
		href: '/products/new',
	},
	{
		icon: <FiShoppingCart className="text-secondary" size={20} />,
		name: 'Create new order',
		href: '/orders/new',
	},
	{
		icon: <FiBarChart className="text-secondary" size={20} />,
		name: 'Create an Expense',
		href: '/expenses/create',
	},
	{
		icon: <FiShoppingCart className="text-secondary" size={20} />,
		name: 'Contact Support',
		href: '#',
	},
];
