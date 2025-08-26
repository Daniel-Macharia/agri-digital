import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RequestSuccessful from "../../Shared/RequestSuccessful";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';

const validationSchema = Yup.object({
  feedType: Yup.string()
    .required("Feed Type is required"),
  dateOfService: Yup.date()
    .min(new Date(), "Date of Service cannot be in the past")
    .required("Date of Service is required"),
  location: Yup.string()
    .min(2, "Location must be at least 2 characters")
    .max(50, "Location cannot exceed 50 characters")
    .required("Location is required"),
  contactInfo: Yup.string()
    .matches(
      /^\+?\d{10,14}$/,
      "Invalid contact number format (e.g., +254712345678 or 0712345678)"
    )
    .required("Contact Information is required"),
});

const initialValues = {
  feedType: "",
  dateOfService: null,
  location: "Kiambu",
  contactInfo: "+254 712345678",
};

const RequestForm: React.FC = () => {
  const [showSaved, setShowSaved] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Popup
        open={showSaved}
        modal
        closeOnDocumentClick={false}
        onClose={() => setShowSaved(false)}
        contentStyle={{ borderRadius: '1rem', padding: 0, maxWidth: 400 }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center p-4">
          <button
            type="button"
            className="btn-close align-self-end mb-2"
            aria-label="Close"
            onClick={() => setShowSaved(false)}
          ></button>
          <RequestSuccessful onDone={() => navigate("/farmer/projects/livestock/feeds/results")} />
        </div>
      </Popup>
      <div className="w-100 rounded-4 bg-white border mt-3 p-4">
        <h5 className="mb-4 text-start" style={{ color: "#333" }}>
          Request Form
        </h5>
        <Formik
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
          {({ setFieldValue, isSubmitting, values, resetForm }) => (
            <Form>
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
                    as="select"
                    id="feedType"
                    name="feedType"
                    className="form-select bg-light"
                  >
                    <option value="" label="Feed Type" />
                    <option value="concentrate" label="Concentrate Feed" />
                    <option value="forage" label="Forage Feed" />
                    <option value="supplement" label="Supplement Feed" />
                    <option value="mixed" label="Mixed Feed" />
                  </Field>
                  <ErrorMessage
                    name="feedType"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Date of Service */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="dateOfService"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Date of Service
                </label>
                <div className="col-md-10">
                  <DatePicker
                    id="dateOfService"
                    name="dateOfService"
                    selected={values.dateOfService}
                    onChange={(date) => setFieldValue("dateOfService", date)}
                    minDate={new Date()}
                    placeholderText="Select a date"
                    className="form-control bg-light"
                    dateFormat="yyyy-MM-dd"
                    wrapperClassName="w-100"
                  />
                  <ErrorMessage
                    name="dateOfService"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="location"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Location
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    className="form-control bg-light"
                    placeholder="Enter location"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="contactInfo"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Contact Information
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="contactInfo"
                    name="contactInfo"
                    className="form-control bg-light"
                    placeholder="Enter contact information"
                  />
                  <ErrorMessage
                    name="contactInfo"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-outline-warning requestform-cancel-btn"
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
                  Continue
                </button>
              </div>
              <style>{`
                .requestform-cancel-btn:hover, .requestform-cancel-btn:focus {
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

export default RequestForm;