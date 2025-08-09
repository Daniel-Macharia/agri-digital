/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import {
  CropJourneySummaryPayload,
  FarmEnvironmentType,
} from "../../../../../lib/model/CropJourneyModel";
import { TOASTIFY_AUTO_CLOSE_TIMEOUT } from "../../../../../lib/model/Model";
import { API_ROUTES } from "../../../../../lib/Routes";
import { extractErrorMessage } from "../../../../../lib/utils/Helpers";
import { JOURNEY_ROUTES } from "../../journey-routes";
import { CROP_ROUTES } from "../crop-routes";
const apiClient = new ApiClient();

const SelectFarmingEnvironment: React.FC = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const { cropJourneySummary, setCropJourneySummary, setTransactionId } =
    useCropJourney();

  const updateEnvironment = useCallback(
    async (environmentType: FarmEnvironmentType) => {
      try {
        if (!cropJourneySummary) return;

        const cropJourneySummaryResponse = await apiClient.patch<
          CropJourneySummaryPayload,
          any
        >({
          url: API_ROUTES.CROP_JOURNEY.FARM_ENVIRONMENT.replace(
            ":transactionId",
            cropJourneySummary.transactionId
          ).replace(":environmentType", environmentType),
        });
        setCropJourneySummary(cropJourneySummaryResponse);

        navigate(
          `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_PLANTING}`.replace(
            ":transactionId",
            cropJourneySummary.transactionId
          )
        );
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Farm environment modification failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      }
    },
    [cropJourneySummary, setCropJourneySummary]
  );

  useEffect(() => {
    if (transactionId) {
      setTransactionId(transactionId);
    }
  }, [transactionId]);

  return (
    <>
      <div className="crops-container col-12">
        <h3 className="h3-medium crops-center-aligned-text">
          Select Your Farming Environment.
        </h3>

        <p className="crops-center-aligned-text">
          Choose your farming environment to get started with monitoring
        </p>

        <div className="row justify-content-center">
          <div
            className="col-8 col-md-4 offset-md-1 crops-farming-environment"
            onClick={() => updateEnvironment(FarmEnvironmentType.OPEN)}
          >
            <img
              src="/assets/images/open-field.svg"
              className="environment-icon col-12"
              style={{ width: "88px", height: "88px" }}
            />
            <h3 className="h3-bold crops-farming-environment-title col-12">
              Open Field
            </h3>
            <p className="body-medium crops-farming-environment-description col-12">
              Traditional outdoor farming with natural conditions.
            </p>
          </div>
          <div
            className="crops-farming-environment col-8 col-md-4 offset-md-2"
            onClick={() => updateEnvironment(FarmEnvironmentType.CONTROLLED)}
          >
            <img
              src="/assets/images/controlled-environment.svg"
              className="environment-icon col-12"
              style={{ width: "88px", height: "88px" }}
            />
            <h3 className="h3-bold crops-farming-environment-title col-12">
              Controlled Environment
            </h3>
            <p className="body-medium crops-farming-environment-description col-12">
              Controlled environment for optimal growth.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectFarmingEnvironment;
