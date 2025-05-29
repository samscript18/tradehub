import { ReactNode } from 'react';
import { LuLayoutDashboard, LuSettings, LuShoppingBag, LuShoppingCart } from 'react-icons/lu';
import { CgNotes } from 'react-icons/cg';
import { FaRegUser, FaUsers } from 'react-icons/fa';

interface SidebarItem {
	name: string;
	icon: ReactNode;
	href: string;
}

export const customerSidebarLinks: SidebarItem[] = [
	{
		name: 'Home',
		icon: <LuLayoutDashboard />,
		href: '/customer/home',
	},
	{
		name: 'Products',
		icon: <LuShoppingBag />,
		href: '/customer/products',
	},
	{
		name: 'Orders',
		icon: <CgNotes />,
		href: '/customer/orders',
	},
	{
		name: 'Cart',
		icon: <LuShoppingCart />,
		href: '/customer/cart',
	},
	{
		name: 'Profile',
		icon: <FaRegUser />,
		href: '/customer/profile',
	},
];

export const merchantSidebarLinks: SidebarItem[] = [
	{
		name: 'Dashboard',
		icon: <LuLayoutDashboard />,
		href: '/merchant/dashboard',
	},
	{
		name: 'Products',
		icon: <LuShoppingBag />,
		href: '/merchant/products',
	},
	{
		name: 'Orders',
		icon: <CgNotes />,
		href: '/merchant/orders',
	},
	{
		name: 'Customers',
		icon: <FaUsers />,
		href: '/merchant/customers',
	},
	{
		name: 'Settings',
		icon: <LuSettings />,
		href: '/merchant/settings',
	},
];
