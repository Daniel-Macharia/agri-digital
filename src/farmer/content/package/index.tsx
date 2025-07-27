import { Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";
import AllPackages from "./AllPackages";
import { PACKAGES_ROUTES } from "./Package.Route";
import Advertisements from "./Advertisements";

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
      
      <Route path={PACKAGES_ROUTES.ALL} element={WithNavBar( AllPackages)} /> 
      <Route path={PACKAGES_ROUTES.ADVERTISEMENTS} element={<Advertisements />} />

      
    </Routes> 
  );
};

export default Breeding;
 