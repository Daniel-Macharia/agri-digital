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
  PostHarvestCropValueAdditionFormPayload,
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
  processingMethodList: ListItem[];
  onDone: (data: CropJourneyPostHarvestStagePayload) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  processingCost: Yup.number().required().label("Processing Cost"),
  marketPrice: Yup.number().required().label("Market Price"),
  finalProduct: Yup.string().required().label("Final Product"),
  profitabilityAnalysis: Yup.string()
    .required()
    .label("Profitability Analysis"),
  processingMethod: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .required()
    .label("Processing Method"),
});

const CropValueAdditionForm: React.FC<Props> = ({
  transactionId,
  processingMethodList,
  onDone,
  onCancel,
}) => {
  const formik = useFormik<PostHarvestCropValueAdditionFormPayload>({
    initialValues: {
      processingMethod: null,
      processingCost: 0,
      marketPrice: 0,
      finalProduct: "",
      profitabilityAnalysis: "",
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
          url: API_ROUTES.CROP_JOURNEY.CROP_POST_HARVEST_VALUE_ADDITION_DETAILS.replace(
            ":transactionId",
            transactionId
          ),
          data: payload,
        });
        onDone(dataResponse);
        resetForm();
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Sorting and Grading failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const processingMethodDropdown: SystemWideSelectString[] = useMemo(() => {
    if (processingMethodList.length === 0) return [];
    return processingMethodList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [processingMethodList]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Row>
          <Col md={12}>
            <div className="form-group ">
              <label className="m-0 p-0 body-regular primary-text">
                Processing Method
              </label>
              <Select
                name="processingMethod"
                className="body-regular m-0"
                options={processingMethodDropdown}
                value={formik.values.processingMethod}
                onChange={(selected) =>
                  formik.setFieldValue("processingMethod", selected)
                }
                onBlur={() => formik.setFieldTouched("processingMethod", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="processingMethod" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Processing Cost
              </label>
              <input
                {...formik.getFieldProps("processingCost")}
                className="form-control bg-transparent body-regular m-0"
                name="processingCost"
                autoComplete="off"
                type="number"
                step="1"
                pattern="\d*"
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="processingCost" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Market Price
              </label>
              <input
                {...formik.getFieldProps("marketPrice")}
                className="form-control bg-transparent body-regular m-0"
                name="marketPrice"
                autoComplete="off"
                type="number"
                step="1"
                pattern="\d*"
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="marketPrice" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Final Product
              </label>
              <textarea
                className="form-control body-regular col-12 m-0"
                {...formik.getFieldProps("finalProduct")}
                name="finalProduct"
                style={{ height: "88px" }}
                autoComplete="off"
              />
              <div
                className="col-12 text-danger small m-0 text-start"
              >
                <ErrorMessage name="finalProduct" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label>Profitability Analysis</label>
              <textarea
                className="form-control body-regular m-0"
                {...formik.getFieldProps("profitabilityAnalysis")}
                name="profitabilityAnalysis"
                style={{ height: "88px" }}
                autoComplete="off"
              />
              <div
                className="col-12 text-danger small m-0 text-start"
              >
                <ErrorMessage name="profitabilityAnalysis" />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-start mt-3">
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
export default CropValueAdditionForm;
