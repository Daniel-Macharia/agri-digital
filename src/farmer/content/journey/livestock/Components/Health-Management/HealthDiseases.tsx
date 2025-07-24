import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Saved from "../../Shared/Saved";

const identificationOptions = [
  { value: "", label: "Select the Livestock identification" },
  { value: "cow-001", label: "Cow 001" },
  { value: "sheep-002", label: "Sheep 002" },
];

const issueOptions = [
  { value: "", label: "Issue you want to Report" },
  { value: "disease", label: "Disease" },
  { value: "parasite", label: "Parasite" },
  { value: "abnormality", label: "Abnormality" },
];

interface FormValues {
  identification: string;
  dateOfReport: Date | null;
  issue: string;
  observations: string;
  photos: File | null;
}

const initialValues: FormValues = {
  identification: "",
  dateOfReport: null,
  issue: "",
  observations: "Lorem Ipsum",
  photos: null,
};

const validationSchema = Yup.object({
  identification: Yup.string().required("Identification is required"),
  dateOfReport: Yup.date().nullable().required("Date of Report is required"),
  issue: Yup.string().required("Issue is required"),
  observations: Yup.string(),
  photos: Yup.mixed(),
});

const HealthDiseases: React.FC = () => {
  const [showSaved, setShowSaved] = useState(false);
  return (
    <>
      {showSaved && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.2)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Saved onDone={() => setShowSaved(false)} />
        </div>
      )}
      <div className="w-100 rounded-4 bg-white border mt-3 p-4">
        <h5 className="mb-4 text-start" style={{ color: "#333" }}>
          Diseases, Parasites & Abnormalities
        </h5>
        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(_values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setShowSaved(true);
              setSubmitting(false);
              resetForm();
            }, 400);
          }}
        >
          {({ isSubmitting, resetForm, setFieldValue, values }) => (
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
                    {identificationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="identification"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Date of Report */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="dateOfReport"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Date of Report
                </label>
                <div className="col-md-10">
                  <DatePicker
                    id="dateOfReport"
                    selected={values.dateOfReport}
                    onChange={(date) => setFieldValue("dateOfReport", date)}
                    className="form-control bg-light"
                    placeholderText="Select Date"
                    wrapperClassName="w-100"
                  />
                  <ErrorMessage
                    name="dateOfReport"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Issue */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="issue"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Issue
                </label>
                <div className="col-md-10">
                  <Field
                    as="select"
                    id="issue"
                    name="issue"
                    className="form-select bg-light"
                  >
                    {issueOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="issue"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Observations */}
              <div className="row mb-3 align-items-start">
                <label
                  htmlFor="observations"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Observations
                </label>
                <div className="col-md-10">
                  <Field
                    as="textarea"
                    id="observations"
                    name="observations"
                    rows={5}
                    className="form-control bg-light"
                    placeholder="Lorem Ipsum"
                  />
                  <ErrorMessage
                    name="observations"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Photos */}
              <div className="row mb-3 align-items-start">
                <label
                  htmlFor="photos"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Photos
                </label>
                <div className="col-md-10">
                  <label
                    htmlFor="photos"
                    className="d-flex flex-column align-items-center justify-content-center p-3"
                    style={{
                      border: "2px dashed var(--Border, #ECECEC)",
                      borderRadius: "0.5rem",
                      background: "#f8f9fa",
                      minHeight: "10rem",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <input
                      id="photos"
                      name="photos"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      className="position-absolute w-100 h-100 opacity-0"
                      style={{ cursor: "pointer", top: 0, left: 0 }}
                      onChange={(event) => {
                        setFieldValue("photos", event.currentTarget.files?.[0]);
                      }}
                    />
                    {values.photos ? (
                      <span className="body-regular" style={{ color: "#333" }}>
                        {values.photos.name}
                      </span>
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginBottom: 8 }}
                        >
                          <path
                            d="M16 22V10M16 10L10 16M16 10L22 16"
                            stroke="#457900"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="4"
                            y="26"
                            width="24"
                            height="2"
                            rx="1"
                            fill="#457900"
                          />
                        </svg>
                        <span
                          style={{
                            color: "#457900",
                            fontWeight: 500,
                            fontSize: "1rem",
                            marginBottom: 2,
                          }}
                        >
                          Upload Photos
                        </span>
                        <small className="text-muted text-center">
                          PDF, PNG, JPG up to 10MB
                        </small>
                      </div>
                    )}
                  </label>
                  <ErrorMessage
                    name="photos"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-outline-warning ventilation-cancel-btn"
                  style={{ borderRadius: "0.375rem", padding: "0.375rem 1.25rem", fontSize: "0.95rem", minWidth: "100px" }}
                  onClick={() => resetForm()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: "#457900", color: "white", borderRadius: "0.375rem", padding: "0.375rem 1.25rem", fontSize: "0.95rem", minWidth: "100px", border: "none" }}
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
              <style>{`
                .ventilation-cancel-btn:hover, .ventilation-cancel-btn:focus {
                  background-color: transparent !important;
                  color: #ffc107 !important;
                  border-color: #ffc107 !important;
                }
              `}</style>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default HealthDiseases;