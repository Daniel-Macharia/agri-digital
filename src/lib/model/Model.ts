import * as Yup from "yup";

export const AUTHORIZATION_HEADER_NAME = "Authorization";
export const LOCAL_STORAGE_SESSION_KEY = "shambabot_access_token";
export const TOASTIFY_AUTO_CLOSE_TIMEOUT = 3000;
export const WAIT_BEFORE_RECORD_REFETCH_MS = 2000;
export const PasswordSpecialChars = /[@$!%*?&#]/;

export const PasswordYupRules = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one number")
  // .matches(/[@$!%*?&#]/, "Password must contain at least one symbol");
  .matches(PasswordSpecialChars, "Password must contain at least one symbol");

export type ApiResponse<T> = {
  message: string;
  data: T;
};
export type ListApiResponse<T> = {
  totalCount: number;
  list: T;
};
export type MoneyListResponse<T> = {
  sum: number;
  list: ListApiResponse<T>;
};

export enum MessageType {
  ERROR,
  SUCCESS,
}

export interface FormMessageType {
  messageType: MessageType;
  message?: string;
}

export const MessageTypeAlert: Record<MessageType, string> = {
  [MessageType.ERROR]: "danger",
  [MessageType.SUCCESS]: "success",
};

export interface IdName {
  id: string;
  name: string;
}

export type SystemWideSelectString = {
  label: string;
  value: string;
};
