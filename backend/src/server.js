import "dotenv/config"   // ✅ MUST BE FIRST LINE

import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./lib/db.js"

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://streamtube.vercel.app",
    ],
    credentials: true,
  })
)

//console.log("JWT_SECRET:", process.env.JWT_SECRET_KEY);


app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  connectDB()
  console.log("Server running on port", PORT)
})
