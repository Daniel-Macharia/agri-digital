/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import GenericModal from "../../../../../common/components/GenericModal";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import { CropJourneyPostHarvestStagePayload } from "../../../../../lib/model/CropJourneyModel";
import {
  CropJourneyStageType,
  ModalSize,
} from "../../../../../lib/model/Model";
import { API_ROUTES } from "../../../../../lib/Routes";
import {
  extractErrorMessage,
  parsePostHarvestCropValueAdditionSummary,
  parsePostHarvestPackagingSummary,
  parsePostHarvestSortingAndGradingSummary,
  parsePostHarvestTransportSummary,
} from "../../../../../lib/utils/Helpers";
import ActivityAddAndReview from "../activity/activity";
import { CROP_ROUTES } from "../crop-routes";
import { ManagementSummaryProps } from "../crops-models";
import CropsNotification from "../crops-notification/crops-notification";
import ManagementSummary from "../management/management-summary";
import CropTransportForm from "./forms/CropTransportForm";
import CropValueAdditionForm from "./forms/CropValueAdditionForm";
import PackagingForm from "./forms/PackagingForm";
import SortingAndGradingForm from "./forms/SortingAndGradingForm";
import OnelineNotifications from "./oneline-notifications";
import StorageInformation from "./storage-information";
const apiClient = new ApiClient();
const sortingAndGradingUUID = "sorting-grading-" + uuidv4();
const packagingUUID = "packaging-" + uuidv4();
const valueAdditionUUID = "value-addition-" + uuidv4();
const transportUUID = "transport-" + uuidv4();

