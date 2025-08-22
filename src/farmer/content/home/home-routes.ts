import { FARMER_ROUTES } from "../../farmer-routes";

export const FARMER_HOME_ROUTES = {
    HOME_NOTIFICATIONS: "/notifications",
    HOME_TASKS: "/tasks",
    HOME_ORDERS: "/orders",
    HOME: "",

    FULL: {
        HOME_FULL: `/farmer${FARMER_ROUTES.HOME.replace("/*", "")}`,
        HOME_NOTIFICATIONS_FULL: `/farmer${FARMER_ROUTES.HOME.replace("/*", "")}/notifications`,
        HOME_TASKS_FULL: `/farmer${FARMER_ROUTES.HOME.replace("/*", "")}/tasks`,
        HOME_ORDERS_FULL: `/farmer${FARMER_ROUTES.HOME.replace("/*", "")}/orders`,
    }
};