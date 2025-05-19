import Footer from "@/components/layout/footer";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* <Navbar  /> */}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
