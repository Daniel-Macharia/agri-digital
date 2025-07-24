import { Routes, Route } from "react-router-dom";

import TypeBreed from "./Components/Type&Breed";
import Housing from "./Components/Housing";
import Health from "./Components/Health-Management";
import FeedsNutrition from "./Components/Feeds&Nuitrition/Index";
import Breeding from "./Components/Breeding";
import Production from "./Components/Production";
import Sales from "./Components/Sales";
import NotFound from "../../../../common/exceptions/NotFound";
import { LIVESTOCK_ROUTES } from "./Livestock.Route";

export default function LivestockRoutes() {
  return (
    <Routes>
      <Route path={LIVESTOCK_ROUTES.TYPE_BREED} element={<TypeBreed />} />
      <Route path={LIVESTOCK_ROUTES.HOUSING} element={<Housing />} />
      <Route path={LIVESTOCK_ROUTES.HEALTH} element={<Health />} />
      <Route path={LIVESTOCK_ROUTES.FEEDS_NUTRITION} element={<FeedsNutrition />} />
      <Route path={LIVESTOCK_ROUTES.BREEDING} element={<Breeding />} />
      <Route path={LIVESTOCK_ROUTES.PRODUCTION} element={<Production />} />
      <Route path={LIVESTOCK_ROUTES.SALES} element={<Sales />} />

      <Route path={LIVESTOCK_ROUTES.OTHER} element={<NotFound />} />
    </Routes>
  );
}
