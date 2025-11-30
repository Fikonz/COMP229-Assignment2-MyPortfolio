// server/routes/project.routes.js
import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects,
} from "../controllers/project.controller.js"; // <-- singular "project"
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public: view projects
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Protected: change projects
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);
router.delete("/", protect, deleteAllProjects);

export default router;
