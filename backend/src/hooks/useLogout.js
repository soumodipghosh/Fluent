import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "../lib/api"

const useLogout = () => {
  const qc = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["authUser"] }),
  })

  return { logoutMutation: mutate }
}

export default useLogout
