/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Form, FormikProvider, useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import {
  CropFormPayload,
  CropPayload,
  CropsFormPayload,
} from "../../../../../lib/model/CropJourneyModel";
import {
  ListApiResponse,
  SystemWideSelectString,
  TOASTIFY_AUTO_CLOSE_TIMEOUT,
} from "../../../../../lib/model/Model";
import { API_ROUTES } from "../../../../../lib/Routes";
import {
  extractErrorMessage,
  parseFormDatav3,
} from "../../../../../lib/utils/Helpers";
const apiClient = new ApiClient();

interface AddNewCropModalProps {
  show: boolean;
  setShow: (status: boolean) => void;
}

interface CropDropdownItems {
  cropsDropdown: SystemWideSelectString[];
  seedsDropdown: Record<string, SystemWideSelectString[]>;
  varietyDropdown: Record<string, SystemWideSelectString[]>;
}

const validationSchema = Yup.object().shape({
  crop: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .required()
    .label("Crop"),
  plantingDate: Yup.date().optional().required().label("Planting Date"),
});

const AddNewCropModal: React.FC<AddNewCropModalProps> = (
  props: AddNewCropModalProps
) => {
  const navigate = useNavigate();
  const { cropJourneySummary, cropsListItems, setCrops } = useCropJourney();

  const [step, setStep] = useState<number>(1);

  const { cropsDropdown, seedsDropdown, varietyDropdown }: CropDropdownItems =
    useMemo(() => {
      if (!cropsListItems || cropsListItems.length == 0)
        return { cropsDropdown: [], seedsDropdown: {}, varietyDropdown: {} };

      let cropsDropdown: SystemWideSelectString[] = [];
      const seedsDropdown: Record<string, SystemWideSelectString[]> = {},
        varietyDropdown: Record<string, SystemWideSelectString[]> = {};

      for (const crop of cropsListItems) {
        //loop crop
        cropsDropdown = [
          ...cropsDropdown,
          { value: crop.id, label: crop.name },
        ];

        if (crop.children && crop.children.length > 0) {
          //loop seeds
          seedsDropdown[crop.id] = [];
          for (const seed of crop.children) {
            seedsDropdown[crop.id] = [
              ...seedsDropdown[crop.id],
              { value: seed.id, label: seed.name },
            ];

            if (seed.children && seed.children.length > 0) {
              //loop variety
              varietyDropdown[seed.id] = [];
              for (const seedVariety of seed.children) {
                varietyDropdown[seed.id] = [
                  ...varietyDropdown[seed.id],
                  { value: seedVariety.id, label: seedVariety.name },
                ];
              }
            }
          }
        }
      }

      return { cropsDropdown, seedsDropdown, varietyDropdown };
    }, [cropsListItems]);

  const formik = useFormik<CropFormPayload>({
    initialValues: {
      crop: null,
      seed: null,
      seedVariety: null,
      plantingDate: null,
      harvestingDate: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!cropJourneySummary) return;

        const payload = parseFormDatav3(values);

        setSubmitting(true);

        const cropResponse = await apiClient.patch<
          ListApiResponse<CropPayload>,
          CropsFormPayload
        >({
          url: API_ROUTES.CROP_JOURNEY.CROP.replace(
            ":transactionId",
            cropJourneySummary.transactionId
          ),
          data: { crops: [payload] },
        });
        setCrops(cropResponse.list);
        props.setShow(false);
        navigate(
          "/farmer/projects/crops/display-crop-details/" +
            cropJourneySummary.transactionId
        );
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Crop modification failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleHasSeeds = useCallback(() => {
    console.log("Farmer has seeds");
    setStep(2);
  }, []);

  const handleRequestForSeeds = useCallback(() => {
    console.log("Farmer requesting for seeds");
    setStep(2);
  }, []);

  useEffect(() => {
    formik.setFieldValue("seed", null);
    formik.setFieldValue("seedVariety", null);
  }, [formik.values.crop]);

  useEffect(() => {
    formik.setFieldValue("seedVariety", null);
  }, [formik.values.seed]);

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShow(false);
        setStep(1);
      }}
      centered
      dialogClassName="mx-auto"
      className="col-sm-12"
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="h2-bold primary-text my-0">
          Add New Crop
        </Modal.Title>
      </Modal.Header>

      <FormikProvider value={formik}>
        <Form className="col-12">
          <Modal.Body>
            <div className="col-sm-12" style={{ marginBottom: "10px" }}>
              <label className="col-sm-12 body-regular primary-text my-0">
                Crop Name
              </label>

              <div className="col-sm-12">
                <Select
                  name="crop"
                  placeholder="Crop"
                  options={cropsDropdown}
                  value={formik.values.crop}
                  onChange={(option) => formik.setFieldValue("crop", option)}
                  onBlur={() => formik.setFieldTouched("crop", true)}
                  className="text-capitalize"
                />
                <div
                  className="text-danger small col-sm-12"
                  style={{ margin: "0px" }}
                >
                  <ErrorMessage name="crop" />
                </div>
              </div>
            </div>

            {formik.values.crop &&
              seedsDropdown &&
              seedsDropdown[formik.values.crop.value] && (
                <div
                  className="col-sm-12 modal-input-group"
                  style={{
                    display: step == 1 ? "none" : "block",
                    marginBottom: "10px",
                  }}
                >
                  <label
                    className="col-sm-12 body-regular primary-text my-0"
                    style={{ margin: "0px" }}
                  >
                    Seed Name
                  </label>

                  <div className="col-sm-12">
                    <Select
                      name="seed"
                      placeholder="Select Seed"
                      options={seedsDropdown[formik.values.crop.value]}
                      value={formik.values.seed}
                      onChange={(option) =>
                        formik.setFieldValue("seed", option)
                      }
                      onBlur={() => formik.setFieldTouched("seed", true)}
                      className="text-capitalize"
                    />
                    <div
                      className="text-danger small col-sm-12"
                      style={{ margin: "0px" }}
                    >
                      <ErrorMessage name="seed" />
                    </div>
                  </div>
                </div>
              )}

            {formik.values.seed &&
              varietyDropdown &&
              varietyDropdown[formik.values.seed.value] && (
                <div
                  className="modal-input-group"
                  style={{
                    display: step == 1 ? "none" : "block",
                    marginBottom: "10px",
                  }}
                >
                  <label
                    className="body-regular primary-text my-0"
                    style={{ margin: "0px" }}
                  >
                    Seed Variety
                  </label>

                  <div className="col-sm-12">
                    <Select
                      name="seedVariety"
                      placeholder="Select Variety"
                      options={varietyDropdown[formik.values.seed.value]}
                      value={formik.values.seedVariety}
                      onChange={(option) =>
                        formik.setFieldValue("seedVariety", option)
                      }
                      onBlur={() => formik.setFieldTouched("seedVariety", true)}
                      className="text-capitalize"
                    />
                    <div className="text-danger small col-sm-12">
                      <ErrorMessage name="seedVariety" />
                    </div>
                  </div>
                </div>
              )}

            <div
              className="modal-input-group"
              style={{
                display: step == 1 ? "none" : "block",
                marginBottom: "10px",
              }}
            >
              <label
                className="body-regular primary-text my-0 col-sm-12"
                style={{ margin: "0px" }}
              >
                Planting Date
              </label>

              <div className="col-sm-12">
                <DatePicker
                  selected={formik.getFieldProps("plantingDate").value}
                  onChange={(date) =>
                    formik.setFieldValue("plantingDate", date)
                  }
                  className="form-control body-regular col-sm-12 bg-light px-2 mb-0"
                  name="plantingDate"
                  placeholderText="Select planting date"
                  dateFormat={"MM/dd/yyyy"}
                  wrapperClassName="w-100"
                  autoComplete="off"
                />
                <div
                  className="text-danger small col-sm-12"
                  style={{ margin: "0px", textAlign: "start" }}
                >
                  <ErrorMessage name="plantingDate" />
                </div>
              </div>
            </div>

            <div
              className="modal-input-group"
              style={{
                display: step == 1 ? "none" : "block",
                marginBottom: "10px",
              }}
            >
              <label
                className="body-regular primary-text my-0 col-sm-12"
                style={{ margin: "0px" }}
              >
                Expected Harvesting Date
              </label>

              <div className="col-sm-12">
                <DatePicker
                  className="form-control body-regular col-sm-12 mb-0"
                  name="harvestingDate"
                  placeholderText="Select planting date"
                  dateFormat="MM/dd/yyyy"
                  selected={formik.getFieldProps("harvestingDate").value}
                  onChange={(date) =>
                    formik.setFieldValue("harvestingDate", date)
                  }
                  wrapperClassName="w-100"
                  autoComplete="off"
                />

                <div
                  className="text-danger small col-sm-12"
                  style={{ margin: "0px", textAlign: "start" }}
                >
                  <ErrorMessage name="harvestingDate" />
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="col-12">
            {step == 1 ? (
              <>
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <div className="row px-3">
                        <button
                          className="col-12 crops-other-button"
                          disabled={formik.isSubmitting}
                          onClick={handleHasSeeds}
                          type="submit"
                        >
                          I have seeds
                        </button>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="row px-3">
                        <button
                          className="col-12 crops-accept-button"
                          disabled={formik.isSubmitting}
                          onClick={handleRequestForSeeds}
                          type="submit"
                        >
                          Request for seeds
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-12">
                  <button
                    className="col-12 crops-accept-button"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Adding crop ..." : "Add Crop"}
                  </button>
                </div>
              </>
            )}
          </Modal.Footer>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default AddNewCropModal;
