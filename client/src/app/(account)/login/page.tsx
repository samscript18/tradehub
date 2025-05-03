import Login from "@/components/UI/Account/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account on Stockly.",
};

const Page = () => <Login />;

export default Page;
