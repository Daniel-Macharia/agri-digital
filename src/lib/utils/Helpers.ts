/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import moment from "moment-timezone";
import { StylesConfig } from "react-select";
import * as Yup from "yup";
import { ManagementSummaryItem } from "../../farmer/content/journey/crops/crops-models";
import { DEFAULT_OTP_LENGTH } from "../model/AuthModel";
import {
  CropManagementHistory,
  GrowthAnalysisPayload,
  PostHarvestCropValueAddition,
  PostHarvestPackaging,
  PostHarvestSortingAndGrading,
  PostHarvestTransport,
  SoilHealthPayload,
  WeatherConditionPayload,
} from "../model/CropJourneyModel";
import {
  ApiResponse,
  CropJourneyStageType,
  DEFAULT_SYSTEM_WIDE_LOCALE,
  ListItem,
  TodoStatus,
} from "../model/Model";

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

export const formatDateTimeToHumanReadableDateTime = (date: Date) => {
  return moment(date).format("DD/MM/YYYY hh:mm A");
};

export const formatDateTimeToHumanReadableDate = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const formatDateTimeToHumanReadableTime = (date: Date) => {
  return moment(date).format("hh:mm A");
};

export const formatMonthOnly = (date: Date) => {
  return moment(date).format("MMM");
};

export const dateStringToJsDate = (date: string) => {
  return moment(date).toDate();
};

export const dateStringToFormattedDate = (date: string, dateFormat: string) => {
  return moment(date).format(dateFormat).toString();
};

export const formatToCustomDate = (date: Date, format: string) => {
  return moment(date).format(format);
};

export const dateStringToDate = (date: string) => moment(date).toDate();

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
      const isSelectObject = "value" in input && "label" in input;

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

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const delayExecution = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat(DEFAULT_SYSTEM_WIDE_LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(number);
};

export const extractFormErrorMessage = (fullMessage: string) => {
  const lastDotIndex = fullMessage.lastIndexOf(".");
  if (lastDotIndex === -1) return fullMessage;
  const message = fullMessage.slice(lastDotIndex + 1).trim();
  const firstSpaceIndex = message.indexOf(" ");
  const finalMessage = message.slice(firstSpaceIndex + 1).trim();
  const anotherFirstSpaceIndex = finalMessage.indexOf(" ");
  return capitalize(
    finalMessage.substring(0, anotherFirstSpaceIndex) +
      " " +
      finalMessage.substring(anotherFirstSpaceIndex + 1, finalMessage.length)
  );
};

export const parseNPKStatus = (data: CropManagementHistory) => {
  let npkStatus = "";
  if (data.nitrogen) {
    npkStatus += `N: ${data.nitrogen.name} `;
  }
  if (data.phosphorus) {
    npkStatus += `P: ${data.phosphorus.name} `;
  }
  if (data.potassium) {
    npkStatus += `K: ${data.potassium.name} `;
  }

  npkStatus = npkStatus.trim();
  return npkStatus.length !== 0 ? npkStatus : "-";
};

export const parseNPKStatusFromSoilHealthPayload = (
  data: SoilHealthPayload
) => {
  let npkStatus = "";
  if (data.nitrogen) {
    npkStatus += `N: ${data.nitrogen.name} `;
  }
  if (data.phosphorus) {
    npkStatus += `P: ${data.phosphorus.name} `;
  }
  if (data.potassium) {
    npkStatus += `K: ${data.potassium.name} `;
  }

  npkStatus = npkStatus.trim();
  return npkStatus.length !== 0 ? npkStatus : "-";
};

export const parseSoilHealthManagementSummary = (
  data: SoilHealthPayload
): ManagementSummaryItem[] => {
  return [
    { label: "Soil PH", value: `${data.ph}` },
    { label: "Moisture", value: `${data.moisture}` },
    { label: "Type", value: "-" },
    {
      label: "Nutrients Level",
      value: parseNPKStatusFromSoilHealthPayload(data),
    },
  ];
};

export const parseWeatherConditionManagementSummary = (
  data: WeatherConditionPayload
): ManagementSummaryItem[] => {
  return [
    {
      label: "Recent Rainfall",
      value: `${data.rainfallAmount} ${
        data.rainfallAmountUnit ? data.rainfallAmountUnit.name : ""
      }`,
    },
    { label: "Humidity", value: `${data.humidity}` },
    {
      label: "Temperature",
      value: `${data.temperature} ${data.temperatureUnit.name}`,
    },
    {
      label: "Wind Speed 3",
      value: `${data.windSpeed} ${data.windSpeedUnit.name}`,
    },
  ];
};

export const parseGrowthAnalysisManagementSummary = (
  data: GrowthAnalysisPayload
): ManagementSummaryItem[] => {
  return [
    {
      label: "Crop Height",
      value: `${data.height} ${data.heightMeasurementUnit.name}`,
    },
    { label: "Growth Stage", value: data.growthStage.name },
    {
      label: "Expected Yield",
      value: `${data.expectedYield} ${data.expectedYieldUnit.name}`,
    },
    {
      label: "Current Price per Kg",
      value: formatNumber(data.currentUnitPrice),
    },
  ];
};

export const todoStatusIsComplete = (data: TodoStatus) =>
  data === TodoStatus.COMPLETED;

export const parseValidActivityTypes = (
  data: ListItem[],
  isCropStage: boolean,
  cropStageType?: CropJourneyStageType
): ListItem[] => {
  if (data.length === 0 || (isCropStage && !cropStageType)) return [];

  if (isCropStage) {
    return data.filter(
      (item) =>
        item.cropStageTypes &&
        item.cropStageTypes.find((stage) => stage === cropStageType)
    );
  }

  return [];
};

export const parsePostHarvestSortingAndGradingSummary = (
  data: PostHarvestSortingAndGrading
): ManagementSummaryItem[] => {
  return [
    { label: "Grade", value: data.grade.name },
    {
      label: "Harvest Date",
      value: dateStringToFormattedDate(data.harvestDate, "DD/MM/YYYY"),
    },
    { label: "Quantity", value: `${data.quantity} ${data.quantityUnit.name}` },
    {
      label: "Notes",
      value: data.notes && data.notes.length > 0 ? data.notes.join(",") : "---",
    },
  ];
};

export const parsePostHarvestPackagingSummary = (
  data: PostHarvestPackaging
): ManagementSummaryItem[] => {
  return [
    { label: "Packaging Method", value: data.packagingMethod.name },
    { label: "Packaging Costs (KES)", value: formatNumber(data.packagingCost) },
  ];
};

export const parsePostHarvestCropValueAdditionSummary = (
  data: PostHarvestCropValueAddition
): ManagementSummaryItem[] => {
  return [
    { label: "Processing Methods", value: data.processingMethod.name },
    { label: "Final Product", value: data.finalProduct || "--" },
    { label: "Processing Costs", value: formatNumber(data.processingCost) },
    { label: "Marketing Price", value: formatNumber(data.marketPrice) },
    {
      label: "Profitability Analysis",
      value: data.profitabilityAnalysis || "--",
    },
  ];
};

export const parsePostHarvestTransportSummary = (
  data: PostHarvestTransport
): ManagementSummaryItem[] => {
  return [
    { label: "Method", value: data.transportMethod.name },
    { label: "Vehicle Type", value: data.vehicleType.name },
    { label: "Pickup Location", value: data.pickupLocation },
    { label: "Destination", value: data.destination },
    { label: "Estimated Costs", value: formatNumber(data.estimatedCost) },
  ];
};
