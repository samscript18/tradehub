"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import ModalProvider from "./ModalProvider";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, useEffect } from "react";
import AuthProvider from "./AuthProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SidebarProvider from "./SideDrawersProvider";
import useTheme from "../store/theme.store";

gsap.registerPlugin(useGSAP);

interface Props {
  children: React.ReactNode;
}

export const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  const { isDark } = useTheme();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <SessionProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense>
            <NextTopLoader showSpinner={false} color="#0F172A" />
          </Suspense>

          <ModalProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ModalProvider>

          <Toaster />

          <ReactQueryDevtools client={queryClient} />
        </QueryClientProvider>
      </AuthProvider>
    </SessionProvider>
  );
};

export default Providers;
