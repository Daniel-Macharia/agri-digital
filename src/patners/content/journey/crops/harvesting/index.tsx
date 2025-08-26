import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import {
  CropJourneyHarvestStagePayload,
  HarvestYieldType,
} from "../../../../../lib/model/CropJourneyModel";
import { API_ROUTES } from "../../../../../lib/Routes";
import { extractErrorMessage } from "../../../../../lib/utils/Helpers";
import CropsNotification from "../crops-notification/crops-notification";
import TabNavBar from "./tab-nav-bar";
import YieldForm from "./YieldForm";
const apiClient = new ApiClient();

const Harvesting: React.FC = () => {
  //   const navigate = useNavigate();
  const { transactionId } = useParams();
  const [isExpectedYield, onChange] = useState<boolean>(true);
  const {
    cropJourneySummary,
    setTransactionId,
    measurementUnitList,
    cropGradeQualityList,
    harvestDetails,
    setHarvestDetails,
  } = useCropJourney();

  const handleRequestForHarvestingTools = () => {
    console.log("request for harvesting tools");
    // navigate(`..${CROP_ROUTES.CROP_REQUEST_FOR_SERVICE}`, {
    //   state: `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_HARVEST}`,
    // });
  };

  const fetchHarvestDetails = useCallback(async () => {
    try {
      if (!transactionId) return;

      const dataResponse = await apiClient.get<CropJourneyHarvestStagePayload>({
        url: API_ROUTES.CROP_JOURNEY.CROP_HARVEST_DETAILS.replace(
          ":transactionId",
          transactionId
        ),
      });
      setHarvestDetails(dataResponse);
    } catch (err) {
      extractErrorMessage(err);
    }
  }, [transactionId, setHarvestDetails]);

  useEffect(() => {
    if (transactionId) {
      fetchHarvestDetails();
      setTransactionId(transactionId);
    }
  }, [transactionId]);

  return (
    <>
      <div className="col-12">
        <div className="row my-3 px-0 mx-0">
          <CropsNotification
            iconUrl="/assets/images/plant.svg"
            message="Your crop is nearing harvest. Begin planning for harvesting logistics"
          />
        </div>

        <div className="col-12 crops-container">
          <div className="row justify-content-end px-3 my-2">
            <button
              className="col-12 col-md-4 mx-0 crops-accept-button"
              onClick={handleRequestForHarvestingTools}
            >
              Request for harvesting tools coming soon...
            </button>
          </div>

          <div className="col-12 bg-white crops-container">
            <div className="col-12 my-0">
              <h3 className="h3-semibold primary-text col-12 my-0 crops-start-aligned-text">
                Yield updates
              </h3>
            </div>

            <div className="col-12">
              <TabNavBar
                onChange={(status) => onChange(status)}
                isExpectedYield={isExpectedYield}
              />
            </div>

            <div className="col-12">
              {cropJourneySummary && isExpectedYield && (
                <YieldForm
                  transactionId={cropJourneySummary.transactionId}
                  measurementUnitList={measurementUnitList}
                  cropGradeList={cropGradeQualityList}
                  onDone={(data: CropJourneyHarvestStagePayload) =>
                    setHarvestDetails(data)
                  }
                  harvestYieldType={HarvestYieldType.EXPECTED}
                  harvestYield={
                    harvestDetails &&
                    harvestDetails.harvest &&
                    harvestDetails.harvest.expectedYield
                      ? harvestDetails.harvest.expectedYield
                      : null
                  }
                />
              )}
              {cropJourneySummary && !isExpectedYield && (
                <YieldForm
                  transactionId={cropJourneySummary.transactionId}
                  measurementUnitList={measurementUnitList}
                  cropGradeList={cropGradeQualityList}
                  onDone={(data: CropJourneyHarvestStagePayload) =>
                    setHarvestDetails(data)
                  }
                  harvestYieldType={HarvestYieldType.ACTUAL}
                  harvestYield={
                    harvestDetails &&
                    harvestDetails.harvest &&
                    harvestDetails.harvest.actualYield
                      ? harvestDetails.harvest.actualYield
                      : null
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Harvesting;
