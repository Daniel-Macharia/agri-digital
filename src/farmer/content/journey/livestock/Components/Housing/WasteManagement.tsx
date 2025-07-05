import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Saved from "../../Shared/Saved";

const validationSchema = Yup.object({
  disposalMethod: Yup.string().required("Disposal Method is required"),
  frequency: Yup.string().required("Frequency is required"),
  volume: Yup.number()
    .typeError("Volume must be a number")
    .required("Volume is required"),
  notes: Yup.string(),
});

const initialValues = {
  disposalMethod: "",
  frequency: "",
  volume: "",
  notes: "",
};

const frequencyOptions = [
  { value: "", label: "Select Frequency" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const WasteManagement: React.FC = () => {
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
          Waste Management
        </h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setShowSaved(true);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              {/* Disposal Method */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="disposalMethod"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Disposal Method
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="disposalMethod"
                    name="disposalMethod"
                    className="form-control bg-light"
                    placeholder="Biogas Production"
                  />
                  <ErrorMessage
                    name="disposalMethod"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="frequency"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Frequency
                </label>
                <div className="col-md-10">
                  <Field
                    as="select"
                    id="frequency"
                    name="frequency"
                    className="form-select bg-light"
                  >
                    {frequencyOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="frequency"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Volume */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="volume"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Volume in (kg)
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="volume"
                    name="volume"
                    className="form-control bg-light"
                    placeholder="120000"
                  />
                  <ErrorMessage
                    name="volume"
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

export default WasteManagement;