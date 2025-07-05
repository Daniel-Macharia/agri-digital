import { Routes, Route } from "react-router-dom";

import NotFound from "../../../../common/exceptions/NotFound";
import TypeBreed from "./Components/Type&Breed";
import Housing from "./Components/Housing";
import Health from "./Components/Health-Management";
import FeedsNutrition from "./Components/Feeds&Nuitrition/Index";
import Breeding from "./Components/Breeding";
import SalesLandingPage from "./Components/Sales/LandingPage";




export default function LivestockRoutes() {
  return (
    <Routes>
      
      <Route path="typebreed/*" element={<TypeBreed />} />
      <Route path="housing/*" element={<Housing />} />
      <Route path="health/*" element={<Health />} />
      <Route path="feeds/*" element={<FeedsNutrition />} />
      <Route path="breeding/*" element={<Breeding />} />

      <Route path="sales/*" element={<SalesLandingPage />} />
      <Route path="production/*" element={<SalesLandingPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


