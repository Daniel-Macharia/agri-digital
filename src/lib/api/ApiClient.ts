/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { LoginResponse, RequestCustomConfig } from "../model/AuthModel";
import {
  ApiResponse,
  AUTHORIZATION_HEADER_NAME,
  LOCAL_STORAGE_SESSION_KEY,
} from "../model/Model";
import LocalStorageUtil from "../storage/LocalStorageUtil";
import { buildAuthorizationHeader } from "../utils/Helpers";

export function setupAxios(axios: any) {
  const apiEnv = window.runtimeConfig?.VITE_API_ENV;

  const apiBaseURL =
    apiEnv && apiEnv.toLowerCase().includes("dev")
      ? window.runtimeConfig?.VITE_APP_API_DEV
      : window.runtimeConfig?.VITE_APP_API_PROD;

  axios.defaults.baseURL = apiBaseURL;

  axios.defaults.headers.Accept = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] =
    buildAuthorizationHeader(
      LocalStorageUtil.getItem<LoginResponse>(LOCAL_STORAGE_SESSION_KEY)
        ?.accessToken || ""
    );
}

class ApiClient {
  constructor() {}

  async get<T = any>({
    url,
    config,
  }: {
    url: string;
    config?: RequestCustomConfig;
  }): Promise<T> {
    const response = await axios.get<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  async post<T = any, D = any>({
    url,
    config,
    data,
  }: {
    url: string;
    config?: RequestCustomConfig;
    data?: D;
  }): Promise<T> {
    const response = await axios.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async put<T = any, D = any>({
    url,
    config,
    data,
  }: {
    url: string;
    config?: RequestCustomConfig;
    data?: D;
  }): Promise<T> {
    const response = await axios.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async patch<T = any, D = any>({
    url,
    config,
    data,
  }: {
    url: string;
    config?: RequestCustomConfig;
    data?: D;
  }): Promise<T> {
    const response = await axios.patch<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async delete<T = any>({
    url,
    config,
  }: {
    url: string;
    config?: AxiosRequestConfig;
  }): Promise<T> {
    const response = await axios.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  async readFile({
    url,
    config,
  }: {
    url: string;
    config?: AxiosRequestConfig;
  }): Promise<Blob> {
    const response = await axios.get<Blob>(url, {
      ...config,
      responseType: "blob",
    });
    return response.data;
  }
}

export { ApiClient };
