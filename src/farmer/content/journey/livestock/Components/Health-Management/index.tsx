import { Route, Routes } from "react-router-dom"

import NavBar from "./NavBar"
import LandingPage from "./LandingPage";
import HealthDiseases from "./HealthDiseases";
import Vaccines from "./Vaccines";

// Helper to wrap pages with NavBar
const WithNavBar = (Component: React.FC) => (
  <>
    <NavBar />
    <Component />
  </>
);  

const Housing = () => {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="diseases" element={WithNavBar(HealthDiseases)} />
      <Route path="vaccines" element={WithNavBar(Vaccines)} />      
    </Routes>
  )
}

export default Housing
