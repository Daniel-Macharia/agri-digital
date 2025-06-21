import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";


const validationSchema = Yup.object({
  identification: Yup.string().required("Identification is required"),
  vaccineName: Yup.string().required("Name of Vaccines is required"),
  previousVaccination: Yup.date().nullable(),
  observations: Yup.string(),
});

const initialValues = {
  identification: "",
  vaccineName: "",
  previousVaccination: null,
  observations: "Lorem Ipsum",
};

const identificationOptions = [
  { value: "cow-001", label: "Cow 001" },
  { value: "sheep-002", label: "Sheep 002" },
];

const vaccineOptions = [
  { value: "", label: "Lorem Ipsum" },
  { value: "anthrax", label: "Anthrax" },
  { value: "rabies", label: "Rabies" },
];

const Vaccines: React.FC = () => {
  return (
    <>
      <div
        className="d-flex flex-column p-4 rounded-4"
        style={{
          background: "#FFF",
        }}
      >
        <h3
          className="h3-semibold mb-4"
          style={{ color: "var(--Primary-Text, #333)" }}
        >
          Vaccines
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
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
                    className="form-select"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
                  >
                    <option value="">Select Livestock Identification</option>
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

              {/* Name of Vaccines */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="vaccineName" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Name of Vaccines
                </label>
                <div className="col-md-9">
                  <Field
                    as="select"
                    id="vaccineName"
                    name="vaccineName"
                    className="form-select"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
                  >
                    {vaccineOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="vaccineName"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Previous Vaccination (DatePicker) */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="previousVaccination" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Previous Vaccination
                </label>
                <div className="col-md-9">
                  <DatePicker
                    id="previousVaccination"
                    selected={values.previousVaccination}
                    onChange={(date: Date | null) => setFieldValue('previousVaccination', date)}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Select a date"
                  />
                  <ErrorMessage
                    name="previousVaccination"
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
                    rows={4}
                    className="form-control"
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

              {/* Buttons */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <Button
                  variant="outline-warning"
                  type="button"
                  style={{ padding: '0.625rem 1rem', borderRadius: '0.375rem' }}
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  style={{ padding: '0.625rem 1rem', borderRadius: '0.375rem', background: 'var(--Primary, #457900)' }}
                  disabled={isSubmitting}
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

export default Vaccines;