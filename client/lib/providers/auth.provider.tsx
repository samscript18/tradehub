"use client";

import React,{useEffect} from "react";
import { useAuth } from '@/lib/store/auth.store';
import { setLogoutHandler } from '@/lib/config/axios-instance';

type Props = React.PropsWithChildren;

const AuthProvider: React.FC<Props> = ({ children }) => {
  const { resetUser } = useAuth();

  useEffect(() => {
    setLogoutHandler(resetUser);
  }, [resetUser]);

  return <>{children}</>;
};

export default AuthProvider;
