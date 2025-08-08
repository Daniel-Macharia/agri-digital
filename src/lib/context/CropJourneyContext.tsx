import { createContext, ReactNode, useContext, useState } from "react";
import {
  CropJourneyHarvestStagePayload,
  CropJourneyManagementStagePayload,
  CropJourneyPostHarvestStagePayload,
  CropJourneySummaryPayload,
  CropLisItem,
  CropManagementHistory,
  CropPayload,
  SoilTestPayload,
} from "../model/CropJourneyModel";
import { ListItem } from "../model/Model";

interface CropJourneyContextProps {
  cropJourneyTransactionId?: string;
  setCropJourneyTransactionId: (cropJourneyTransactionId?: string) => void;

  cropsExpenseList: ListItem[];
  setCropsExpenseList: (cropsExpenseList: ListItem[]) => void;
  cropsListItems: CropLisItem[];
  setCropsListItems: (cropsListItems: CropLisItem[]) => void;
  areaUnitListItems: ListItem[];
  setAreaUnitListItems: (areaUnitListItems: ListItem[]) => void;
  soilTextureListItems: ListItem[];
  setSoilTextureListItems: (soilTextureListItems: ListItem[]) => void;
  soilColorListItems: ListItem[];
  setSoilColorListItems: (soilColorListItems: ListItem[]) => void;
  moistureLevelListItems: ListItem[];
  setMoistureLevelListItems: (moistureLevelListItems: ListItem[]) => void;
  nutrientDeficiencyListItems: ListItem[];
  setNutrientDeficiencyListItems: (
    nutrientDeficiencyListItems: ListItem[]
  ) => void;
  irrigationMethodListItems: ListItem[];
  setIrrigationMethodListItems: (irrigationMethodListItems: ListItem[]) => void;
  activityTypesListItems: ListItem[];
  setActivityTypesListItems: (activityTypesListItems: ListItem[]) => void;
  npkLevelListItems: ListItem[];
  setNpkLevelListItems: (npkLevelListItems: ListItem[]) => void;
  measurementUnitList: ListItem[];
  setMeasurementUnitList: (measurementUnitList: ListItem[]) => void;
  growthStageList: ListItem[];
  setGrowthStageList: (growthStageList: ListItem[]) => void;
  cropGradeQualityList: ListItem[];
  setCropGradeQualityList: (cropGradeQualityList: ListItem[]) => void;
  storageTypeList: ListItem[];
  setStorageTypeList: (storageTypeList: ListItem[]) => void;
  pricingCycleList: ListItem[];
  setPricingCycleList: (storageTypeList: ListItem[]) => void;
  packagingMethodList: ListItem[];
  setPackagingMethodList: (storageTypeList: ListItem[]) => void;
  processingMethodList: ListItem[];
  setProcessingMethodList: (storageTypeList: ListItem[]) => void;
  transportMethodList: ListItem[];
  setTransportMethodList: (storageTypeList: ListItem[]) => void;
  vehicleTypeList: ListItem[];
  setVehicleTypeList: (storageTypeList: ListItem[]) => void;
  transportationStatusList: ListItem[];
  setTransportationStatusList: (storageTypeList: ListItem[]) => void;

  cropJourneySummary?: CropJourneySummaryPayload;
  setCropJourneySummary: (
    cropJourneySummary?: CropJourneySummaryPayload
  ) => void;
  transactionId?: string;
  setTransactionId: (transactionId?: string) => void;
  soilTest?: SoilTestPayload;
  setSoilTest: (soilTest?: SoilTestPayload) => void;
  crops: CropPayload[];
  setCrops: (crop: CropPayload[]) => void;

  cropManagementDetails?: CropJourneyManagementStagePayload;
  setCropManagementDetails: (data?: CropJourneyManagementStagePayload) => void;

  cropManagementHistoricalRecords: CropManagementHistory[];
  setCropManagementHistoricalRecords: (data: CropManagementHistory[]) => void;
  refreshCropManagementHistoricalRecords: boolean;
  setRefreshCropManagementHistoricalRecords: (status: boolean) => void;

  harvestDetails?: CropJourneyHarvestStagePayload;
  setHarvestDetails: (data?: CropJourneyHarvestStagePayload) => void;

  postHarvestDetails?: CropJourneyPostHarvestStagePayload;
  setPostHarvestDetails: (data?: CropJourneyPostHarvestStagePayload) => void;
}

const CropJourneyContext = createContext<CropJourneyContextProps | undefined>(
  undefined
);

export const useCropJourney = () => {
  const context = useContext(CropJourneyContext);
  if (!context) {
    throw new Error("useCropJourney must be provided for CropJourneyProvider");
  }
  return context;
};

