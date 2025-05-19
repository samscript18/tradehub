import { ReactNode } from "react";
import { IoDocumentOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";

interface SidebarItem {
  name: string;
  icon: ReactNode;
  href: string;
}

export const sidebarLinks: SidebarItem[] = [
	{
		name: 'Dashboard',
		icon: <LuLayoutDashboard />,
		href: '/admin/dashboard',
	},
	{
		name: 'Documents',
		icon: <IoDocumentOutline />,
		href: '/admin/documents',
	},
];
