import SignUpPage from '@/components/ui/auth/sign-up';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Signup',
	description: 'Sign up to your TradeHub account',
};

const page = () => <SignUpPage />;

export default page;
