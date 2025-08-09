import { Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"
import Ventilation from "./Ventilation"
import WasteManagement from "./WasteManagement"
import Space from "./Space"
import LivestockProtection from "./LivestocckProtection"
import NavBar from "./NavBar"
import Results from "./Results"
import { HOUSING_ROUTES } from "./Housing.Route"

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


<Route path={HOUSING_ROUTES.LANDING} element={<LandingPage />} />
      <Route path={HOUSING_ROUTES.VENTILATION} element={WithNavBar(Ventilation)} />
      <Route path={HOUSING_ROUTES.WASTE} element={WithNavBar(WasteManagement)} />
      <Route path={HOUSING_ROUTES.RESULTS} element={<Results />} />
      <Route path={HOUSING_ROUTES.SPACE} element={WithNavBar(Space)} />
      <Route path={HOUSING_ROUTES.PROTECTION} element={WithNavBar(LivestockProtection)} /> 
      
    </Routes> 
  )
}

export default Housing
