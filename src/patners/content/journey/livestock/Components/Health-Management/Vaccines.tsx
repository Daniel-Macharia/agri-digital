import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RequestSuccessful from "../../Shared/RequestSuccessful";
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";

interface FormValues {
  identification: string;
  vaccineName: string;
  previousVaccination: Date | null;
  observations: string;
}

const validationSchema = Yup.object({
  identification: Yup.string().required("Identification is required"),
  vaccineName: Yup.string().required("Name of Vaccines is required"),
  previousVaccination: Yup.date().nullable(), 
  observations: Yup.string(), 
});

const initialValues: FormValues = {
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
  const [showRequestSuccessful, setShowRequestSuccessful] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Popup
        open={showRequestSuccessful}
        modal
        closeOnDocumentClick={false}
        onClose={() => setShowRequestSuccessful(false)}
        contentStyle={{ borderRadius: '1rem', padding: 0, maxWidth: 400 }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center p-4">
          <button
            type="button"
            className="btn-close align-self-end mb-2"
            aria-label="Close"
            onClick={() => setShowRequestSuccessful(false)}
          ></button>
          <RequestSuccessful onDone={() => navigate("/farmer/projects/livestock/health/results")} />
        </div>
      </Popup>
      <div className="w-100 rounded-4 bg-white border mt-3 p-4">
        <h5 className="mb-4 text-start" style={{ color: "#333" }}>
          Vaccines
        </h5>
        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(_values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setShowRequestSuccessful(true);
              setSubmitting(false);
              resetForm();
            }, 400);
          }}
        >
          {({ isSubmitting, values, setFieldValue, resetForm }) => (
            <Form>
              {/* Identification */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="identification" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Identification
                </label>
                <div className="col-md-10">
                  <Field
                    as="select"
                    id="identification"
                    name="identification"
                    className="form-select bg-light"
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
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Name of Vaccines */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="vaccineName" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Name of Vaccines
                </label>
                <div className="col-md-10">
                  <Field
                    as="select"
                    id="vaccineName"
                    name="vaccineName"
                    className="form-select bg-light"
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
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Previous Vaccination (DatePicker) */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="previousVaccination" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Previous Vaccination
                </label>
                <div className="col-md-10">
                  <DatePicker
                    id="previousVaccination"
                    selected={values.previousVaccination}
                    onChange={(date) => setFieldValue('previousVaccination', date)}
                    dateFormat="yyyy-MM-dd"
                    className="form-control bg-light"
                    placeholderText="Select a date"
                    wrapperClassName="w-100"
                  />
                  <ErrorMessage
                    name="previousVaccination"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Observations */}
              <div className="row mb-3 align-items-start">
                <label htmlFor="observations" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Observations
                </label>
                <div className="col-md-10">
                  <Field
                    as="textarea"
                    id="observations"
                    name="observations"
                    rows={4}
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
                  Notify Experts
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

export default Vaccines;