import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Saved from "../../Shared/Saved"; // Uncomment if you have a Saved component
// import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  identification: Yup.string().required("Identification is required"),
  growthRate: Yup.string().required("Growth Rate is required"),
  feedConversion: Yup.string().required("Feed Conversion Ratio is required"),
  slaughterAge: Yup.string().required("Target Slaughter Age is required"),
  expectedYield: Yup.string().required("Expected Yield is required"),
  notes: Yup.string(),
  // No validation for photo for now
});

const initialValues = {
  identification: "",
  growthRate: "",
  feedConversion: "",
  slaughterAge: "",
  expectedYield: "",
  notes: "",
  photo: null,
};

const Meat = () => {
  const [showSaved, setShowSaved] = useState(false);
  // const navigate = useNavigate();

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
          {/* <Saved onDone={() => navigate("/farmer/projects/livestock/production/results")} /> */}
          <div style={{ background: "white", padding: 32, borderRadius: 12 }}>Saved!</div>
        </div>
      )}
      <div className="w-100 rounded-4 bg-white border mt-3 p-4">
        <h5 className="mb-4 text-start" style={{ color: "#333" }}>
          Meat
        </h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setShowSaved(true);
            setSubmitting(false);
            setTimeout(() => setShowSaved(false), 1200);
            resetForm();
          }}
        >
          {({ isSubmitting, setFieldValue, resetForm }) => (
            <Form>
              {/* Identification */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="identification" className="col-md-2 col-form-label text-primary-custom body-regular">
                  Identification
                </label>
                <div className="col-md-10">
                  <Field
                    as="select"
                    id="identification"
                    name="identification"
                    className="form-control bg-light"
                  >
                    <option value="">Select the Livestock identification</option>
                    <option value="cow-1">Cow 1</option>
                    <option value="cow-2">Cow 2</option>
                  </Field>
                  <ErrorMessage name="identification" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Growth Rate */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="growthRate" className="col-md-2 col-form-label text-primary-custom body-regular">
                  Growth Rate
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="growthRate"
                    name="growthRate"
                    className="form-control bg-light"
                    placeholder="120 Litres"
                  />
                  <ErrorMessage name="growthRate" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Feed Conversion Ratio */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="feedConversion" className="col-md-2 col-form-label text-primary-custom body-regular">
                  Feed Conversion Ratio
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="feedConversion"
                    name="feedConversion"
                    className="form-control bg-light"
                    placeholder="120 Litres"
                  />
                  <ErrorMessage name="feedConversion" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Target Slaughter Age */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="slaughterAge" className="col-md-2 col-form-label text-primary-custom body-regular">
                  Target Slaughter Age
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="slaughterAge"
                    name="slaughterAge"
                    className="form-control bg-light"
                    placeholder="120 Litres"
                  />
                  <ErrorMessage name="slaughterAge" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Expected Yield */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="expectedYield" className="col-md-2 col-form-label text-primary-custom body-regular">
                  Expected Yield
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="expectedYield"
                    name="expectedYield"
                    className="form-control bg-light"
                    placeholder="120 Litres"
                  />
                  <ErrorMessage name="expectedYield" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Upload Photo */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-2 col-form-label text-primary-custom body-regular">
                  Upload Photo
                </label>
                <div className="col-md-10">
                  <div
                    className="d-flex flex-column align-items-center justify-content-center bg-light"
                    style={{
                      border: "2px dashed #ddd",
                      borderRadius: 8,
                      minHeight: 120,
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => document.getElementById("photoInput")?.click()}
                  >
                    <input
                      id="photoInput"
                      name="photo"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      style={{ display: "none" }}
                      onChange={e => setFieldValue("photo", e.currentTarget.files?.[0] || null)}
                    />
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 24, color: "#8bc34a" }}>
                        <i className="fa fa-upload" />
                      </div>
                      <div>Upload Photos</div>
                      <div style={{ fontSize: 12, color: "#888" }}>PDF, PNG, JPG up to 10MB</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="row mb-3 align-items-start">
                <label htmlFor="notes" className="col-md-2 col-form-label text-primary-custom body-regular">
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
                  <ErrorMessage name="notes" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  style={{ borderRadius: "0.375rem", padding: "0.375rem 1.25rem", fontSize: "0.95rem", minWidth: "100px" }}
                  onClick={() => resetForm()}
                >
                  Sell
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: "#457900", color: "white", borderRadius: "0.375rem", padding: "0.375rem 1.25rem", fontSize: "0.95rem", minWidth: "100px", border: "none" }}
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style>{`
        .btn-outline-warning:hover, .btn-outline-warning:focus {
          background-color: transparent !important;
          color: #ffc107 !important;
          border-color: #ffc107 !important;
        }
      `}</style>
    </>
  );
};

export default Meat;