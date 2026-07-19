import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getIncomingFriendRequests,
  getRecomendedUsers,
  sendFriendRequest,
  acceptFriendRequest,
} from "../lib/api"
import Avatar from "../components/Avatar"

/**
 * HOME PAGE
 * 1. Shows incoming friend requests (Accept button)
 * 2. Shows recommended users (Send Request)
 */
const Home = () => {
  const queryClient = useQueryClient()

  // 🔹 Incoming requests (people who sent YOU request)
  const { data: incomingRequests = [] } = useQuery({
    queryKey: ["incomingRequests"],
    queryFn: getIncomingFriendRequests,
  })

  // 🔹 Recommended users
  const { data: recommendedUsers = [] } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecomendedUsers,
  })

  // 🔹 Accept request
  const acceptMutation = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomingRequests"] })
      queryClient.invalidateQueries({ queryKey: ["friends"] })
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
      queryClient.invalidateQueries({ queryKey: ["recommendedUsers"] }) // 🔥 ADD
    },
  })

  // 🔹 Send request
  const sendMutation = useMutation({
    mutationFn: sendFriendRequest,
  })

  return (
    <div className="p-6 space-y-10">
      {/* ================= INCOMING REQUESTS ================= */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Friend Requests</h2>

        {incomingRequests.length === 0 && (
          <p className="opacity-60">No incoming requests</p>
        )}

        <div className="space-y-3">
          {incomingRequests.map((req) => (
            <div
              key={req._id}
              className="flex items-center gap-4 bg-base-200 p-4 rounded-xl"
            >
              <Avatar
                src={req.sender.profilePic}
                className="w-10 h-10 rounded-full"
              />

              <span className="font-medium flex-1">
                {req.sender.fullName}
              </span>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => acceptMutation.mutate(req._id)}
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RECOMMENDED USERS ================= */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          People you may know
        </h2>

        <div className="space-y-3">
          {recommendedUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 bg-base-200 p-4 rounded-xl"
            >
              <Avatar
                src={user.profilePic}
                className="w-10 h-10 rounded-full"
              />

              <span className="font-medium flex-1">
                {user.fullName}
              </span>

              <button
                className="btn btn-outline btn-sm"
                onClick={() => sendMutation.mutate(user._id)}
              >
                Send Request
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
