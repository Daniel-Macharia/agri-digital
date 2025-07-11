import React from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
 
const navItems = [ 
  { label: "Erus", path: "erus" }, 
  { label: "Gestigation", path: "breeding" },
]; 
 
const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the base path (e.g., /farmer/dashboard/components/content/journey/livestock/Components/Housing)
  const basePath = location.pathname.split("/").slice(0, -1).join("/");

  // Extract the last part of the path to determine the active tab
  const current = location.pathname.split("/").pop();

  return (
    <div className="d-flex flex-column align-items-start w-100 p-2 p-md-3">
      {/* Back Arrow */}
      <div
        className="d-flex align-items-center mb-2 mb-md-3"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(basePath)}
      >
        <div
          className="d-inline-block"
          style={{ 
            width: "1.25rem",
            height: "1.25rem",
            transform: "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clipPath="url(#clip0_2_16669)">
              <path
                d="M16.875 10H3.125"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.75 4.375L3.125 10L8.75 15.625"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_16669">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="matrix(0 1 -1 0 20 0)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {/* Navigation Items - Responsive Layout */}
      <div className="d-flex justify-content-start align-items-start gap-1 gap-md-2 gap-lg-3 w-100 overflow-auto">
        {navItems.map((item) => {
          const isActive = current === item.path;
          return (
            <button
              key={item.label}
              className="btn rounded-pill px-2 px-sm-3 py-1 py-md-2 text-nowrap small-medium"
              style={{
                backgroundColor: isActive ? "#457900" : "#fff",
                color: isActive ? "#fff" : "#000",
                border: "none",
                transition: "all 0.2s ease",
                minWidth: "fit-content",
                fontSize: "clamp(0.75rem, 0.9vw, 1rem)",
                whiteSpace: "nowrap",
              }}
              onClick={() => navigate(`${basePath}/${item.path}`)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
