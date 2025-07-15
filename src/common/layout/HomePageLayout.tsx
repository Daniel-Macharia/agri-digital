import { Route, Routes } from "react-router-dom";
import NotFound from "../exceptions/NotFound";
import Dashboard from "../../farmer/farmer-dashboard";

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
