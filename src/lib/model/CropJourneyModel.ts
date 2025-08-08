import {
  ChronoUnit,
  FileMinPayload,
  IdName,
  ListItem,
  Location,
  SystemWideSelectString,
  TodoPayload,
} from "./Model";

export interface CropLisItem extends ListItem {
  children?: CropSeedListItem[];
}

export interface CropSeedListItem extends ListItem {
  children?: CropSeedVarietyListItem[];
}

export interface CropSeedVarietyListItem extends ListItem {
  children?: ListItem[];
}

export interface CropJourneyInitFormPayload {
  name: string;
  revenueEstimate: number;
  expenseEstimate: number;
  location: Location;
  cropExpenseEstimates: CropExpenseEstimateFormPayload[];
}

export interface CropExpenseEstimateFormPayload {
  expense: SystemWideSelectString | null;
  amount: number;
  description: string;
}

export enum FarmEnvironmentType {
  OPEN = "OPEN",
  CONTROLLED = "CONTROLLED",
}

export interface CropJourneySummaryPayload {
  transactionId: string;
  name: string;
  revenueEstimate: number;
  expenseEstimate: number;
  location: Location;
  cropExpenseEstimates: CropExpenseEstimate[];
  farmEnvironmentType: FarmEnvironmentType;
}

export interface CropExpenseEstimate {
  id: string;
  expense: IdName;
  amount: number;
  description: string;
}

export interface SoilTestFormPayload {
  areaSize: number;
  areaUnit: SystemWideSelectString | null;
  soilTexture: SystemWideSelectString | null;
  soilColor: SystemWideSelectString | null;
  moistureLevel: SystemWideSelectString | null;
  nutrientDeficiency: SystemWideSelectString | null;
  irrigationMethod: SystemWideSelectString | null;
  comments: string;
  currentCrops: SystemWideSelectString[] | null;
}

export interface AreaSize {
  size: number;
  unit: IdName;
}

export interface SoilTestPayload {
  id: string;
  areaSize: AreaSize;
  soilTexture: IdName;
  soilColor: IdName;
  moistureLevel?: IdName;
  currentCrops?: IdName[];
  nutrientDeficiency?: IdName;
  irrigationMethod?: IdName;
  comments?: string;
}

export interface CropFormPayload {
  crop: SystemWideSelectString | null;
  seed: SystemWideSelectString | null;
  seedVariety: SystemWideSelectString | null;
  plantingDate: Date | null;
  harvestingDate: Date | null;
}

export interface CropsFormPayload {
  crops: CropFormPayload[];
}

export interface CropPayload {
  id: string;
  crop: IdName;
  seed: IdName;
  seedVariety: IdName;
  plantingDate: string;
  harvestingDate: string;
  activities: TodoPayload[];
}

export interface CropJourneyStagePayload {
  todos?: TodoPayload[];
  soilTest?: null; //todo not yet linked
  cropManagement?: CropManagementDetailsPayload | null;
  harvest?: HarvestDetailsPayload | null;
  postHarvest?: PostHarvestDetails | null;
}

export type CropJourneyManagementStagePayload = Omit<
  CropJourneyStagePayload,
  "soilTest" | "harvest" | "postHarvest"
> & {};

export type CropJourneyHarvestStagePayload = Omit<
  CropJourneyStagePayload,
  "soilTest" | "cropManagement" | "postHarvest"
> & {};

export type CropJourneyPostHarvestStagePayload = Omit<
  CropJourneyStagePayload,
  "soilTest" | "cropManagement" | "harvest"
> & {};

export interface CropManagementHistory {
  date?: string | null;
  ph?: number | null;
  moisture?: number | null;
  nitrogen?: IdName | null;
  phosphorus?: IdName | null;
  potassium?: IdName | null;
  height?: number | null;
  heightMeasurementUnit?: IdName | null;
  growthStage?: IdName | null;
}

export interface CropManagementDetailsPayload {
  id: string;
  soilHealths: SoilHealthPayload[];
  weatherConditions: WeatherConditionPayload[];
  growthAnalysis: GrowthAnalysisPayload[];
}

export interface SoilHealthPayload {
  id: string;
  date: string;
  ph: number;
  moisture: number;
  nitrogen: IdName;
  phosphorus: IdName;
  potassium: IdName;
}

export interface WeatherConditionPayload {
  id: string;
  date: string;
  rainfallAmount: number;
  rainfallAmountUnit?: IdName;
  humidity: number;
  temperature: number;
  temperatureUnit: IdName;
  windSpeed: number;
  windSpeedUnit: IdName;
}

