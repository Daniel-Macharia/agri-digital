import LandingPage from "./LandingPage";
import RequestForm from "./RequestForm";
import { Routes, Route } from "react-router-dom";
import TypeBreedForm from "./TypeBreedForm";
import NavBar from "./NavBar";
import LivestockRecord from "./LivestockRecord";
import { TYPE_ROUTES } from "./Type.Route";

// Helper to wrap pages with NavBar
const WithNavBar = (Component: React.FC) => {
  return (
    <>
      <NavBar />
      <Component />
    </>
  );
};

const TypeBreed = () => {
  return (
    <Routes>
      <Route path={TYPE_ROUTES.LANDING} element={<LandingPage />} />
      <Route path={TYPE_ROUTES.FORM} element={WithNavBar(TypeBreedForm)} />
      <Route path={TYPE_ROUTES.REQUEST} element={WithNavBar(RequestForm)} />
      <Route path={TYPE_ROUTES.RECORDS} element={WithNavBar(LivestockRecord)} />
    </Routes>
  );
};

export default TypeBreed;
