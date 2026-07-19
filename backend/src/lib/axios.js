import axios from "axios"

/**
 * AXIOS INSTANCE
 * - withCredentials is REQUIRED for cookies
 * - baseURL points to backend
 */
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
})
