import ResetPasswordPage from '@/components/ui/auth/reset-password';
import React, { Suspense } from 'react';

const page = () => (
  <Suspense>
    <ResetPasswordPage />;
  </Suspense>
);

export default page;
