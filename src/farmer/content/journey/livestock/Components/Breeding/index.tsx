import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import ErusDetection from "./ErusDetection";
import NewBorns from "./NewBorns";
import Gestigation from "./Gestigation";
import Results from "./Results";
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
      <Route path={BREED_ROUTES.ERUS} element={WithNavBar(ErusDetection)} />
      <Route path={BREED_ROUTES.GEST} element={WithNavBar(Gestigation)} />
      <Route path={BREED_ROUTES.NEW} element={WithNavBar(NewBorns)} />
      <Route path={BREED_ROUTES.RESULTS} element={<Results />} />
    </Routes>
  );
};

export default Breeding;
