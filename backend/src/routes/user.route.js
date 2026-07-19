import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import {
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequest,
  getOutgoingFriendReqs,
  getMyFriends,
  getRecomendedUsers,
  getIncomingFriendRequests,
  getNotifications,
} from "../controllers/user.controller.js"

const router = express.Router()
router.use(protectRoute)

router.get("/", getRecomendedUsers)
router.get("/friends", getMyFriends)

router.post("/friend-request/:id", sendFriendRequest)
router.post("/friend-request/:id/accept", acceptFriendRequest)

//router.post("/stream-user", ensureStreamUser)

router.get("/friend-requests", getFriendRequest)
router.get("/outgoing-friend-requests", getOutgoingFriendReqs)



router.get("/incoming-requests", getIncomingFriendRequests)
router.get("/friends", getMyFriends)
router.get("/notifications", getNotifications)
router.post("/friend-request/:id", sendFriendRequest)
router.post("/friend-request/:id/accept", acceptFriendRequest)



export default router
