import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";

import Livestockproduce from "./Livestockproduce";
import Meat from "./Meat";
import Productionrecords from "./Productionrecords";
import { PRODUCTION_ROUTES } from "./Production.Route";
import NavBar from "./NavBar";



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
      <Route path={PRODUCTION_ROUTES.LANDING} element={<LandingPage />} />
      <Route
        path={PRODUCTION_ROUTES.PRODUCTION_RECORDS}
        element={WithNavBar(Productionrecords)}
      />
      <Route
        path={PRODUCTION_ROUTES.PRODUCE}
        element={WithNavBar(Livestockproduce)}
      />
      <Route path={PRODUCTION_ROUTES.MEAT} element={WithNavBar(Meat)} />
    </Routes>
  );
};

export default Production;
