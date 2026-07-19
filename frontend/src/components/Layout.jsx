import { useState } from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

/**
 * LAYOUT
 * - wraps all authenticated pages
 * - controls sidebar open/close (mobile)
 * - desktop sidebar always visible
 */
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-64 border-r border-base-300">
          <Sidebar />
        </aside>

        {/* MOBILE SIDEBAR */}
        <div
          className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          {/* SIDEBAR PANEL */}
          <aside
            className={`absolute left-0 top-0 h-full w-64 bg-base-200
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
