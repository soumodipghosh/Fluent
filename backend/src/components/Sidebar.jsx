import { Link, useLocation } from "react-router-dom"
import {
  HomeIcon,
  UsersIcon,
  BellIcon,
  MessageSquareIcon,
  XIcon,
} from "lucide-react"
import useAuthUser from "../hooks/useAuthUser"
import Avatar from "./Avatar"

/**
 * SIDEBAR
 * - correct routes
 * - messages route goes to Friends (message button there)
 * - active route highlight
 */
const Sidebar = ({ onClose }) => {
  const { authUser } = useAuthUser()
  const location = useLocation()

  const isActive = (path) =>
    location.pathname === path ? "bg-base-300" : ""

  return (
    <aside className="h-full flex flex-col">
      {/* MOBILE CLOSE */}
      {onClose && (
        <div className="lg:hidden flex justify-end p-3">
          <button onClick={onClose} className="btn btn-ghost btn-circle">
            <XIcon />
          </button>
        </div>
      )}

      {/* DESKTOP LOGO */}
      <div className="hidden lg:block p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Stream-Tube</span>
        </Link>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 p-3 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost w-full justify-start ${isActive("/")}`}
        >
          <HomeIcon size={18} />
          Home
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost w-full justify-start ${isActive("/friends")}`}
        >
          <UsersIcon size={18} />
          Friends
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost w-full justify-start ${isActive("/notifications")}`}
        >
          <BellIcon size={18} />
          Notifications
        </Link>

        {/* Messages → handled inside Friends page */}
        <Link
          to="/friends"
          className="btn btn-ghost w-full justify-start"
        >
          <MessageSquareIcon size={18} />
          Messages
        </Link>
      </nav>

      {/* USER FOOTER */}
      <div className="p-4 border-t border-base-300 flex items-center gap-3">
        <Avatar
          src={authUser?.profilePic}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold truncate">
            {authUser?.fullName}
          </p>
          <p className="text-xs text-success">Online</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
