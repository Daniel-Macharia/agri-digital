import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import { CropPayload } from "../../../../../lib/model/CropJourneyModel";
import { ListApiResponse } from "../../../../../lib/model/Model";
import { API_ROUTES } from "../../../../../lib/Routes";
import { extractErrorMessage } from "../../../../../lib/utils/Helpers";
import CropsNotification from "../crops-notification/crops-notification";
import AddNewCropModal from "./add-new-crop-modal";
const apiClient = new ApiClient();

const Planting: React.FC = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const { cropJourneySummary, setTransactionId, setCrops, crops } =
    useCropJourney();
  const [show, setShow] = useState<boolean>(false);

  const handleRequestForService = useCallback(() => {
    // navigate(`..${CROP_ROUTES.CROP_REQUEST_FOR_SERVICE}`, {
    //   state: `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_PLANTING}`,
    // });
    console.log("Request service here");
  }, []);

  const fetchCrops = useCallback(async () => {
    try {
      if (!cropJourneySummary) return;

      const cropResponse = await apiClient.get<ListApiResponse<CropPayload>>({
        url: API_ROUTES.CROP_JOURNEY.CROP.replace(
          ":transactionId",
          cropJourneySummary.transactionId
        ),
      });
      setCrops(cropResponse.list);
    } catch (err) {
      extractErrorMessage(err);
    }
  }, [cropJourneySummary, setCrops]);

  useEffect(() => {
    if (transactionId) {
      setTransactionId(transactionId);
    }
  }, [transactionId]);

  useEffect(() => {
    fetchCrops();
  }, [fetchCrops]);

  useEffect(() => {
    if (cropJourneySummary && crops && crops.length > 0) {
      navigate(
        "/farmer/projects/crops/display-crop-details/" +
          cropJourneySummary.transactionId
      );
    }
  }, [cropJourneySummary, crops]);

    return (<>
    <div className="col-12 mb-4">

        <div className="col-12 my-3" >
            <CropsNotification 
            iconUrl={"/assets/images/warning.svg"} 
            message={"The long rains begin in two weeks"} />
        </div>

        <div className="col-12 crops-container">
          <div className="col-12">
            <div className="row my-2 px-0 px-md-2 justify-content-end">
              <button
                className="col-12 col-md-4 crops-accept-button"
                onClick={handleRequestForService}
              >
                Request Services | Coming Soon...
              </button>
            </div>
          </div>
          <div className="col-12 ">
            <div className="row justify-content-center">
                    <div className="col-12 col-md-8 crops-container bg-white p-4">
                        <div className="col-sm-12">
                            <div className="col-12 d-flex justify-content-center">
                                <img 
                                src="/assets/images/planting-calendar-icon.svg"
                                style={{width: "64px"}}
                                />
                            </div>

                            <h3 className="h3-bold primary-text text-center col-sm-12" >
                                Create your Planting<br/>Calendar!
                            </h3>

                            <p
                            className="col-sm-12 body-medium secondary-text text-center">
                                Start planning your growing season by adding your first crop.
                            </p>

                            <div className="col-12">
                                <div className="row justify-content-center px-2">
                                    <button 
                                    onClick={()=> setShow(true) }
                                    className="col-12 col-md-4 crops-accept-button"
                                    >
                                        Add your first crop
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <AddNewCropModal show={show} setShow={(status) => setShow(status)} />
    </>
  );
};

export default Planting;
