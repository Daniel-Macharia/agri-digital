import { Route, Routes } from "react-router-dom";
import Dashboard from "../../farmer/farmer-dashboard";
import NotFound from "../exceptions/NotFound";
import VendorRouter from "../../vendors/vendor-router";

const HomePageLayout: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/farmer/*" element={ <Dashboard />} />

        <Route path="/vendor/*" element={<VendorRouter />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default HomePageLayout;
