import LandingPage from "./LandingPage";
import RequestForm from "./RequestForm";
import { Routes, Route } from "react-router-dom";
import TypeBreedForm from "./TypeBreedForm";
import NavBar from "./NavBar";
import LivestockRecord from "./LivestockRecord";

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
      <Route path="" element={<LandingPage />} />
      <Route path="form" element={WithNavBar(TypeBreedForm)} />
      <Route path="form/request" element={<RequestForm />} />
      <Route path="form/records" element={<LivestockRecord />} />


      <Route path={TYPE_ROUTES.LANDING} element={<LandingPage />} />
      <Route path={TYPE_ROUTES.ERUS} element={WithNavBar(ErusDetection)} />
      <Route path={TYPE_ROUTES.GEST} element={WithNavBar(Gestigation)} />
      <Route path={TYPE_ROUTES.NEW} element={WithNavBar(NewBorns)} />
      <Route path={TYPE_ROUTES.RESULTS} element={<Results />} />

    </Routes>
  );
};

export default TypeBreed;
