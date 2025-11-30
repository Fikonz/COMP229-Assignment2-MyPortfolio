// server/server.js

// 1) Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config();

// 2) Imports
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

// Express app
const app = express();
app.use(cors());
app.use(express.json());

// 3) Import routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/project.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import servicesRoutes from "./routes/services.routes.js";
app.use("/api/services", servicesRoutes);
import educationRoutes from "./routes/education.routes.js";
app.use("/api/education", educationRoutes);


// 4) Simple root route
app.get("/", (req, res) => {
  res.send("Welcome to User application");
});

// 5) API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);

// 6) ENV Vars
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Debug log
console.log("🔥 MONGO_URI from .env:", MONGO_URI);

// 7) MongoDB Connection + Start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
