import { Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"
import Ventilation from "./Ventilation"
import WasteManagement from "./WasteManagement"
import Space from "./Space"
import LivestockProtection from "./LivestocckProtection"
import Extrapage from "./ExtraPage"
import NavBar from "./NavBar"

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
      <Route path="ventilation" element={WithNavBar(Ventilation)} />
      <Route path="waste-management" element={WithNavBar(WasteManagement)} />
      <Route path="space" element={WithNavBar(Space)} />
      <Route path="protection" element={WithNavBar(LivestockProtection)} />
      <Route path="extra" element={WithNavBar(Extrapage)} />
    </Routes>
  )
}

export default Housing
