import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signup } from "../lib/api"

const useSignup = () => {
  const qc = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["authUser"] }),
  })

  return { signupMutation: mutate, isPending, error }
}

export default useSignup
