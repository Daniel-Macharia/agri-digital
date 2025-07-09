import { Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"
import NavBar from "../../Shared/NavBar";
import Livestockproduce from "./Livestockproduce";
import Meat from "./Meat";
import Productionrecords from "./Productionrecords";


// Helper to wrap pages with NavBar
const WithNavBar = (Component: React.FC) => (   
  <>
    <NavBar />
    <Component />
  </>
);  

const Production = () => {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="produce" element={WithNavBar(Livestockproduce)} />
      <Route path="meat" element={WithNavBar(Meat)} />
      <Route path="production-records" element={WithNavBar(Productionrecords)} />      
    </Routes> 
  )
}

export default Production
