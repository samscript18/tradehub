"use client";

import SessionCheckLoader from "@/components/common/loaders/session-check";
import { useSession } from "next-auth/react";
import React from "react";

type Props = React.PropsWithChildren;

const AuthProvider: React.FC<Props> = ({ children }) => {
  const { status } = useSession();

  if (status === "loading") return <SessionCheckLoader />;

  return <>{children}</>;
};

export default AuthProvider;
