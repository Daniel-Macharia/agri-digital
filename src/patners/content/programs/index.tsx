import { Route, Routes } from "react-router-dom";

import { BREED_ROUTES } from "./Breed.Route";

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
      <Route path={BREED_ROUTES.LANDING} element={<LandingPage />} />
      
      <Route path={BREED_ROUTES.RESULTS} element={<Results />} />
    </Routes> 
  );
};

export default Breeding;
 