import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import { LANGUAGE_TO_FLAG } from "../constants"

/**
 * FRIEND CARD
 */
const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <Avatar
            src={friend.profilePic}
            className="w-12 h-12 rounded-full"
          />
          <h3 className="font-semibold truncate">
            {friend.fullName}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 text-xs">
          {friend.nativeLanguage && (
            <span className="badge badge-secondary">
              {getLanguageFlag(friend.nativeLanguage)}
              Native: {friend.nativeLanguage}
            </span>
          )}
          {friend.learningLanguage && (
            <span className="badge badge-outline">
              {getLanguageFlag(friend.learningLanguage)}
              Learning: {friend.learningLanguage}
            </span>
          )}
        </div>

        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-outline mt-4"
        >
          Message
        </Link>
      </div>
    </div>
  )
}

export default FriendCard

// ✅ EXPORT IT
export const getLanguageFlag = (language) => {
  const code = LANGUAGE_TO_FLAG[language?.toLowerCase()]
  return code ? (
    <img
      src={`https://flagcdn.com/24x18/${code}.png`}
      className="h-3 mr-1 inline-block"
    />
  ) : null
}
