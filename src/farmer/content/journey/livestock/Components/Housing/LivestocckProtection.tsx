import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import RequestSuccessful from "../../Shared/RequestSuccessful";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';

const validationSchema = Yup.object({
  livestockType: Yup.string().required("Livestock Type is required"),
  typeOfMaterial: Yup.string().required("Type of Material is required"),
  size: Yup.string().required("Size is required"),
  numberOfAnimals: Yup.string().required("Number of Animals is required"),
  notes: Yup.string(),
});

const initialValues = {
  livestockType: "",
  typeOfMaterial: "",
  size: "",
  numberOfAnimals: "",
  notes: "Lorem Ipsum",
};

const LivestockProtection: React.FC = () => {
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
          <RequestSuccessful onDone={() => {
            setShowSaved(false);
            navigate("/farmer/projects/livestock/housing/results");
          }} />
        </div>
      </Popup>
      <div className="w-100 rounded-4 bg-white border mt-3 p-4">
        <h5 className="mb-4 text-start" style={{ color: "#333" }}>
          Livestock Protection
        </h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(_values, { setSubmitting, resetForm }) => {
            setShowSaved(true);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              {/* Livestock Type */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="livestockType"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Livestock Type
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="livestockType"
                    name="livestockType"
                    className="form-control bg-light"
                    placeholder="Lorem"
                  />
                  <ErrorMessage
                    name="livestockType"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Type of Material */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="typeOfMaterial"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Type of Material
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="typeOfMaterial"
                    name="typeOfMaterial"
                    className="form-control bg-light"
                    placeholder="Lorem"
                  />
                  <ErrorMessage
                    name="typeOfMaterial"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Size */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="size"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Size
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="size"
                    name="size"
                    className="form-control bg-light"
                    placeholder="Lorem"
                  />
                  <ErrorMessage
                    name="size"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Number of Animals */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="numberOfAnimals"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  No. of Animals
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="numberOfAnimals"
                    name="numberOfAnimals"
                    className="form-control bg-light"
                    placeholder="Lorem"
                  />
                  <ErrorMessage
                    name="numberOfAnimals"
                    component="div"
                    className="text-danger small text-start"
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
                  Request Service
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style>{`
        .ventilation-cancel-btn:hover, .ventilation-cancel-btn:focus {
          background-color: transparent !important;
          color: #ffc107 !important;
          border-color: #ffc107 !important;
        }
      `}</style>
    </>
  );
};

export default LivestockProtection;