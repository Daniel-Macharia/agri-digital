/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Form, FormikProvider, useFormik } from "formik";
import { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SpinnerNew from "../../../../../../common/components/SpinnerNew";
import { API_ROUTES } from "../../../../../../lib/Routes";
import { ApiClient } from "../../../../../../lib/api/ApiClient";
import {
  CropJourneyManagementStagePayload,
  CropJourneyPostHarvestStagePayload,
  PostHarvestTransportFormPayload,
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
  transportMethodList: ListItem[];
  vehicleTypeList: ListItem[];
  transportationStatusList: ListItem[];
  onDone: (data: CropJourneyPostHarvestStagePayload) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  estimatedCost: Yup.number().required().label("Estimated Cost"),
  pickupLocation: Yup.string().trim().required().label("Pickup Location"),
  destination: Yup.string().trim().required().label("Destination"),
  transportMethod: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .required()
    .label("Transport Method"),
  vehicleType: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .required()
    .label("Vehicle Type"),
  transportStatus: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .required()
    .label("Transport Status"),
});

const CropTransportForm: React.FC<Props> = ({
  transactionId,
  transportMethodList,
  vehicleTypeList,
  transportationStatusList,
  onDone,
  onCancel,
}) => {
  const formik = useFormik<PostHarvestTransportFormPayload>({
    initialValues: {
      transportMethod: null,
      vehicleType: null,
      pickupLocation: "",
      destination: "",
      estimatedCost: 0,
      transportStatus: null,
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
          url: API_ROUTES.CROP_JOURNEY.CROP_POST_HARVEST_TRANSPORT_DETAILS.replace(
            ":transactionId",
            transactionId
          ),
          data: payload,
        });
        onDone(dataResponse);
        resetForm();
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Transport failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const transportMethodDropdown: SystemWideSelectString[] = useMemo(() => {
    if (transportMethodList.length === 0) return [];
    return transportMethodList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [transportMethodList]);

  const vehicleTypeDropdown: SystemWideSelectString[] = useMemo(() => {
    if (vehicleTypeList.length === 0) return [];
    return vehicleTypeList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [vehicleTypeList]);

  const transportationStatusDropdown: SystemWideSelectString[] = useMemo(() => {
    if (transportationStatusList.length === 0) return [];
    return transportationStatusList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [transportationStatusList]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Row>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Pickup Location</label>
              <input
                {...formik.getFieldProps("pickupLocation")}
                className="form-control bg-transparent"
                name="pickupLocation"
                autoComplete="off"
                type="text"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="pickupLocation" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Destination</label>
              <input
                {...formik.getFieldProps("destination")}
                className="form-control bg-transparent"
                name="destination"
                autoComplete="off"
                type="text"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="destination" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-5">
              <label>Estimated Cost</label>
              <input
                {...formik.getFieldProps("estimatedCost")}
                className="form-control bg-transparent"
                name="estimatedCost"
                autoComplete="off"
                type="number"
                step="1"
                pattern="\d*"
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="estimatedCost" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="mb-1">Transport Method</label>
              <Select
                name="transportMethod"
                options={transportMethodDropdown}
                value={formik.values.transportMethod}
                onChange={(selected) =>
                  formik.setFieldValue("transportMethod", selected)
                }
                onBlur={() => formik.setFieldTouched("transportMethod", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="transportMethod" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="mb-1">Vehicle Type</label>
              <Select
                name="vehicleType"
                options={vehicleTypeDropdown}
                value={formik.values.vehicleType}
                onChange={(selected) =>
                  formik.setFieldValue("vehicleType", selected)
                }
                onBlur={() => formik.setFieldTouched("vehicleType", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="vehicleType" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="mb-1">Transport Status</label>
              <Select
                name="transportStatus"
                options={transportationStatusDropdown}
                value={formik.values.transportStatus}
                onChange={(selected) =>
                  formik.setFieldValue("transportStatus", selected)
                }
                onBlur={() => formik.setFieldTouched("transportStatus", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger">
                <ErrorMessage name="transportStatus" />
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
export default CropTransportForm;
