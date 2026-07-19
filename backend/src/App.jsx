import { Routes, Route, Navigate } from "react-router-dom"
import useAuthUser from "./hooks/useAuthUser"
import Layout from "./components/Layout"
import PageLoader from "./components/PageLoader"
import { useThemeStore } from "./store/useThemeStore"

import Home from "./pages/Home"
import Friends from "./pages/Friends"
import ChatPage from "./pages/ChatPage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Onboarding from "./pages/Onboarding"
import Notification from "./pages/Notification"
import Call from "./pages/Call"

const App = () => {
  const { authUser, isLoading } = useAuthUser()
  const { theme } = useThemeStore() // 🔥 REQUIRED

  if (isLoading) return <PageLoader />

  const isAuth = !!authUser
  const isOnboarded = authUser?.isOnboarded

  return (
    // 🔥 THIS IS THE FIX
    <div className="min-h-screen" data-theme={theme}>
      <Routes>
        <Route
  path="/"
  element={
    isAuth && isOnboarded ? (
      <Layout><Home /></Layout>
    ) : (
      <Navigate to={isAuth ? "/onboarding" : "/login"} />
    )
  }
/>

<Route
  path="/onboarding"
  element={
    isAuth && !isOnboarded ? (
      <Onboarding />
    ) : (
      <Navigate to="/" />
    )
  }
/>

        
        <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isAuth ? <SignUp /> : <Navigate to="/" />} />

        
        <Route
          path="/friends"
          element={
            isAuth ? <Layout><Friends /></Layout> : <Navigate to="/login" />
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuth ? <Layout><ChatPage /></Layout> : <Navigate to="/login" />
          }
        />

        <Route
          path="/notifications"
          element={
            isAuth ? <Layout><Notification /></Layout> : <Navigate to="/login" />
          }
        />

        <Route
          path="/call"
          element={isAuth ? <Call /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  )
}

export default App
