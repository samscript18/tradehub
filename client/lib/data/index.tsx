import { avatar1, avatar2, avatar3 } from '@/public/images';
import { FaCreditCard, FaSearch, FaShieldAlt, FaShoppingBag, FaStore } from 'react-icons/fa';
import { FaCartShopping, FaTruck, FaUsers } from 'react-icons/fa6';
import { FiGlobe, FiTool } from 'react-icons/fi';
import { MdCreditCard, MdOutlineLocationOn } from 'react-icons/md';
import { TbMessages } from 'react-icons/tb';

interface NavGroup {
	name: string;
	icon?: string;
	link: string;
	subLinks?: NavGroup[];
}

export const navLinks: NavGroup[] = [
	{
		name: 'Home',
		link: '/',
	},
	{
		name: 'About Us',
		link: '/#about-us',
	},
	{
		name: 'Features',
		link: '/#features',
	},
	{
		name: 'Contact',
		link: '/#contact',
	},
];

export const OperationProcess = [
	{
		id: 1,
		icon: <FaSearch size={20} className="text-white" />,
		name: 'Browse Local Shops',
		description: 'Discover unique products from nearby vendors',
	},
	{
		id: 2,
		icon: <FaCartShopping size={20} className="text-white" />,
		name: 'Place Your Order',
		description: 'Select items and customize your purchase',
	},
	{
		id: 3,
		icon: <FaCreditCard size={20} className="text-white" />,
		name: 'Secure Payment',
		description: 'Safe and easy checkout process',
	},
	{
		id: 4,
		icon: <FaTruck size={20} className="text-white" />,
		name: 'Fast Delivery',
		description: 'Quick delivery to your doorstep',
	},
];

export const Features = [
	{
		id: 1,
		icon: <FiGlobe size={20} className="text-white" />,
		name: 'Real Time Search',
		description: 'Find local products instantly with our advanced search',
	},
	{
		id: 2,
		icon: <MdCreditCard size={20} className="text-white" />,
		name: 'Easy Checkout',
		description: 'Seamless payment experience with multiple options',
	},
	{
		id: 3,
		icon: <MdOutlineLocationOn size={20} className="text-white" />,
		name: 'Local Delivery',
		description: 'Same-day delivery options for your convenience',
	},
	{
		id: 4,
		icon: <FiTool size={20} className="text-white" />,
		name: 'Merchant Tools',
		description: 'Powerful business management dashboard',
	},
];

export const Stories = [
	{
		id: 1,
		img: avatar1,
		name: 'Sarah Johnson',
		country: 'Lagos State',
		rating: 5,
		comment: 'TradeHub made it easy to support local businesses while shopping for groceries.',
	},
	{
		id: 2,
		img: avatar2,
		name: 'Oladele Philip',
		country: 'Ogun State',
		rating: 5,
		comment: 'As a merchant, TradeHub has helped me reach more customers in my neighborhood.',
	},
	{
		id: 3,
		img: avatar3,
		name: 'David Ifeoluwa',
		country: 'Osun State',
		rating: 5,
		comment: 'The local delivery service is fantastic! Everything arrives fresh and on time.',
	},
];

export const AboutData = [
	{
		id: 1,
		icon: <FaUsers size={20} className="text-white" />,
		name: 'Community-First Commerce',
		description:
			'We believe in building strong local economies through meaningful connections between neighbors and local businesses.',
	},
	{
		id: 2,
		icon: <FaShieldAlt size={20} className="text-white" />,
		name: 'Secure, Seamless Transaction',
		description:
			'Your safety and peace of mind are our top priorities. Every transaction is protected with industry-leading security measures.',
	},
	{
		id: 3,
		icon: <FaStore size={20} className="text-white" />,
		name: 'Empowering Small Businesses',
		description:
			'We provide the tools and platform local merchants need to thrive in the digital age while maintaining their unique character.',
	},
];

export const AboutInfo = [
	{
		id: 1,
		icon: <FaUsers size={20} className="text-white" />,
		title: 'Active Users',
		value: '50+',
	},
	{
		id: 2,
		icon: <FaStore size={20} className="text-white" />,
		title: 'Local Merchants',
		value: '20+',
	},
	{
		id: 3,
		icon: <FaShoppingBag size={20} className="text-white" />,
		title: 'Monthly Orders',
		value: '35+',
	},
	{
		id: 4,
		icon: <TbMessages size={20} className="text-white" />,
		title: 'Satisfaction Rate',
		value: '95%',
	},
];

export const storeCategories: {
	id: string;
	value: string;
	label: string;
	icon: string;
}[] = [
	{ id: '1', value: 'electronics', label: 'Electronics', icon: '📱' },
	{ id: '2', value: 'clothing', label: 'Clothing & Fashion', icon: '👕' },
	{ id: '3', value: 'food-beverages', label: 'Food & Beverages', icon: '🍕' },
	{ id: '4', value: 'books', label: 'Books & Media', icon: '📚' },
	{ id: '5', value: 'home-garden', label: 'Home & Garden', icon: '🏠' },
	{ id: '6', value: 'sports', label: 'Sports & Outdoors', icon: '⚽' },
	{ id: '7', value: 'beauty', label: 'Beauty & Personal Care', icon: '💄' },
	{ id: '8', value: 'toys', label: 'Toys & Games', icon: '🧸' },
	{ id: '9', value: 'automotive', label: 'Automotive', icon: '🚗' },
	{ id: '10', value: 'health', label: 'Health & Wellness', icon: '💊' },
	{ id: '11', value: 'jewelry', label: 'Jewelry & Accessories', icon: '💎' },
	{ id: '12', value: 'pet-supplies', label: 'Pet Supplies', icon: '🐕' },
	{ id: '13', value: 'office', label: 'Office & Business', icon: '💼' },
	{ id: '14', value: 'crafts', label: 'Arts & Crafts', icon: '🎨' },
	{ id: '15', value: 'music', label: 'Music & Instruments', icon: '🎵' },
];
