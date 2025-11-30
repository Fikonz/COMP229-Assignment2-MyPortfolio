// server.js (root of MyPortfolio)

// ------------------------------
// 1) Load environment variables
// ------------------------------
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
});

// ------------------------------
// 2) Imports
// ------------------------------
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import route files
import authRoutes from "./server/routes/auth.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";

const app = express();

// ------------------------------
// 3) Middleware
// ------------------------------
app.use(cors());
app.use(express.json());

// ------------------------------
// 4) API Routes
// ------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to User application");
});

// ------------------------------
// 5) Start MongoDB + Server
// ------------------------------
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Debug check
console.log("MONGO_URI from .env:", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ------------------------------
// 6) Serve React build (optional for deployment)
// ------------------------------
import fs from "fs";

const clientDistPath = path.join(__dirname, "client", "dist");

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

}
