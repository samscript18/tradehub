import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession();
  if (session) redirect("/dashboard");

  return <>{children}</>;
};

export default Layout;
