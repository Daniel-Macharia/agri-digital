import { Routes, Route } from "react-router-dom";

import TypeBreed from "./Components/Type&Breed";
import Housing from "./Components/Housing";
import Health from "./Components/Health-Management";
import FeedsNutrition from "./Components/Feeds&Nuitrition/Index";
import Breeding from "./Components/Breeding";
import Production from "./Components/Production";
import Sales from "./Components/Sales";
import NotFound from "../../../../common/exceptions/NotFound";




export default function LivestockRoutes() { 
  return (
    <Routes>
      
      <Route path="typebreed/*" element={<TypeBreed />} />
      <Route path="housing/*" element={<Housing />} />
      <Route path="health/*" element={<Health />} />
      <Route path="feeds/*" element={<FeedsNutrition />} />
      <Route path="breeding/*" element={<Breeding />} /> 
      <Route path="production/*" element={<Production />} /> 
      <Route path="sales/*" element={<Sales />} /> 


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


