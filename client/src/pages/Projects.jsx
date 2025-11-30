// client/src/pages/Projects.jsx
import React, { useEffect, useState } from "react";
import api from "../api"; // <-- uses JWT-aware axios
import "./Projects.css"; // keep your existing styling

function Projects({ user }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    techStack: "",
  });

  const isLoggedIn = !!user;

  // Load projects on first render
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const startCreate = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      techStack: "",
    });
    setError("");
  };

  const startEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      subtitle: project.subtitle || "",
      description: project.description || "",
      techStack: project.techStack || "",
    });
    setError("");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingProject) {
        // Update existing project
        const res = await api.put(`/projects/${editingProject._id}`, formData);
        const updated = res.data;

        setProjects((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );
      } else {
        // Create new project
        const res = await api.post("/projects", formData);
        setProjects((prev) => [...prev, res.data]);
      }

      // Reset form
      setEditingProject(null);
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        techStack: "",
      });
    } catch (err) {
      console.error("Save project error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to save project. Are you logged in?");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete project error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to delete project. Are you logged in?");
      }
    }
  };

  return (
    <div className="page projects-page">
      <h1>Projects</h1>
      <p>
        Here are a few projects that represent my journey as a software
        engineering student and small business owner.
      </p>

      {loading && <p>Loading projects...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* Admin / edit section – only visible when logged in */}
      {isLoggedIn && (
        <section className="projects-admin">
          <h2>{editingProject ? "Edit Project" : "Add New Project"}</h2>

          <form className="project-form" onSubmit={handleSave}>
            <label>
              Title
              <input
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
            </label>

            <label>
              Subtitle
              <input
                name="subtitle"
                value={formData.subtitle}
                onChange={handleFormChange}
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows={3}
              />
            </label>

            <label>
              Tech / Focus
              <input
                name="techStack"
                value={formData.techStack}
                onChange={handleFormChange}
              />
            </label>

            <div className="project-form-actions">
              <button type="submit" disabled={saving}>
                {saving
                  ? "Saving..."
                  : editingProject
                  ? "Update Project"
                  : "Create Project"}
              </button>

              {editingProject && (
                <button
                  type="button"
                  onClick={startCreate}
                  className="secondary-btn"
                >
                  Cancel edit
                </button>
              )}
            </div>
          </form>
        </section>
      )}

      {!isLoggedIn && (
        <p className="hint-text">
          Login to add, edit, or delete projects for your portfolio.
        </p>
      )}

      {/* List of projects */}
      <section className="projects-list">
        {projects.map((project) => (
          <article key={project._id} className="project-card">
            <h3>{project.title}</h3>
            {project.subtitle && (
              <p className="project-subtitle">{project.subtitle}</p>
            )}
            {project.description && (
              <p className="project-description">{project.description}</p>
            )}
            {project.techStack && (
              <p className="project-tech">
                <strong>Tech / Focus:</strong> {project.techStack}
              </p>
            )}

            {isLoggedIn && (
              <div className="project-actions">
                <button onClick={() => startEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project._id)}>
                  Delete
                </button>
              </div>
            )}
          </article>
        ))}

        {projects.length === 0 && !loading && (
          <p>No projects yet. {isLoggedIn && "Add your first one above!"}</p>
        )}
      </section>
    </div>
  );
}

export default Projects;
