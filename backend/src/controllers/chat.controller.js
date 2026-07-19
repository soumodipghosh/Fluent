import User from "../models/User.models.js"
import { createStreamToken, upsertStreamUser } from "../lib/stream.js"

export const getStreamToken = async (req, res) => {
  const user = req.user
  const { friendId } = req.body

  // 🔥 UPSERT LOGGED-IN USER
  await upsertStreamUser({
    id: user._id,
    name: user.fullName,
    image: user.profilePic,
  })

  // 🔥 UPSERT FRIEND (CRITICAL)
  if (friendId) {
    const friend = await User.findById(friendId)
    if (friend) {
      await upsertStreamUser({
        id: friend._id,
        name: friend.fullName,
        image: friend.profilePic,
      })
    }
  }

  const token = createStreamToken(user._id)
  res.json({ token })
}
