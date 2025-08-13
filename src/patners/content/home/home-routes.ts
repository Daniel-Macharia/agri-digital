import { PATNERS_ROUTES } from "../../patners-routes";

export const PATNERS_HOME_ROUTES = {
    HOME_NOTIFICATIONS: "/notifications",
    HOME_TASKS: "/tasks",
    HOME_ORDERS: "/orders",
    HOME: "",
    HOME_TRIAL: "/trial",

    HOME_FULL: `/patners${PATNERS_ROUTES.HOME.replace("/*", "")}`,
};