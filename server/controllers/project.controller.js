// server/controllers/project.controller.js
import Project from "../models/project.model.js";

// GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("getProjects error:", err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    console.error("getProjectById error:", err);
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

// POST /api/projects  (protected)
export const createProject = async (req, res) => {
  try {
    console.log("Create project body:", req.body);

    const { title, subtitle, description, techStack } = req.body;

    // Include required fields from the schema so validation passes
    const project = new Project({
      title,
      subtitle,
      description,
      techStack,

      // These are required by your schema:
      firstname: "Feyisayo",
      lastname: "Habeeb",
      email: "fhabeeb01@centennialcollege.ca",
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error("createProject error details:", err);
    res
      .status(400)
      .json({ message: err.message || "Failed to create project" });
  }
};


// PUT /api/projects/:id  (protected)
export const updateProject = async (req, res) => {
  try {
    const { title, subtitle, description, techStack } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, description, techStack },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error("updateProject error:", err);
    res.status(500).json({ message: "Failed to update project" });
  }
};

// DELETE /api/projects/:id  (protected)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("deleteProject error:", err);
    res.status(500).json({ message: "Failed to delete project" });
  }
};

// DELETE /api/projects   (protected – remove all)
export const deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany({});
    res.json({ message: "All projects deleted" });
  } catch (err) {
    console.error("deleteAllProjects error:", err);
    res.status(500).json({ message: "Failed to delete all projects" });
  }
};
