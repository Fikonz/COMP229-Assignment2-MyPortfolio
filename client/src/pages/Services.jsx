// src/pages/Services.jsx
import React, { useState } from "react";

function Services({ isLoggedIn }) {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Web Development",
      description: "Responsive websites using React, JavaScript, and modern tools.",
    },
    {
      id: 2,
      title: "API & Backend",
      description: "Node.js and MongoDB APIs for simple applications and prototypes.",
    },
    {
      id: 3,
      title: "Fashion & Brand Styling",
      description:
        "African-inspired outfit curation and styling through Triple Tee Fashion.",
    },
  ]);

  const [newServiceTitle, setNewServiceTitle] = useState("");
  const [newServiceDesc, setNewServiceDesc] = useState("");

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newServiceTitle.trim() || !newServiceDesc.trim()) return;

    const newService = {
      id: Date.now(),
      title: newServiceTitle.trim(),
      description: newServiceDesc.trim(),
    };

    setServices([...services, newService]);
    setNewServiceTitle("");
    setNewServiceDesc("");
  };

  return (
    <section className="section">
      <h2>Services</h2>
      <p style={{ marginBottom: "1rem" }}>
        Here are a few ways I combine my technical and creative skills.
      </p>

      <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 1.7 }}>
        {services.map((service) => (
          <li key={service.id} style={{ marginBottom: "0.8rem" }}>
            <strong>{service.title}</strong>
            <br />
            {service.description}
          </li>
        ))}
      </ul>

      {isLoggedIn && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>Add a New Service (Admin)</h3>
          <form
            className="login-form"
            style={{ maxWidth: "450px" }}
            onSubmit={handleAddService}
          >
            <div className="login-field">
              <label>Service Title</label>
              <input
                type="text"
                value={newServiceTitle}
                onChange={(e) => setNewServiceTitle(e.target.value)}
              />
            </div>
            <div className="login-field">
              <label>Description</label>
              <input
                type="text"
                value={newServiceDesc}
                onChange={(e) => setNewServiceDesc(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">
              Add Service
            </button>
          </form>
          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#6b7280" }}>
            Only visible when you are logged in. Use this during your demo to
            show that login lets you change the website content.
          </p>
        </div>
      )}
    </section>
  );
}

export default Services;
