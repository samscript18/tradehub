import LoginPage from '@/components/ui/auth/login';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Sign in to your TradeHub account',
};

const page = () => <LoginPage />;

export default page;
