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
  AUTH: {
    LOGIN: "auth/login",
    PASSWORD_LESS_REQUEST: "auth/password-less-init",
    PASSWORD_LESS_VALIDATE: "auth/password-less-verification",
    INIT_PASSWORD_RESET: "auth/password-reset-init",
    RESET_PASSWORD: "auth/password-reset-verification",
    PUBLIC_RIGHT_GROUPS: "right-group/public",
    REGISTER: "auth/register",
  },
};
