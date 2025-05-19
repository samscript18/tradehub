import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUser } from "../services/auth.service";

const useUserInfo = () => {
  const { data } = useSession();

  const { data: user, isPending: loading } = useQuery({
    queryFn: () => getUser(),
    queryKey: ["user"],
    enabled: data?.user ? true : false,
    staleTime: 1000 * 60 * 60,
  });

  return { user, loading };
};

export default useUserInfo;
