import { ErrorMessage, Form, FormikProvider, useFormik } from "formik";
import moment from "moment-timezone";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import TimePicker from "react-time-picker";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { API_ROUTES } from "../../../../../lib/Routes";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import {
  DATE_FORMAT_LOCAL_DATE_TIME,
  FILE_CONTENT_TYPE,
  ListItem,
  SystemWideSelectString,
  TOASTIFY_AUTO_CLOSE_TIMEOUT,
  TodoFormPayload,
  TodoPayload,
  TodoStatus,
} from "../../../../../lib/model/Model";
import {
  customSelectStyles,
  extractErrorMessage,
  parseFormDatav3,
} from "../../../../../lib/utils/Helpers";
const apiClient = new ApiClient();

interface Props {
  isCropJourney: boolean;
  transactionId: string;
  stage: string;
  activityTypes: ListItem[];
  onDone: (todos: TodoPayload[]) => void;
  actionTitle: string;
  buttonActionTitle: string;
  todoTitle: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required().label("Title"),
  dueDate: Yup.date().required().label("Title"),
  status: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Status"),
  activityType: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .label("Activity Type"),
  description: Yup.string().trim().required().label("Description"),
});
const ActivityForm: React.FC<Props> = ({
  actionTitle,
  todoTitle,
  buttonActionTitle,
  transactionId,
  stage,
  onDone,
  isCropJourney,
  activityTypes,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>();

  const formik = useFormik<TodoFormPayload>({
    initialValues: {
      title: "",
      dueDate: null,
      status: null,
      description: "",
      activityType: null,
      file: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let url = "";
        if (isCropJourney) {
          url = API_ROUTES.CROP_JOURNEY.STAGE_ACTIVITY_MODIFY.replace(
            ":transactionId",
            transactionId
          ).replace(":cropJourneyStage", stage);
        }

        let payload = parseFormDatav3(values) as TodoFormPayload;

        if (values.dueDate && selectedTime) {
          const dueDateMoment = moment(values.dueDate);
          const timeMoment = moment(selectedTime);
          dueDateMoment.set({
            hour: timeMoment.get("hour"),
            minute: timeMoment.get("minute"),
            second: 0,
            millisecond: 0,
          });
          payload = {
            ...payload,
            dueDate: dueDateMoment.format(DATE_FORMAT_LOCAL_DATE_TIME),
          };
        } else if (values.dueDate) {
          payload = {
            ...payload,
            dueDate: moment(values.dueDate).format(DATE_FORMAT_LOCAL_DATE_TIME),
          };
        }
        setSubmitting(true);
        const todosResponse = await apiClient.post<
          TodoPayload[],
          TodoFormPayload
        >({
          url,
          data: payload,
          config: {
            headers: { "Content-Type": FILE_CONTENT_TYPE },
          },
        });
        onDone(todosResponse);
        resetForm();
        setupInitForm();
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Activity addition failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const activityTypesList: SystemWideSelectString[] = useMemo(() => {
    if (activityTypes.length === 0) return [];
    return activityTypes.map((item) => ({ value: item.id, label: item.name }));
  }, [activityTypes]);

  const handleUploadFileAction = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const setupInitForm = useCallback(() => {
    formik.setFieldValue("title", "Activity");
    formik.setFieldValue("status", {
      value: TodoStatus.PENDING,
      label: TodoStatus.PENDING,
    });
  }, [todoTitle]);

  useEffect(() => {
    setupInitForm();
  }, [todoTitle]);

  return (
    <FormikProvider value={formik}>
      <Form className="col-12">
        <div className="row">
          <h3 className="h3-bold primary-text crops-start-aligned-text col-12">
            {actionTitle}
          </h3>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <label
                htmlFor="activityType"
                className="crops-start-aligned-text body-regular primary-text col-12 m-0"
              >
                Activity Type
              </label>
            </div>

            <div className="col-12">
              <Select
                name="activityType"
                options={activityTypesList}
                value={formik.values.activityType}
                onChange={(selected) =>
                  formik.setFieldValue("activityType", selected)
                }
                onBlur={() => formik.setFieldTouched("activityType", true)}
                styles={customSelectStyles}
              />

              <div
                className="col-12 text-danger small"
                style={{ textAlign: "start" }}
              >
                <ErrorMessage name="activityType" />
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12 ">
              <label
                htmlFor="activityDate"
                className="crops-start-aligned-text body-regular primary-text col-12 m-0"
              >
                Date
              </label>
            </div>

            <div className="col-12">
              <DatePicker
                className="form-control body-regular mb-0"
                name="dueDate"
                placeholderText="select activity date"
                selected={formik.getFieldProps("dueDate").value}
                onChange={(date) => formik.setFieldValue("dueDate", date)}
                dateFormat={"MM/dd/yyyy"}
                wrapperClassName="w-100"
                showDateSelect
                autoComplete="off"
              />

              <div className="col-12 m-0 text-danger small crops-start-aligned-text">
                <ErrorMessage name="dueDate" />
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12">
              <label
                htmlFor="activityTime"
                className="crops-start-aligned-text body-regular primary-text col-12 m-0"
              >
                Time
              </label>
            </div>

            <div className="col-12">
              <TimePicker
                className="form-control body-regular col-12 mb-0"
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

          <div className="row mt-2">
            <div className="col-12">
              <label
                htmlFor="activityImage"
                className="crops-start-aligned-text body-regular primary-text col-12 m-0"
              >
                Upload Image
              </label>
            </div>

            <div className="col-12">
              <div
                className="form-control col-12"
                onClick={handleUploadFileAction}
                style={{
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  name="previewUrl"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      formik.setFieldValue("file", file);
                    }
                  }}
                />

                {formik.values.file && (
                  <Fragment>
                    <br />
                    <img
                      className="img-fluid img-thumbnail mb-5 w-50"
                      src={URL.createObjectURL(formik.values.file)}
                      alt="Thumbnail preview"
                    />
                  </Fragment>
                )}
                <img src="/assets/images/upload_photo.svg" style={{width: "24px"}} className="col-4" />
                <p>
                  Upload Photo of the Product
                  <br />
                  PDF,PNG,JPG up to 10 MB{" "}
                </p>
                <div className="text-danger small">
                  <ErrorMessage name="previewUrl" />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12">
              <label
                htmlFor="activityDescription"
                className="crops-start-aligned-text body-regular primary-text col-12 m-0"
              >
                Description
              </label>
            </div>

            <div className="col-12">
              <textarea
                className="form-control body-regular col-12"
                {...formik.getFieldProps("description")}
                name="description"
                style={{ height: "88px" }}
                placeholder="activity description"
                autoComplete="off"
              />
              <div
                className="col-12 text-danger small m-0"
                style={{ textAlign: "start" }}
              >
                <ErrorMessage name="description" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mx-0 px-0">
          <div className="row justify-content-start">
            <button
              type="submit"
              className="col-12 col-md-4 mx-0 crops-accept-button"
            >
              {buttonActionTitle}{" "}
            </button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default ActivityForm;
