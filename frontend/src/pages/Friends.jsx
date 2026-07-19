import { useQuery } from "@tanstack/react-query"
import { getUserFriends } from "../lib/api"
import { Link } from "react-router-dom"

const Friends = () => {
  const { data: friends = [] } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  })

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Messages</h1>

      {friends.map((f) => (
        <div key={f._id} className="flex items-center gap-4 mb-3">
          <img src={f.profilePic} className="w-10 h-10 rounded-full" />
          <span>{f.fullName}</span>
          <Link to={`/chat/${f._id}`} className="btn btn-primary btn-sm">
            Message
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Friends
