import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Ventilation", path: "ventilation" },
  { label: "Space", path: "space" },
  { label: "Waste Management", path: "waste-management" },
  { label: "Livestock Protection", path: "protection" },
];

const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the base path (e.g., /farmer/dashboard/components/content/journey/livestock/Components/Housing)
  const basePath = location.pathname
    .split("/")
    .slice(0, -1)
    .join("/");

  // Extract the last part of the path to determine the active tab
  const current = location.pathname.split("/").pop();

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      background: "#f7f7f7",
      padding: "16px 0"
    }}>
      {/* Back Arrow to Landing Page */}
      <button
        style={{
          background: "none",
          border: "none",
          fontSize: 20,
          marginRight: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center"
        }}
        aria-label="Back to Landing Page"
        onClick={() => navigate(basePath)}
      >
        {/* Inline SVG for ArrowLeft */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 15L8.5 10L12.5 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {/* Nav Items */}
      {navItems.map((item) => {
        const isActive = current === item.path;
        return (
          <button
            key={item.label}
            style={{
              background: isActive ? "#558B2F" : "#fff",
              color: isActive ? "#fff" : "#222",
              border: isActive ? "none" : "1.5px solid #E6F4EA",
              borderRadius: 20,
              padding: "6px 22px",
              marginRight: 24,
              fontWeight: 500,
              fontSize: 13,
              boxShadow: isActive ? "0 2px 8px rgba(85,139,47,0.08)" : "none",
              outline: "none",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s"
            }}
            onClick={() => navigate(`${basePath}/${item.path}`)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default NavBar;
