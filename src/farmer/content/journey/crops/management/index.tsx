/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import CropsNotification from "../crops-notification/crops-notification";

import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import GenericModal from "../../../../../common/components/GenericModal";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import {
  CropJourneyManagementStagePayload,
  CropManagementHistory,
} from "../../../../../lib/model/CropJourneyModel";
import {
  CropJourneyStageType,
  ModalSize,
} from "../../../../../lib/model/Model";
import { API_ROUTES } from "../../../../../lib/Routes";
import {
  extractErrorMessage,
  parseGrowthAnalysisManagementSummary,
  parseSoilHealthManagementSummary,
  parseWeatherConditionManagementSummary,
} from "../../../../../lib/utils/Helpers";
import ActivityAddAndReview from "../activity/activity";
import {
  ManagementNotificationProps,
  ManagementSummaryProps,
} from "../crops-models";
import GrowthAnalysisForm from "./forms/GrowthAnalysisForm";
import SoilHealthForm from "./forms/SoilHealthForm";
import WeatherConditionForm from "./forms/WeatherConditionForm";
import HistoricalRecords from "./historical-records";
import ManagementNotification from "./management-notification";
import ManagementSummary from "./management-summary";
const apiClient = new ApiClient();
const soilHealthUUID = "soil-health-" + uuidv4();
const weatherConditionUUID = "weather-condition-" + uuidv4();
const growthAnalysisUUID = "growth-analysis-" + uuidv4();

