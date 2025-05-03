import Register from "@/components/UI/Account/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for an account on Stockly.",
};

const Page = () => <Register />;

export default Page;
