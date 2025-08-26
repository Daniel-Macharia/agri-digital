import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Saved from "../../Shared/Saved";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';

const validationSchema = Yup.object({
  area: Yup.string().required("Area is required"),
  animalCapacity: Yup.string().required("Animal Capacity is required"),
  density: Yup.string().required("Density is required"),
  notes: Yup.string(),
});

const initialValues = {
  area: "",
  animalCapacity: "",
  density: "",
  notes: "",
};

const Space: React.FC = () => {
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
          <Saved onDone={() => navigate("/farmer/projects/livestock/housing/results")} />
        </div>
      </Popup>
      <div className="w-100 rounded-4 bg-white border mt-3 p-4">
        <h5 className="mb-4 text-start" style={{ color: "#333" }}>
          Space
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
              {/* Area */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="area"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Area in (m²)
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="area"
                    name="area"
                    className="form-control bg-light"
                    placeholder="15,000m²"
                  />
                  <ErrorMessage
                    name="area"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Animal Capacity */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="animalCapacity"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Animal Capacity
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="animalCapacity"
                    name="animalCapacity"
                    className="form-control bg-light"
                    placeholder="15 Cows"
                  />
                  <ErrorMessage
                    name="animalCapacity"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Density */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="density"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Density
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="density"
                    name="density"
                    className="form-control bg-light"
                    placeholder="1 cow per 1000m²"
                  />
                  <ErrorMessage
                    name="density"
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

export default Space;