import { Route, Routes } from "react-router-dom";
import Dashboard from "../../farmer/farmer-dashboard";
import PatnersDashboard from "../../patners/patners-dashboard";
import NotFound from "../exceptions/NotFound";
import VendorRouter from "../../vendors/vendor-router";
import Popup from "../components/popup";

const HomePageLayout: React.FC = () => {
  return (
    <div>
      <Popup />
      <Routes>
        <Route path="/farmer/*" element={ <Dashboard />} />

        <Route path="/vendor/*" element={<VendorRouter />} />

        <Route path="/patners/*" element={<PatnersDashboard />} />        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default HomePageLayout; 





