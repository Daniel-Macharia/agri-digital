import { FARMER_ROUTES } from "../../farmer-routes";

export const FARMER_HOME_ROUTES = {
    HOME_NOTIFICATIONS: "/notifications",
    HOME_TASKS: "/tasks",
    HOME_ORDERS: "/orders",
    HOME: "",

    HOME_FULL: `/farmer${FARMER_ROUTES.HOME.replace("/*", "")}`,
};