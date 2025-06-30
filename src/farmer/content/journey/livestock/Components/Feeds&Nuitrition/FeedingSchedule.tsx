import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

// Example livestock data
const livestockData = [
  { id: 1, identification: "Hannah" },
  { id: 2, identification: "Stella" },
  { id: 3, identification: "Alex" },
  { id: 4, identification: "Lorem Ipsum" },
  { id: 5, identification: "Lorem Ipsum" },
  { id: 6, identification: "Lorem Ipsum" },
  { id: 7, identification: "Lorem Ipsum" },
  { id: 8, identification: "Lorem Ipsum" },
  { id: 9, identification: "Lorem Ipsum" },
  { id: 10, identification: "Lorem Ipsum" },
];

const initialValues = {
  identification: "",
  feedType: "",
  feedingTime: "",
  quantity: "",
  reminder: "",
  notes: "",
};

const validationSchema = Yup.object({
  identification: Yup.string().required("Identification is required"),
  feedType: Yup.string().required("Feed Type is required"),
  feedingTime: Yup.string().required("Feeding Time is required"),
  quantity: Yup.string()
    .required("Quantity per Cattle is required")
    .matches(/^\d+kg$/, "Quantity must be in kg format (e.g., 25kg)"),
  reminder: Yup.string().required("Feeding Reminder is required"),
  notes: Yup.string(),
});

const FeedingSchedule: React.FC = () => {
  return (
    <div className="w-100 rounded-4 bg-white border mt-3 p-4">
      <h5 className="mb-4 text-start" style={{ color: "#333" }}>
        Feeding Schedule
      </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ setFieldValue, isSubmitting, values, resetForm }) => (
          <Form>
            {/* Identification */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="identification"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Identification
              </label>
              <div className="col-md-10">
                <Field
                  as="select"
                  id="identification"
                  name="identification"
                  className="form-select bg-light"
                >
                  <option value="">Select Identification</option>
                  {livestockData.map((livestock) => (
                    <option key={livestock.id} value={livestock.identification}>
                      {livestock.identification}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="identification"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Feed Type */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="feedType"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Feed Type
              </label>
              <div className="col-md-10">
                <Field
                  type="text"
                  id="feedType"
                  name="feedType"
                  className="form-control bg-light"
                  placeholder="Hay, Grain, Silage, etc."
                />
                <ErrorMessage
                  name="feedType"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Feeding Time */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="feedingTime"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Feeding Time
              </label>
              <div className="col-md-10">
                <TimePicker
                  onChange={(time) => setFieldValue("feedingTime", time)}
                  value={values.feedingTime}
                  className="form-control bg-light"
                  clearIcon={null}
                  clockIcon={null}
                />
                <ErrorMessage
                  name="feedingTime"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="quantity"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Quantity per Cattle
              </label>
              <div className="col-md-10">
                <Field
                  type="text"
                  id="quantity"
                  name="quantity"
                  className="form-control bg-light"
                  placeholder="e.g., 25kg"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Feeding Reminder */}
            <div className="row mb-3 align-items-center">
              <label
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Feeding Reminder
              </label>
              <div className="col-md-10 d-flex align-items-center">
                <div className="form-check form-check-inline">
                  <Field
                    type="radio"
                    name="reminder"
                    value="Yes"
                    className="form-check-input"
                    id="reminderYes"
                  />
                  <label className="form-check-label" htmlFor="reminderYes">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <Field
                    type="radio"
                    name="reminder"
                    value="No"
                    className="form-check-input"
                    id="reminderNo"
                  />
                  <label className="form-check-label" htmlFor="reminderNo">
                    No
                  </label>
                </div>
                <ErrorMessage
                  name="reminder"
                  component="div"
                  className="text-danger small ms-3"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="row mb-3 align-items-start">
              <label
                htmlFor="notes"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Notes
              </label>
              <div className="col-md-10">
                <Field
                  as="textarea"
                  id="notes"
                  name="notes"
                  rows={5}
                  className="form-control bg-light"
                  placeholder="Lorem Ipsum"
                />
                <ErrorMessage
                  name="notes"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={() => resetForm()}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ backgroundColor: "#457900", color: "white" }}
                disabled={isSubmitting}
              >
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FeedingSchedule;