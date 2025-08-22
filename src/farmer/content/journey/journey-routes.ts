import { FARMER_ROUTES } from "../../farmer-routes";

export const JOURNEY_ROUTES = {
    HOME: "",
    INFO: "/info/*",
    LIVESTOCK: "/livestock/*",
    CROPS: "/crops/*",
    OTHER: "*",

    FULL: {
        HOME_FULL: `${FARMER_ROUTES.FULL.PROJECTS_FULL}`,
        INFO_FULL: `${FARMER_ROUTES.FULL.PROJECTS_FULL}/info`,
        LIVESTOCK_FULL: `${FARMER_ROUTES.FULL.PROJECTS_FULL}/livestock`,
        CROPS_FULL: `${FARMER_ROUTES.FULL.PROJECTS_FULL}/crops`,
        OTHER_FULL: `${FARMER_ROUTES.FULL.PROJECTS_FULL}/*`,
    }
};