import User from "../models/User.models.js"
import jwt from "jsonwebtoken"

// SIGNUP — NOT ONBOARDED
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const user = await User.create({
      fullName,
      email,
      password,
    })

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    )

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(201).json({ user })
  } catch (err) {
    console.error("SIGNUP ERROR:", err)
    res.status(500).json({ message: "Signup failed" })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    )

    res.cookie("jwt", token, {
  httpOnly: true,
  sameSite: "lax",   // ✅ REQUIRED
  secure: false,     // ✅ REQUIRED on localhost
  maxAge: 7 * 24 * 60 * 60 * 1000,
})


    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: "Login failed" })
  }
}

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("jwt")
  res.json({ message: "Logged out" })
}

// 🔥 ONBOARDING — ONLY PLACE isOnboarded BECOMES TRUE
export const onboard = async (req, res) => {
  try {
    const { bio, nativeLanguage, learningLanguage, location } = req.body

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        bio,
        nativeLanguage,
        learningLanguage,
        location,
        isOnboarded: true, // ✅ ONLY HERE
      },
      { new: true }
    ).select("-password")

    res.json({ user })
  } catch (err) {
    console.error("ONBOARD ERROR:", err)
    res.status(500).json({ message: "Onboarding failed" })
  }
}


// ADD THIS AT BOTTOM
export const me = async (req, res) => {
  res.json({ user: req.user })
}
