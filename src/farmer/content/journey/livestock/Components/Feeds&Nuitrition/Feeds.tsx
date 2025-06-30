import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LuUpload } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object({
  feedName: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Feed Name is required"),
  feedType: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Feed Type is required"),
  feedVariety: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Feed Variety is required"),
  nutritionValue: Yup.string()
    .max(200, "Must be 200 characters or less")
    .required("Nutrition Value is required"),
  purchaseDate: Yup.date().required("Purchase Date is required").nullable(),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be positive")
    .required("Quantity is required"),
  pricePerKg: Yup.number()
    .typeError("Price/Kg must be a number")
    .positive("Price/Kg must be positive")
    .required("Price/Kg is required"),
  supplier: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Supplier is required"),
  notes: Yup.string().max(500, "Must be 500 characters or less"),
  uploadPhoto: Yup.mixed()
    .test("fileSize", "File too large (max 10MB)", (value) =>
      !value || (value && value.size <= 10 * 1024 * 1024)
    )
    .test("fileType", "Unsupported File Format (PDF, PNG, JPG)", (value) =>
      !value ||
      (value &&
        ["application/pdf", "image/png", "image/jpeg"].includes(value.type))
    ),
});

const initialValues = {
  feedName: "",
  feedType: "",
  feedVariety: "",
  nutritionValue: "",
  purchaseDate: null,
  quantity: "",
  pricePerKg: "",
  supplier: "",
  notes: "",
  uploadPhoto: null,
};

const FeedsForm: React.FC = () => {
  return (
    <div className="w-100 rounded-4 bg-white border mt-3 p-4">
      <h5 className="mb-4 text-start" style={{ color: "#333" }}>
        Feeds
      </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form data", values);
          alert("Form submitted! Check console for data.");
        }}
      >
        {({ setFieldValue, isSubmitting, values, resetForm }) => (
          <Form>
            {/* Feed Name */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="feedName"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Feed Name
              </label>
              <div className="col-md-10">
                <Field
                  type="text"
                  id="feedName"
                  name="feedName"
                  className="form-control bg-light"
                  placeholder="Lorem Ipsum"
                />
                <ErrorMessage
                  name="feedName"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Feed Type */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="feedType"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Feed Type
              </label>
              <div className="col-md-10">
                <Field
                  type="text"
                  id="feedType"
                  name="feedType"
                  className="form-control bg-light"
                  placeholder="Lorem Ipsum"
                />
                <ErrorMessage
                  name="feedType"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Feed Variety */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="feedVariety"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Feed Variety
              </label>
              <div className="col-md-10">
                <Field
                  type="text"
                  id="feedVariety"
                  name="feedVariety"
                  className="form-control bg-light"
                  placeholder="Lorem Ipsum"
                />
                <ErrorMessage
                  name="feedVariety"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Nutrition Value */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="nutritionValue"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Nutrition Value
              </label>
              <div className="col-md-10">
                <Field
                  type="text"
                  id="nutritionValue"
                  name="nutritionValue"
                  className="form-control bg-light"
                  placeholder="Lorem Ipsum"
                />
                <ErrorMessage
                  name="nutritionValue"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Purchase Date */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="purchaseDate"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Purchase Date
              </label>
              <div className="col-md-10">
                <DatePicker
                  id="purchaseDate"
                  name="purchaseDate"
                  selected={values.purchaseDate}
                  onChange={(date) => setFieldValue("purchaseDate", date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  className="form-control bg-light"
                  wrapperClassName="w-100"
                />
                <ErrorMessage
                  name="purchaseDate"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="quantity"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Quantity of Feed
              </label>
              <div className="col-md-10">
                <Field
                  type="text"
                  id="quantity"
                  name="quantity"
                  className="form-control bg-light"
                  placeholder="Lorem Ipsum"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Price/Kg */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="pricePerKg"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Price/Kg
              </label>
              <div className="col-md-10">
                <Field
                  type="text"
                  id="pricePerKg"
                  name="pricePerKg"
                  className="form-control bg-light"
                  placeholder="Lorem Ipsum"
                />
                <ErrorMessage
                  name="pricePerKg"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Supplier */}
            <div className="row mb-3 align-items-center">
              <label
                htmlFor="supplier"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Supplier
              </label>
              <div className="col-md-10">
                <Field
                  type="text"
                  id="supplier"
                  name="supplier"
                  className="form-control bg-light"
                  placeholder="Lorem Ipsum"
                />
                <ErrorMessage
                  name="supplier"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            {/* Upload Photo */}
            <div className="row mb-3 align-items-start">
              <label
                htmlFor="uploadPhoto"
                className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
              >
                Upload Photo
              </label>
              <div className="col-md-10">
                <div
                  className="d-flex flex-column align-items-center justify-content-center position-relative p-3"
                  style={{
                    border: "2px dashed var(--Border, #ECECEC)",
                    borderRadius: "0.5rem",
                    background: "#f8f9fa",
                    minHeight: "10rem",
                  }}
                >
                  <input
                    id="uploadPhoto"
                    name="uploadPhoto"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="position-absolute w-100 h-100 opacity-0"
                    style={{ cursor: "pointer", top: 0, left: 0 }}
                    onChange={(event) => {
                      if (event.currentTarget.files && event.currentTarget.files[0]) {
                        setFieldValue("uploadPhoto", event.currentTarget.files[0]);
                      }
                    }}
                  />
                  <LuUpload size={23} color="#457900" />
                  <p
                    className="body-regular mb-1"
                    style={{ color: "var(--Secondary-Text, #777)" }}
                  >
                    {values.uploadPhoto
                      ? values.uploadPhoto.name
                      : "Upload Photos"}
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
                <ErrorMessage
                  name="uploadPhoto"
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
  );
};

export default FeedsForm;