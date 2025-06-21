import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import Saved from "../../Shared/Saved";


interface VentilationFormValues {
  type: string;
  quality: string;
  photo: File | null;
  notes: string;
}

const initialValues: VentilationFormValues = {
  type: "",
  quality: "",
  photo: null,
  notes: "",
};  

const validationSchema = Yup.object({
  type: Yup.string().required("Type is required"),
  quality: Yup.string().required("Quality is required"),
  photo: Yup.mixed()
    .test("fileSize", "File too large", (value) => {
      if (!value) return true;
      return (value as File).size <= 10 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      return ["application/pdf", "image/png", "image/jpeg"].includes(
        (value as File).type
      );
    }),
  notes: Yup.string(),
});

const Ventilation: React.FC = () => {
  const [showSaved, setShowSaved] = useState(false);

  return (
    <>
      <div
        className="d-flex flex-column p-4 rounded-4"
        style={{
          background: '#FFF',
        }}
      >
        <h3 className="h3-semibold mb-4" style={{ color: 'var(--Primary-Text, #333)' }}>
          Ventilation
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setShowSaved(true);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              {/* Type */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="type" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Type
                </label>
                <div className="col-md-9">
                  <Field
                    id="type"
                    name="type"
                    type="text"
                    placeholder="Lorem Ipsum"
                    className="form-control bg-light"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
                  />
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Quality */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="quality" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Quality
                </label>
                <div className="col-md-9">
                  <Field
                    id="quality"
                    name="quality"
                    type="text"
                    placeholder="Lorem Ipsum"
                    className="form-control bg-light"
                    style={{ height: '2.5rem', borderRadius: '0.5rem' }}
                  />
                  <ErrorMessage
                    name="quality"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Photo */}
              <div className="row mb-3 align-items-start">
                <label htmlFor="photo" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
                  Photo
                </label>
                <div className="col-md-9">
                  <label
                    htmlFor="photo"
                    className="d-flex flex-column align-items-center justify-content-center bg-light"
                    style={{
                      height: '10rem',
                      border: '2px dashed #ECECEC',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      className="d-none"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("photo", event.currentTarget.files?.[0]);
                      }}
                    />
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        background: '#F5F5F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.5rem',
                      }}
                    >
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
                          <clipPath id="clip0_436_94702">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.5 0.550781)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <p
                      className="body-regular mb-1"
                      style={{
                        color: "var(--Secondary-Text, #777)",
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
                  </label>
                  <ErrorMessage
                    name="photo"
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
                  onClick={() => {
                    // Reset form
                    setFieldValue("type", "");
                    setFieldValue("quality", "");
                    setFieldValue("photo", null);
                    setFieldValue("notes", "");
                  }}
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
      {showSaved && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.2)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Saved onDone={() => setShowSaved(false)} />
        </div>
      )}
    </>
  );
};

export default Ventilation;