import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api"

/**
 * SINGLE SOURCE OF TRUTH FOR AUTH
 * - used everywhere
 * - survives refresh
 */
const useAuthUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  })

  return { authUser: data?.user, isLoading }
}

export default useAuthUser
