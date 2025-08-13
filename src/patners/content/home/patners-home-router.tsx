import { Route, Routes } from "react-router-dom";
import { PATNERS_HOME_ROUTES } from "./home-routes";


import HomeTasks from "./home-tasks";
import HomeOrders from "./home-orders";
import HomeNotifications from "./home-notifications/home-notifications";
import PatnerHome from "./home";



const PatnersHomeRouter: React.FC = () => {

    return(<>
    <Routes>
        <Route path={PATNERS_HOME_ROUTES.HOME_TASKS} element={<HomeTasks />} />
        <Route path={PATNERS_HOME_ROUTES.HOME_NOTIFICATIONS} element={<HomeNotifications />} />
        <Route path={PATNERS_HOME_ROUTES.HOME_ORDERS} element={<HomeOrders />} />
        <Route path={PATNERS_HOME_ROUTES.HOME} element={<PatnerHome />} />
    </Routes>
    </>)
};

export default PatnersHomeRouter;  