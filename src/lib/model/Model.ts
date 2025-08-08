import * as Yup from "yup";

export const AUTHORIZATION_HEADER_NAME = "Authorization";
export const LOCAL_STORAGE_SESSION_KEY = "shambabot_access_token";
export const TOASTIFY_AUTO_CLOSE_TIMEOUT = 3000;
export const WAIT_BEFORE_RECORD_REFETCH_MS = 2000;
export const PasswordSpecialChars = /[@$!%*?&#]/;

export const PAGINATION_DEFAULT_PAGE_NUMBER = 0;
export const PAGINATION_DEFAULT_PAGE_SIZE = 10;
export const PAGINATION_MAX_PAGE_SIZE = 5000;
export const PAGINATION_PAGE_SIZES = [10, 30, 50, 100];
export const DEFAULT_SYSTEM_WIDE_LOCALE = "en-US";
export const FILE_CONTENT_TYPE = "multipart/form-data";

export const PasswordYupRules = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(PasswordSpecialChars, "Password must contain at least one symbol");

export const DATE_FORMAT_LOCAL_DATE_TIME = "YYYY-MM-DDTHH:mm:ss";
export const DATE_FORMAT_DB = "YYYY-MM-DD";
export const HUMAN_DATE_FORMAT = "ddd MMM DD YYYY";

export type ApiResponse<T> = {
  message: string;
  data: T;
};
export type ListApiResponse<T> = {
  totalCount: number;
  list: T[];
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

export type SystemWideSelectNumber = {
  label: string;
  value: number;
};

export type SystemWideSelectBoolean = {
  label: string;
  value: boolean;
};

export enum ModalSize {
  SMALL = "modal-sm",
  MEDIUM = "modal-md",
  LARGE = "modal-lg",
}

export enum ListItemType {
  MEASUREMENT_UNIT = "MEASUREMENT_UNIT",
  AREA_UNIT = "AREA_UNIT",
  LAND_USE = "LAND_USE",
  NUTRIENT = "NUTRIENT",
  NUTRIENT_LEVEL = "NUTRIENT_LEVEL",
  NUTRIENT_DEFICIENCY = "NUTRIENT_DEFICIENCY",
  IRRIGATION_METHOD = "IRRIGATION_METHOD",
  SOIL_COLOR = "SOIL_COLOR",
  SOIL_TYPE = "SOIL_TYPE",
  SOIL_TEXTURE = "SOIL_TEXTURE",
  MOISTURE_LEVEL = "MOISTURE_LEVEL",
  CROP_EXPENSE = "CROP_EXPENSE",
  CROP = "CROP",
  CROP_SEED = "CROP_SEED",
  SEED_VARIETY = "SEED_VARIETY",
  SERVICE_PROVIDER_TYPE = "SERVICE_PROVIDER_TYPE",
  ACTIVITY_TYPE = "ACTIVITY_TYPE",
  CROP_GROWTH_STAGE = "CROP_GROWTH_STAGE",
  NPK_LEVEL = "NPK_LEVEL",
  CROP_GRADE_QUALITY = "CROP_GRADE_QUALITY",
  STORAGE_TYPE = "STORAGE_TYPE",
  PRICING_CYCLE = "PRICING_CYCLE",
  PACKAGING_METHOD = "PACKAGING_METHOD",
  PROCESSING_METHOD = "PROCESSING_METHOD",
  VEHICLE_TYPE = "VEHICLE_TYPE",
  TRANSPORT_METHOD = "TRANSPORT_METHOD",
  TRANSPORTATION_STATUS = "TRANSPORTATION_STATUS",
}

export enum CropJourneyStageType {
  SOIL_TEST = "SOIL_TEST",
  PLANTING = "PLANTING",
  MANAGEMENT = "MANAGEMENT",
  HARVEST = "HARVEST",
  POST_HARVEST = "POST_HARVEST",
  SALE = "SALE",
}

export interface ListItem {
  id: string;
  name: string;
  itemType: ListItemType;
  status: boolean;
  systemItem: boolean;
  defaultItem: boolean;
  publicAccess: boolean;
  cropStageTypes?: CropJourneyStageType[];
  livestockStageTypes: [];
  from: number;
  to: number;
  itemValue: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export enum TodoStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface TodoPayload {
  id: string;
  title: string;
  dueDate: string;
  status: TodoStatus;
  description: string;
  activityType: IdName;
  files: FileMinPayload[];
}

export interface TodoFormPayload {
  entityId?: string;
  title: string;
  dueDate: Date | string | null;
  status: SystemWideSelectString | null;
  description: string;
  activityType: SystemWideSelectString | null;
  file: File | null;
}

export interface FileMinPayload {
  fileId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export enum ChronoUnit {
  SECONDS = "SECONDS",
  MINUTES = "MINUTES",
  HOURS = "HOURS",
  HALF_DAYS = "HALF_DAYS",
  DAYS = "DAYS",
  WEEKS = "WEEKS",
  MONTHS = "MONTHS",
  YEARS = "YEARS",
}
