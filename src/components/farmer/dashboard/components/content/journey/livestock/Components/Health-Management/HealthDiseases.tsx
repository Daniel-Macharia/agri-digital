import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormValues {
  identification: string;
  dateOfReport: string;
  issue: string;
  observations: string;
  photos: File | null;
}

const validationSchema = Yup.object({
  identification: Yup.string().required("Identification is required"),
  dateOfReport: Yup.string().required("Date of Report is required"),
  issue: Yup.string().required("Issue is required"),
  observations: Yup.string(),
  photos: Yup.mixed(),
});

const initialValues: FormValues = {
  identification: "",
  dateOfReport: "",
  issue: "",
  observations: "Lorem Ipsum",
  photos: null,
};

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

const HealthDiseases: React.FC = () => {
  return (
    <>
      <div
        className="p-4 rounded-4"
        style={{
          background: "#FFF",
        }}
      >
        <h3 className="h3-semibold mb-4" style={{ color: 'var(--Primary-Text, #333)' }}>
          Diseases, Parasites & Abnormalities
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty, resetForm, setFieldValue, values }) => (
            <Form>
              {/* Identification */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="identification" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Identification
                </label>
                <div className="col-md-9">
                  <Field
                    as="select"
                    id="identification"
                    name="identification"
                    className="form-select bg-light"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
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
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Date of Report */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="dateOfReport" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Date of Report
                </label>
                <div className="col-md-9">
                  <DatePicker
                    id="dateOfReport"
                    selected={values.dateOfReport ? new Date(values.dateOfReport) : null}
                    onChange={(date) => setFieldValue("dateOfReport", date)}
                    className="form-control bg-light"
                    placeholderText="Select Date"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
                  />
                  <ErrorMessage
                    name="dateOfReport"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Issue */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="issue" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Issue
                </label>
                <div className="col-md-9">
                  <Field
                    as="select"
                    id="issue"
                    name="issue"
                    className="form-select bg-light"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
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
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Observations */}
              <div className="row mb-3 align-items-start">
                <label htmlFor="observations" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Observations
                </label>
                <div className="col-md-9">
                  <Field
                    as="textarea"
                    id="observations"
                    name="observations"
                    rows={5}
                    className="form-control bg-light"
                    placeholder="Lorem Ipsum"
                    style={{ borderRadius: '0.5rem' }}
                  />
                  <ErrorMessage
                    name="observations"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Photos */}
              <div className="row mb-3 align-items-start">
                <label htmlFor="photos" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Photos
                </label>
                <div className="col-md-9">
                  <label
                    htmlFor="photos"
                    className="border border-2 rounded d-flex flex-column align-items-center justify-content-center p-3 text-center"
                    style={{
                      borderStyle: "dashed",
                      borderColor: "var(--Border, #ECECEC)",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <input
                      id="photos"
                      name="photos"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      className="d-none"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("photos", event.currentTarget.files?.[0]);
                      }}
                    />
                    {values.photos ? (
                      <span className="body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>{values.photos.name}</span>
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 8 }}>
                          <path d="M16 22V10M16 10L10 16M16 10L22 16" stroke="#457900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="4" y="26" width="24" height="2" rx="1" fill="#457900" />
                        </svg>
                        <span style={{ color: 'var(--Primary, #457900)', fontWeight: 500, fontSize: '1rem', marginBottom: 2 }}>Upload Photos</span>
                        <small className="text-muted text-center">
                          PDF, PNG, JPG up to 10MB
                        </small>
                      </div>
                    )}
                  </label>
                  <ErrorMessage
                    name="photos"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <Button
                  variant="outline-warning"
                  type="button"
                  onClick={() => resetForm()}
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                  style={{ background: 'var(--Primary, #457900)' }}
                >
                  Notify Experts
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default HealthDiseases;