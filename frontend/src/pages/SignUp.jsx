import { useState } from "react"
import { ScanFace } from "lucide-react"
import { Link } from "react-router-dom"
import useSignup from "../hooks/useSignup"

/**
 * SIGNUP PAGE
 * - Fully responsive
 * - No onboarding flag set here
 * - Cookie set by backend
 */
const SignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const { signupMutation, isPending, error } = useSignup()

  const submit = (e) => {
    e.preventDefault()
    signupMutation(form)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-base-100 rounded-2xl shadow-lg overflow-hidden">

        {/* LEFT FORM */}
        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-2 mb-6">
            <ScanFace className="size-8 text-primary" />
            <h1 className="text-2xl font-bold">Fluent_link</h1>
          </div>

          <h2 className="text-xl font-semibold mb-1">
            Create your account
          </h2>
          <p className="text-sm opacity-70 mb-6">
            Join and start chatting
          </p>

          {error && (
            <div className="alert alert-error mb-4">
              {error.response?.data?.message || "Signup failed"}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <input
              placeholder="Full Name"
              className="input input-bordered w-full"
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <button className="btn btn-primary w-full">
              {isPending ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex items-center justify-center bg-primary/10 p-10">
          <img
            src="/i.png"
            alt="signup"
            className="max-w-sm w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default SignUp
