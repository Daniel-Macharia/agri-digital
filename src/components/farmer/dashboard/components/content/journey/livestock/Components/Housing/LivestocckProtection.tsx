import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import Saved from '../../Shared/Saved';

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
  return (
    <>
      {showSaved && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.2)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Saved onDone={() => setShowSaved(false)} />
        </div>
      )}
      <div
        className="d-flex flex-column p-4 rounded-4"
        style={{
          background: "#FFF",
        }}
      >
        <h3 className="h3-semibold mb-4" style={{ color: 'var(--Primary-Text, #333)' }}>
          Livestock Protection
        </h3>
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
            <Form className="w-100">
              {/* Livestock Type */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="livestockType" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Livestock Type
                </label>
                <div className="col-md-9">
                  <Field
                    id="livestockType"
                    name="livestockType"
                    type="text"
                    placeholder="Lorem"
                    className="form-control bg-light"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
                  />
                  <ErrorMessage
                    name="livestockType"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Type of Material */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="typeOfMaterial" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Type of Material
                </label>
                <div className="col-md-9">
                  <Field
                    id="typeOfMaterial"
                    name="typeOfMaterial"
                    type="text"
                    placeholder="Lorem"
                    className="form-control bg-light"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
                  />
                  <ErrorMessage
                    name="typeOfMaterial"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Size */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="size" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Size
                </label>
                <div className="col-md-9">
                  <Field
                    id="size"
                    name="size"
                    type="text"
                    placeholder="Lorem"
                    className="form-control bg-light"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
                  />
                  <ErrorMessage
                    name="size"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Number of Animals */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="numberOfAnimals" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  No. of Animals
                </label>
                <div className="col-md-9">
                  <Field
                    id="numberOfAnimals"
                    name="numberOfAnimals"
                    type="text"
                    placeholder="Lorem"
                    className="form-control bg-light"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
                  />
                  <ErrorMessage
                    name="numberOfAnimals"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="row mb-3 align-items-start">
                <label htmlFor="notes" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Notes
                </label>
                <div className="col-md-9">
                  <Field
                    id="notes"
                    as="textarea"
                    name="notes"
                    rows={4}
                    className="form-control bg-light"
                    placeholder="Lorem Ipsum"
                    style={{ borderRadius: '0.5rem' }}
                  />
                  <ErrorMessage
                    name="notes"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <Button
                  variant="outline-warning"
                  style={{ padding: '0.625rem 1rem', borderRadius: '0.375rem' }}
                  type="button"
                  onClick={() => resetForm()}
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  style={{ padding: '0.625rem 1rem', borderRadius: '0.375rem', background: 'var(--Primary, #457900)' }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LivestockProtection;