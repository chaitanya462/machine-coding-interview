require('dotenv').config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const mongooseConnection = require("./config/mongooseConnection");
const userRoutes = require("./routes/userRoutes");
const corsConfig = require("./config/cors");
require("./config/auth")(passport);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsConfig());

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

mongooseConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});