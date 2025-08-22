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
  PostHarvestPackagingFormPayload,
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
  packagingMethodList: ListItem[];
  onDone: (data: CropJourneyPostHarvestStagePayload) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  packagingCost: Yup.number().required().label("Packaging Cost"),
  packagingMethod: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Packaging Method"),
});

const PackagingForm: React.FC<Props> = ({
  transactionId,
  packagingMethodList,
  onDone,
  onCancel,
}) => {
  const formik = useFormik<PostHarvestPackagingFormPayload>({
    initialValues: {
      packagingCost: 0,
      packagingMethod: null,
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
          url: API_ROUTES.CROP_JOURNEY.CROP_POST_HARVEST_PACKAGING_DETAILS.replace(
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

  const packagingDropdown: SystemWideSelectString[] = useMemo(() => {
    if (packagingMethodList.length === 0) return [];
    return packagingMethodList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [packagingMethodList]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Row>
          <Col md={12}>
            <div className="form-group ">
              <label className="m-0 p-0 body-regular primary-text">
                Packaging Cost
              </label>
              <input
                {...formik.getFieldProps("packagingCost")}
                className="form-control body-regular m-0 bg-transparent"
                name="packagingCost"
                autoComplete="off"
                type="number"
                step="1"
                pattern="\d*"
              />
              <div className="fv-plugins-message-container text-danger small m-0 ">
                <ErrorMessage name="packagingCost" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 body-regular primary-text">
                Packaging Method
              </label>
              <Select
                name="packagingMethod"
                className="m-0 body-regular"
                options={packagingDropdown}
                value={formik.values.packagingMethod}
                onChange={(selected) =>
                  formik.setFieldValue("packagingMethod", selected)
                }
                onBlur={() => formik.setFieldTouched("packagingMethod", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="packagingMethod" />
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
export default PackagingForm;