const Management: React.FC = ()=>{
    const managementNotifications: ManagementNotificationProps[] = [
        {
            "name": "Active Tasks",
            "description": "2",
            "details": "Stay on track. Manage your farm efficiency."
        },
        {
            "name": "Crop Health",
            "description": "Good",
            "details": "Monitor, protect and your harvest"
        },
        {
            "name": "Weather Alerts",
            "description": "Moderate rain",
            "details": "Plan ahead with real-time weather insights."
        },
        {
            "name": "Pending Requests",
            "description": "2",
            "details": "Don't miss a step. Complete your tasks."
        }
    ];
  
  //const navigate = useNavigate();
  const { transactionId } = useParams();
  const {
    setTransactionId,
    cropManagementDetails,
    setCropManagementDetails,
    refreshCropManagementHistoricalRecords,
    setRefreshCropManagementHistoricalRecords,
    setCropManagementHistoricalRecords,
    npkLevelListItems,
    measurementUnitList,
    growthStageList,
  } = useCropJourney();
  const [showSoilHealthModal, setShowSoilHealthModal] = useState(false);
  const [showWeatherConditionModal, setShowWeatherConditionModal] =
    useState(false);
  const [showGrowthAnalysisModal, setGrowthAnalysisModal] = useState(false);

  const managementSummary: ManagementSummaryProps[] = useMemo(() => {
    //health monitoring
    let soilHealth: ManagementSummaryProps = {
      title: "Soil Health Monitoring",
      items: [],
      onActionRequired: (_) => setShowSoilHealthModal(true),
    };
    let weatherCondition: ManagementSummaryProps = {
      title: "Weather Conditions",
      items: [],
      onActionRequired: (_) => setShowWeatherConditionModal(true),
    };

    let growthAnalysis: ManagementSummaryProps = {
      title: "Growth Analysis",
      items: [],
      onActionRequired: (_) => setGrowthAnalysisModal(true),
    };

    if (
      cropManagementDetails &&
      cropManagementDetails.cropManagement &&
      cropManagementDetails.cropManagement.soilHealths &&
      cropManagementDetails.cropManagement.soilHealths.length > 0
    ) {
      soilHealth = {
        ...soilHealth,
        items: parseSoilHealthManagementSummary(
          cropManagementDetails.cropManagement.soilHealths[0]
        ),
      };
    }

    if (
      cropManagementDetails &&
      cropManagementDetails.cropManagement &&
      cropManagementDetails.cropManagement.weatherConditions &&
      cropManagementDetails.cropManagement.weatherConditions.length > 0
    ) {
      weatherCondition = {
        ...weatherCondition,
        items: parseWeatherConditionManagementSummary(
          cropManagementDetails.cropManagement.weatherConditions[0]
        ),
      };
    }

    if (
      cropManagementDetails &&
      cropManagementDetails.cropManagement &&
      cropManagementDetails.cropManagement.growthAnalysis &&
      cropManagementDetails.cropManagement.growthAnalysis.length > 0
    ) {
      growthAnalysis = {
        ...growthAnalysis,
        items: parseGrowthAnalysisManagementSummary(
          cropManagementDetails.cropManagement.growthAnalysis[0]
        ),
      };
    }

    return [soilHealth, weatherCondition, growthAnalysis];
  }, [cropManagementDetails]);

//   const handleRequestAService = useCallback(() => {
//     if (!transactionId) return;

//     console.log("requesting for a service.");

//     navigate(`..${CROP_ROUTES.CROP_REQUEST_FOR_SERVICE}`, {
//       state: `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_MANAGEMENT}`.replace(
//         ":transactionId",
//         transactionId
//       ),
//     });
//   }, [transactionId]);

  const fetchCropManagementDetails = useCallback(async () => {
    try {
      if (!transactionId) return;

      const dataResponse =
        await apiClient.get<CropJourneyManagementStagePayload>({
          url: API_ROUTES.CROP_JOURNEY.CROP_MANAGEMENT_DETAILS.replace(
            ":transactionId",
            transactionId
          ),
        });
      setCropManagementDetails(dataResponse);
    } catch (err) {
      extractErrorMessage(err);
    }
  }, [transactionId, setCropManagementHistoricalRecords]);

  const fetchCropManagementHistoricalRecords = useCallback(async () => {
    try {
      if (!transactionId) return;

      const dataResponse = await apiClient.get<CropManagementHistory[]>({
        url: API_ROUTES.CROP_JOURNEY.MANAGEMENT_HISTORY.replace(
          ":transactionId",
          transactionId
        ),
      });
      setCropManagementHistoricalRecords(dataResponse);
    } catch (err) {
      extractErrorMessage(err);
    }
  }, [transactionId, setCropManagementHistoricalRecords]);

  useEffect(() => {
    if (refreshCropManagementHistoricalRecords) {
      fetchCropManagementHistoricalRecords();
      setRefreshCropManagementHistoricalRecords(false);
    }
  }, [refreshCropManagementHistoricalRecords]);

  useEffect(() => {
    if (transactionId) {
      setTransactionId(transactionId);
      fetchCropManagementHistoricalRecords();
      fetchCropManagementDetails();
    }
  }, [transactionId]);

  return (
    <>
      <GenericModal
        modalSize={ModalSize.MEDIUM}
        show={showSoilHealthModal}
        htmlId={soilHealthUUID}
        shouldHide={(hide) => setShowSoilHealthModal(!hide)}
        title="Soil Health"
        showModalHeader={true}
        component={
          <SoilHealthForm
            transactionId={transactionId || ""}
            npkLevelListItems={npkLevelListItems}
            onDone={(data) => {
              setShowSoilHealthModal(false);
              setCropManagementDetails(data);
              setRefreshCropManagementHistoricalRecords(true);
            }}
            onCancel={() => setShowSoilHealthModal(false)}
          />
        }
      />
      <GenericModal
        modalSize={ModalSize.MEDIUM}
        show={showWeatherConditionModal}
        htmlId={weatherConditionUUID}
        shouldHide={(hide) => setShowWeatherConditionModal(!hide)}
        title="Weather Condition"
        showModalHeader={true}
        component={
          <WeatherConditionForm
            transactionId={transactionId || ""}
            measurementUnitList={measurementUnitList}
            onDone={(data) => {
              setShowWeatherConditionModal(false);
              setCropManagementDetails(data);
              setRefreshCropManagementHistoricalRecords(true);
            }}
            onCancel={() => setShowWeatherConditionModal(false)}
          />
        }
      />
      <GenericModal
        modalSize={ModalSize.MEDIUM}
        show={showGrowthAnalysisModal}
        htmlId={growthAnalysisUUID}
        shouldHide={(hide) => setGrowthAnalysisModal(!hide)}
        title="Growth Analysis"
        showModalHeader={true}
        component={
          <GrowthAnalysisForm
            transactionId={transactionId || ""}
            measurementUnitList={measurementUnitList}
            growthStageList={growthStageList}
            onDone={(data) => {
              setGrowthAnalysisModal(false);
              setCropManagementDetails(data);
              setRefreshCropManagementHistoricalRecords(true);
            }}
            onCancel={() => setGrowthAnalysisModal(false)}
          />
        }
      />
      <div className="col-12">
        <div className="col-12 my-3">
          <CropsNotification
            iconUrl={"/assets/images/warning.svg"}
            message={
              "Strong winds detected.Stalk weak plants to prevent damage"
            }
          />
        </div>

        <div className="col-12 crops-container">
          <div className="col-12 d-flex justify-content-end m-0 p-0">
            <button
              className="col-12 col-md-4 m-0 crops-accept-button"
              // onClick={handleRequestAService}
            >
              Request a Service. Coming Soon...
            </button>
          </div>

          <div className="row mt-2">
            {managementNotifications.map((notification, index) => (
              <div className={`col-12 col-md-3 m-0 p-0 px-md-2${ (index === 0) ? "ps-md-0 pe-md-2" : (index === (managementNotifications.length-1)) ? "pe-md-0 ps-md-2" : ""}`}>
                <ManagementNotification
                  name={notification.name}
                  description={notification.description}
                  details={notification.details}
                />
              </div>
            ))}
          </div>

          <div className="col-12 mt-2">
            <ActivityAddAndReview
              cropJourneyStageType={CropJourneyStageType.MANAGEMENT}
            />
          </div>

          <div className="row mt-2 ">
            {managementSummary.map((summary, index) => (
              <div
                key={index}
                className={`col-12 col-md-4 m-0 p-0 ${(index === 0) ? "ps-md-0 pe-md-2" : (index === (managementSummary.length-1)) ? "pe-md-0 ps-md-2" : "px-md-2"}`}
              >
                <ManagementSummary
                  title={summary.title}
                  items={summary.items}
                  onActionRequired={summary.onActionRequired}
                />
              </div>
            ))}
          </div>

          <div className="col-12 px-0 mt-2">
            <HistoricalRecords />
          </div>
        </div>
      </div>
    </>
  );
};

export default Management;
