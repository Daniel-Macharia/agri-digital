import { useCallback, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import {
  CropJourneySummaryPayload,
  CropLisItem,
} from "../../../../../lib/model/CropJourneyModel";
import {
  ListApiResponse,
  ListItem,
  ListItemType,
  PAGINATION_MAX_PAGE_SIZE,
} from "../../../../../lib/model/Model";
import { API_ROUTES } from "../../../../../lib/Routes";
import { extractErrorMessage } from "../../../../../lib/utils/Helpers";
const apiClient = new ApiClient();

const batchListItems = [
  ListItemType.CROP_EXPENSE,
  ListItemType.AREA_UNIT,
  ListItemType.SOIL_TEXTURE,
  ListItemType.SOIL_COLOR,
  ListItemType.MOISTURE_LEVEL,
  ListItemType.NUTRIENT_DEFICIENCY,
  ListItemType.IRRIGATION_METHOD,
  ListItemType.ACTIVITY_TYPE,
  ListItemType.NPK_LEVEL,
  ListItemType.MEASUREMENT_UNIT,
  ListItemType.CROP_GROWTH_STAGE,
  ListItemType.CROP_GRADE_QUALITY,
  ListItemType.STORAGE_TYPE,
  ListItemType.PRICING_CYCLE,
  ListItemType.PACKAGING_METHOD,
  ListItemType.PROCESSING_METHOD,
  ListItemType.TRANSPORT_METHOD,
  ListItemType.VEHICLE_TYPE,
  ListItemType.TRANSPORTATION_STATUS,
];

const CropStateManager = () => {
  const {
    setCropsListItems,
    setCropsExpenseList,
    transactionId,
    setCropJourneySummary,
    setAreaUnitListItems,
    setSoilTextureListItems,
    setSoilColorListItems,
    setMoistureLevelListItems,
    setNutrientDeficiencyListItems,
    setIrrigationMethodListItems,
    setActivityTypesListItems,
    setNpkLevelListItems,
    setMeasurementUnitList,
    setGrowthStageList,
    setCropGradeQualityList,
    setStorageTypeList,
    setPricingCycleList,
    setPackagingMethodList,
    setProcessingMethodList,
    setTransportMethodList,
    setVehicleTypeList,
    setTransportationStatusList,
  } = useCropJourney();

  const distributeListItems = useCallback(
    (listItems: ListItem[]) => {
      if (listItems.length === 0) return;

      const parsedLists = listItems.reduce<Record<ListItemType, ListItem[]>>(
        (acc, item) => {
          if (!acc[item.itemType]) {
            acc[item.itemType] = [];
          }
          acc[item.itemType].push(item);
          return acc;
        },
        {} as Record<ListItemType, ListItem[]>
      );

      if (parsedLists[ListItemType.CROP_EXPENSE]) {
        setCropsExpenseList(parsedLists[ListItemType.CROP_EXPENSE]);
      }
      if (parsedLists[ListItemType.AREA_UNIT]) {
        setAreaUnitListItems(parsedLists[ListItemType.AREA_UNIT]);
      }
      if (parsedLists[ListItemType.SOIL_TEXTURE]) {
        setSoilTextureListItems(parsedLists[ListItemType.SOIL_TEXTURE]);
      }
      if (parsedLists[ListItemType.SOIL_COLOR]) {
        setSoilColorListItems(parsedLists[ListItemType.SOIL_COLOR]);
      }
      if (parsedLists[ListItemType.MOISTURE_LEVEL]) {
        setMoistureLevelListItems(parsedLists[ListItemType.MOISTURE_LEVEL]);
      }
      if (parsedLists[ListItemType.NUTRIENT_DEFICIENCY]) {
        setNutrientDeficiencyListItems(
          parsedLists[ListItemType.NUTRIENT_DEFICIENCY]
        );
      }
      if (parsedLists[ListItemType.IRRIGATION_METHOD]) {
        setIrrigationMethodListItems(
          parsedLists[ListItemType.IRRIGATION_METHOD]
        );
      }
      if (parsedLists[ListItemType.ACTIVITY_TYPE]) {
        setActivityTypesListItems(parsedLists[ListItemType.ACTIVITY_TYPE]);
      }
      if (parsedLists[ListItemType.NPK_LEVEL]) {
        setNpkLevelListItems(parsedLists[ListItemType.NPK_LEVEL]);
      }
      if (parsedLists[ListItemType.MEASUREMENT_UNIT]) {
        setMeasurementUnitList(parsedLists[ListItemType.MEASUREMENT_UNIT]);
      }
      if (parsedLists[ListItemType.CROP_GROWTH_STAGE]) {
        setGrowthStageList(parsedLists[ListItemType.CROP_GROWTH_STAGE]);
      }
      if (parsedLists[ListItemType.CROP_GRADE_QUALITY]) {
        setCropGradeQualityList(parsedLists[ListItemType.CROP_GRADE_QUALITY]);
      }
      if (parsedLists[ListItemType.STORAGE_TYPE]) {
        setStorageTypeList(parsedLists[ListItemType.STORAGE_TYPE]);
      }
      if (parsedLists[ListItemType.PRICING_CYCLE]) {
        setPricingCycleList(parsedLists[ListItemType.PRICING_CYCLE]);
      }
      if (parsedLists[ListItemType.PACKAGING_METHOD]) {
        setPackagingMethodList(parsedLists[ListItemType.PACKAGING_METHOD]);
      }
      if (parsedLists[ListItemType.PROCESSING_METHOD]) {
        setProcessingMethodList(parsedLists[ListItemType.PROCESSING_METHOD]);
      }
      if (parsedLists[ListItemType.TRANSPORT_METHOD]) {
        setTransportMethodList(parsedLists[ListItemType.TRANSPORT_METHOD]);
      }
      if (parsedLists[ListItemType.VEHICLE_TYPE]) {
        setVehicleTypeList(parsedLists[ListItemType.VEHICLE_TYPE]);
      }
      if (parsedLists[ListItemType.TRANSPORTATION_STATUS]) {
        setTransportationStatusList(
          parsedLists[ListItemType.TRANSPORTATION_STATUS]
        );
      }
    },
    [
      setCropsExpenseList,
      setAreaUnitListItems,
      setSoilTextureListItems,
      setSoilColorListItems,
      setMoistureLevelListItems,
      setNutrientDeficiencyListItems,
      setIrrigationMethodListItems,
      setActivityTypesListItems,
      setNpkLevelListItems,
      setMeasurementUnitList,
      setGrowthStageList,
      setCropGradeQualityList,
      setStorageTypeList,
      setPricingCycleList,
      setPackagingMethodList,
      setProcessingMethodList,
      setTransportMethodList,
      setVehicleTypeList,
      setTransportationStatusList,
    ]
  );

  const fetchListBatch = useCallback(async () => {
    try {
      const dataList = await apiClient.get<ListApiResponse<ListItem>>({
        url: API_ROUTES.LIST_ITEM,
        config: {
          params: {
            pageNumber: 0,
            pageSize: PAGINATION_MAX_PAGE_SIZE,
            itemTypes: batchListItems.join(","),
          },
        },
      });
      if (dataList && dataList.list && dataList.list.length > 0) {
        distributeListItems(dataList.list);
      }
    } catch (err) {
      extractErrorMessage(err);
    }
  }, [distributeListItems]);

  const fetchCropsList = useCallback(async () => {
    try {
      const dataList = await apiClient.get<ListApiResponse<CropLisItem>>({
        url: API_ROUTES.LIST_ITEM,
        config: {
          params: {
            pageNumber: 0,
            pageSize: PAGINATION_MAX_PAGE_SIZE,
            itemType: ListItemType.CROP,
          },
        },
      });
      if (dataList && dataList.list && dataList.list.length > 0) {
        setCropsListItems(dataList.list);
      }
    } catch (err) {
      extractErrorMessage(err);
    }
  }, [setCropsListItems]);

  const fetchCropJourneySummary = useCallback(async () => {
    try {
      if (!transactionId) return;

      const data = await apiClient.get<CropJourneySummaryPayload>({
        url: API_ROUTES.CROP_JOURNEY.INIT + "/" + transactionId,
      });
      setCropJourneySummary(data);
    } catch (err) {
      extractErrorMessage(err);
    }
  }, [transactionId, setCropJourneySummary]);

  useEffect(() => {
    fetchListBatch();
  }, [fetchListBatch]);

  useEffect(() => {
    if (transactionId) {
      fetchCropJourneySummary();
    }
  }, [transactionId, fetchCropJourneySummary]);

  useEffect(() => {
    fetchCropsList();
  }, [fetchCropsList]);

  return <Fragment></Fragment>;
};
export default CropStateManager;
