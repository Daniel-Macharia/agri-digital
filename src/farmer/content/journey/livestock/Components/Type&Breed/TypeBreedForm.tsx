<<<<<<< HEAD
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LuUpload } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa"; 
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


type FormValues = {
  livestockName: string;
  breed: string;
  purpose: string;
  weight: string;
  sex: string;
  age: string;
  source: string;
  notes: string;
  attachPhoto: File | null;
  longDescription: string;
};

const TypeBreedForm = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    livestockName: Yup.string()
      .max(100, 'Must be 100 characters or less')
      .required('Livestock Name is required'),
    breed: Yup.string()
      .max(50, 'Must be 50 characters or less')
      .required('Breed is required'),
    purpose: Yup.string()
      .max(200, 'Must be 200 characters or less')
      .required('Purpose is required'),
    weight: Yup.number()
      .typeError('Weight must be a number')
      .positive('Weight must be a positive number')
      .required('Weight is required'),
    sex: Yup.string()
      .oneOf(['Male', 'Female'], 'Invalid Sex')
      .required('Sex is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .positive('Age must be a positive number')
      .integer('Age must be an integer')
      .required('Age is required'),
    source: Yup.string()
      .max(100, 'Must be 100 characters or less')
      .required('Source is required'),
    notes: Yup.string()
      .max(500, 'Must be 500 characters or less'),
    attachPhoto: Yup.mixed()
      .test(
        'fileSize',
        'File too large (max 10MB)',
        (value) => !value || (value && (value as File).size <= 10 * 1024 * 1024) // 10MB
      )
      .test(
        'fileType',
        'Unsupported File Format (PDF, PNG, JPG)',
        (value) =>
          !value || (value && ['application/pdf', 'image/png', 'image/jpeg'].includes((value as File).type))
      ),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      livestockName: '',
      breed: '',
      purpose: '',
      weight: '',
      sex: 'Male', // Default value
      age: '',
      source: '',
      notes: '',
      attachPhoto: null,
      longDescription: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form data', values);
      alert('Form submitted! Check console for data.');
    },
  });

  return (
    <>
      {/* Header for arrow and button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <FaArrowLeft size={24} color="#333" style={{ cursor: 'pointer' }} onClick={() => navigate("../")}/>
        <Button
          variant="success"
          style={{ padding: '0.625rem 1rem', borderRadius: '0.375rem', background: 'var(--Primary, #457900)' }}
          onClick={() => navigate("request")}
        >
          Request for service
        </Button>
      </div>

      <div
        className="p-4 rounded-4"
        style={{
          background: '#FFF',
        }}
      >
        <h3 className="h3-semibold mb-4" style={{ color: 'var(--Primary-Text, #333)' }}>Type & Breed Selection</h3>
        <form onSubmit={formik.handleSubmit} className="w-100">
          {/* Livestock Name */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="livestockName" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Livestock Name
            </label>
            <div className="col-md-9">
              <input
                id="livestockName"
                name="livestockName"
                type="text"
                placeholder="Lorem Ipsum"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.livestockName}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.livestockName && formik.errors.livestockName && (
                <div className="text-danger small">{formik.errors.livestockName}</div>
              )}
            </div>
          </div>

          {/* Breed */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="breed" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Breed
            </label>
            <div className="col-md-9">
              <input
                id="breed"
                name="breed"
                type="text"
                placeholder="Lorem Ipsum"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.breed}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.breed && formik.errors.breed && (
                <div className="text-danger small">{formik.errors.breed}</div>
              )}
            </div>
          </div>

          {/* Purpose */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="purpose" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Purpose
            </label>
            <div className="col-md-9">
              <input
                id="purpose"
                name="purpose"
                type="text"
                placeholder="Enter Purpose"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.purpose}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.purpose && formik.errors.purpose && (
                <div className="text-danger small">{formik.errors.purpose}</div>
              )}
            </div>
          </div>

          {/* Weight */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="weight" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Weight
            </label>
            <div className="col-md-9">
              <input
                id="weight"
                name="weight"
                type="text"
                placeholder="Enter Weight in kg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.weight}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.weight && formik.errors.weight && (
                <div className="text-danger small">{formik.errors.weight}</div>
              )}
            </div>
          </div>

          {/* Sex */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="sex" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Sex
            </label>
            <div className="col-md-9">
              <select
                id="sex"
                name="sex"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sex}
                className="form-select bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formik.touched.sex && formik.errors.sex && (
                <div className="text-danger small">{formik.errors.sex}</div>
              )}
            </div>
          </div>

          {/* Age */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="age" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Age
            </label>
            <div className="col-md-9">
              <input
                id="age"
                name="age"
                type="text"
                placeholder="Enter Age in months"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-danger small">{formik.errors.age}</div>
              )}
            </div>
          </div>

          {/* Source */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="source" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Source
            </label>
            <div className="col-md-9">
              <input
                id="source"
                name="source"
                type="text"
                placeholder="Enter Source"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.source}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.source && formik.errors.source && (
                <div className="text-danger small">{formik.errors.source}</div>
              )}
            </div>
          </div>

          {/* Long Description */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="longDescription" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Long Description
            </label>
            <div className="col-md-9">
              <input
                id="longDescription"
                name="longDescription"
                type="text"
                placeholder="Enter Long Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.longDescription}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.longDescription && formik.errors.longDescription && (
                <div className="text-danger small">{formik.errors.longDescription}</div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="row mb-3">
            <label htmlFor="notes" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Notes
            </label>
            <div className="col-md-9">
              <textarea
                id="notes"
                name="notes"
                placeholder="Enter Notes"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notes}
                className="form-control bg-light"
                style={{ borderRadius: '0.5rem' }}
                rows={5}
              />
              {formik.touched.notes && formik.errors.notes && (
                <div className="text-danger small">{formik.errors.notes}</div>
              )}
            </div>
          </div>

          {/* Attach Photo */}
          <div className="row mb-3">
            <label htmlFor="attachPhoto" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Attach Photo
            </label>
            <div className="col-md-9">
              <div
                className="d-flex flex-column align-items-center justify-content-center position-relative p-3"
                style={{
                  border: "2px dashed var(--Border, #ECECEC)",
                  borderRadius: "0.5rem",
                  background: "#f8f9fa",
                  minHeight: '10rem',
                }}
              >
                <input
                  id="attachPhoto"
                  name="attachPhoto"
                  type="file"
                  accept=".pdf, .png, .jpg, .jpeg"
                  className="position-absolute w-100 h-100 opacity-0"
                  style={{ cursor: "pointer", top: 0, left: 0 }}
                  onChange={(event) => {
                    if (event.currentTarget.files && event.currentTarget.files[0]) {
                      formik.setFieldValue('attachPhoto', event.currentTarget.files[0]);
                    }
                  }}
                  onBlur={formik.handleBlur}
                />
                <LuUpload size={23} color="#457900" />
                <p className="body-regular mb-1" style={{ color: "var(--Secondary-Text, #777)" }}>
                  {formik.values.attachPhoto ? formik.values.attachPhoto.name : 'Upload Photos'}
                </p>
                <p className="body-regular text-center" style={{ color: "var(--Secondary-Text, #777)", fontSize: "0.875rem" }}>
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>
              {formik.touched.attachPhoto && formik.errors.attachPhoto && (
                <div className="text-danger small">{formik.errors.attachPhoto}</div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Button
              variant="outline-warning"
              style={{ padding: '0.625rem 1rem', borderRadius: '0.375rem' }}
              type="button"
              onClick={() => formik.resetForm()}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              style={{ padding: '0.625rem 1rem', borderRadius: '0.375rem', background: 'var(--Primary, #457900)' }}
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              
            >
              Save
            </Button>
          </div>
        </form>
=======
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Saved from "../../Shared/Saved";

const validationSchema = Yup.object({
  livestockName: Yup.string().max(100, "Must be 100 characters or less").required("Livestock Name is required"),
  breed: Yup.string().max(50, "Must be 50 characters or less").required("Breed is required"),
  purpose: Yup.string().max(200, "Must be 200 characters or less").required("Purpose is required"),
  weight: Yup.number().typeError("Weight must be a number").positive("Weight must be a positive number").required("Weight is required"),
  sex: Yup.string().oneOf(["Male", "Female"], "Invalid Sex").required("Sex is required"),
  age: Yup.number().typeError("Age must be a number").positive("Age must be a positive number").integer("Age must be an integer").required("Age is required"),
  source: Yup.string().max(100, "Must be 100 characters or less").required("Source is required"),
  notes: Yup.string().max(500, "Must be 500 characters or less"),
  attachPhoto: Yup.mixed()
    .test(
      "fileSize",
      "File too large (max 10MB)",
      (value) => !value || (value && value.size <= 10 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Unsupported File Format (PDF, PNG, JPG)",
      (value) =>
        !value || ["application/pdf", "image/png", "image/jpeg"].includes(value.type)
    ),
});

const initialValues = {
  livestockName: "",
  breed: "",
  purpose: "",
  weight: "",
  sex: "Male",
  age: "",
  source: "",
  notes: "",
  attachPhoto: null,
};

const TypeBreedForm: React.FC = () => {
  const [showSaved, setShowSaved] = useState(false);
  const navigate = useNavigate();

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
          Type & Breed Selection
        </h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setShowSaved(true);
              setSubmitting(false);
              resetForm();
            }, 400);
          }}
        >
          {({ isSubmitting, resetForm, setFieldValue, values }) => (
            <Form>
              {/* Livestock Name */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="livestockName" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Livestock Name
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="livestockName"
                    name="livestockName"
                    className="form-control bg-light"
                    placeholder="Lorem Ipsum"
                  />
                  <ErrorMessage name="livestockName" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Breed */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="breed" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Breed
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="breed"
                    name="breed"
                    className="form-control bg-light"
                    placeholder="Lorem Ipsum"
                  />
                  <ErrorMessage name="breed" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Purpose */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="purpose" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Purpose
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="purpose"
                    name="purpose"
                    className="form-control bg-light"
                    placeholder="Enter Purpose"
                  />
                  <ErrorMessage name="purpose" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Weight */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="weight" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Weight
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="weight"
                    name="weight"
                    className="form-control bg-light"
                    placeholder="Enter Weight in kg"
                  />
                  <ErrorMessage name="weight" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Sex */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="sex" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Sex
                </label>
                <div className="col-md-10">
                  <Field as="select" id="sex" name="sex" className="form-select bg-light">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Field>
                  <ErrorMessage name="sex" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Age */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="age" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Age
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="age"
                    name="age"
                    className="form-control bg-light"
                    placeholder="Enter Age in months"
                  />
                  <ErrorMessage name="age" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Source */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="source" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Source
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="source"
                    name="source"
                    className="form-control bg-light"
                    placeholder="Enter Source"
                  />
                  <ErrorMessage name="source" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Notes */}
              <div className="row mb-3 align-items-start">
                <label htmlFor="notes" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Notes
                </label>
                <div className="col-md-10">
                  <Field
                    as="textarea"
                    id="notes"
                    name="notes"
                    rows={5}
                    className="form-control bg-light"
                    placeholder="Enter Notes"
                  />
                  <ErrorMessage name="notes" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Attach Photo */}
              <div className="row mb-3 align-items-start">
                <label htmlFor="attachPhoto" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Attach Photo
                </label>
                <div className="col-md-10">
                  <label
                    htmlFor="attachPhoto"
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
                      id="attachPhoto"
                      name="attachPhoto"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      className="position-absolute w-100 h-100 opacity-0"
                      style={{ cursor: "pointer", top: 0, left: 0 }}
                      onChange={(event) => {
                        setFieldValue("attachPhoto", event.currentTarget.files?.[0]);
                      }}
                    />
                    {values.attachPhoto ? (
                      <span className="body-regular" style={{ color: "#333" }}>
                        {values.attachPhoto.name}
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
                  <ErrorMessage name="attachPhoto" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-outline-warning typebreed-cancel-btn"
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
                .typebreed-cancel-btn:hover, .typebreed-cancel-btn:focus {
                  background-color: transparent !important;
                  color: #ffc107 !important;
                  border-color: #ffc107 !important;
                }
              `}</style>
            </Form>
          )}
        </Formik>
>>>>>>> bill
      </div>
    </>
  );
};

export default TypeBreedForm;