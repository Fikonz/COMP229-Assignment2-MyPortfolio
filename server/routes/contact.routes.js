// server/routes/contact.routes.js
import express from "express";
import {
  createMessage,
  getMessages,
  getMessageById,
  deleteMessage,
  deleteAllMessages,
} from "../controllers/contact.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public: visitors can send you a message
router.post("/", createMessage);

// Protected: only logged-in you can view/delete messages
router.get("/", protect, getMessages);
router.get("/:id", protect, getMessageById);
router.delete("/:id", protect, deleteMessage);
router.delete("/", protect, deleteAllMessages);

export default router;
