/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import {
  SoilTestFormPayload,
  SoilTestPayload,
} from "../../../../../lib/model/CropJourneyModel";
import {
  SystemWideSelectString,
  TOASTIFY_AUTO_CLOSE_TIMEOUT,
} from "../../../../../lib/model/Model";
import { API_ROUTES } from "../../../../../lib/Routes";
import {
  capitalize,
  extractErrorMessage,
  parseFormDatav3,
} from "../../../../../lib/utils/Helpers";
import { CROP_ROUTES } from "../crop-routes";
import CropsNotification from "../crops-notification/crops-notification";
const apiClient = new ApiClient();

const validationSchema = Yup.object().shape({
  areaSize: Yup.number().min(0).required().label("Area Size"),
  comments: Yup.string().optional().trim().label("Comments"),
  areaUnit: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .required()
    .label("Area Unit"),
  soilTexture: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .required()
    .label("Soil Texture"),
  soilColor: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .required()
    .label("Soil Color"),
  moistureLevel: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Moisture Level"),
  nutrientDeficiency: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Nutrient Deficiency"),
  irrigationMethod: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Irrigation Method"),
  currentCrops: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .nullable()
    .label("Current Crops"),
});

const SoilTesting: React.FC = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const {
    soilTest,
    cropJourneySummary,
    setTransactionId,
    cropsListItems,
    areaUnitListItems,
    soilTextureListItems,
    soilColorListItems,
    moistureLevelListItems,
    nutrientDeficiencyListItems,
    irrigationMethodListItems,
    setSoilTest,
  } = useCropJourney();
  const [show, setShow] = useState<boolean>(false);

  const areaUnitsDropdown: SystemWideSelectString[] = useMemo(() => {
    return areaUnitListItems
      ? areaUnitListItems.map((item) => ({
          value: item.id,
          label: capitalize(item.name),
        }))
      : [];
  }, [areaUnitListItems]);

  const cropsDropdown: SystemWideSelectString[] = useMemo(() => {
    return cropsListItems
      ? cropsListItems.map((item) => ({
          value: item.id,
          label: capitalize(item.name),
        }))
      : [];
  }, [cropsListItems]);

  const soilTexturesDropdown: SystemWideSelectString[] = useMemo(() => {
    return soilTextureListItems
      ? soilTextureListItems.map((item) => ({
          value: item.id,
          label: capitalize(item.name),
        }))
      : [];
  }, [soilTextureListItems]);

  const soilColorsDropdown: SystemWideSelectString[] = useMemo(() => {
    return soilColorListItems
      ? soilColorListItems.map((item) => ({
          value: item.id,
          label: capitalize(item.name),
        }))
      : [];
  }, [soilColorListItems]);

  const moistureLevelsDropdown: SystemWideSelectString[] = useMemo(() => {
    return moistureLevelListItems
      ? moistureLevelListItems.map((item) => ({
          value: item.id,
          label: capitalize(item.name),
        }))
      : [];
  }, [moistureLevelListItems]);

  const nutrientDeficiensDropdown: SystemWideSelectString[] = useMemo(() => {
    return nutrientDeficiencyListItems
      ? nutrientDeficiencyListItems.map((item) => ({
          value: item.id,
          label: capitalize(item.name),
        }))
      : [];
  }, [nutrientDeficiencyListItems]);

  const irrigationsDropdown: SystemWideSelectString[] = useMemo(() => {
    return irrigationMethodListItems
      ? irrigationMethodListItems.map((item) => ({
          value: item.id,
          label: capitalize(item.name),
        }))
      : [];
  }, [irrigationMethodListItems]);

  const formik = useFormik<SoilTestFormPayload>({
    initialValues: {
      areaSize: 0,
      areaUnit: null,
      soilTexture: null,
      soilColor: null,
      moistureLevel: null,
      nutrientDeficiency: null,
      irrigationMethod: null,
      comments: "",
      currentCrops: [],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!cropJourneySummary) return;
        const payload = parseFormDatav3(values);
        setSubmitting(true);

        const soilTestResponse = await apiClient.patch<SoilTestPayload, any>({
          url: API_ROUTES.CROP_JOURNEY.SOIL_TEST.replace(
            ":transactionId",
            cropJourneySummary.transactionId
          ),
          data: payload,
        });
        setSoilTest(soilTestResponse);
        setShow(true);
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Soil test modification failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleModalContinueAction = useCallback(() => {
    if (!cropJourneySummary) return;

    console.log("continuing with the journey");
    navigate(
      `..${CROP_ROUTES.CROP_SELECT_FARMING_ENVIRONMENT}`.replace(
        ":transactionId",
        cropJourneySummary.transactionId
      )
    );
    setShow(false);
  }, [cropJourneySummary]);

  const handleModalDownloadAction = useCallback(() => {
    console.log("Downloading the soil test report");
    setShow(false);
  }, []);

  const handleRequestForTesting = useCallback(() => {
    console.log("Implement after having service providers");
    // if (!cropJourneySummary) return;

    // navigate(
    //   `..${CROP_ROUTES.CROP_REQUEST_FOR_SOIL_TESTING}`.replace(
    //     ":transactionId",
    //     cropJourneySummary.transactionId
    //   )
    // );
  }, [cropJourneySummary]);

  const handleCancelSoilTesting = useCallback(() => {
    console.log("cancelled..");
  }, []);

  const refetchSoilTest = useCallback(async () => {
    try {
      if (!cropJourneySummary) return;
      const soilTestResponse = await apiClient.get<SoilTestPayload>({
        url: API_ROUTES.CROP_JOURNEY.SOIL_TEST.replace(
          ":transactionId",
          cropJourneySummary.transactionId
        ),
      });
      setSoilTest(soilTestResponse);
    } catch (err) {
      extractErrorMessage(err);
    }
  }, [setSoilTest, cropJourneySummary]);

  useEffect(() => {
    if (transactionId) {
      setTransactionId(transactionId);
    }
  }, [transactionId]);

  useEffect(() => {
    refetchSoilTest();
  }, [refetchSoilTest]);

  useEffect(() => {
    if (!soilTest) return;

    formik.setValues({
      areaSize: soilTest.areaSize.size,
      areaUnit: {
        value: soilTest.areaSize.unit.id,
        label: soilTest.areaSize.unit.name,
      },
      soilTexture: {
        value: soilTest.soilTexture.id,
        label: soilTest.soilTexture.name,
      },
      soilColor: {
        value: soilTest.soilColor.id,
        label: soilTest.soilColor.name,
      },
      moistureLevel: soilTest.moistureLevel
        ? {
            value: soilTest.moistureLevel.id,
            label: soilTest.moistureLevel.name,
          }
        : null,
      nutrientDeficiency: soilTest.nutrientDeficiency
        ? {
            value: soilTest.nutrientDeficiency.id,
            label: soilTest.nutrientDeficiency.name,
          }
        : null,
      irrigationMethod: soilTest.irrigationMethod
        ? {
            value: soilTest.irrigationMethod.id,
            label: soilTest.irrigationMethod.name,
          }
        : null,
      comments: soilTest.comments || "",
      currentCrops:
        soilTest.currentCrops && soilTest.currentCrops.length > 0
          ? soilTest.currentCrops.map((item) => ({
              value: item.id,
              label: item.name,
            }))
          : [],
    });
  }, [soilTest]);

  return (
    <>
      <div className="col-12">
        <div className="col-12 my-3">
          <CropsNotification
            iconUrl={"/assets/images/warning.svg"}
            message={"Low soil moisture detected. Time to irrigate."}
          />
        </div>

        <div className="col-12 crops-container">
          <div className="row m-0 my-2 px-1 justify-content-end">
            <button
              onClick={handleRequestForTesting}
              className="col-12 col-md-4 m-0 crops-accept-button"
            >
              Request for Soil Testing(Coming soon...)
            </button>
          </div>

          <div className=" crops-container bg-white border-radius-3 col-sm-12 mb-4 p-4">
            <div className="col-12">
              <h3 className="h3-semibold crops-start-aligned-text col-12 py-0 my-3">
                Soil Testing
              </h3>
            </div>
            <FormikProvider value={formik}>
              <Form className="col-12">
                <div className="row mb-4">
                  <div className="col-12 col-md-4 my-0 ">
                    <label
                      className="crops-start-aligned-text body-regular primary-text col-12 my-0"
                      style={{ textAlign: "start" }}
                    >
                      Farm size
                    </label>
                  </div>

                  <div className="col-12 col-md-8 my-0">
                    <Row>
                      <Col md={6}>
                        <Field
                          className="form-control col-12 body-regular m-0"
                          step="any"
                          type="number"
                          name="areaSize"
                          placeholder="2.5"
                        />
                        <div
                          className="text-danger small col-12 p-0 m-0"
                        >
                          <ErrorMessage name="areaSize" />
                        </div>
                      </Col>
                      <Col md={6}>
                        <Select
                          name="areaUnit"
                          placeholder="Area Unit"
                          options={areaUnitsDropdown}
                          value={formik.values.areaUnit}
                          onChange={(option) =>
                            formik.setFieldValue("areaUnit", option)
                          }
                          onBlur={() =>
                            formik.setFieldTouched("areaUnit", true)
                          }

                          className="py-1 mt-2 mt-md-0"
                        />
                        <div
                          className="text-danger small col-12"
                          style={{
                            padding: "0px",
                            margin: "0px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                          }}
                        >
                          <ErrorMessage name="areaUnit" />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12 col-md-4">
                    <label className="crops-start-aligned-text body-regular col-12 my-0 primary-text">
                      Soil Texture
                    </label>
                  </div>

                  <div className="col-12 col-md-8">
                    <Select
                      name="soilTexture"
                      placeholder="Soil Texture"
                      options={soilTexturesDropdown}
                      value={formik.values.soilTexture}
                      onChange={(option) =>
                        formik.setFieldValue("soilTexture", option)
                      }
                      onBlur={() => formik.setFieldTouched("soilTexture", true)}
                    />
                    <div
                      className="text-danger small col-12"
                      style={{
                        padding: "0px",
                        margin: "0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                      }}
                    >
                      <ErrorMessage name="soilTexture" />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12 col-md-4">
                    <label className="col-12 crops-start-aligned-text body-regular primary-text my-0">
                      Soil Color
                    </label>
                  </div>

                  <div className="col-sm-12 col-md-8">
                    <Select
                      name="soilColor"
                      placeholder="Soil Color"
                      options={soilColorsDropdown}
                      value={formik.values.soilColor}
                      onChange={(option) =>
                        formik.setFieldValue("soilColor", option)
                      }
                      onBlur={() => formik.setFieldTouched("soilColor", true)}
                    />
                    <div
                      className="text-danger small col-12"
                      style={{
                        padding: "0px",
                        margin: "0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                      }}
                    >
                      <ErrorMessage name="soilColor" />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12 col-md-4">
                    <label className="crops-start-aligned-text col-12 body-regular primary-text my-0">
                      Moisture Level
                    </label>
                  </div>

                  <div className="col-12 col-md-8">
                    <Select
                      name="moistureLevel"
                      placeholder="Moisture Level"
                      options={moistureLevelsDropdown}
                      value={formik.values.moistureLevel}
                      onChange={(option) =>
                        formik.setFieldValue("moistureLevel", option)
                      }
                      onBlur={() =>
                        formik.setFieldTouched("moistureLevel", true)
                      }
                    />
                    <div
                      className="text-danger small col-12"
                      style={{
                        padding: "0px",
                        margin: "0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                      }}
                    >
                      <ErrorMessage name="moistureLevel" />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12 col-md-4">
                    <label className="crops-start-aligned-text col-12 body-regular primary-text my-0">
                      Current Crops
                    </label>
                  </div>

                  <div className="col-12 col-md-8">
                    <Select
                      isMulti
                      name="currentCrops"
                      placeholder="Current Crops"
                      options={cropsDropdown}
                      value={formik.values.currentCrops}
                      onChange={(option) =>
                        formik.setFieldValue("currentCrops", option)
                      }
                      onBlur={() =>
                        formik.setFieldTouched("currentCrops", true)
                      }
                    />
                    <div
                      className="text-danger small col-12"
                      style={{
                        padding: "0px",
                        margin: "0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                      }}
                    >
                      <ErrorMessage name="currentCrops" />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12 col-md-4">
                    <label
                      className="crops-start-aligned-text col-12 body-regular primary-text my-0"
                      style={{ textAlign: "start" }}
                    >
                      Nutrient Deficiency
                    </label>
                  </div>

                  <div className="col-12 col-md-8">
                    <Select
                      name="nutrientDeficiency"
                      placeholder="Nutrient Deficiency"
                      options={nutrientDeficiensDropdown}
                      value={formik.values.nutrientDeficiency}
                      onChange={(option) =>
                        formik.setFieldValue("nutrientDeficiency", option)
                      }
                      onBlur={() =>
                        formik.setFieldTouched("nutrientDeficiency", true)
                      }
                    />
                    <div
                      className="text-danger small col-12"
                      style={{
                        padding: "0px",
                        margin: "0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                      }}
                    >
                      <ErrorMessage name="nutrientDeficiency" />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12 col-md-4">
                    <label className="crops-start-aligned-text col-12 body-regular primary-text my-0">
                      Irrigation Method
                    </label>
                  </div>

                  <div className="col-12 col-md-8">
                    <Select
                      name="irrigationMethod"
                      placeholder="Irrigation Method"
                      options={irrigationsDropdown}
                      value={formik.values.irrigationMethod}
                      onChange={(option) =>
                        formik.setFieldValue("irrigationMethod", option)
                      }
                      onBlur={() =>
                        formik.setFieldTouched("irrigationMethod", true)
                      }
                    />
                    <div
                      className="text-danger small col-12"
                      style={{
                        padding: "0px",
                        margin: "0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                      }}
                    >
                      <ErrorMessage name="irrigationMethod" />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12 col-md-4">
                    <label className="crops-start-aligned-text col-12 body-regular primary-text my-0">
                      Comments
                    </label>
                  </div>

                  <div className="col-12 col-md-8">
                    <textarea
                      {...formik.getFieldProps("comments")}
                      className="form-control col-12 body-regular"
                      name="comments"
                    />
                    <div
                      className="text-danger small col-12"
                      style={{
                        padding: "0px",
                        margin: "0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                      }}
                    >
                      <ErrorMessage name="comments" />
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-12 col-md-6 mt-1">
                    <div className="row m-0 p-0 justify-content-start">
                      <button
                        className="col-12 col-md-8 m-0 crops-other-button"
                        type="button"
                        onClick={handleCancelSoilTesting}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 mt-1">
                    <div className="row m-0 p-0 justify-content-end">
                      <button
                        type="submit"
                        className="col-12 col-md-8 m-0 crops-accept-button"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered={true}
        dialogClassName="mx-auto"
        className="col-12"
      >
        <Modal.Header closeButton>
          <Modal.Title className="body-bold primary-text my-0">
            Soil Test Results
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <label className="col-12 crops-start-aligned-text body-regular secondary-text">
                  pH level
                </label>
              </div>
              <div className="col-6">
                <label className="col-12 crops-end-aligned-text body-bold primary-text">
                  Acidic - pending
                </label>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <label className="col-6 body-regular secondary-text">
                  Nutrients levels
                </label>
              </div>
              <div className="col-6">
                <label className="col-12 crops-end-aligned-text body-bold primary-text">
                  Nitrogen low, Phosphorous Medium, Potassium High
                </label>
              </div>
            </div>
          </div>

          <div className="col-12">
            <p className="col-12 body-bold mt-0 primary-text">
              Recommendations
            </p>
            <div className="col-12">
              {[
                "Apply lime(agricultural lime or dolomite) to balance acidity. -Edit",
                "Apply composed manure or nitrogen based fertilisers.",
                "Loamy soil (ideal for most crops) suitable for corn, wheat, vegetables and fruits.",
              ].map((recommendation: string, i: number) => (
                <label className="col-12 crops-start-aligned-text body-regular primary-text">
                  {i + 1}. {recommendation}
                </label>
              ))}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="col-12">
            <div className="col-12 col-md-6 d-flex m-0 justify-content-start">
                <button
                className="col-12 col-md-8 m-0 crops-other-button"
                onClick={handleModalDownloadAction}
                >
                Download
                </button>
            </div>

            <div className="col-12 col-md-6 d-flex m-0 justify-content-end">
                <button
                className="col-12 col-md-8 m-0 mt-2 mt-md-0 crops-accept-button"
                onClick={handleModalContinueAction}
                >
                Continue
                </button>
            </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SoilTesting;
