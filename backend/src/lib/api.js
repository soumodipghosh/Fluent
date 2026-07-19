import { axiosInstance } from "./axios"

/* AUTH */
export const signup = (data) =>
  axiosInstance.post("/auth/signup", data).then(res => res.data)

export const login = (data) =>
  axiosInstance.post("/auth/login", data).then(res => res.data)

export const logout = () =>
  axiosInstance.post("/auth/logout").then(res => res.data)

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me")
    return res.data
  } catch {
    return null
  }
}

export const completeOnBoarding = (data) =>
  axiosInstance.post("/auth/onboarding", data).then(res => res.data)

/* USERS */
export const getUserFriends = () =>
  axiosInstance.get("/users/friends").then(res => res.data)

export const getRecomendedUsers = () =>
  axiosInstance.get("/users").then(res => res.data)

export const sendFriendRequest = (id) =>
  axiosInstance.post(`/users/friend-request/${id}`).then(res => res.data)

export const getFriendRequests = () =>
  axiosInstance.get("/users/friend-requests").then(res => res.data)

export const getOutgoingFriendReqs = () =>
  axiosInstance.get("/users/outgoing-friend-requests").then(res => res.data)

export const acceptFriendRequest = (id) =>
  axiosInstance.post(`/users/friend-request/${id}/accept`).then(res => res.data)

/* CHAT */
export const getStreamToken = (friendId) =>
  axiosInstance
    .post("/chat/token", { friendId })
    .then((res) => res.data)


// 🔹 INCOMING FRIEND REQUESTS (HOME PAGE)
export const getIncomingFriendRequests = async () => {
  const response = await axiosInstance.get("/users/incoming-requests")
  return response.data
}

// 🔹 NOTIFICATIONS (INFO ONLY)
export const getNotifications = async () => {
  const response = await axiosInstance.get("/users/notifications")
  return response.data
}
