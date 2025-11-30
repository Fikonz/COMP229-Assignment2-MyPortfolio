// src/pages/Home.jsx
import React from "react";
import heroImage from "../assets/feyisayo.jpg";

function Home() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="hero-subtitle">
          Software Engineering Student · Owner of{" "}
          <span className="hero-highlight">Triple Tee Fashion</span>
        </p>
        <h1>Welcome to My Portfolio</h1>
        <p>
          I’m passionate about building my tech career and creating unique
          African-inspired fashion pieces through my brand, Triple Tee Fashion.
          Welcome to my portfolio — a blend of creativity, technology, and
          personal growth.
        </p>
        <div className="hero-buttons">
          <a href="#about" className="btn-primary">
            View my story
          </a>
          <a
            className="btn-outline"
            href="/src/assets/Feyisayo_Habeeb_Resume.pdf"
            target="_blank"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="hero-image-wrapper">
        <img
          src={heroImage}
          alt="Feyisayo Habeeb"
          className="hero-image"
        />
      </div>
    </section>
  );
}

export default Home;
