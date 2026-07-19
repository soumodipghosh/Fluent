import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { completeOnBoarding } from "../lib/api"
import useAuthUser from "../hooks/useAuthUser"

const Onboarding = () => {
  const { authUser } = useAuthUser()
  const queryClient = useQueryClient()

  const [form, setForm] = useState({
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
  })

  const { mutate, isPending } = useMutation({
    mutationFn: completeOnBoarding,
    onSuccess: () => {
      // 🔥 THIS IS WHAT MAKES REDIRECT WORK
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate(form)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-200 p-8 w-full max-w-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Complete your profile
        </h1>

        <input
          className="input input-bordered w-full"
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          required
        />

        <input
          className="input input-bordered w-full"
          placeholder="Native Language"
          value={form.nativeLanguage}
          onChange={(e) =>
            setForm({ ...form, nativeLanguage: e.target.value })
          }
          required
        />

        <input
          className="input input-bordered w-full"
          placeholder="Learning Language"
          value={form.learningLanguage}
          onChange={(e) =>
            setForm({ ...form, learningLanguage: e.target.value })
          }
          required
        />

        <input
          className="input input-bordered w-full"
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          required
        />

        <button className="btn btn-primary w-full">
          {isPending ? "Saving..." : "Complete"}
        </button>
      </form>
    </div>
  )
}

export default Onboarding
