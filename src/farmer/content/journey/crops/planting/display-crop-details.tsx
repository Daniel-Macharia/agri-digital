import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import PlantingActivityItem from "./planting-activity-item";

import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import {
  CropJourneySummaryPayload,
  CropPayload,
} from "../../../../../lib/model/CropJourneyModel";
import {
  ListApiResponse,
  TOASTIFY_AUTO_CLOSE_TIMEOUT,
  TodoFormPayload,
  TodoStatus,
} from "../../../../../lib/model/Model";
import { API_ROUTES } from "../../../../../lib/Routes";
import {
  dateStringToDate,
  dateStringToFormattedDate,
  extractErrorMessage,
  parseFormDatav3,
} from "../../../../../lib/utils/Helpers";
import { storageDelete } from "../../../../utils/StorageUtils";
import AddNewCropModal from "./add-new-crop-modal";
import { CROP_ROUTES } from "../crop-routes";
const apiClient = new ApiClient();

const DisplayCropDetails: React.FC = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const { cropJourneySummary, setTransactionId, setCrops, crops } =
    useCropJourney();

  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // const [showAdd, setShow] = useState<boolean>(false);
  const [showActivityModal, setShowActivityModal] = useState<{
    showActivityModal: boolean;
    cropId: string;
    cropIndex: number;
  }>({ showActivityModal: false, cropId: "", cropIndex: 0 });

  const [addNewCropModalShow, addNewCropModalSetShow] =
    useState<boolean>(false);

  const handleContinueAction = useCallback(() => {
    if (!cropJourneySummary) return;

    navigate(
      `${CROP_ROUTES.FULL.CROP_MANAGEMENT_FULL}/${cropJourneySummary.transactionId}`
    );
    storageDelete("plantingActivity");
  }, [cropJourneySummary]);

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

  return (
    <>
      <div className="col-12 my-1 mb-3">
        <div className="row justify-content-end mx-0">
          <button
            className="col-12 col-md-4 crops-accept-button"
            onClick={() => {
              addNewCropModalSetShow(true);
            }}
          >
            Add a New Crop
          </button>
        </div>
      </div>
      <div className="col-12 crops-container bg-white mx-0">
        {crops &&
          crops.length > 0 &&
          crops.map((crop, index) => (
            <div key={index} className="col-sm-12">
              <div className="col-12">
                <div className="row m-0">
                  <div className="col-11 col-md-10">
                    <div className="row justify-content-start">
                      <div className="col-2 col-md-1 d-flex justify-content-end">
                        <img
                        src="/assets/images/plant_green.svg"
                        style={{ maxWidth: "48px" }}
                        />
                      </div>
                      <div className="col-10 d-flex justify-content-start">
                        <h3 className="h3-bold primary-text col-12 text-start my-0">
                        {crop.crop.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-1 col-md-2 d-flex justify-content-end p-0 ">
                    <img
                      src="/assets/images/edit.svg"
                      style={{ width: "24px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="row m-0">
                  <div className="col-12 col-md-6 order-1">
                    <div className="col-12 mt-0 ">
                      <div
                        className="row mx-0 my-1 crops-container"
                        style={{
                          backgroundColor: "var(--Light-Blue, #E1EEFF)",
                        }}
                      >
                        <div className="col-2 d-flex col-md-1 p-1 justify-content-center align-items-center">
                          <img
                            src="/assets/images/clock.svg"
                            className="col-12 m-0"
                          />
                        </div>
                        <div className="col-10 col-md-11">
                          <div className="row">
                            <p className="col-12 col-md-6 body-regular primary-text crops-start-aligned-text m-0 my-1">
                              Planting Date:
                            </p>
                            <p className="body-bold primary-text col-12 col-md-6 crops-start-aligned-text m-0 my-1">
                              {dateStringToFormattedDate(
                                crop.plantingDate,
                                "DD/MM/YYYY"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 ">
                      <div
                        className="row mx-0 my-1 crops-container"
                        style={{ backgroundColor: "var(--light-red, #FFF1E9)" }}
                      >
                        <div className="col-2 d-flex col-md-1 p-1 justify-content-center align-items-center">
                          <img
                            src="/assets/images/sun.svg"
                            className="col-12 m-0"
                          />
                        </div>
                        <div className="col-10 col-md-11">
                          <div className="row ">
                            <p className="col-12 col-md-6 body-regular primary-text crops-start-aligned-text m-0 my-1">
                              Harvesting Date:
                            </p>
                            <p className="body-bold primary-text col-12 col-md-6 crops-start-aligned-text m-0 my-1">
                              {dateStringToFormattedDate(
                                crop.harvestingDate,
                                "DD/MM/YYYY"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-12 col-md-6 order-2 p-2"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "4px",
                    }}
                  >
                    <div className="col-12 ">
                      <div className="row m-0 p-0">
                        <div className="col-6 py-0">
                          <h3
                            className="small-bold col-12 my-0"
                            style={{
                              alignSelf: "center",
                            }}
                          >
                            Activities
                          </h3>
                        </div>
                        <div className="col-6 py-0">
                          <button
                            type="button"
                            className="small-semibold col-12 my-0 py-0"
                            onClick={() => {
                              setShowActivityModal({
                                showActivityModal: true,
                                cropId: crop.id,
                                cropIndex: index,
                              });
                            }}
                            style={{
                              background: "none",
                              borderStyle: "none",
                              color: "var(--primary)",
                              minWidth: "max-content",
                            }}
                          >
                            Add Activity
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      {!crop.activities ? (
                        <div className="col-12">
                          <p className="col-12">No activity scheduled yet.</p>
                        </div>
                      ) : (
                        crop.activities.map((activity) => (
                          <div className="col-12">
                            <PlantingActivityItem
                              activityDate={dateStringToDate(activity.dueDate)}
                              activityDescription={activity.description}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div className="col-12 my-1" style={{ paddingTop: "40vh" }}>
          <div className="row justify-content-end m-0">
            <button
              className="col-12 col-md-4 crops-accept-button"
              onClick={handleContinueAction}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <AddNewCropModal
        show={addNewCropModalShow}
        setShow={(status) => addNewCropModalSetShow(status)}
      />

      <AddActivityModal
        cropJourneySummary={cropJourneySummary}
        cropId={showActivityModal.cropId}
        show={showActivityModal.showActivityModal}
        setShow={(status) =>
          setShowActivityModal({
            showActivityModal: status,
            cropId: "",
            cropIndex: 0,
          })
        }
        onDone={(crop) => {
          const newCrops = [...crops];
          newCrops[showActivityModal.cropIndex] = crop;
          setCrops(newCrops);
        }}
      />
    </>
  );
};

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  cropId: string;
  cropJourneySummary?: CropJourneySummaryPayload;
  onDone: (crop: CropPayload) => void;
}

const validationSchema = Yup.object().shape({
  entityId: Yup.string().trim().required().label("Entity ID"),
  title: Yup.string().trim().required().label("Title"),
  dueDate: Yup.date().required().label("Title"),
  status: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Status"),
  description: Yup.string().trim().required().label("Description"),
});
const AddActivityModal: React.FC<Props> = ({
  show,
  setShow,
  cropId,
  cropJourneySummary,
  onDone,
}) => {
  const formik = useFormik<TodoFormPayload>({
    initialValues: {
      entityId: cropId,
      title: "",
      dueDate: null,
      status: null,
      description: "",
      activityType: null,
      file: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (!cropJourneySummary || !cropId) return;
        const payload = parseFormDatav3(values);
        setSubmitting(true);

        const cropResponse = await apiClient.post<CropPayload, TodoFormPayload>(
          {
            url: API_ROUTES.CROP_JOURNEY.CROP_ACTIVITY.replace(
              ":transactionId",
              cropJourneySummary.transactionId
            ).replace(":cropId", cropId),
            data: payload,
          }
        );
        onDone(cropResponse);
        setShow(false);
        resetForm();
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Activity addition failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("entityId", cropId);
    formik.setFieldValue("title", "Activity");
    formik.setFieldValue("status", {
      value: TodoStatus.PENDING,
      label: TodoStatus.PENDING,
    });
  }, [cropId]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      dialogClassName="mx-auto"
      className="col-12"
    >
      <FormikProvider value={formik}>
        <Form className="col-12">
          <Modal.Header closeButton className="col-12 p-2">
            <Modal.Title className="col-8 m-0 ">
              <p className="h2-bold primary-text my-0">Add Activity</p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="col-12">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <label className="crops-start-aligned-text body-regular primary-text col-12 m-0">
                    Activity Description
                  </label>
                </div>

                <div className="col-12 mb-3">
                  <Field
                    className="form-control body-regular col-12 mb-0"
                    type="text"
                    name="description"
                    placeholder="e.g weeding"
                  />
                  <div className="text-danger small col-12">
                    <ErrorMessage name="description" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <label className="crops-start-aligned-text body-regular primary-text col-12 mb-0">
                Activity Date
              </label>

              <div className="col-12">
                <div className="row">
                  <div className="col-10">
                    <DatePicker
                      className="form-control body-regular mb-0"
                      name="dueDate"
                      placeholderText="select activity date"
                      selected={formik.getFieldProps("dueDate").value}
                      onChange={(date) => formik.setFieldValue("dueDate", date)}
                      dateFormat={"MM/dd/yyyy"}
                      // minDate={new Date()}
                      wrapperClassName="w-100"
                      showDateSelect
                    />
                    <div className="text-danger small col-sm-12">
                      <ErrorMessage name="dueDate" />
                    </div>
                  </div>
                  <div className="col-2">
                    <img
                      src="/assets/images/calendar.svg"
                      style={{ width: "32px", height: "32px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="col-12">
            <div className="col-12">
              <button
                className="col-12 crops-accept-button"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Adding activity .." : "Add Activity"}
              </button>
            </div>
          </Modal.Footer>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default DisplayCropDetails;
