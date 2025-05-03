import { Metadata } from "next";
import Cart from "../../../components/UI/Cart";

export const metadata: Metadata = {
  title: "Cart",
  description: "Cart page",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => <Cart />;

export default Page;
