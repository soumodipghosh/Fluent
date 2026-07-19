import { Menu, ScanFace } from "lucide-react"
import { Link } from "react-router-dom"
import useAuthUser from "../hooks/useAuthUser"
import useLogout from "../hooks/useLogout"
import Avatar from "./Avatar"
import ThemeSelector from "./ThemeSelector"

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { authUser } = useAuthUser()
  const { logoutMutation } = useLogout()

  return (
    <nav className="h-16 bg-base-200 border-b flex items-center px-4 sticky top-0 z-50">
      <button
        className="btn btn-ghost lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu />
      </button>

      <Link to="/" className="flex items-center gap-2 ml-2">
        <ScanFace className="text-primary" />
        <span className="font-bold text-lg">Fluent_link</span>
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <ThemeSelector />

        {authUser && (
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle">
              <Avatar src={authUser.profilePic} className="w-9 h-9 rounded-full" />
            </button>

            <div className="dropdown-content mt-2 w-40 bg-base-200 border rounded-xl p-2">
              <button
                onClick={logoutMutation}
                className="btn btn-ghost w-full text-error"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
