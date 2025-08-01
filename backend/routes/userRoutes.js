const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/User")

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const newUser = new User({ username, password })
        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        console.error("Registration error:", error)
        throw new Error("Registration failed: " + error.message)
    }
})

router.post("/login", (req, res, next) => {
    try {
        passport.authenticate("local", (err, user, info) => {
            try {
                if (err) {
                    console.error("Authentication error:", err)
                    throw new Error("Authentication error: " + err.message)
                }
                
                if (!user) {
                    throw new Error(info?.message || "Invalid credentials")
                }
                
                req.logIn(user, (err) => {
                    try {
                        if (err) {
                            console.error("Login error:", err)
                            throw new Error("Login failed: " + err.message)
                        }
                        res.status(200).json({ message: "Logged in successfully", user: { id: user._id, username: user.username } })
                    } catch (loginError) {
                        res.status(500).json({ message: loginError.message })
                    }
                })
            } catch (authError) {
                res.status(401).json({ message: authError.message })
            }
        })(req, res, next)
    } catch (error) {
        res.status(500).json({ message: "Login process failed: " + error.message })
    }
})

router.get("/logout", (req, res) => {
    try {
        req.logout((err) => {
            try {
                if (err) {
                    throw new Error("Error logging out: " + err.message)
                }
                res.status(200).json({ message: "Logged out successfully" })
            } catch (logoutError) {
                res.status(500).json({ message: logoutError.message })
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Logout process failed: " + error.message })
    }
})

router.get("/profile", (req, res) => {
    try {
        res.status(200).json({ message: "Profile", user: req.user })
    } catch (error) {
        res.status(500).json({ message: "Profile retrieval failed: " + error.message })
    }
})

module.exports = router