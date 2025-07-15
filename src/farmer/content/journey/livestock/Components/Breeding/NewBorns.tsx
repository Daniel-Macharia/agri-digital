import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Saved from "../../Shared/Saved"; // Uncomment if you want to show a saved modal
// import { useNavigate } from "react-router-dom";  // Uncomment if you want to navigate after save

const validationSchema = Yup.object({
  identification: Yup.string().required("Identification is required"),
  numNewborns: Yup.number().min(1, "At least 1").required("Required"),
  identificationTag: Yup.string().required("Identification Tag is required"),
  sex: Yup.string().required("Sex is required"),
  healthStatus: Yup.string().required("Health Status is required"),
  colostrumIntake: Yup.string().required("Colostrum Intake is required"),
  birthType: Yup.string().required("Birth Type is required"),
  photo: Yup.mixed()
    .test("fileSize", "File too large", (value) => {
      if (!value) return true;
      return value instanceof File ? value.size <= 10 * 1024 * 1024 : true;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      return value instanceof File ? ["application/pdf", "image/png", "image/jpeg"].includes(value.type) : true;
    }),
  notes: Yup.string(),
});

const initialValues = {
  identification: "",
  numNewborns: 1,
  identificationTag: "",
  sex: "Male",
  healthStatus: "Normal",
  colostrumIntake: "",
  birthType: "",
  photo: null as File | null,
  notes: "",
};

const NewBorns = () => {
  const [showSaved, setShowSaved] = useState(false);
  // const navigate = useNavigate();

  // Dummy options for Identification dropdown
  const identificationOptions = [
    { value: "", label: "Select the Livestock identification" },
    { value: "id1", label: "Livestock 1" },
    { value: "id2", label: "Livestock 2" },
  ];

  return (
    <div className="w-100 rounded-4 bg-white border mt-3 p-4">
      <h5 className="mb-4 text-start" style={{ color: "#333" }}>
        New Borns
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
            {/* Identification */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="identification" className="col-md-2 col-form-label text-primary-custom body-regular text-start">
                Identification
              </label>
              <div className="col-md-10">
                <Field as="select" id="identification" name="identification" className="form-control bg-light">
                  {identificationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Field>
                <ErrorMessage name="identification" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* No. of Newborns */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="numNewborns" className="col-md-2 col-form-label text-primary-custom body-regular text-start">
                No. of Newborns
              </label>
              <div className="col-md-10">
                <Field type="number" id="numNewborns" name="numNewborns" className="form-control bg-light" min={1} />
                <ErrorMessage name="numNewborns" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Identification Tag */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="identificationTag" className="col-md-2 col-form-label text-primary-custom body-regular text-start">
                Identification Tag
              </label>
              <div className="col-md-10">
                <Field type="text" id="identificationTag" name="identificationTag" className="form-control bg-light" placeholder="Lorem" />
                <ErrorMessage name="identificationTag" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Sex */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="sex" className="col-md-2 col-form-label text-primary-custom body-regular text-start">
                Sex
              </label>
              <div className="col-md-10">
                <Field as="select" id="sex" name="sex" className="form-control bg-light">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field>
                <ErrorMessage name="sex" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Health Status */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="healthStatus" className="col-md-2 col-form-label text-primary-custom body-regular text-start">
                Health Status
              </label>
              <div className="col-md-10">
                <Field type="text" id="healthStatus" name="healthStatus" className="form-control bg-light" placeholder="Normal" />
                <ErrorMessage name="healthStatus" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Colostrum Intake */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="colostrumIntake" className="col-md-2 col-form-label text-primary-custom body-regular text-start">
                Colostrum Intake
              </label>
              <div className="col-md-10">
                <Field type="text" id="colostrumIntake" name="colostrumIntake" className="form-control bg-light" placeholder="Lorem" />
                <ErrorMessage name="colostrumIntake" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Birth Type */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="birthType" className="col-md-2 col-form-label text-primary-custom body-regular text-start">
                Birth Type
              </label>
              <div className="col-md-10">
                <Field type="text" id="birthType" name="birthType" className="form-control bg-light" placeholder="Lorem" />
                <ErrorMessage name="birthType" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Upload Photo */}
            <div className="row mb-3 align-items-start">
              <label htmlFor="photo" className="col-md-2 col-form-label text-primary-custom body-regular text-start">
                Upload Photo
              </label>
              <div className="col-md-10">
                <label htmlFor="photo" className="d-flex flex-column align-items-center justify-content-center p-3" style={{ border: "2px dashed var(--Border, #ECECEC)", borderRadius: "0.5rem", background: "#f8f9fa", minHeight: "7rem", cursor: "pointer", position: "relative" }}>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="position-absolute w-100 h-100 opacity-0"
                    style={{ cursor: "pointer", top: 0, left: 0 }}
                    onChange={(event) => {
                      setFieldValue("photo", event.currentTarget.files?.[0]);
                    }}
                  />
                  {values.photo && values.photo instanceof File ? (
                    <span className="body-regular" style={{ color: "#333" }}>{values.photo.name}</span>
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <g clipPath="url(#clip0_436_94702)">
                          <path d="M20.5 16.0508V20.0508C20.5 20.5812 20.2893 21.0906 19.9142 21.4657C19.5391 21.8408 19.0297 22.0508 18.5 22.0508H6.5C5.97029 22.0508 5.46086 21.8408 5.08579 21.4657C4.71071 21.0906 4.5 20.5812 4.5 20.0508V16.0508" stroke="#457900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12.5 14.0508V3.55078" stroke="#457900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8.75 7.30078L12.5 3.55078L16.25 7.30078" stroke="#457900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_436_94702)">
                            <rect width="24" height="24" fill="white" transform="translate(0.5 0.550781)" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="body-regular mb-1" style={{ color: "#457900", fontWeight: 500, fontSize: "1rem" }}>Upload Photos</p>
                      <p className="body-regular text-center" style={{ color: "var(--Secondary-Text, #777)", fontSize: "0.875rem" }}>PDF, PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
                <ErrorMessage name="photo" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Notes */}
            <div className="row mb-3 align-items-start">
              <label htmlFor="notes" className="col-md-2 col-form-label text-primary-custom body-regular text-start">
                Notes
              </label>
              <div className="col-md-10">
                <Field as="textarea" id="notes" name="notes" rows={5} className="form-control bg-light" placeholder="Lorem Ipsum" />
                <ErrorMessage name="notes" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Save Button */}
            <div className="d-flex justify-content-end mt-4">
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
  );
};

export default NewBorns;