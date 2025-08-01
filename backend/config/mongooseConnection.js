const mongoose = require("mongoose")

const mongooseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

module.exports = mongooseConnection;