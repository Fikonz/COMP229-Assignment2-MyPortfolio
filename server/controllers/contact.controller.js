// server/controllers/contact.controller.js
import Contact from "../models/contact.model.js"; // adjust model name if different

// POST /api/contact  – public (send a message)
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: contact,
    });
  } catch (err) {
    console.error("createMessage error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// GET /api/contact  – protected (view all messages)
export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("getMessages error:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// GET /api/contact/:id – protected (view one)
export const getMessageById = async (req, res) => {
  try {
    const msg = await Contact.findById(req.params.id);
    if (!msg) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(msg);
  } catch (err) {
    console.error("getMessageById error:", err);
    res.status(500).json({ message: "Failed to fetch message" });
  }
};

// DELETE /api/contact/:id – protected
export const deleteMessage = async (req, res) => {
  try {
    const msg = await Contact.findByIdAndDelete(req.params.id);
    if (!msg) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Message deleted" });
  } catch (err) {
    console.error("deleteMessage error:", err);
    res.status(500).json({ message: "Failed to delete message" });
  }
};

// DELETE /api/contact – protected
export const deleteAllMessages = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: "All messages deleted" });
  } catch (err) {
    console.error("deleteAllMessages error:", err);
    res.status(500).json({ message: "Failed to delete all messages" });
  }
};