export const CropJourneyProvider = ({ children }: { children: ReactNode }) => {
  const [cropJourneyTransactionId, setCropJourneyTransactionId] =
    useState<string>();
  const [cropsListItems, setCropsListItems] = useState<CropLisItem[]>([]);
  const [cropsExpenseList, setCropsExpenseList] = useState<ListItem[]>([]);
  const [cropJourneySummary, setCropJourneySummary] =
    useState<CropJourneySummaryPayload>();
  const [transactionId, setTransactionId] = useState<string>();
  const [areaUnitListItems, setAreaUnitListItems] = useState<ListItem[]>([]);
  const [soilTextureListItems, setSoilTextureListItems] = useState<ListItem[]>(
    []
  );
  const [soilColorListItems, setSoilColorListItems] = useState<ListItem[]>([]);
  const [moistureLevelListItems, setMoistureLevelListItems] = useState<
    ListItem[]
  >([]);
  const [nutrientDeficiencyListItems, setNutrientDeficiencyListItems] =
    useState<ListItem[]>([]);
  const [irrigationMethodListItems, setIrrigationMethodListItems] = useState<
    ListItem[]
  >([]);
  const [activityTypesListItems, setActivityTypesListItems] = useState<
    ListItem[]
  >([]);
  const [measurementUnitList, setMeasurementUnitList] = useState<ListItem[]>(
    []
  );
  const [npkLevelListItems, setNpkLevelListItems] = useState<ListItem[]>([]);
  const [growthStageList, setGrowthStageList] = useState<ListItem[]>([]);
  const [cropGradeQualityList, setCropGradeQualityList] = useState<ListItem[]>(
    []
  );
  const [storageTypeList, setStorageTypeList] = useState<ListItem[]>([]);
  const [pricingCycleList, setPricingCycleList] = useState<ListItem[]>([]);
  const [packagingMethodList, setPackagingMethodList] = useState<ListItem[]>(
    []
  );
  const [processingMethodList, setProcessingMethodList] = useState<ListItem[]>(
    []
  );
  const [transportMethodList, setTransportMethodList] = useState<ListItem[]>(
    []
  );
  const [vehicleTypeList, setVehicleTypeList] = useState<ListItem[]>([]);
  const [transportationStatusList, setTransportationStatusList] = useState<
    ListItem[]
  >([]);

  const [soilTest, setSoilTest] = useState<SoilTestPayload>();
  const [crops, setCrops] = useState<CropPayload[]>([]);
  const [cropManagementHistoricalRecords, setCropManagementHistoricalRecords] =
    useState<CropManagementHistory[]>([]);
  const [
    refreshCropManagementHistoricalRecords,
    setRefreshCropManagementHistoricalRecords,
  ] = useState<boolean>(false);
  const [cropManagementDetails, setCropManagementDetails] =
    useState<CropJourneyManagementStagePayload>();

  const [harvestDetails, setHarvestDetails] =
    useState<CropJourneyHarvestStagePayload>();

  const [postHarvestDetails, setPostHarvestDetails] =
    useState<CropJourneyPostHarvestStagePayload>();

  return (
    <CropJourneyContext.Provider
      value={{
        cropJourneyTransactionId,
        setCropJourneyTransactionId,
        cropsListItems,
        setCropsListItems,
        cropsExpenseList,
        setCropsExpenseList,
        cropJourneySummary,
        setCropJourneySummary,
        transactionId,
        setTransactionId,
        areaUnitListItems,
        setAreaUnitListItems,
        soilTextureListItems,
        setSoilTextureListItems,
        soilColorListItems,
        setSoilColorListItems,
        moistureLevelListItems,
        setMoistureLevelListItems,
        nutrientDeficiencyListItems,
        setNutrientDeficiencyListItems,
        irrigationMethodListItems,
        setIrrigationMethodListItems,
        activityTypesListItems,
        setActivityTypesListItems,
        npkLevelListItems,
        setNpkLevelListItems,
        measurementUnitList,
        setMeasurementUnitList,
        growthStageList,
        setGrowthStageList,
        cropGradeQualityList,
        setCropGradeQualityList,
        storageTypeList,
        setStorageTypeList,
        pricingCycleList,
        setPricingCycleList,
        packagingMethodList,
        setPackagingMethodList,
        processingMethodList,
        setProcessingMethodList,
        transportMethodList,
        setTransportMethodList,
        vehicleTypeList,
        setVehicleTypeList,
        transportationStatusList,
        setTransportationStatusList,
        soilTest,
        setSoilTest,
        crops,
        setCrops,
        cropManagementHistoricalRecords,
        setCropManagementHistoricalRecords,
        refreshCropManagementHistoricalRecords,
        setRefreshCropManagementHistoricalRecords,
        cropManagementDetails,
        setCropManagementDetails,
        harvestDetails,
        setHarvestDetails,
        postHarvestDetails,
        setPostHarvestDetails,
      }}
    >
      {children}
    </CropJourneyContext.Provider>
  );
};
