import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import Saved from '../../Shared/Saved';

const validationSchema = Yup.object({
  disposalMethod: Yup.string().required("Disposal Method is required"),
  frequency: Yup.string().required("Frequency is required"),
  volume: Yup.number()
    .typeError("Volume must be a number")
    .required("Volume is required"),
  notes: Yup.string(),
}); 

const initialValues = {
  disposalMethod: "Biogas Production",
  frequency: "",
  volume: 120000,
  notes: "Lorem Ipsum",
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
          Waste Management
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
              {/* Disposal Method */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="disposalMethod" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Disposal Method
                </label>
                <div className="col-md-9">
                  <Field
                    id="disposalMethod"
                    name="disposalMethod"
                    type="text"
                    placeholder="Biogas Production"
                    className="form-control bg-light"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
                  />
                  <ErrorMessage
                    name="disposalMethod"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="frequency" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Frequency
                </label>
                <div className="col-md-9">
                  <Field
                    id="frequency"
                    name="frequency"
                    as="select"
                    className="form-select bg-light"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
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
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Volume */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="volume" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Volume in (kg)
                </label>
                <div className="col-md-9">
                  <Field
                    id="volume"
                    name="volume"
                    type="text"
                    placeholder="120000kg"
                    className="form-control bg-light"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
                  />
                  <ErrorMessage
                    name="volume"
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
                    name="notes"
                    as="textarea"
                    rows={5}
                    placeholder="Lorem Ipsum"
                    className="form-control bg-light"
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

export default WasteManagement;