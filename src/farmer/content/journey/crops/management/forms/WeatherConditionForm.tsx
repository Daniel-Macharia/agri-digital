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
  WeatherConditionFormPayload,
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
  onDone: (data: CropJourneyManagementStagePayload) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  date: Yup.date().required().label("Date"),
  rainfallAmount: Yup.number().required().label("Rainfall Amount"),
  rainfallAmountUnit: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Rainfall Amount Unit"),
  humidity: Yup.number().required().label("Humidify"),
  temperature: Yup.number().required().label("Temperature"),
  temperatureUnit: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Temperature Unit"),
  windSpeed: Yup.number().required().label("Wind Speed"),
  windSpeedUnit: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Wind Speed Unit"),
});

const WeatherConditionForm: React.FC<Props> = ({
  transactionId,
  measurementUnitList,
  onDone,
  onCancel,
}) => {
  const formik = useFormik<WeatherConditionFormPayload>({
    initialValues: {
      date: null,
      rainfallAmount: 0,
      rainfallAmountUnit: null,
      humidity: 0,
      temperature: 0,
      temperatureUnit: null,
      windSpeed: 0,
      windSpeedUnit: null,
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
          url: API_ROUTES.CROP_JOURNEY.MANAGEMENT_WEATHER_CONDITION.replace(
            ":transactionId",
            transactionId
          ),
          data: payload,
        });
        onDone(dataResponse);
        resetForm();
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Weather condition addition failed", {
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

  return (
    <FormikProvider value={formik}>
      <Form>
        <Row>
          <Col md={12}>
            <label>Date</label>
            <br />
            <DatePicker
              className="form-control body-regular mb-0"
              name="date"
              placeholderText="Date"
              selected={formik.getFieldProps("date").value}
              onChange={(date) => formik.setFieldValue("date", date)}
              dateFormat={"MM/dd/yyyy"}
              wrapperClassName="w-100"
              showDateSelect
              autoComplete="off"
            />
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Humidity</label>
              <input
                {...formik.getFieldProps("humidity")}
                className="form-control bg-transparent"
                name="humidity"
                autoComplete="off"
                type="text"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="humidity" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Rainfall Amount</label>
              <input
                {...formik.getFieldProps("rainfallAmount")}
                className="form-control bg-transparent"
                name="rainfallAmount"
                autoComplete="off"
                type="text"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="rainfallAmount" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="mb-1">Rainfall Amount Unit</label>
              <Select
                name="rainfallAmountUnit"
                options={measurementUnitDropdown}
                value={formik.values.rainfallAmountUnit}
                onChange={(selected) =>
                  formik.setFieldValue("rainfallAmountUnit", selected)
                }
                onBlur={() =>
                  formik.setFieldTouched("rainfallAmountUnit", true)
                }
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="rainfallAmountUnit" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Temperature</label>
              <input
                {...formik.getFieldProps("temperature")}
                className="form-control bg-transparent"
                name="temperature"
                autoComplete="off"
                type="text"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="temperature" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="mb-1">Temperature Unit</label>
              <Select
                name="temperatureUnit"
                options={measurementUnitDropdown}
                value={formik.values.temperatureUnit}
                onChange={(selected) =>
                  formik.setFieldValue("temperatureUnit", selected)
                }
                onBlur={() => formik.setFieldTouched("temperatureUnit", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="temperatureUnit" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>WindSpeed</label>
              <input
                {...formik.getFieldProps("windSpeed")}
                className="form-control bg-transparent"
                name="windSpeed"
                autoComplete="off"
                type="text"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="windSpeed" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="mb-1">Wind Speed Unit</label>
              <Select
                name="windSpeedUnit"
                options={measurementUnitDropdown}
                value={formik.values.windSpeedUnit}
                onChange={(selected) =>
                  formik.setFieldValue("windSpeedUnit", selected)
                }
                onBlur={() => formik.setFieldTouched("windSpeedUnit", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="windSpeedUnit" />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-start mt-5">
            {!formik.isSubmitting && (
              <button
                className="btn btn-sm btn-light-custom me-3 mt-5  mt-5"
                type="button"
                onClick={() => onCancel()}
              >
                Cancel
              </button>
            )}
            <button
              className="btn btn-sm btn-warning-custom ps-pe-42 mt-5"
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
export default WeatherConditionForm;
