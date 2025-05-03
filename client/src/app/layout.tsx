import type { Metadata } from "next";
import "../public/globals.css";
import { monaSans } from "@/lib/utils/fonts";
import Providers from "@/lib/providers";

export const metadata: Metadata = {
  title: {
    default: "Stockly - Stock Market App",
    template: "%s | Stockly",
  },
  description: "Stockly is a stock market app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monaSans.className} antialiased bg-white dark:text-white dark:bg-black duration-200`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
