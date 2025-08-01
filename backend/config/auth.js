const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    }, async (username, password, done) => {
        try {
            const user = await User.findOne({ username })
            if (!user) {
                throw new Error("User not found")
            }
            const isMatch = await user.comparePassword(password)
            if (!isMatch) {
                throw new Error("Invalid password")
            }
            return done(null, user)
        } catch (error) {
            return done(null, false, { message: error.message })
        }
    }))

    passport.serializeUser((user, done) => {
        try {
            done(null, user.id)
        } catch (error) {
            done(error)
        }
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
            if (!user) {
                throw new Error("User not found during deserialization")
            }
            done(null, user)
        } catch (error) {
            done(error)
        }
    })
}