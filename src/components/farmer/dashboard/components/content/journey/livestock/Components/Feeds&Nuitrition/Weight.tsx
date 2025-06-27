import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const identificationOptions = [
  { value: "", label: "Select the Livestock identification" },
  { value: "1", label: "Livestock 1" },
  { value: "2", label: "Livestock 2" },
];

const initialValues = {
  identification: "",
  feedType: "",
  previousWeight: "",
  currentWeight: "",
  notes: "",
};

const validationSchema = Yup.object({
  identification: Yup.string().required("Identification is required"),
  feedType: Yup.string().required("Feed Type is required"),
  previousWeight: Yup.string()
    .required("Previous Weight is required")
    .matches(/^\d+kg$/, "Weight must be in kg format (e.g., 32kg)"),
  currentWeight: Yup.string()
    .required("Current Weight is required")
    .matches(/^\d+kg$/, "Weight must be in kg format (e.g., 32kg)"),
  notes: Yup.string(),
});

const FeedingWeight: React.FC = () => {
  return (
    <div className="w-100 rounded-4 bg-white border mt-3 p-4">
      <h5 className="mb-4 text-start" style={{ color: "#333" }}>
        Weight
      </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ isSubmitting, resetForm }) => (
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
                  {identificationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
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

            {/* Previous Weight */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="previousWeight"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Previous Weight
              </label>
              <div className="col-md-10">
                <Field
                  type="text"
                  id="previousWeight"
                  name="previousWeight"
                  className="form-control bg-light"
                  placeholder="32kg"
                />
                <ErrorMessage
                  name="previousWeight"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Current Weight */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="currentWeight"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Current Weight
              </label>
              <div className="col-md-10">
                <Field
                  type="text"
                  id="currentWeight"
                  name="currentWeight"
                  className="form-control bg-light"
                  placeholder="32kg"
                />
                <ErrorMessage
                  name="currentWeight"
                  component="div"
                  className="text-danger small"
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

export default FeedingWeight;