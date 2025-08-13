export const CROP_ROUTES = {
  CROP_SOIL_TESTING: "/soil-testing/:transactionId",
  CROP_PLANTING: "/planting/:transactionId",
  CROP_MANAGEMENT: "/management/:transactionId",

  CROP_HARVEST: "/harvest/:transactionId",

  CROP_POST_HARVESTING: "/post-harvesting/:transactionId",
  CROP_SALES: "/sales",

  CROP_ASSESSMENT: "/assessment/:transactionId?",
  CROP_REQUEST_FOR_SERVICE: "/request-for-service",
  CROP_REQUEST_FOR_SOIL_TESTING: "/request-for-soil-testing/:transactionId",
  CROP_DISPLAY_CROP_DETAILS: "/display-crop-details/:transactionId",
  CROP_SELECT_FARMING_ENVIRONMENT: "/select-farming-environment/:transactionId",

  CROP_OTHER: "*",
};
