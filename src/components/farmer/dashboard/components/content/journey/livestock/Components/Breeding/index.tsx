import { Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"
import NavBar from "./NavBar";
import ErusDetection from "./ErusDetection";
import NewBorns from "./NewBorns";
import Gestigation from "./Gestigation";
import Results from "./Results";



// Helper to wrap pages with NavBar
const WithNavBar = (Component: React.FC) => (
  <>
    <NavBar />
    <Component />
  </>
);  

const Breeding = () => {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="erus" element={WithNavBar(ErusDetection)} />
      <Route path="gestigation" element={WithNavBar(Gestigation)} />
      <Route path="new" element={WithNavBar(NewBorns)} />
      <Route path="results" element={<Results />} />


      
      

    


 
    </Routes>
  )
}

export default Breeding
