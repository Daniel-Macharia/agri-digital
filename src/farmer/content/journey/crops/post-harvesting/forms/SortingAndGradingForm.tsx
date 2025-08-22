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
  PostHarvestSortingAndGradingFormPayload,
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
  cropGradeQualityList: ListItem[];
  onDone: (data: CropJourneyPostHarvestStagePayload) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  harvestDate: Yup.date().required().label("Harvest Date"),
  quantity: Yup.number().required().label("Quantity"),
  notes: Yup.string().required().label("Notes"),
  quantityUnit: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Quantity Unit"),
  grade: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Grade"),
});

const SortingAndGradingForm: React.FC<Props> = ({
  transactionId,
  measurementUnitList,
  cropGradeQualityList,
  onDone,
  onCancel,
}) => {
  const formik = useFormik<PostHarvestSortingAndGradingFormPayload>({
    initialValues: {
      harvestDate: null,
      grade: null,
      quantity: 0,
      quantityUnit: null,
      notes: "",
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
          url: API_ROUTES.CROP_JOURNEY.CROP_POST_HARVEST_SORT_GRADE_DETAILS.replace(
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

  const measurementUnitDropdown: SystemWideSelectString[] = useMemo(() => {
    if (measurementUnitList.length === 0) return [];
    return measurementUnitList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [measurementUnitList]);

  const cropGradeQualityDropdown: SystemWideSelectString[] = useMemo(() => {
    if (cropGradeQualityList.length === 0) return [];
    return cropGradeQualityList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [cropGradeQualityList]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Row>
          <Col md={12}>
            <label className="m-0 p-0 body-regular primary-text">
              HarvestDate
            </label>
            <br />
            <DatePicker
              className="form-control body-regular m-0"
              name="harvestDate"
              placeholderText="Date"
              selected={formik.getFieldProps("harvestDate").value}
              onChange={(date) => formik.setFieldValue("harvestDate", date)}
              dateFormat={"MM/dd/yyyy"}
              wrapperClassName="w-100"
              showDateSelect
              autoComplete="off"
            />
            <br />
            <div className="fv-plugins-message-container text-danger small m-0">
              <ErrorMessage name="harvestDate" />
            </div>
          </Col>
          <Col md={12} >
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Grade
              </label>
              <Select
              className="body-regular m-0"
                name="grade"
                options={cropGradeQualityDropdown}
                value={formik.values.grade}
                onChange={(selected) => formik.setFieldValue("grade", selected)}
                onBlur={() => formik.setFieldTouched("grade", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="grade" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Quantity
              </label>
              <input
                {...formik.getFieldProps("quantity")}
                className="form-control body-regular m-0 bg-transparent"
                name="quantity"
                autoComplete="off"
                type="number"
                step="1"
                pattern="\d*"
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="quantity" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <label className="m-0 p-0 body-regular primary-text">
                Quantity Unit
              </label>
              <Select
                name="quantityUnit"
                className="m-0 body-regular"
                options={measurementUnitDropdown}
                value={formik.values.quantityUnit}
                onChange={(selected) =>
                  formik.setFieldValue("quantityUnit", selected)
                }
                onBlur={() => formik.setFieldTouched("quantityUnit", true)}
                styles={customSelectStyles}
              />
              <div className="fv-plugins-message-container text-danger small m-0">
                <ErrorMessage name="quantityUnit" />
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group mt-3">
              <textarea
                className="form-control body-regular col-12 m-0"
                {...formik.getFieldProps("notes")}
                name="notes"
                style={{ height: "88px" }}
                placeholder="activity notes"
                autoComplete="off"
              />
              <div
                className="col-12 text-danger small m-0"
                style={{ textAlign: "start" }}
              >
                <ErrorMessage name="notes" />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-start mt-5">
            {!formik.isSubmitting && (
              <button
                className="btn btn-sm btn-light-custom crops-other-button me-3 mt-5  mt-5"
                type="button"
                onClick={() => onCancel()}
              >
                Cancel
              </button>
            )}
            <button
              className="btn btn-sm btn-warning-custom crops-accept-button ps-pe-42 mt-5"
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
export default SortingAndGradingForm;
