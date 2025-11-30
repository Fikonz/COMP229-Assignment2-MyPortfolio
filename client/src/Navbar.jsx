// client/src/Navbar.jsx
export default function Navbar({ currentPage, setCurrentPage, isLoggedIn, onLogout }) {
  const linkStyle = (page) => ({
    marginRight: "0.75rem",
    padding: "0.35rem 0.7rem",
    border: "1px solid #ccc",
    backgroundColor: currentPage === page ? "#222" : "#f5f5f5",
    color: currentPage === page ? "#fff" : "#000",
    cursor: "pointer",
  });

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#111",
        color: "#fff",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Feyisayo(FEY) Habeeb</div>

      <div>
        <button style={linkStyle("home")} onClick={() => setCurrentPage("home")}>
          Home
        </button>
        <button style={linkStyle("about")} onClick={() => setCurrentPage("about")}>
          About
        </button>
        <button style={linkStyle("projects")} onClick={() => setCurrentPage("projects")}>
          Projects
        </button>
        <button style={linkStyle("education")} onClick={() => setCurrentPage("education")}>
          Education
        </button>
        <button style={linkStyle("services")} onClick={() => setCurrentPage("services")}>
          Services
        </button>
        <button style={linkStyle("contact")} onClick={() => setCurrentPage("contact")}>
          Contact
        </button>

        {!isLoggedIn ? (
          <button style={linkStyle("login")} onClick={() => setCurrentPage("login")}>
            Login
          </button>
        ) : (
          <button
            style={{
              marginLeft: "0.75rem",
              padding: "0.35rem 0.7rem",
              border: "1px solid #f66",
              backgroundColor: "#f33",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={onLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
