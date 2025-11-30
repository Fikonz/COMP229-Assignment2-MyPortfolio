import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate("/");
  };

  const linkBaseClass = "nav-pill";

  const getLinkClassName = ({ isActive }) =>
    isActive ? `${linkBaseClass} nav-pill-active` : linkBaseClass;

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        {/* Brand / logo */}
        <button className="brand" onClick={handleBrandClick}>
          <span className="brand-first">Feyisayo (FEY) </span>{" "}
          <span className="brand-last">Habeeb</span>
        </button>

        <div className="nav-links">
          <NavLink to="/" className={getLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/about" className={getLinkClassName}>
            About
          </NavLink>
          <NavLink to="/projects" className={getLinkClassName}>
            Projects
          </NavLink>
          <NavLink to="/education" className={getLinkClassName}>
            Education
          </NavLink>
          <NavLink to="/services" className={getLinkClassName}>
            Services
          </NavLink>
          <NavLink to="/contact" className={getLinkClassName}>
            Contact
          </NavLink>

          {/* If logged in, show Logout; otherwise, show Login */}
          {user ? (
            <button
              type="button"
              className={`${linkBaseClass} nav-pill-login`}
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={getLinkClassName}>
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
