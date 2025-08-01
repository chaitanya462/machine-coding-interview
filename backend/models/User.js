const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        "password": {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


module.exports = mongoose.model("User", UserSchema)
