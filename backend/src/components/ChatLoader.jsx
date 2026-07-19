import { LoaderIcon } from "lucide-react"

/**
 * CHAT LOADER
 * - shown while Stream connects
 */
const ChatLoader = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
      <LoaderIcon className="animate-spin size-10 text-primary" />
      <p className="mt-4 opacity-70">Connecting to chat…</p>
    </div>
  )
}

export default ChatLoader
