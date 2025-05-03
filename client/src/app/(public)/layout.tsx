import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import SmoothScroll from "@/lib/providers/SmoothScroll";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
