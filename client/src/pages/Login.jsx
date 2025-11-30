// client/src/pages/Login.jsx  (or adjust path as needed)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("fhabeeb01@centennialcollege.ca");
  const [password, setPassword] = useState("TestPassword123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      // Expecting backend to send: { token, user: { ... } }
      const { token, user } = res.data;

      // Save token & user details
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Inform App.jsx
      if (onLogin) {
        onLogin(user);
      }

      // After login, go to Projects (or Services if you prefer)
      navigate("/projects");
    } catch (err) {
      console.error("Login error (frontend):", err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="page login-page">
      <h1>Login</h1>
      <p>Login to manage and update your portfolio content.</p>

      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p className="demo-note">
        Demo credentials: fhabeeb01@centennialcollege.ca / TestPassword123
      </p>
    </div>
  );
}
