import { JOURNEY_ROUTES } from "../journey-routes";

export const CROP_ROUTES = {
  CROP_SOIL_TESTING: "/soil-testing/:transactionId",
  CROP_PLANTING: "/planting/:transactionId",
  CROP_MANAGEMENT: "/management",

  CROP_HARVEST: "/harvest",

  CROP_POST_HARVESTING: "/post-harvesting",
  CROP_SALES: "/sales",

  CROP_ASSESSMENT: "/assessment/:transactionId?",
  CROP_REQUEST_FOR_SERVICE: "/request-for-service",
  CROP_REQUEST_FOR_SOIL_TESTING: "/request-for-soil-testing",
  CROP_DISPLAY_CROP_DETAILS: "/display-crop-details",
  CROP_SELECT_FARMING_ENVIRONMENT: "/select-farming-environment",

  CROP_OTHER: "*",

  FULL: {
    CROP_SOIL_TESTING_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/soil-testing/:transactionId`,
    CROP_PLANTING_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/planting/:transactionId`,
    CROP_MANAGEMENT_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/management/:transactionId`,

    CROP_HARVEST_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/harvest/:transactionId`,

    CROP_POST_HARVESTING_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/post-harvesting/:transactionId`,
    CROP_SALES_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/sales`,

    CROP_ASSESSMENT_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/assessment/:transactionId?`,
    CROP_REQUEST_FOR_SERVICE_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/request-for-service`,
    CROP_REQUEST_FOR_SOIL_TESTING_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/request-for-soil-testing/:transactionId`,
    CROP_DISPLAY_CROP_DETAILS_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/display-crop-details/:transactionId`,
    CROP_SELECT_FARMING_ENVIRONMENT_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/select-farming-environment/:transactionId`,

    CROP_OTHER_FULL: `${JOURNEY_ROUTES.FULL.CROPS_FULL}/*`,
  }
};
