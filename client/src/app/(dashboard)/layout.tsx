// import DashboardLayout from '@/components/Layout/Dashboard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession();
  if (!session) redirect('/login');

  // return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
