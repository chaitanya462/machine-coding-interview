const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/User")

router.post("/register", async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user) {
        return res.status(400).json({ message: "User already exists" })
    }
    const newUser = new User({ username, password })
    await newUser.save()
    res.status(201).json({ message: "User registered successfully" })
})

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json({ message: "Logged in successfully" })
})

router.get("/logout", (req, res) => {
    req.logout()
    res.status(200).json({ message: "Logged out successfully" })
})

router.get("/profile", (req, res) => {
    res.status(200).json({ message: "Profile", user: req.user })
})

module.exports = router