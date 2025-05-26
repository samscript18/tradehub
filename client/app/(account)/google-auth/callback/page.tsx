import GoogleAuthPage from '@/components/ui/auth/google-auth';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'SignIn',
	description: 'Sign in to your TradeHub account with google',
};

const page = () => <GoogleAuthPage />;

export default page;
