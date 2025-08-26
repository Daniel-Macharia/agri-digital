import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  advertisementTitle: string;
  advertType: string;
  targetAudience: string;
  mainContent: string;
  photo: File | null;
  video: File | null;
  documents: File | null;
  visibility: string[];
  startDate: string;
  duration: string;
  callToAction: string;
}

const validationSchema = Yup.object({
  advertisementTitle: Yup.string().required('Title is required'),
  advertType: Yup.string().required('Advert type is required'),
  targetAudience: Yup.string().required('Target audience is required'),
  mainContent: Yup.string().required('Main content is required'),
  photo: Yup.mixed().nullable(),
  video: Yup.mixed().nullable(),
  documents: Yup.mixed().nullable(),
  visibility: Yup.array().min(1, 'Select at least one visibility option'),
  startDate: Yup.date().required('Start date is required'),
  duration: Yup.number().required('Duration is required').positive('Must be positive').integer(),
  callToAction: Yup.string().required('Call to action is required'),
});

const initialValues: FormValues = {
  advertisementTitle: '',
  advertType: '',
  targetAudience: '',
  mainContent: '',
  photo: null,
  video: null,
  documents: null,
  visibility: [],
  startDate: '',
  duration: '',
  callToAction: '',
};

const Advertisements: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="bg-light" style={{ minHeight: '100vh', padding: 0, margin: 0 }}>
      {/* Back Button - top left, outside card */}
      <button
        type="button"
        className="btn btn-link p-0 ps-2 pt-3 mb-0"
        style={{ position: 'absolute', left: 0, top: 0, color: '#333', fontSize: 24, textDecoration: 'none', zIndex: 2 }}
        onClick={() => navigate('/farmer/package')}
        aria-label="Back"
      >
        &larr;
      </button>
      <div className="w-100 rounded-4 bg-white border mt-3 p-4 mx-auto" >
        <h5 className="mb-4 text-start" style={{ color: '#333', fontWeight: 600, fontSize: 20 }}>
          Add an Advertisement
        </h5>
        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values, resetForm }) => (
            <Form>
              {/* Advertisement Title */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="advertisementTitle" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular fw-semibold">Advertisement Title</label>
                <div className="col-md-10">
                  <Field type="text" id="advertisementTitle" name="advertisementTitle" className="form-control bg-light" placeholder="Lorem Ipsum" style={{ fontWeight: 500 }} />
                  <ErrorMessage name="advertisementTitle" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Advert Type & Target Audience */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="advertType" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular fw-semibold">Advert Type</label>
                <div className="col-md-4">
                  <Field as="select" id="advertType" name="advertType" className="form-select bg-light">
                    <option value="">Select</option>
                    <option value="type1">Type 1</option>
                  </Field>
                  <ErrorMessage name="advertType" component="div" className="text-danger small text-start" />
                </div>
                <label htmlFor="targetAudience" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular fw-semibold text-md-end">Target Audience</label>
                <div className="col-md-4">
                  <Field as="select" id="targetAudience" name="targetAudience" className="form-select bg-light">
                    <option value="">Select</option>
                    <option value="audience1">Audience 1</option>
                  </Field>
                  <ErrorMessage name="targetAudience" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Main Content */}
              <div className="row mb-3 align-items-start">
                <label htmlFor="mainContent" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular fw-semibold">Main Content</label>
                <div className="col-md-10">
                  <div className="border rounded-top p-2 bg-light mb-0" style={{ fontWeight: 500, fontSize: 15 }}><strong>B</strong> / <em>U</em></div>
                  <Field as="textarea" id="mainContent" name="mainContent" rows={5} className="form-control bg-light" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} />
                  <ErrorMessage name="mainContent" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* File Uploads */}
              {[ { name: 'photo', title: 'Upload Photo', accept: 'image/*', helper: 'PNG, JPG up to 10MB' }, { name: 'video', title: 'Upload Video', accept: 'video/*', helper: 'MP4 up to 10MB' }, { name: 'documents', title: 'Attach Documents', accept: '.pdf,.doc,.docx', helper: 'Slides/PDFs, MP4 up to 10MB' } ].map(f => (
                <div className="row mb-3 align-items-center" key={f.name}>
                  <label htmlFor={f.name} className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular fw-semibold">{f.title}</label>
                  <div className="col-md-10">
                    <label
                      htmlFor={f.name}
                      className="d-flex flex-column align-items-center justify-content-center p-3"
                      style={{
                        border: "2px dashed var(--Border, #ECECEC)",
                        borderRadius: "0.5rem",
                        background: "#f8f9fa",
                        minHeight: "10rem",
                        cursor: "pointer",
                        position: "relative",
                        width: '100%'
                      }}
                    >
                      <input
                        id={f.name}
                        name={f.name}
                        type="file"
                        className="position-absolute w-100 h-100 opacity-0"
                        style={{ cursor: "pointer", top: 0, left: 0 }}
                        onChange={(event) => setFieldValue(f.name, event.currentTarget.files ? event.currentTarget.files[0] : null)}
                        accept={f.accept}
                      />
                      {/* @ts-ignore */}
                      {values[f.name as keyof FormValues] ? (
                        <span className="body-regular" style={{ color: "#333" }}>{(values[f.name as keyof FormValues] as File)?.name}</span>
                      ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <svg width="25" height="25" fill="#457900" viewBox="0 0 25 25"><g><path d="M20.5 16.0508V20.0508C20.5 20.5812 20.2893 21.0906 19.9142 21.4657C19.5391 21.8408 19.0297 22.0508 18.5 22.0508H6.5C5.97029 22.0508 5.46086 21.8408 5.08579 21.4657C4.71071 21.0906 4.5 20.5812 4.5 20.0508V16.0508" stroke="#457900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.5 14.0508V3.55078" stroke="#457900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.75 7.30078L12.5 3.55078L16.25 7.30078" stroke="#457900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>
                          <p className="body-regular mb-1" style={{ color: "#457900", fontWeight: 500, fontSize: "1rem" }}>{f.title}</p>
                          <p className="body-regular text-center" style={{ color: "var(--Secondary-Text, #777)", fontSize: "0.875rem" }}>{f.helper}</p>
                        </div>
                      )}
                    </label>
                    <ErrorMessage name={f.name} component="div" className="text-danger small text-start" />
                  </div>
                </div>
              ))}

              {/* Preferred Visibility */}
              <div className="row mb-3 align-items-start">
                <label className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular fw-semibold">Preferred Visibility</label>
                <div className="col-md-10">
                  <div role="group" aria-labelledby="checkbox-group" className="d-flex flex-column gap-2">
                    <label className="form-check">
                      <Field type="checkbox" name="visibility" value="platform" className="form-check-input me-2" />
                      Entire Platform
                    </label>
                    <label className="form-check">
                      <Field type="checkbox" name="visibility" value="counties" className="form-check-input me-2" />
                      Specific Counties
                    </label>
                    <label className="form-check">
                      <Field type="checkbox" name="visibility" value="groups" className="form-check-input me-2" />
                      Tagged Groups
                    </label>
                  </div>
                  <ErrorMessage name="visibility" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Schedule & Budget */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular fw-semibold">Schedule & Budget</label>
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-6 mb-2 mb-md-0">
                      <label htmlFor="startDate" className="form-label">Preferred Start Date</label>
                      <Field type="date" id="startDate" name="startDate" className="form-control bg-light" />
                      <ErrorMessage name="startDate" component="div" className="text-danger small text-start" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="duration" className="form-label">Duration days</label>
                      <Field type="text" id="duration" name="duration" className="form-control bg-light" />
                      <ErrorMessage name="duration" component="div" className="text-danger small text-start" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="callToAction" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular fw-semibold">Call to Action</label>
                <div className="col-md-10">
                  <Field type="text" id="callToAction" name="callToAction" className="form-control bg-light" placeholder="Purchase Now" />
                  <ErrorMessage name="callToAction" component="div" className="text-danger small text-start" />
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
                 Submit for Review
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
    </div>
  );
};

export default Advertisements;