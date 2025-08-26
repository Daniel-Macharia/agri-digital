import { Route, Routes } from "react-router-dom"

import NavBar from "./NavBar"
import LandingPage from "./LandingPage";
import HealthDiseases from "./HealthDiseases";
import Vaccines from "./Vaccines";
import { HEALTH_ROUTES } from "./Health.Route";
import Results from "./Results";

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

     

      
      <Route path={HEALTH_ROUTES.LANDING} element={<LandingPage />} />
      <Route path={HEALTH_ROUTES.DISEASES} element={WithNavBar(HealthDiseases)} />
      <Route path={HEALTH_ROUTES.VACCINES} element={WithNavBar(Vaccines)} />
   
      <Route path={HEALTH_ROUTES.RESULTS} element={<Results />} />




    </Routes>
  )
}

export default Housing
