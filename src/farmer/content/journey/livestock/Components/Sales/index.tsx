import { Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"






const Sales = () => { 
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      
      
    </Routes> 
  )
}

export default Sales
