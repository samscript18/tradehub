import Setup from "@/components/UI/Setup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store Setup",
  description: "Store Setup",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => <Setup />;

export default Page;
