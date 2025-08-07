import { Route, Routes } from "react-router-dom";
import AllPackages from "./AllPackages";
import { PACKAGES_ROUTES } from "./Package.Route";
import Advertisements from "./Advertisements";
import Subscribed from "./Subscribed";
import MyAds from "./MyAds";
import AdContent from "./AdContent";
import ApprovedAd from "./ApprovedAd";



const Breeding = () => {
  return (
    <Routes>
      
     
      <Route path={PACKAGES_ROUTES.ADVERTISEMENTS} element={<Advertisements />} />
      <Route path={PACKAGES_ROUTES.ALL} element={<AllPackages />} />
      <Route path={PACKAGES_ROUTES.SUBSCRIBED} element={<Subscribed />} />
      <Route path={PACKAGES_ROUTES.MYADS} element={<MyAds />} />
      <Route path={PACKAGES_ROUTES.MYADSDETAIL} element={<AdContent />} />
      <Route path={PACKAGES_ROUTES.APPROVEDAD} element={<ApprovedAd />} />

      
    </Routes> 
  );
};

export default Breeding;
 