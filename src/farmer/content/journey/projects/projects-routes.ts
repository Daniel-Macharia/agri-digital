import { JOURNEY_ROUTES } from "../journey-routes";

export const PROJECTS_ROUTES = {
    PROJECT_INFO: "/",
    LIVESTOCK_PROJECT_MORE_INFO: "/livestock-animal-more-info",
    MORE_PROJECT_REVIEWS: "/more-project-reviews",

    OTHER: "*",

    FULL: {
        PROJECT_INFO_FULL: `${JOURNEY_ROUTES.FULL.INFO_FULL}/`,
        LIVESTOCK_PROJECT_MORE_INFO_FULL: `${JOURNEY_ROUTES.FULL.INFO_FULL}/livestock-animal-more-info`,
        MORE_PROJECT_REVIEWS_FULL: `${JOURNEY_ROUTES.FULL.INFO_FULL}/more-project-reviews`,
    }
}