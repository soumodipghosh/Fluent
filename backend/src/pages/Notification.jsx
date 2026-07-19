import { useQuery } from "@tanstack/react-query"
import { getNotifications } from "../lib/api"
import Avatar from "../components/Avatar"

/**
 * NOTIFICATIONS PAGE
 * - Shows who sent request
 * - Shows who accepted your request
 * - NO accept button here
 */
const Notification = () => {
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  })

  const sentToYou = data?.sentToYou || []
  const accepted = data?.accepted || []

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {sentToYou.length === 0 && accepted.length === 0 && (
        <p className="opacity-60">No notifications yet</p>
      )}

      <div className="space-y-4">
        {/* 🔹 Incoming requests (info only) */}
        {sentToYou.map((n) => (
          <div
            key={n._id}
            className="flex items-center gap-4 bg-base-200 p-4 rounded-xl"
          >
            <Avatar
              src={n.sender.profilePic}
              className="w-10 h-10 rounded-full"
            />

            <p>
              <span className="font-semibold">
                {n.sender.fullName}
              </span>{" "}
              sent you a friend request
            </p>
          </div>
        ))}

        {/* 🔹 Accepted requests */}
        {accepted.map((n) => (
          <div
            key={n._id}
            className="flex items-center gap-4 bg-base-200 p-4 rounded-xl"
          >
            <Avatar
              src={n.recipient.profilePic}
              className="w-10 h-10 rounded-full"
            />

            <p>
              <span className="font-semibold">
                {n.recipient.fullName}
              </span>{" "}
              accepted your friend request
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notification
