/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import moment from "moment-timezone";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import TimePicker from "react-time-picker";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import {
  CropJourneyHarvestStagePayload,
  HarvestYieldFormPayload,
  HarvestYieldPayload,
  HarvestYieldType,
} from "../../../../../lib/model/CropJourneyModel";
import {
  DATE_FORMAT_LOCAL_DATE_TIME,
  FILE_CONTENT_TYPE,
  ListItem,
  SystemWideSelectString,
  TOASTIFY_AUTO_CLOSE_TIMEOUT,
} from "../../../../../lib/model/Model";
import { API_ROUTES } from "../../../../../lib/Routes";
import {
  customSelectStyles,
  dateStringToDate,
  extractErrorMessage,
  parseFormDatav3,
} from "../../../../../lib/utils/Helpers";
import { CROP_ROUTES } from "../crop-routes";
const apiClient = new ApiClient();

interface Props {
  transactionId: string;
  measurementUnitList: ListItem[];
  cropGradeList: ListItem[];
  onDone: (data: CropJourneyHarvestStagePayload) => void;
  harvestYieldType: HarvestYieldType;
  harvestYield?: HarvestYieldPayload | null;
}

const validationSchema = Yup.object().shape({
  harvestDate: Yup.date().required().label("Harvest Date"),
  notes: Yup.string().required().label("Notes"),
  quantity: Yup.number()
    .required()
    .typeError("Must be a number")
    .integer("Must be a whole number")
    .label("Quantity"),
  quantityUnit: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Quantity Unit"),
  gradeQuality: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Grade Quality"),
});
const YieldForm: React.FC<Props> = ({
  transactionId,
  measurementUnitList,
  cropGradeList,
  harvestYieldType,
  onDone,
  harvestYield,
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>();
  const { cropJourneySummary } = useCropJourney();

  const measurementUnitDropdown: SystemWideSelectString[] = useMemo(() => {
    if (measurementUnitList.length === 0) return [];
    return measurementUnitList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [measurementUnitList]);

  const cropGradeDropdown: SystemWideSelectString[] = useMemo(() => {
    if (cropGradeList.length === 0) return [];
    return cropGradeList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [cropGradeList]);

  const formik = useFormik<HarvestYieldFormPayload>({
    initialValues: {
      harvestDate: null,
      quantity: 0,
      quantityUnit: null,
      gradeQuality: null,
      notes: "",
      file: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let payload = parseFormDatav3(values) as HarvestYieldFormPayload;

        if (values.harvestDate && selectedTime) {
          const harvestDateMoment = moment(values.harvestDate);
          const timeMoment = moment(selectedTime);
          harvestDateMoment.set({
            hour: timeMoment.get("hour"),
            minute: timeMoment.get("minute"),
            second: 0,
            millisecond: 0,
          });
          payload = {
            ...payload,
            harvestDate: harvestDateMoment.format(DATE_FORMAT_LOCAL_DATE_TIME),
          };
        } else if (values.harvestDate) {
          payload = {
            ...payload,
            harvestDate: moment(values.harvestDate).format(
              DATE_FORMAT_LOCAL_DATE_TIME
            ),
          };
        }

        setSubmitting(true);
        const dataResponse = await apiClient.patch<
          CropJourneyHarvestStagePayload,
          any
        >({
          url: API_ROUTES.CROP_JOURNEY.HARVEST_YIELD.replace(
            ":transactionId",
            transactionId
          ).replace(":harvestYieldType", harvestYieldType),
          data: payload,
          config: {
            headers: { "Content-Type": FILE_CONTENT_TYPE },
          },
        });
        onDone(dataResponse);
        resetForm();
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Yield modification failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleUploadFileAction = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleContinue = useCallback(() => {
    console.log("continuing");
    navigate(`${CROP_ROUTES.FULL.CROP_POST_HARVESTING_FULL}/${transactionId}`);
  }, [transactionId]);

  useEffect(() => {
    if (!harvestYield) return;

    formik.setValues({
      harvestDate: dateStringToDate(harvestYield.harvestDate),
      quantity: harvestYield.quantity,
      quantityUnit: {
        value: harvestYield.quantityUnit.id,
        label: harvestYield.quantityUnit.name,
      },
      gradeQuality: {
        value: harvestYield.gradeQuality.id,
        label: harvestYield.gradeQuality.name,
      },
      notes: harvestYield.notes,
      file: null,
    });
  }, [harvestYield]);

  return (
    <FormikProvider value={formik}>
      <Form className="col-12">
        <div className="row">
          <div className="col-12 col-md-2">
            <label className="crops-start-aligned-text col-12 m-0 body-regular primary-text">
              Environment
            </label>
          </div>

          <div className="col-12 col-md-10">
            <Field
              className="form-control body-regular mb-0"
              type="text"
              disabled={true}
              value={
                cropJourneySummary && cropJourneySummary.farmEnvironmentType
                  ? cropJourneySummary.farmEnvironmentType
                  : ""
              }
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-12 col-md-2">
            <label
              htmlFor="quantity"
              className="crops-start-aligned-text col-12 m-0 body-regular primary-text"
            >
              Quantity
            </label>
          </div>

          <div className="col-12 col-md-10">
            <Row>
              <Col md={6}>
                <Field
                  className="form-control body-regular m-0"
                  name="quantity"
                  type="text"
                  placeholder="80Kg"
                />
                <div className="text-danger small crops-start-aligned-text col-12 m-0">
                  <ErrorMessage name="quantity" />
                </div>
              </Col>
              <Col md={6}>
                <Select
                  name="quantityUnit"
                  className="body-regular m-0"
                  options={measurementUnitDropdown}
                  value={formik.values.quantityUnit}
                  onChange={(selected) =>
                    formik.setFieldValue("quantityUnit", selected)
                  }
                  onBlur={() => formik.setFieldTouched("quantityUnit", true)}
                  styles={customSelectStyles}
                />
                <div className="fv-plugins-message-container text-danger m-0">
                  <ErrorMessage name="quantityUnit" />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-12 col-md-2">
            <label
              htmlFor="gradeQuality"
              className="text-start m-0 body-regular primary-text"
            >
              Quality Grade
            </label>
          </div>

          <div className="col-12 col-md-10">
            <Select
              name="gradeQuality"
              className="body-regular m-0"
              options={cropGradeDropdown}
              value={formik.values.gradeQuality}
              onChange={(selected) =>
                formik.setFieldValue("gradeQuality", selected)
              }
              onBlur={() => formik.setFieldTouched("gradeQuality", true)}
              styles={customSelectStyles}
            />
            <div className="text-danger small crops-start-aligned-text col-12 m-0">
              <ErrorMessage name="gradeQuality" />
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-6">
            <div className="row">
              <div className="col-12 col-md-4">
                <label
                  htmlFor="harvestDate"
                  className="text-start col-12 m-0 body-regular primary-text"
                >
                  Harvesting Date
                </label>
              </div>

              <div className="col-12 col-md-6">
                <DatePicker
                  className="form-control body-regular mb-0"
                  name="harvestDate"
                  dateFormat="MM/dd/yyyy"
                  minDate={new Date()}
                  selected={formik.getFieldProps("harvestDate").value}
                  onChange={(date) => formik.setFieldValue("harvestDate", date)}
                  placeholderText="select harvesting date"
                  wrapperClassName="w-100"
                  autoComplete="off"
                />

                <div className="col-sm-12 text-danger small text-start m-0">
                  <ErrorMessage name="harvestDate" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="row">
              <div className="col-12 col-md-4">
                <label
                  htmlFor="harvestingTime"
                  className="text-start col-12 body-regular primary-text m-0"
                >
                  Harvesting Time
                </label>
              </div>

              <div className="col-12 col-md-6">
                <TimePicker
                  className="form-control body-regular mb-0"
                  name="activityTime"
                  value={selectedTime}
                  onChange={(time) => {
                    setSelectedTime(time);
                  }}
                  disableClock={true}
                  clearIcon={null}
                />
              </div>
            </div>
          </div>
        </div>

        {harvestYieldType === HarvestYieldType.ACTUAL && (
          <div className="row mt-2">
            <div className="col-12 col-md-2">
              <label
                htmlFor="uploadCrop"
                className="text-start col-12 m-0  body-regular primary-text"
              >
                Upload Crop
              </label>
            </div>

            <div className="col-12 col-md-10">
              <div
                className="col-12 "
                onClick={handleUploadFileAction}
                style={{
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  borderColor: "#777",
                }}
              >
                <input
                  ref={fileInputRef}
                  name="uploadCrop"
                  type="file"
                  accept="images/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      formik.setFieldValue("file", file);
                    }
                  }}
                  style={{ display: "none" }}
                />

                <img src="/assets/images/upload_photo.svg" className="col-4" />
                {formik.values.file && (
                  <Fragment>
                    <br />
                    <img
                      className="img-fluid img-thumbnail mb-5"
                      src={URL.createObjectURL(formik.values.file)}
                      alt="Thumbnail preview"
                      width={128}
                      height={128}
                    />
                  </Fragment>
                )}
                <p>
                  Upload Photo of the Product
                  <br />
                  PDF,PNG,JPG up to 10 MB{" "}
                </p>
                <div
                  className="text-danger small harvesting-input-label col-sm-12"
                  style={{ margin: "0px", textAlign: "center" }}
                >
                  <ErrorMessage name="previewUrl" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row mt-2">
          <div className="col-12 col-md-2">
            <label
              htmlFor="notes"
              className="text-start col-12 m-0 body-regular primary-text"
            >
              Additional Notes
            </label>
          </div>

          <div className="col-12 col-md-10">
            <textarea
              className="form-control body-regular m-0"
              {...formik.getFieldProps("notes")}
              name="notes"
              placeholder="additional notes"
              style={{ height: "88px" }}
            />
            <div
              className="text-danger small harvesting-input-label col-sm-12 m-0"
            >
              <ErrorMessage name="notes" />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-6 mt-2">
              <div className="row justify-content-start m-0">
                <button
                  className="crops-other-button col-12 col-md-4 m-0"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="col-12 col-md-6 mt-2">
              <div className="row justify-content-end m-0">
                <button
                  className="crops-accept-button col-12 col-md-4 m-0"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};
export default YieldForm;
