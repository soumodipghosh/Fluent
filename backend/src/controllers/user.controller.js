import User from "../models/User.models.js"
import FriendRequest from "../models/friendRequest.models.js"

/**
 * GET RECOMMENDED USERS
 * - excludes current user
 * - excludes users already in friends list
 * - only onboarded users
 * Used on: Home page → "Meet New Learners"
 */
export const getRecomendedUsers = async (req, res) => {
  const users = await User.find({
    _id: { $ne: req.user._id },
    friends: { $nin: [req.user._id] },
    isOnboarded: true,
  })

  res.json(users)
}


/**
 * GET MY FRIENDS
 * - returns ONLY accepted friends
 * Used on:
 * - Home page (Your Friends)
 * - Friends page (Message button)
 */
export const getMyFriends = async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "friends",
    "fullName profilePic"
  )

  res.json(user.friends)
}


/**
 * SEND FRIEND REQUEST
 * - cannot send to self
 * - prevents duplicate requests
 * Used on: Home page → Send Request
 */
export const sendFriendRequest = async (req, res) => {
  const { id } = req.params

  if (id === req.user._id.toString()) {
    return res.status(400).json({ message: "Cannot add yourself" })
  }

  const exists = await FriendRequest.findOne({
    sender: req.user._id,
    recipient: id,
  })

  if (exists) {
    return res.status(400).json({ message: "Request already sent" })
  }

  const request = await FriendRequest.create({
    sender: req.user._id,
    recipient: id,
  })

  res.status(201).json(request)
}




export const getIncomingFriendRequests = async (req, res) => {
  const requests = await FriendRequest.find({
    recipient: req.user._id,
    status: "pending",
  }).populate("sender", "fullName profilePic")

  res.json(requests)
}


/**
 * ACCEPT FRIEND REQUEST
 * - marks request as accepted
 * - adds each user to the other's friends array
 * Used on: Notifications page
 */
export const acceptFriendRequest = async (req, res) => {
  const request = await FriendRequest.findById(req.params.id)

  if (!request) {
    return res.status(404).json({ message: "Request not found" })
  }

  if (request.recipient.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" })
  }

  request.status = "accepted"
  await request.save()

  await User.findByIdAndUpdate(request.sender, {
    $addToSet: { friends: request.recipient },
  })

  await User.findByIdAndUpdate(request.recipient, {
    $addToSet: { friends: request.sender },
  })

  res.json({ message: "Friend added" })
}




/**
 * GET FRIEND REQUESTS
 * - incoming pending requests
 * - accepted requests (used for notifications)
 * Used on: Notifications page
 */
export const getFriendRequest = async (req, res) => {
  // Incoming (someone sent YOU a request)
  const incomingReqs = await FriendRequest.find({
    recipient: req.user._id,
    status: "pending",
  }).populate("sender", "fullName profilePic")

  // Accepted (someone accepted YOUR request)
  const acceptedReqs = await FriendRequest.find({
    recipient: req.user._id,
    status: "accepted",
  }).populate("sender", "fullName profilePic")

  res.json({ incomingReqs, acceptedReqs })
}


/**
 * GET OUTGOING FRIEND REQUESTS
 * - used to disable "Send Request" button
 * Used on: Home page
 */
export const getOutgoingFriendReqs = async (req, res) => {
  try {
    const outgoing = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate("recipient", "fullName profilePic")

    res.json(outgoing)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch outgoing requests" })
  }
}



export const getNotifications = async (req, res) => {
  const sentToYou = await FriendRequest.find({
    recipient: req.user._id,
    status: "pending",
  }).populate("sender", "fullName profilePic")

  const accepted = await FriendRequest.find({
    sender: req.user._id,
    status: "accepted",
  }).populate("recipient", "fullName profilePic")

  res.json({ sentToYou, accepted })
}
