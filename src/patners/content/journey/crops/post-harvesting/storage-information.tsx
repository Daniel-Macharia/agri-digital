import { useMemo, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { v4 as uuidv4 } from "uuid";
import GenericModal from "../../../../../common/components/GenericModal";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import { ModalSize } from "../../../../../lib/model/Model";
import { capitalize, formatNumber } from "../../../../../lib/utils/Helpers";
import { StorageSpecificationItemProps } from "../crops-models";
import CropStorageForm from "./forms/CropStorageForm";
import StorageSpecification from "./storage-specification";
const cropStorageUUID = "crop-storage-" + uuidv4();

const StorageInformation: React.FC = () => {
  const {
    transactionId,
    postHarvestDetails,
    setPostHarvestDetails,
    measurementUnitList,
    storageTypeList,
    pricingCycleList,
  } = useCropJourney();
  const [showCropStorageModal, setShowCropStorageModal] = useState(false);

  const storageSpecs: StorageSpecificationItemProps[] = useMemo(() => {
    if (
      postHarvestDetails &&
      postHarvestDetails.postHarvest &&
      postHarvestDetails.postHarvest.cropStorage
    ) {
      return [
        {
          itemName: "Inventory Level",
          itemValue: `${formatNumber(
            postHarvestDetails.postHarvest.cropStorage.inventoryLevel
          )} ${capitalize(
            postHarvestDetails.postHarvest.cropStorage.inventoryLevelUnit.name
          )}`,
        },
        {
          itemName: "Storage Duration",
          itemValue: capitalize(
            `${formatNumber(
              postHarvestDetails.postHarvest.cropStorage.storageDurationAmount
            )} ${capitalize(
              postHarvestDetails.postHarvest.cropStorage.storageDuration.toLocaleLowerCase()
            )}`
          ),
        },
        {
          itemName: "Storage Fee",
          itemValue: capitalize(
            `${formatNumber(
              postHarvestDetails.postHarvest.cropStorage.storageFee
            )} ${capitalize(
              postHarvestDetails.postHarvest.cropStorage.storageFeeCycle.name
            )}`
          ),
        },
      ];
    }
    return [];
  }, [postHarvestDetails]);

  return (
    <Fragment>
      <GenericModal
        modalSize={ModalSize.MEDIUM}
        show={showCropStorageModal}
        htmlId={cropStorageUUID}
        shouldHide={(hide) => setShowCropStorageModal(!hide)}
        title="Crop Storage"
        showModalHeader={true}
        component={
          <CropStorageForm
            transactionId={transactionId || ""}
            measurementUnitList={measurementUnitList}
            storageTypeList={storageTypeList}
            pricingCycleList={pricingCycleList}
            onDone={(data) => {
              setShowCropStorageModal(false);
              setPostHarvestDetails(data);
            }}
            onCancel={() => setShowCropStorageModal(false)}
          />
        }
      />
      <div className="col-12 crops-container bg-white">
        <div className="row my-0 py-0">
          <div className="col-11">
            <h3 className="h3-bold primary-text crops-start-aligned-text col-12 my-1">
              Storage
            </h3>
          </div>

          <div className="col-1 p-0">
            <img
              src="/assets/images/edit.svg"
              alt="edit"
              className="col-12 m-0"
              style={{ width: "24px", cursor: "pointer" }}
              onClick={() => setShowCropStorageModal(true)}
            />
          </div>
        </div>

        {postHarvestDetails &&
          postHarvestDetails.postHarvest &&
          postHarvestDetails.postHarvest.cropStorage && (
            <Fragment>
              <div className="row p-2">
                <div className="col-12 col-md-6  p-2">
                  <div className="col-12 card m-0 p-2">
                    <h3 className="body-medium primary-text col-12  crops-start-aligned-text my-1">
                      Storage Type
                    </h3>

                    <h3 className="h3-semibold primary-text col-12 crops-start-aligned-text my-1 text-capitalize">
                      {
                        postHarvestDetails.postHarvest.cropStorage.storageType
                          .name
                      }
                    </h3>

                    <p className="body-regular secondary-text col-12 crops-start-aligned-text my-1">
                      -
                    </p>
                  </div>
                </div>

                <div className="col-12 col-md-6 p-2">
                  <div className="col-12 card m-0 p-2">
                    <h3 className="body-medium primary-text col-12 crops-start-aligned-text my-1">
                      Containers
                    </h3>

                    <div className="col-12 my-1">
                      <div className="row my-1">
                        <p className="body-regular secondary-text col-8 m-0 crops-start-aligned-text">
                          Humidity
                        </p>

                        <p className="body-bold primary-text col-4 m-0 crops-end-aligned-text">
                          {postHarvestDetails.postHarvest.cropStorage.humidity}
                        </p>
                      </div>
                    </div>

                    <div className="col-12 my-1">
                      <div className="row p-0">
                        <p className="body-regular secondary-text col-8 m-0 crops-start-aligned-text">
                          Temperature
                        </p>

                        <p className="body-bold primary-text col-4 m-0 crops-end-aligned-text text-capitalize">
                          {
                            postHarvestDetails.postHarvest.cropStorage
                              .temperature
                          }{" "}
                          {
                            postHarvestDetails.postHarvest.cropStorage
                              .temperatureUnit.name
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 px-0">
                <div className="row px-1 mx-0 ">
                  {storageSpecs.map((storageSpec, index: number) => (
                    <div
                      className={`col-12 col-md-4 mx-0 px-1 ${
                        index === 0 ? "ps-0" : ""
                      } ${index === storageSpecs.length - 1 ? "pe-0" : ""}`}
                    >
                      <StorageSpecification
                        itemName={storageSpec.itemName}
                        itemValue={storageSpec.itemValue}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Fragment>
          )}
      </div>
    </Fragment>
  );
};

export default StorageInformation;
