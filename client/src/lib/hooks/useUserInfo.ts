import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../services/user.service";

const useUserInfo = () => {
  const { data: user, isPending: loading } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user"],
    staleTime: 3600,
  });

  return { user, loading };
};

export default useUserInfo;