export interface GrowthAnalysisPayload {
  id: string;
  date: string;
  growthStage: IdName;
  height: number;
  heightMeasurementUnit: IdName;
  expectedYield: number;
  expectedYieldUnit: IdName;
  currentUnitPrice: number;
}

export interface SoilHealthFormPayload {
  date: Date | null;
  ph: number;
  moisture: number;
  nitrogen: SystemWideSelectString | null;
  phosphorus: SystemWideSelectString | null;
  potassium: SystemWideSelectString | null;
}

export interface WeatherConditionFormPayload {
  date: Date | null;
  rainfallAmount: number;
  rainfallAmountUnit: SystemWideSelectString | null;
  humidity: number;
  temperature: number;
  temperatureUnit: SystemWideSelectString | null;
  windSpeed: number;
  windSpeedUnit: SystemWideSelectString | null;
}

export interface GrowthAnalysisFormPayload {
  date: Date | null;
  growthStage: SystemWideSelectString | null;
  height: number;
  heightMeasurementUnit: SystemWideSelectString | null;
  expectedYield: number;
  expectedYieldUnit: SystemWideSelectString | null;
  currentUnitPrice: number;
}

export interface HarvestDetailsPayload {
  expectedYield?: HarvestYieldPayload | null;
  actualYield?: HarvestYieldPayload | null;
}

export interface HarvestYieldPayload {
  harvestDate: string;
  quantity: number;
  quantityUnit: IdName;
  gradeQuality: IdName;
  notes: string;
  files: FileMinPayload[];
}

export enum HarvestYieldType {
  EXPECTED = "EXPECTED",
  ACTUAL = "ACTUAL",
}

export interface HarvestYieldFormPayload {
  harvestDate: Date | string | null;
  quantity: number;
  quantityUnit: SystemWideSelectString | null;
  gradeQuality: SystemWideSelectString | null;
  notes: string;
  file: File | null;
}

export interface PostHarvestDetails {
  cropStorage?: PostHarvestCropStorage;
  sortingAndGrading?: PostHarvestSortingAndGrading;
  postHarvestPackaging?: PostHarvestPackaging;
  cropValueAddition?: PostHarvestCropValueAddition;
  transport?: PostHarvestTransport;
}

export interface PostHarvestCropStorage {
  date: string;
  storageType: IdName;
  humidity: number;
  temperature: number;
  temperatureUnit: IdName;
  inventoryLevel: number;
  inventoryLevelUnit: IdName;
  storageDurationAmount: number;
  storageDuration: ChronoUnit;
  storageFee: number;
  storageFeeCycle: IdName;
}

export interface PostHarvestSortingAndGrading {
  harvestDate: string;
  grade: IdName;
  quantity: number;
  quantityUnit: IdName;
  notes: string[];
}

export interface PostHarvestPackaging {
  packagingCost: number;
  packagingMethod: IdName;
}

export interface PostHarvestCropValueAddition {
  processingMethod: IdName;
  processingCost: number;
  marketPrice: number;
  finalProduct: string;
  profitabilityAnalysis: string;
}

export interface PostHarvestTransport {
  transportMethod: IdName;
  vehicleType: IdName;
  pickupLocation: string;
  destination: string;
  estimatedCost: number;
  transportStatus: IdName;
}

export interface PostHarvestCropStorageFormPayload {
  date: Date | null;
  storageType: SystemWideSelectString | null;
  humidity: number;
  temperature: number;
  temperatureUnit: SystemWideSelectString | null;
  inventoryLevel: number;
  inventoryLevelUnit: SystemWideSelectString | null;
  storageDurationAmount: number;
  storageDuration: SystemWideSelectString | null;
  storageFee: number;
  storageFeeCycle: SystemWideSelectString | null;
}

export interface PostHarvestSortingAndGradingFormPayload {
  harvestDate: Date | null;
  grade: SystemWideSelectString | null;
  quantity: number;
  quantityUnit: SystemWideSelectString | null;
  notes: string;
}

export interface PostHarvestPackagingFormPayload {
  packagingCost: number;
  packagingMethod: SystemWideSelectString | null;
}

export interface PostHarvestCropValueAdditionFormPayload {
  processingMethod: SystemWideSelectString | null;
  processingCost: number;
  marketPrice: number;
  finalProduct: string;
  profitabilityAnalysis: string;
}

export interface PostHarvestTransportFormPayload {
  transportMethod: SystemWideSelectString | null;
  vehicleType: SystemWideSelectString | null;
  pickupLocation: string;
  destination: string;
  estimatedCost: number;
  transportStatus: SystemWideSelectString | null;
}
