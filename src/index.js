const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const connectDB = require("./lib/db.js");
const { app, server } = require("./lib/socket.js");

const authRoutes = require("./routes/nutritionItem.route.js");
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
// app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

app.use("/api/nutritions", authRoutes);

// server.listen(PORT, () => {
//   console.log("server is running on port:" + PORT);
//   connectDB();
// });
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(" Server is running on port:", PORT);
    });
  })
  .catch((err) => {
    console.error(" Failed to connect to MongoDB:", err);
    process.exit(1); // Exit if DB connection fails
  });
