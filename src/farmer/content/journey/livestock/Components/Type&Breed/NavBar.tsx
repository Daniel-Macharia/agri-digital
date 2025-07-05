import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type NavBarProps = {
  onRequestService?: () => void;
};

const NavBar: React.FC<NavBarProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  

  // Get the base path (e.g., /farmer/dashboard/components/content/journey/livestock/Components/Housing)
  const basePath = location.pathname.split("/").slice(0, -1).join("/");
  const requestServicePath = basePath + "/form/request";

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center w-100 px-3 py-2"
      style={{ minHeight: "48px" }}
    >
      {/* Back Arrow */}
      <div
        className="d-flex align-items-center"
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

      {/* Request Service button */}
      <button
        className="btn px-4 py-2"
        style={{
          backgroundColor: "#457900",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "0.95rem",
          fontWeight: 400,
        }}
        onClick={() => navigate(requestServicePath)}
      >
        Request Service
      </button>
    </div>
  );
};

export default NavBar;
