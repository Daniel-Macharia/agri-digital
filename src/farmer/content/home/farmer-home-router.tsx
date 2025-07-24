import { Route, Routes } from "react-router-dom";
import { FARMER_HOME_ROUTES } from "./home-routes";
import HomeTasks from "./home-tasks";
import HomeOrders from "./home-orders";
import HomeNotifications from "./home-notifications/home-notifications";
import FarmerHome from "./home";


const FarmerHomeRouter: React.FC = () => {

    return(<>
    <Routes>
        <Route path={FARMER_HOME_ROUTES.HOME_TASKS} element={<HomeTasks />} />
        <Route path={FARMER_HOME_ROUTES.HOME_NOTIFICATIONS} element={<HomeNotifications />} />
        <Route path={FARMER_HOME_ROUTES.HOME_ORDERS} element={<HomeOrders />} />

        <Route path={FARMER_HOME_ROUTES.HOME} element={<FarmerHome />} />
    </Routes>
    </>)
};

export default FarmerHomeRouter;