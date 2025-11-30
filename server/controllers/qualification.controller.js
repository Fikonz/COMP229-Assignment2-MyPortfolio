// server/controllers/qualification.controller.js
import Qualification from "../models/qualification.model.js";

// POST /api/qualifications
export const createQualification = async (req, res) => {
  try {
    const qualification = await Qualification.create(req.body);
    res.status(201).json(qualification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/qualifications
export const getQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/qualifications/:id
export const getQualificationById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification)
      return res.status(404).json({ message: "Qualification not found" });
    res.json(qualification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/qualifications/:id
export const updateQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!qualification)
      return res.status(404).json({ message: "Qualification not found" });
    res.json(qualification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/qualifications/:id
export const deleteQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndDelete(req.params.id);
    if (!qualification)
      return res.status(404).json({ message: "Qualification not found" });
    res.json({ message: "Qualification deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
