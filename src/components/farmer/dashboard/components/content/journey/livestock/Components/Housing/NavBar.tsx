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
      background: "#f5f5f5", 
      padding: "12px 16px",
      borderBottom: "1px solid #e0e0e0"
    }}> 
      {/* Nav Items */} 
      {navItems.map((item, index) => { 
        const isActive = current === item.path; 
        return ( 
          <button 
            key={item.label} 
            style={{ 
              background: isActive ? "#689F38" : "transparent", 
              color: isActive ? "#fff" : "#666", 
              border: "none", 
              borderRadius: 16, 
              padding: "8px 16px", 
              marginRight: index < navItems.length - 1 ? 12 : 0, 
              fontWeight: isActive ? 500 : 400, 
              fontSize: 14, 
              outline: "none", 
              cursor: "pointer", 
              transition: "all 0.2s ease",
              whiteSpace: "nowrap"
            }} 
            onClick={() => navigate(`${basePath}/${item.path}`)} 
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "#f0f0f0";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          > 
            {item.label} 
          </button> 
        ); 
      })} 
    </div> 
  ); 
}; 
 
export default NavBar;