import { PATNERS_ROUTES } from "../../patners-routes";

export const PATNERS_HOME_ROUTES = {
    REGISTERED_FARMERS: "/registered-farmers",


    HOME_FULL: `/patners${PATNERS_ROUTES.HOME.replace("/*", "")}`,
};