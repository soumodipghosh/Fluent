import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from "../lib/api"

const useLogin = () => {
  const qc = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["authUser"] }),
  })

  return { loginMutation: mutate, isPending, error }
}

export default useLogin
