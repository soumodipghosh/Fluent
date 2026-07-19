import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
} from "stream-chat-react"
import { useQuery } from "@tanstack/react-query"
import useAuthUser from "../hooks/useAuthUser"
import { getStreamToken } from "../lib/api"
import ChatLoader from "../components/ChatLoader"
import { streamClient } from "../lib/streamClient"

const ChatPage = () => {
  const { id: targetUserId } = useParams()
  const { authUser } = useAuthUser()
  const [channel, setChannel] = useState(null)

  const { data } = useQuery({
    queryKey: ["streamToken", targetUserId],
    queryFn: () => getStreamToken(targetUserId),
    enabled: !!authUser,
    staleTime: Infinity,
  })

  useEffect(() => {
  if (!authUser || !data?.token) return

  const init = async () => {
    if (!streamClient.userID) {
      await streamClient.connectUser(
        {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        },
        data.token
      )
    }

    const channelId = [authUser._id, targetUserId].sort().join("_")

    const ch = streamClient.channel("messaging", channelId, {
      members: [authUser._id, targetUserId],
    })

    await ch.watch()
    setChannel(ch)
  }

  init()
}, [authUser, data, targetUserId])


  if (!channel) return <ChatLoader />

  return (
    <div className="h-[calc(100vh-64px)]">
      <Chat client={streamClient} theme="messaging dark">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput focus />
          </Window>
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage
