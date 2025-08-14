/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Form, FormikProvider, useFormik } from "formik";
import { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SpinnerNew from "../../../../../../common/components/SpinnerNew";
import { API_ROUTES } from "../../../../../../lib/Routes";
import { ApiClient } from "../../../../../../lib/api/ApiClient";
import {
  CropJourneyManagementStagePayload,
  GrowthAnalysisFormPayload,
} from "../../../../../../lib/model/CropJourneyModel";
import {
  ListItem,
  SystemWideSelectString,
  TOASTIFY_AUTO_CLOSE_TIMEOUT,
} from "../../../../../../lib/model/Model";
import {
  customSelectStyles,
  extractErrorMessage,
  parseFormDatav3,
} from "../../../../../../lib/utils/Helpers";
const apiClient = new ApiClient();

interface Props {
  transactionId: string;
  measurementUnitList: ListItem[];
  growthStageList: ListItem[];
  onDone: (data: CropJourneyManagementStagePayload) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  date: Yup.date().required().label("Date"),
  height: Yup.number()
    .required()
    .typeError("Must be a number")
    .integer("Must be a whole number")
    .label("Height"),
  expectedYield: Yup.number().required().label("Expected Yield"),
  currentUnitPrice: Yup.number().required().label("Current Unit Price"),
  growthStage: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Growth Stage"),
  heightMeasurementUnit: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Height Measurement Unit"),
  expectedYieldUnit: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Expected Yield Unit"),
});

const GrowthAnalysisForm: React.FC<Props> = ({
  transactionId,
  measurementUnitList,
  growthStageList,
  onDone,
  onCancel,
}) => {
  const formik = useFormik<GrowthAnalysisFormPayload>({
    initialValues: {
      date: null,
      growthStage: null,
      height: 0,
      heightMeasurementUnit: null,
      expectedYield: 0,
      expectedYieldUnit: null,
      currentUnitPrice: 0,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = parseFormDatav3(values);
        setSubmitting(true);
        const dataResponse = await apiClient.patch<
          CropJourneyManagementStagePayload,
          any
        >({
          url: API_ROUTES.CROP_JOURNEY.MANAGEMENT_GROWTH_ANALYSIS.replace(
            ":transactionId",
            transactionId
          ),
          data: payload,
        });
        onDone(dataResponse);
        resetForm();
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Growth analysis failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const measurementUnitDropdown: SystemWideSelectString[] = useMemo(() => {
    if (measurementUnitList.length === 0) return [];
    return measurementUnitList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [measurementUnitList]);

  const growthStageDropdown: SystemWideSelectString[] = useMemo(() => {
    if (growthStageList.length === 0) return [];
    return growthStageList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [growthStageList]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Row>
          <Col md={12}>
            <label className="m-0 p-0 body-regular primary-text">
              Date
            </label>
            <br />
            <DatePicker
              className="form-control body-regular m-0"
              name="date"
              placeholderText="Date"
              selected={formik.getFieldProps("date").value}
              onChange={(date) => formik.setFieldValue("date", date)}
              dateFormat={"MM/dd/yyyy"}
              wrapperClassName="w-100"
              showDateSelect
              autoComplete="off"
            />
            <br/>
            <div className="fv-plugins-message-container text-danger small m-0">
              <ErrorMessage name="growthStage" />
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Growth Stage
              </label>
              <Select
                name="growthStage"
                className="body-regular m-0"
                options={growthStageDropdown}
                value={formik.values.growthStage}
                onChange={(selected) =>
                  formik.setFieldValue("growthStage", selected)
                }
                onBlur={() => formik.setFieldTouched("growthStage", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="growthStage" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Height
              </label>
              <input
                {...formik.getFieldProps("height")}
                className="form-control bg-transparent body-regular m-0"
                name="height"
                autoComplete="off"
                type="number"
                step="1"
                pattern="\d*"
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="height" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Height Measurement Unit
              </label>
              <Select
                name="heightMeasurementUnit"
                className="body-regular m-0"
                options={measurementUnitDropdown}
                value={formik.values.heightMeasurementUnit}
                onChange={(selected) =>
                  formik.setFieldValue("heightMeasurementUnit", selected)
                }
                onBlur={() =>
                  formik.setFieldTouched("heightMeasurementUnit", true)
                }
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="heightMeasurementUnit" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Expected Yield
              </label>
              <input
                {...formik.getFieldProps("expectedYield")}
                className="form-control bg-transparent body-regular m-0"
                name="expectedYield"
                autoComplete="off"
                type="text"
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="expectedYield" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Expected Yield Unit
              </label>
              <Select
                name="expectedYieldUnit"
                className="body-regular m-0"
                options={measurementUnitDropdown}
                value={formik.values.expectedYieldUnit}
                onChange={(selected) =>
                  formik.setFieldValue("expectedYieldUnit", selected)
                }
                onBlur={() => formik.setFieldTouched("expectedYieldUnit", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="expectedYieldUnit" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Current Unit Price
              </label>
              <input
                {...formik.getFieldProps("currentUnitPrice")}
                className="form-control bg-transparent body-regular m-0"
                name="currentUnitPrice"
                autoComplete="off"
                type="text"
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="currentUnitPrice" />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-start mt-5">
            {!formik.isSubmitting && (
              <button
                className="btn btn-sm btn-light-custom me-3 mt-5 crops-other-button"
                type="button"
                onClick={() => onCancel()}
              >
                Cancel
              </button>
            )}
            <button
              className="btn btn-sm btn-warning-custom ps-pe-42 mt-5 crops-accept-button"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {!formik.isSubmitting && (
                <span className="indicator-label">Save</span>
              )}
              {formik.isSubmitting && <SpinnerNew />}
            </button>
          </div>
        </Row>
      </Form>
    </FormikProvider>
  );
};
export default GrowthAnalysisForm;
