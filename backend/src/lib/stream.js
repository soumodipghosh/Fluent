import { StreamChat } from "stream-chat"

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if (!apiKey || !apiSecret) {
  throw new Error("❌ Stream API keys are missing in backend .env")
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret)

export const upsertStreamUser = async ({ id, name, image }) => {
  return streamClient.upsertUser({
    id: id.toString(),
    name,
    image,
  })
}

export const createStreamToken = (userId) => {
  return streamClient.createToken(userId.toString())
}
