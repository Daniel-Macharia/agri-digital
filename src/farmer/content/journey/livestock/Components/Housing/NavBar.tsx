<<<<<<< HEAD
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
    <div
    className="d-flex flex-column align-items-start gap-2 gap-md-3 gap-lg-4 w-100 p-2 p-md-3"
    style={{ backgroundColor: '#ECECEC' }}
  >
  
      {/* Back Arrow */}
      <div className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={() => navigate(basePath)}>  
        <div className="d-inline-block" style={{ width: "1.25rem", height: "1.25rem", transform: "rotate(0deg)", flexShrink: 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <g clipPath="url(#clip0_2_16669)">
              <path d="M16.875 10H3.125" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.75 4.375L3.125 10L8.75 15.625" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2_16669">
                <rect width="20" height="20" fill="white" transform="matrix(0 1 -1 0 20 0)"/>
=======
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
  const basePath = location.pathname.split("/").slice(0, -1).join("/");

  // Extract the last part of the path to determine the active tab
  const current = location.pathname.split("/").pop();

  return (
    <div className="d-flex flex-column align-items-start g-1 g-md-2 g-lg-3 w-100 p-2 p-md-3">
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
>>>>>>> bill
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {/* Navigation Items - Responsive Layout */}
<<<<<<< HEAD
      <div className="d-flex flex-wrap justify-content-start align-items-start gap-2 gap-md-3 gap-lg-4 w-100">
        {navItems.map((item, index) => { 
          const isActive = current === item.path; 
          return ( 
            <button 
              key={item.label} 
              className={`btn ${isActive ? 'btn-success' : 'btn-light'} btn-sm btn-md-md rounded-pill px-3 py-2 fw-${isActive ? 'medium' : 'normal'} text-nowrap`}
              style={{
                backgroundColor: isActive ? "#689F38" : "#fff",
                color: isActive ? "#fff" : "#000",
                border: "none",
                fontSize: "0.875rem",
                transition: "all 0.2s ease",
                minWidth: "fit-content"
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
=======
      <div className="d-flex flex-wrap justify-content-start align-items-start g-1 g-md-2 g-lg-3 w-100">
        {navItems.map((item, index) => {
          const isActive = current === item.path;
          return (
            <button
              key={item.label}
              className="btn btn-sm rounded-pill px-3 py-2 text-nowrap small-medium" 
              style={{
                backgroundColor: isActive ? "#457900" : "#fff",
                color: isActive ? "#fff" : "#000",
                border: "none",
                transition: "all 0.2s ease",
                minWidth: "fit-content",
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
>>>>>>> bill
