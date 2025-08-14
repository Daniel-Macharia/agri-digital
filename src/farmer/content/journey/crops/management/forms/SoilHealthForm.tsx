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
  SoilHealthFormPayload,
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
  npkLevelListItems: ListItem[];
  onDone: (data: CropJourneyManagementStagePayload) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  date: Yup.date().required().label("Date"),
  ph: Yup.number().required().label("PH"),
  moisture: Yup.number().required().label("Moisture"),
  nitrogen: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Nitrogen"),
  phosphorus: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Phosphorus"),
  potassium: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Potassium"),
});

const SoilHealthForm: React.FC<Props> = ({
  transactionId,
  npkLevelListItems,
  onDone,
  onCancel,
}) => {
  const formik = useFormik<SoilHealthFormPayload>({
    initialValues: {
      date: null,
      ph: 0,
      moisture: 0,
      nitrogen: null,
      phosphorus: null,
      potassium: null,
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
          url: API_ROUTES.CROP_JOURNEY.MANAGEMENT_SOIL_HEALTH.replace(
            ":transactionId",
            transactionId
          ),
          data: payload,
        });
        onDone(dataResponse);
        resetForm();
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Soil health addition failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const npkLevelList: SystemWideSelectString[] = useMemo(() => {
    if (npkLevelListItems.length === 0) return [];
    return npkLevelListItems.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [npkLevelListItems]);

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
              <ErrorMessage name="ph" />
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                PH
              </label>
              <input
                {...formik.getFieldProps("ph")}
                className="form-control bg-transparent body-regular m-0"
                name="ph"
                autoComplete="off"
                type="text"
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="ph" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Moisture
              </label>
              <input
                {...formik.getFieldProps("moisture")}
                className="form-control bg-transparent body-regular m-0"
                name="moisture"
                autoComplete="off"
                type="text"
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="moisture" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Nitrogen
              </label>
              <Select
                name="nitrogen"
                className="body-regular m-0"
                options={npkLevelList}
                value={formik.values.nitrogen}
                onChange={(selected) =>
                  formik.setFieldValue("nitrogen", selected)
                }
                onBlur={() => formik.setFieldTouched("nitrogen", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="nitrogen" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Phosphorus
              </label>
              <Select
                name="phosphorus"
                className="body-regular m-0"
                options={npkLevelList}
                value={formik.values.phosphorus}
                onChange={(selected) =>
                  formik.setFieldValue("phosphorus", selected)
                }
                onBlur={() => formik.setFieldTouched("phosphorus", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="phosphorus" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Potassium
              </label>
              <Select
                name="potassium"
                className="body-regular m-0"
                options={npkLevelList}
                value={formik.values.potassium}
                onChange={(selected) =>
                  formik.setFieldValue("potassium", selected)
                }
                onBlur={() => formik.setFieldTouched("potassium", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="potassium" />
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
export default SoilHealthForm;
