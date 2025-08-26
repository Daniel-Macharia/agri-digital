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
  CropJourneyPostHarvestStagePayload,
  PostHarvestCropStorageFormPayload,
} from "../../../../../../lib/model/CropJourneyModel";
import {
  ChronoUnit,
  ListItem,
  SystemWideSelectString,
  TOASTIFY_AUTO_CLOSE_TIMEOUT,
} from "../../../../../../lib/model/Model";
import {
  capitalize,
  customSelectStyles,
  extractErrorMessage,
  parseFormDatav3,
} from "../../../../../../lib/utils/Helpers";
const apiClient = new ApiClient();

interface Props {
  transactionId: string;
  measurementUnitList: ListItem[];
  storageTypeList: ListItem[];
  pricingCycleList: ListItem[];
  onDone: (data: CropJourneyPostHarvestStagePayload) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  date: Yup.date().required().label("Date"),
  humidity: Yup.number().required().label("Humidity"),
  temperature: Yup.number().required().label("Temperature"),
  storageDurationAmount: Yup.number().required().label("Storage Duration"),
  storageFee: Yup.number().required().label("Storage Fee"),
  inventoryLevel: Yup.number()
    .required()
    .typeError("Must be a number")
    .integer("Must be a whole number")
    .label("Inventory Level"),
  storageType: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Storage Type"),
  temperatureUnit: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Temperature Unit"),
  inventoryLevelUnit: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Inventory Level Unit"),
  storageDuration: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Storage Duration"),
  storageFeeCycle: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Storage Fee Cycle"),
});

const CropStorageForm: React.FC<Props> = ({
  transactionId,
  measurementUnitList,
  storageTypeList,
  pricingCycleList,
  onDone,
  onCancel,
}) => {
  const formik = useFormik<PostHarvestCropStorageFormPayload>({
    initialValues: {
      date: null,
      storageType: null,
      humidity: 0,
      temperature: 0,
      temperatureUnit: null,
      inventoryLevel: 0,
      inventoryLevelUnit: null,
      storageDurationAmount: 0,
      storageDuration: null,
      storageFee: 0,
      storageFeeCycle: null,
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
          url: API_ROUTES.CROP_JOURNEY.CROP_POST_HARVEST_STORAGE_DETAILS.replace(
            ":transactionId",
            transactionId
          ),
          data: payload,
        });
        onDone(dataResponse);
        resetForm();
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Crop storage failed", {
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

  const storageTypeDropdown: SystemWideSelectString[] = useMemo(() => {
    if (storageTypeList.length === 0) return [];
    return storageTypeList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [storageTypeList]);

  const pricingCycleDropdown: SystemWideSelectString[] = useMemo(() => {
    if (pricingCycleList.length === 0) return [];
    return pricingCycleList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [pricingCycleList]);

  const storageDurationDropdown = useMemo(
    () =>
      Object.keys(ChronoUnit).map((item) => ({
        value: item,
        label: capitalize(item.toLowerCase()),
      })),
    []
  );

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
            <div className="form-group mt-3">
              <label className="mb-1">Storage Type</label>
              <Select
                name="storageType"
                options={storageTypeDropdown}
                value={formik.values.storageType}
                onChange={(selected) =>
                  formik.setFieldValue("storageType", selected)
                }
                onBlur={() => formik.setFieldTouched("storageType", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="storageType" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Humidity</label>
              <input
                {...formik.getFieldProps("humidity")}
                className="form-control bg-transparent"
                name="humidity"
                autoComplete="off"
                type="number"
                step="1"
                pattern="\d*"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="humidity" />
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
                type="number"
                step="1"
                pattern="\d*"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="temperature" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Temperature Unit</label>
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
              <label>Inventory Level</label>
              <input
                {...formik.getFieldProps("inventoryLevel")}
                className="form-control bg-transparent"
                name="inventoryLevel"
                autoComplete="off"
                type="number"
                step="1"
                pattern="\d*"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="inventoryLevel" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Inventory Level Unit</label>
              <Select
                name="inventoryLevelUnit"
                options={measurementUnitDropdown}
                value={formik.values.inventoryLevelUnit}
                onChange={(selected) =>
                  formik.setFieldValue("inventoryLevelUnit", selected)
                }
                onBlur={() =>
                  formik.setFieldTouched("inventoryLevelUnit", true)
                }
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="inventoryLevelUnit" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Storage Duration Amount</label>
              <input
                {...formik.getFieldProps("storageDurationAmount")}
                className="form-control bg-transparent"
                name="storageDurationAmount"
                autoComplete="off"
                type="number"
                step="1"
                pattern="\d*"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="storageDurationAmount" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Inventory Level Unit</label>
              <Select
                name="storageDuration"
                options={storageDurationDropdown}
                value={formik.values.storageDuration}
                onChange={(selected) =>
                  formik.setFieldValue("storageDuration", selected)
                }
                onBlur={() => formik.setFieldTouched("storageDuration", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="storageDuration" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Storage Fee</label>
              <input
                {...formik.getFieldProps("storageFee")}
                className="form-control bg-transparent"
                name="storageFee"
                autoComplete="off"
                type="number"
                step="1"
                pattern="\d*"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="storageFee" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Storage Fee Cycle</label>
              <Select
                name="storageFeeCycle"
                options={pricingCycleDropdown}
                value={formik.values.storageFeeCycle}
                onChange={(selected) =>
                  formik.setFieldValue("storageFeeCycle", selected)
                }
                onBlur={() => formik.setFieldTouched("storageFeeCycle", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="storageFeeCycle" />
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
export default CropStorageForm;
