// Footer.jsx
// Simple footer with brand link and year

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {year} Feyisayo Habeeb •{" "}
        <a
          href="https://www.tripleteefashion.ca"
          target="_blank"
          rel="noopener noreferrer"
        >
          Triple Tee Fashion
        </a>
      </p>
      <p className="footer-small">
        Built with React & Vite for COMP229 Assignment 1.
      </p>
    </footer>
  );
}
