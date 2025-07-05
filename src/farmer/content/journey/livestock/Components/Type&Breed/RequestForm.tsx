<<<<<<< HEAD

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RequestForm = () => {
  const validationSchema = Yup.object({
    serviceType: Yup.string()
      .oneOf(['consultation', 'repair', 'installation'], 'Invalid Service Type')
      .required('Service Type is required'),
    dateOfService: Yup.date()
      .min(new Date(), 'Date of Service cannot be in the past')
      .required('Date of Service is required'),
    location: Yup.string()
      .min(2, 'Location must be at least 2 characters')
      .max(50, 'Location cannot exceed 50 characters')
      .required('Location is required'),
    contactInfo: Yup.string()
      .matches(/^\+?\d{10,14}$/, 'Invalid contact number format (e.g., +254712345678 or 0712345678)')
      .required('Contact Information is required'),
  });

  const formik = useFormik({
    initialValues: {
      serviceType: '',
      dateOfService: null,
      location: 'Kiamvu',
      contactInfo: '+254712345678',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form data submitted:', values);
      alert('Form submitted successfully! Check console for values.');
    },
  });

  return (
    <>
      <div
        className="p-4 rounded-4"
        style={{
          background: '#FFF',
        }}
      >
        <h3 className="h3-semibold mb-4" style={{ color: 'var(--Primary-Text, #333)' }}>Request form</h3>
        <form onSubmit={formik.handleSubmit} className="w-100">
          {/* Service Type */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="serviceType" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Service Type
            </label>
            <div className="col-md-9">
              <select
                id="serviceType"
                name="serviceType"
                value={formik.values.serviceType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-select bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              >
                <option value="" label="Select a service" />
                <option value="consultation" label="Consultation" />
                <option value="repair" label="Repair" />
                <option value="installation" label="Installation" />
              </select>
              {formik.touched.serviceType && formik.errors.serviceType && (
                <div className="text-danger small">{formik.errors.serviceType}</div>
              )}
            </div>
          </div>

          {/* Date of Service */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="dateOfService" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Date of Service
            </label>
            <div className="col-md-9">
              <DatePicker
                id="dateOfService"
                name="dateOfService"
                selected={formik.values.dateOfService}
                onChange={(date) => formik.setFieldValue('dateOfService', date)}
                onBlur={formik.handleBlur}
                minDate={new Date()}
                placeholderText="Select a date"
                className="form-control bg-light"
                dateFormat="yyyy-MM-dd"
                wrapperClassName="w-100"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.dateOfService && formik.errors.dateOfService && (
                <div className="text-danger small">{formik.errors.dateOfService}</div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="location" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Location
            </label>
            <div className="col-md-9">
              <input
                type="text"
                id="location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter location"
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.location && formik.errors.location && (
                <div className="text-danger small">{formik.errors.location}</div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="contactInfo" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Contact Information
            </label>
            <div className="col-md-9">
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formik.values.contactInfo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter contact information"
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.contactInfo && formik.errors.contactInfo && (
                <div className="text-danger small">{formik.errors.contactInfo}</div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Button
              variant="outline-warning"
              style={{ padding: '0.625rem 1rem', borderRadius: '0.375rem' }}
              type="button"
              onClick={() => formik.resetForm()}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              style={{ padding: '0.625rem 1rem', borderRadius: '0.375rem', background: 'var(--Primary, #457900)' }}
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
            >
              Continue
            </Button>
          </div>
        </form>
=======
// NOTE: NavBar is intentionally not imported or rendered in this form.
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Saved from "../../Shared/Saved";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  serviceType: Yup.string()
    .oneOf(["consultation", "repair", "installation"], "Invalid Service Type")
    .required("Service Type is required"),
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
  serviceType: "",
  dateOfService: null,
  location: "Kiamvu",
  contactInfo: "+254712345678",
};

const RequestForm: React.FC = () => {
  const [showSaved, setShowSaved] = useState(false);
  const navigate = useNavigate();

  const handleDone = () => {
    setShowSaved(false);
    navigate("/journey/livestock/typebreed/form/records"); 
  };

 

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
          <Saved onDone={handleDone} />
        </div>
      )}
      <div className="w-100 rounded-4 bg-white border mt-3 p-4">
        <h5 className="mb-4 text-start" style={{ color: "#333" }}>
          Request Form
        </h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setShowSaved(true);
              setSubmitting(false);
              resetForm();  
            }, 400);
          }}
        >
          {({ setFieldValue, isSubmitting, values, resetForm }) => (
            <Form>
              {/* Service Type */}
              <div className="row mb-3 align-items-center"> 
                <label
                  htmlFor="serviceType"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Service Type
                </label>
                <div className="col-md-10">
                  <Field
                    as="select"
                    id="serviceType"
                    name="serviceType"
                    className="form-select bg-light"
                  >
                    <option value="" label="Select a service" />
                    <option value="consultation" label="Consultation" />
                    <option value="repair" label="Repair" />
                    <option value="installation" label="Installation" />
                  </Field>
                  <ErrorMessage
                    name="serviceType"
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
              <div className="row mb-5 align-items-center">
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
              <div className="d-flex justify-content-between mt-10">
                <button
                  type="button"
                  className="btn btn-outline-warning"
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
                .btn-outline-warning:hover, .btn-outline-warning:focus {
                  background-color: transparent !important;
                  color: #ffc107 !important;
                  border-color: #ffc107 !important;
                }
              `}</style>
            </Form>
          )}
        </Formik>
>>>>>>> bill
      </div>
    </>
  );
};

export default RequestForm;