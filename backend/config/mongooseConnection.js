const mongoose = require("mongoose")
const MONGO_URI = process.env.MONGODB_CONNECTION_URL;

if (!MONGO_URI) {
    console.error("MONGODB_CONNECTION_URL is not set in environment variables");
    process.exit(1);
}

const mongooseConnection = async () => await mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });

module.exports = mongooseConnection;