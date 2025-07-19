/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import moment from "moment-timezone";
import { StylesConfig } from "react-select";
import * as Yup from "yup";
import { DEFAULT_OTP_LENGTH } from "../model/AuthModel";
import { ApiResponse } from "../model/Model";

export const UsernameValidation = Yup.string()
  .required("Email or Phone is required")
  .test(
    (emailOrPhone) =>
      /^[a-z0-9-]{1,100}@[a-z0-9-]{1,100}.[a-z0-9-]{1,100}.[a-z0-9-]{1,100}/.test(
        emailOrPhone.toLowerCase()
      ) ||
      /^0[17]{1}[0-9]{8}$/.test(emailOrPhone.toLowerCase()) ||
      /^\+254[17]{1}[0-9]{8}$/.test(emailOrPhone.toLowerCase())
  );

export const getOtpLength = () => {
  return window.runtimeConfig && window.runtimeConfig.VITE_APP_OTP_LENGTH
    ? window.runtimeConfig.VITE_APP_OTP_LENGTH
    : DEFAULT_OTP_LENGTH;
};

export const extractErrorMessage = (err: any): string | null => {
  if (err instanceof AxiosError) {
    const status = err.response?.status;
    const apiResponse = err.response?.data as ApiResponse<null>;
    if (apiResponse && apiResponse.message) {
      return apiResponse.message;
    } else if (status === 401) {
      return "Failed trying signing in again!";
    } else if (status === 403) {
      return "Not allowed to perform this action";
    }
    return "An error occurred";
  }
  return null;
};

export const buildAuthorizationHeader = (accessToken: string) =>
  `Bearer ${accessToken}`;

export const customSelectStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "12px", // Rounded corners
    borderColor: state.isFocused ? "#2595BD" : provided.borderColor, // Border color on focus
    boxShadow: state.isFocused ? "0 0 0 1px #2595BD" : provided.boxShadow, // Optional: subtle focus outline
    "&:hover": {
      borderColor: "#2595BD", // Border color on hover
    },
  }),
  menu: (provided) => ({
    ...provided,
    // backgroundColor: "#2595BD", // Background color for the dropdown
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#1F7DA3" : "#ffffff", // Lighter shade on hover
    color: state.isFocused ? "#ffffff" : "#000000", // Text color
    ":active": {
      backgroundColor: "#1B6A8A", // Darker shade when active
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#2595BD",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "white",
    ":hover": {
      backgroundColor: "#2595BD",
      color: "white",
    },
  }),
};

export const parseFormData = (
  data: Record<any, any>,
  dateFormat?: string // Optional date format
) => {
  const transform = (input: any): any => {
    if (Array.isArray(input)) {
      // If it's an array, extract `value` from each item if it exists
      return input
        .map((item) =>
          item && typeof item === "object" && "value" in item && "label" in item
            ? item.value
            : item
        )
        .filter((item) => item !== null); // Exclude `null` values in arrays
    } else if (input && typeof input === "object") {
      if ("value" in input) {
        // If it's an object with `value`, return the `value`
        return input.value !== null ? input.value : undefined; // Exclude `null` values
      } else if (input instanceof Date) {
        // Format `Date` objects based on the provided or default format
        return dateFormat
          ? moment(input).format(dateFormat) // Use custom format
          : input.toISOString(); // Default to ISO string
      } else {
        // Recursively transform nested objects
        return Object.fromEntries(
          Object.entries(input)
            .map(([key, value]) => [key, transform(value)])
            .filter(([, value]) => value !== null && value !== undefined) // Exclude `null` and `undefined` values
        );
      }
    }
    // If it's a primitive, leave it as it is
    return input !== null ? input : undefined; // Exclude `null` values
  };

  return transform(data);
};

export const parseFormDatav2 = (
  data: Record<any, any>,
  dateFormat?: string
) => {
  const transform = (input: any): any => {
    if (Array.isArray(input)) {
      return input
        .map(transform)
        .filter((item) => item !== null && item !== undefined);
    }

    if (input instanceof Date) {
      return dateFormat
        ? moment(input).format(dateFormat)
        : input.toISOString();
    }

    if (input && typeof input === "object") {
      // Check if it's a select-like object: { value, label }
      const isSelectObject =
        Object.keys(input).length === 2 && "value" in input && "label" in input;

      if (isSelectObject) {
        return input.value !== null ? input.value : undefined;
      }

      // Recursively transform nested objects
      return Object.fromEntries(
        Object.entries(input)
          .map(([key, value]) => [key, transform(value)])
          .filter(([, value]) => value !== null && value !== undefined)
      );
    }

    return input !== null ? input : undefined;
  };

  return transform(data);
};

export const parseFormDatav3 = (
  data: Record<any, any>,
  dateFormat?: string
) => {
  const transform = (input: any): any => {
    // ✅ Return File objects as-is
    if (input instanceof File) {
      return input;
    }

    if (Array.isArray(input)) {
      return input
        .map(transform)
        .filter((item) => item !== null && item !== undefined);
    }

    if (input instanceof Date) {
      return dateFormat
        ? moment(input).format(dateFormat)
        : input.toISOString();
    }

    if (input && typeof input === "object") {
      const isSelectObject =
        Object.keys(input).length === 2 && "value" in input && "label" in input;

      if (isSelectObject) {
        return input.value !== null ? input.value : undefined;
      }

      return Object.fromEntries(
        Object.entries(input)
          .map(([key, value]) => [key, transform(value)])
          .filter(([, value]) => value !== null && value !== undefined)
      );
    }

    return input !== null ? input : undefined;
  };

  return transform(data);
};

export const delayExecution = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
