// server/routes/services.routes.js
import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  deleteAllServices,
} from "../controllers/services.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public: view services
router.get("/", getServices);
router.get("/:id", getServiceById);

// Protected: modify services
router.post("/", protect, createService);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);
router.delete("/", protect, deleteAllServices);

export default router;
