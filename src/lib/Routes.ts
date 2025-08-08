const AuthRootURL = "/auth";

export const APP_ROUTES = {
  HOMEPAGE: "/*",
  AUTH: {
    ROOT: `${AuthRootURL}/*`,
    LOGIN: `/login`,
    SIGN_UP: `/sign-up`,
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password/:resetCode",
    FULL: {
      LOGIN: `${AuthRootURL}/login`,
      SIGN_UP: `${AuthRootURL}/sign-up`,
      FORGOT_PASSWORD: `${AuthRootURL}/forgot-password`,
      RESET_PASSWORD: `${AuthRootURL}/reset-password/:resetCode`,
      DASHBOARD: "/farmer/home",
    },
  },
};

export const API_ROUTES = {
  LIST_ITEM: "list-item",
  AUTH: {
    LOGIN: "auth/login",
    PASSWORD_LESS_REQUEST: "auth/password-less-init",
    PASSWORD_LESS_VALIDATE: "auth/password-less-verification",
    INIT_PASSWORD_RESET: "auth/password-reset-init",
    RESET_PASSWORD: "auth/password-reset-verification",
    PUBLIC_RIGHT_GROUPS: "right-group/public",
    REGISTER: "auth/register",
  },
  CROP_JOURNEY: {
    INIT: "crop-journey",
    SOIL_TEST: "crop-journey/soil-test/:transactionId",
    FARM_ENVIRONMENT:
      "crop-journey/farming-environment/:transactionId/:environmentType",
    CROP: "crop-journey/crop/:transactionId",
    CROP_ACTIVITY: "crop-journey/crop/activity/:transactionId/:cropId",

    STAGE_ACTIVITY_MODIFY:
      "/crop-journey/stage/activity/:transactionId/:cropJourneyStage",
    STAGE_ACTIVITY_STATUS_UPDATE:
      "/crop-journey/stage/activity/:transactionId/:cropJourneyStage/:todoId/:todoStatus",

    CROP_MANAGEMENT_DETAILS: "crop-journey/crop-management/:transactionId",
    MANAGEMENT_HISTORY: "crop-journey/crop-management/history/:transactionId",
    MANAGEMENT_SOIL_HEALTH:
      "crop-journey/crop-management/soil-health/:transactionId",
    MANAGEMENT_WEATHER_CONDITION:
      "crop-journey/crop-management/weather/:transactionId",
    MANAGEMENT_GROWTH_ANALYSIS:
      "crop-journey/crop-management/growth-analysis/:transactionId",

    CROP_HARVEST_DETAILS: "crop-journey/crop-harvest/:transactionId",
    HARVEST_YIELD: "crop-journey/crop-harvest/:transactionId/:harvestYieldType",

    CROP_POST_HARVEST_DETAILS: "crop-journey/crop-post-harvest/:transactionId",
    CROP_POST_HARVEST_STORAGE_DETAILS:
      "crop-journey/crop-post-harvest/storage/:transactionId",
    CROP_POST_HARVEST_SORT_GRADE_DETAILS:
      "crop-journey/crop-post-harvest/sorting-grading/:transactionId",
    CROP_POST_HARVEST_PACKAGING_DETAILS:
      "crop-journey/crop-post-harvest/packaging/:transactionId",
    CROP_POST_HARVEST_VALUE_ADDITION_DETAILS:
      "crop-journey/crop-post-harvest/value-addition/:transactionId",
    CROP_POST_HARVEST_TRANSPORT_DETAILS:
      "crop-journey/crop-post-harvest/transport/:transactionId",
  },
};
