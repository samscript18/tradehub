import { avatar1, avatar2, avatar3 } from '@/public/images';
import { FaCreditCard, FaSearch } from 'react-icons/fa';
import { FaCartShopping, FaTruck } from 'react-icons/fa6';
import { FiGlobe, FiTool } from 'react-icons/fi';
import { MdCreditCard, MdOutlineLocationOn } from 'react-icons/md';

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
