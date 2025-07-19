import { AxiosRequestConfig } from "axios";
import { SystemWideSelectString } from "./Model";

export const DEFAULT_OTP_LENGTH = 6;

export enum Role {
  SU = "SU",
}

export interface RequestCustomConfig extends AxiosRequestConfig {
  isLogin?: boolean;
  noAuthRequired?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  role?: Role;
  id?: string;
  firstName?: string;
  otherNames?: string;
  rightGroups?: [];
}

export enum LoginView {
  LOGIN = "LOGIN",
  OTP = "OTP",
  PASSWORD = "PASSWORD",
}

export interface LoginFormPayload {
  loginView: LoginView;
  username: string;
}

export interface PasswordLoginFormPayload {
  username: string;
  password: string;
}

export interface OtpLoginFormPayload {
  username: string;
  otp: string;
}

export interface UsernameFormPayload {
  username: string;
}

export interface PasswordResetFormPayload {
  resetCode: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormPayload {
  firstName: string;
  otherNames: string;
  longitude: number;
  latitude: number;
  email: string;
  phoneNumber: number;
  rightGroups: SystemWideSelectString[];
}
