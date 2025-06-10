import { Route, Routes } from "react-router-dom";
import Dashboard from "../../farmer/dashboard/components/farmer-dashboard";
import NotFound from "../exceptions/NotFound";

const HomePageLayout: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/farmer/*" element={ <Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default HomePageLayout;
