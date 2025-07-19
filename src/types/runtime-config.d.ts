export interface RuntimeConfig {
  VITE_APP_NAME: string;
  VITE_APP_DEFAULT_TIMEZONE: string;
  VITE_APP_IDLE_TIMEOUT_MS: number;
  VITE_APP_IDLE_PROMPT_BEFORE_TIMEOUT_MS: number;
  VITE_API_ENV: string;
  VITE_APP_API_PROD: string;
  VITE_APP_API_DEV: string;
  VITE_APP_OTP_LENGTH: number;
}

declare global {
  interface Window {
    runtimeConfig?: RuntimeConfig;
  }
}
