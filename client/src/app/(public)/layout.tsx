import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
