import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import ErusDetection from "./ErusDetection";
import NewBorns from "./NewBorns";
import Gestigation from "./Gestigation";
import Results from "./Results";
import { TYPE_ROUTES } from "../Type&Breed/Type.Route";

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
      <Route path={TYPE_ROUTES.LANDING} element={<LandingPage />} />
      <Route path={TYPE_ROUTES.ERUS} element={WithNavBar(ErusDetection)} />
      <Route path={TYPE_ROUTES.GEST} element={WithNavBar(Gestigation)} />
      <Route path={TYPE_ROUTES.NEW} element={WithNavBar(NewBorns)} />
      <Route path={TYPE_ROUTES.RESULTS} element={<Results />} />
    </Routes>
  );
};

export default Breeding;
