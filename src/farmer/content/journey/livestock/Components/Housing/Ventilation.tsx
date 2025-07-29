import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Saved from "../../Shared/Saved";
import { useNavigate } from "react-router-dom";  
import Popup from 'reactjs-popup';

// 1. Define form values type
interface FormValues {
  type: string;
  quality: string;
  photo: File | null;
  notes: string;
}

// 2. Use type guards in Yup validation
const validationSchema = Yup.object({
  type: Yup.string().required("Type is required"),
  quality: Yup.string().required("Quality is required"),
  photo: Yup.mixed()
    .test("fileSize", "File too large", (value) => {
      if (!value) return true;
      return value instanceof File ? value.size <= 10 * 1024 * 1024 : true;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      return value instanceof File
        ? ["application/pdf", "image/png", "image/jpeg"].includes(value.type)
        : true;
    }),
  notes: Yup.string(),
});

const initialValues: FormValues = {
  type: "",
  quality: "",
  photo: null,
  notes: "",
};

const Ventilation: React.FC = () => {
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
          Ventilation 
        </h5>
        {/* 3. Type Formik with FormValues */}
        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(_values, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
            setTimeout(() => {
              setShowSaved(true);
              setSubmitting(false);
              resetForm();
            }, 400);
          }}
        >
          {({ isSubmitting, resetForm, setFieldValue, values }) => (
            <Form>
              {/* Type */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="type"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Type
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="type"
                    name="type"
                    className="form-control bg-light"
                    placeholder="Lorem Ipsum"
                  />
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Quality */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="quality"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Quality
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="quality"
                    name="quality"
                    className="form-control bg-light"
                    placeholder="Lorem Ipsum"
                  />
                  <ErrorMessage
                    name="quality"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Photo */}
              <div className="row mb-3 align-items-start">
                <label
                  htmlFor="photo"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Photo
                </label>
                <div className="col-md-10">
                  <label
                    htmlFor="photo"
                    className="d-flex flex-column align-items-center justify-content-center p-3"
                    style={{
                      border: "2px dashed var(--Border, #ECECEC)",
                      borderRadius: "0.5rem",
                      background: "#f8f9fa",
                      minHeight: "10rem",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      className="position-absolute w-100 h-100 opacity-0"
                      style={{ cursor: "pointer", top: 0, left: 0 }}
                      onChange={(event) => {
                        setFieldValue("photo", event.currentTarget.files?.[0] ?? null);
                      }}
                    />
                    {/* 4. Type guard for values.photo */}
                    {values.photo ? (
                      <span className="body-regular" style={{ color: "#333" }}>
                        {values.photo.name}
                      </span>
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_436_94702)">
                            <path
                              d="M20.5 16.0508V20.0508C20.5 20.5812 20.2893 21.0906 19.9142 21.4657C19.5391 21.8408 19.0297 22.0508 18.5 22.0508H6.5C5.97029 22.0508 5.46086 21.8408 5.08579 21.4657C4.71071 21.0906 4.5 20.5812 4.5 20.0508V16.0508"
                              stroke="#457900"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12.5 14.0508V3.55078"
                              stroke="#457900"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.75 7.30078L12.5 3.55078L16.25 7.30078"
                              stroke="#457900"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_436_94702)">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(0.5 0.550781)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <p
                          className="body-regular mb-1"
                          style={{
                            color: "#457900",
                            fontWeight: 500,
                            fontSize: "1rem",
                          }}
                        >
                          Upload Photos
                        </p>
                        <p
                          className="body-regular text-center"
                          style={{
                            color: "var(--Secondary-Text, #777)",
                            fontSize: "0.875rem",
                          }}
                        >
                          PDF, PNG, JPG up to 10MB
                        </p>
                      </div>
                    )}
                  </label>
                  <ErrorMessage
                    name="photo"
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

export default Ventilation;