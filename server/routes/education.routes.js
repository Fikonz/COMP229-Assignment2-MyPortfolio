// server/routes/education.routes.js
import express from "express";
import {
  getEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
  deleteAllEducations,
} from "../controllers/education.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public: view education entries
router.get("/", getEducations);
router.get("/:id", getEducationById);

// Protected: modify education entries
router.post("/", protect, createEducation);
router.put("/:id", protect, updateEducation);
router.delete("/:id", protect, deleteEducation);
router.delete("/", protect, deleteAllEducations);

export default router;