const PostHarvesting: React.FC = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const {
    cropJourneySummary,
    setTransactionId,
    postHarvestDetails,
    setPostHarvestDetails,
    measurementUnitList,
    cropGradeQualityList,
    packagingMethodList,
    processingMethodList,
    transportMethodList,
    vehicleTypeList,
    transportationStatusList,
  } = useCropJourney();
  const [showSortingAndGradingModal, setShowSortingAndGradingModal] =
    useState(false);
  const [showPackagingModal, setShowPackagingModal] = useState(false);
  const [showValueAdditionModal, setShowValueAdditionModal] = useState(false);
  const [showTransportModal, setShowTransportModal] = useState(false);

  const sideSummaries: ManagementSummaryProps[] = useMemo(() => {
    let sortingAndGrading: ManagementSummaryProps = {
      title: "Sorting & Grading",
      items: [],
      onActionRequired: (_) => setShowSortingAndGradingModal(true),
    };
    let packaging: ManagementSummaryProps = {
      title: "Packaging",
      items: [],
      onActionRequired: (_) => setShowPackagingModal(true),
    };

    if (
      postHarvestDetails &&
      postHarvestDetails.postHarvest &&
      postHarvestDetails.postHarvest.sortingAndGrading
    ) {
      sortingAndGrading = {
        ...sortingAndGrading,
        items: parsePostHarvestSortingAndGradingSummary(
          postHarvestDetails.postHarvest.sortingAndGrading
        ),
      };
    }

    if (
      postHarvestDetails &&
      postHarvestDetails.postHarvest &&
      postHarvestDetails.postHarvest.postHarvestPackaging
    ) {
      packaging = {
        ...packaging,
        items: parsePostHarvestPackagingSummary(
          postHarvestDetails.postHarvest.postHarvestPackaging
        ),
      };
    }

    return [sortingAndGrading, packaging];
  }, [postHarvestDetails]);

  const otherSummaries: ManagementSummaryProps[] = useMemo(() => {
    let valueAddition: ManagementSummaryProps = {
      title: "Value Addition",
      items: [],
      onActionRequired: (_) => setShowValueAdditionModal(true),
    };
    let transport: ManagementSummaryProps = {
      title: "Transport",
      items: [],
      onActionRequired: (_) => setShowTransportModal(true),
    };

    if (
      postHarvestDetails &&
      postHarvestDetails.postHarvest &&
      postHarvestDetails.postHarvest.cropValueAddition
    ) {
      valueAddition = {
        ...valueAddition,
        items: parsePostHarvestCropValueAdditionSummary(
          postHarvestDetails.postHarvest.cropValueAddition
        ),
      };
    }

    if (
      postHarvestDetails &&
      postHarvestDetails.postHarvest &&
      postHarvestDetails.postHarvest.transport
    ) {
      transport = {
        ...transport,
        items: parsePostHarvestTransportSummary(
          postHarvestDetails.postHarvest.transport
        ),
      };
    }

    return [valueAddition, transport];
  }, [postHarvestDetails]);

  // const handleRequestForService = () => {
  //   navigate(`..${CROP_ROUTES.CROP_REQUEST_FOR_SERVICE}`, {
  //     state: `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_POST_HARVESTING}`,
  //   });
  // };

  const handleContinueAction = () => {
    navigate(`..${CROP_ROUTES.CROP_SALES}`);
  };

  const fetchPostHarvestDetails = useCallback(async () => {
    try {
      if (!transactionId) return;

      const dataResponse =
        await apiClient.get<CropJourneyPostHarvestStagePayload>({
          url: API_ROUTES.CROP_JOURNEY.CROP_POST_HARVEST_DETAILS.replace(
            ":transactionId",
            transactionId
          ),
        });
      setPostHarvestDetails(dataResponse);
    } catch (err) {
      extractErrorMessage(err);
    }
  }, [transactionId, setPostHarvestDetails]);

  useEffect(() => {
    if (transactionId) {
      fetchPostHarvestDetails();
      setTransactionId(transactionId);
    }
  }, [transactionId]);

  return (
    <>
      <GenericModal
        modalSize={ModalSize.MEDIUM}
        show={showSortingAndGradingModal}
        htmlId={sortingAndGradingUUID}
        shouldHide={(hide) => setShowSortingAndGradingModal(!hide)}
        title="Sorting & Grading"
        showModalHeader={true}
        component={
          <SortingAndGradingForm
            transactionId={transactionId || ""}
            measurementUnitList={measurementUnitList}
            cropGradeQualityList={cropGradeQualityList}
            onDone={(data) => {
              setShowSortingAndGradingModal(false);
              setPostHarvestDetails(data);
            }}
            onCancel={() => setShowSortingAndGradingModal(false)}
          />
        }
      />
      <GenericModal
        modalSize={ModalSize.MEDIUM}
        show={showPackagingModal}
        htmlId={packagingUUID}
        shouldHide={(hide) => setShowPackagingModal(!hide)}
        title="Packaging Method"
        showModalHeader={true}
        component={
          <PackagingForm
            transactionId={transactionId || ""}
            packagingMethodList={packagingMethodList}
            onDone={(data) => {
              setShowPackagingModal(false);
              setPostHarvestDetails(data);
            }}
            onCancel={() => setShowPackagingModal(false)}
          />
        }
      />
      <GenericModal
        modalSize={ModalSize.MEDIUM}
        show={showValueAdditionModal}
        htmlId={valueAdditionUUID}
        shouldHide={(hide) => setShowValueAdditionModal(!hide)}
        title="Crop Value Addition"
        showModalHeader={true}
        component={
          <CropValueAdditionForm
            transactionId={transactionId || ""}
            processingMethodList={processingMethodList}
            onDone={(data) => {
              setShowValueAdditionModal(false);
              setPostHarvestDetails(data);
            }}
            onCancel={() => setShowValueAdditionModal(false)}
          />
        }
      />
      <GenericModal
        modalSize={ModalSize.MEDIUM}
        show={showTransportModal}
        htmlId={transportUUID}
        shouldHide={(hide) => setShowTransportModal(!hide)}
        title="Transport"
        showModalHeader={true}
        component={
          <CropTransportForm
            transactionId={transactionId || ""}
            transportMethodList={transportMethodList}
            vehicleTypeList={vehicleTypeList}
            transportationStatusList={transportationStatusList}
            onDone={(data) => {
              setShowTransportModal(false);
              setPostHarvestDetails(data);
            }}
            onCancel={() => setShowTransportModal(false)}
          />
        }
      />
      <div className="col-12">
        <div className="col-12 my-3">
          <CropsNotification
            iconUrl={"/assets/images/warning.svg"}
            message={
              "Use ventilated plastic crates for tomatoes to reducee spoilage"
            }
          />
        </div>

        <div className="crops-container m-0">
          <div className="col-12">
            <div className="row justify-content-end my-2">
              <button
                className="col-12 col-md-4 crops-accept-button"
                // onClick={handleRequestForService}
              >
                Request for Service, Coming soon...
              </button>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-12 col-md-7 mt-2">
                <StorageInformation />
              </div>

              <div className="col-12 col-md-5 mt-2 p-1">
                {sideSummaries.map((sideSummary) => (
                  <div className="col-12 px-2">
                    <ManagementSummary
                      title={sideSummary.title}
                      items={sideSummary.items}
                      onActionRequired={sideSummary.onActionRequired}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 mt-2">
            <div className="row">
              <div className="col-12 col-md-8">
                <div className="row">
                  {otherSummaries.map((otherSummary) => (
                    <div className="col-12 col-md-6 px-2">
                      <ManagementSummary
                        title={otherSummary.title}
                        items={otherSummary.items}
                        onActionRequired={otherSummary.onActionRequired}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12 col-md-4 crops-container bg-white pb-0">
                <OnelineNotifications />
              </div>
            </div>
          </div>

          <div className="col-12 mt-2">
            <ActivityAddAndReview
              cropJourneyStageType={CropJourneyStageType.POST_HARVEST}
            />
          </div>

          <div className="col-12 mt-2">
            <div className="row justify-content-end">
              <button
                className="col-12 col-md-4 crops-accept-button"
                onClick={handleContinueAction}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostHarvesting;
