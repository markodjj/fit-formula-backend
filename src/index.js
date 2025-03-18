const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const connectDB = require("./lib/db.js");
const { app, server } = require("./lib/socket.js");

const nutritionsRoutes = require("./routes/nutritionItem.route.js");
dotenv.config();

const { NODE_ENV, PORT } = process.env;

const FRONTEND_URL = process.env.VITE_API_URL;
console.log(FRONTEND_URL);
app.use(express.json());
// app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

app.use("/api/nutritions", nutritionsRoutes);

if (NODE_ENV === "development") {
  server.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
    connectDB();
  });
} else if (NODE_ENV === "production") {
  // For production, Vercel expects an exported server (or app)
  connectDB();
}
module.exports = server;
