'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalProvider } from '../contexts/modal-context';
import { Toaster as SonnerToaster } from 'sonner';
import { useEffect } from 'react';
import { useTheme } from '../store/global.store';
import { useAuth } from '../store/auth.store';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

const Providers = ({ children }: React.PropsWithChildren) => {
  const { isDark: isDarkMode } = useTheme();
  const { fetchUser, user, accessToken } = useAuth();

  const styleOptions = isDarkMode
    ? {
        backgroundColor: '#131921',
        color: 'white',
        fontSize: '14px',
        borderColor: '#181f29',
      }
    : {};

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!user && accessToken) {
      fetchUser();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SonnerToaster
        toastOptions={{
          style: styleOptions,
        }}
        // richColors={true}
      />
      <ModalProvider>{children}</ModalProvider>
      <ReactQueryDevtools client={queryClient} />
    </QueryClientProvider>
  );
};

export default Providers;
