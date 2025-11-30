// src/pages/Contact.jsx
import React from "react";

function Contact() {
  return (
    <section className="section">
      <h2>Contact</h2>
      <p style={{ marginBottom: "0.75rem" }}>
        Feel free to reach out about school projects, collaboration, or fashion
        orders.
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <p>
          <strong>Email:</strong> fhabeeb01@centennialcollege.ca
        </p>
        <p>
          <strong>Location:</strong> Toronto, Ontario
        </p>
      </div>

      <h3 style={{ marginBottom: "0.5rem" }}>Send a Quick Message</h3>
      <form className="login-form">
        <div className="login-field">
          <label>First Name</label>
          <input type="text" />
        </div>
        <div className="login-field">
          <label>Last Name</label>
          <input type="text" />
        </div>
        <div className="login-field">
          <label>Email</label>
          <input type="email" />
        </div>
        <div className="login-field">
          <label>Message</label>
          <input type="text" />
        </div>
        <button type="button" className="btn-outline">
          Submit (demo only)
        </button>
      </form>
    </section>
  );
}

export default Contact;
