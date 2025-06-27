import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Saved from "../../Shared/Saved";

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
          Space
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
                    className="text-danger small"
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
                    className="text-danger small"
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
                    className="text-danger small"
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
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() => resetForm()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: "#457900", color: "white" }}
                  disabled={isSubmitting}
                >
                  Continue
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Space;