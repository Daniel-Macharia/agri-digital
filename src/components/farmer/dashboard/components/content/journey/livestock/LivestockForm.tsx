import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormValues {
  feedName: string;
  feedType: string;
  feedVariety: string;
  nutritionValue: string;
  purchaseDate: string;
  quantityOfFeed: string;
  pricePerKg: string;
  supplier: string;
  uploadPhoto: File | null;
  notes: string;
}

const validationSchema = Yup.object({
  feedName: Yup.string().required("Feed Name is required"),
  feedType: Yup.string().required("Feed Type is required"),
  feedVariety: Yup.string().required("Feed Variety is required"),
  nutritionValue: Yup.string().required("Nutrition Value is required"),
  purchaseDate: Yup.string().required("Purchase Date is required"),
  quantityOfFeed: Yup.string().required("Quantity of Feed is required"),
  pricePerKg: Yup.string().required("Price/Kg is required"),
  supplier: Yup.string().required("Supplier is required"),
  notes: Yup.string(),
  uploadPhoto: Yup.mixed(),
});

const initialValues: FormValues = {
  feedName: "",
  feedType: "",
  feedVariety: "",
  nutritionValue: "",
  purchaseDate: "",
  quantityOfFeed: "",
  pricePerKg: "",
  supplier: "",
  uploadPhoto: null,
  notes: "",
};

const LiveStockForm: React.FC = () => {
  return (
    <>
      <div className="p-4 rounded-4" style={{ background: "#FFF" }}>
        <h3 className="h3-semibold mb-4" style={{ color: "var(--Primary-Text, #333)" }}>
          Livestock
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form Values:", values);
            alert("Form submitted successfully!");
          }}
        >
          {({ setFieldValue, values, resetForm, isValid, dirty }) => (
            <Form className="w-100">
              {/* Feed Name */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="feedName"
                  className="col-md-3 col-form-label body-regular"
                  style={{ color: "var(--Primary-Text, #333)" }}
                >
                  Feed Name
                </label>
                <div className="col-md-9">
                  <Field
                    type="text"
                    name="feedName"
                    className="form-control bg-light"
                    placeholder="Enter Feed Name"
                    style={{ height: "2.5rem", borderRadius: "0.5rem" }}
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
                  className="col-md-3 col-form-label body-regular"
                  style={{ color: "var(--Primary-Text, #333)" }}
                >
                  Feed Type
                </label>
                <div className="col-md-9">
                  <Field
                    type="text"
                    name="feedType"
                    className="form-control bg-light"
                    placeholder="Enter Feed Type"
                    style={{ height: "2.5rem", borderRadius: "0.5rem" }}
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
                  className="col-md-3 col-form-label body-regular"
                  style={{ color: "var(--Primary-Text, #333)" }}
                >
                  Feed Variety
                </label>
                <div className="col-md-9">
                  <Field
                    type="text"
                    name="feedVariety"
                    className="form-control bg-light"
                    placeholder="Enter Feed Variety"
                    style={{ height: "2.5rem", borderRadius: "0.5rem" }}
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
                  className="col-md-3 col-form-label body-regular"
                  style={{ color: "var(--Primary-Text, #333)" }}
                >
                  Nutrition Value
                </label>
                <div className="col-md-9">
                  <Field
                    type="text"
                    name="nutritionValue"
                    className="form-control bg-light"
                    placeholder="Enter Nutrition Value"
                    style={{ height: "2.5rem", borderRadius: "0.5rem" }}
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
                  className="col-md-3 col-form-label body-regular"
                  style={{ color: "var(--Primary-Text, #333)" }}
                >
                  Purchase Date
                </label>
                <div className="col-md-9">
                  <DatePicker
                    selected={values.purchaseDate ? new Date(values.purchaseDate) : null}
                    onChange={(date) => setFieldValue("purchaseDate", date)}
                    className="form-control bg-light"
                    placeholderText="Select a date"
                    dateFormat="yyyy-MM-dd"
                    wrapperClassName="w-100"
                    style={{ height: "2.5rem", borderRadius: "0.5rem" }}
                  />
                  <ErrorMessage
                    name="purchaseDate"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Quantity of Feed */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="quantityOfFeed"
                  className="col-md-3 col-form-label body-regular"
                  style={{ color: "var(--Primary-Text, #333)" }}
                >
                  Quantity of Feed
                </label>
                <div className="col-md-9">
                  <Field
                    type="text"
                    name="quantityOfFeed"
                    className="form-control bg-light"
                    placeholder="Enter Quantity in kg"
                    style={{ height: "2.5rem", borderRadius: "0.5rem" }}
                  />
                  <ErrorMessage
                    name="quantityOfFeed"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Price/Kg */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="pricePerKg"
                  className="col-md-3 col-form-label body-regular"
                  style={{ color: "var(--Primary-Text, #333)" }}
                >
                  Price/Kg
                </label>
                <div className="col-md-9">
                  <Field
                    type="text"
                    name="pricePerKg"
                    className="form-control bg-light"
                    placeholder="Enter Price per Kg"
                    style={{ height: "2.5rem", borderRadius: "0.5rem" }}
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
                  className="col-md-3 col-form-label body-regular"
                  style={{ color: "var(--Primary-Text, #333)" }}
                >
                  Supplier
                </label>
                <div className="col-md-9">
                  <Field
                    type="text"
                    name="supplier"
                    className="form-control bg-light"
                    placeholder="Enter Supplier Name"
                    style={{ height: "2.5rem", borderRadius: "0.5rem" }}
                  />
                  <ErrorMessage
                    name="supplier"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Upload Photo */}
              <div className="row mb-3">
                <label
                  htmlFor="uploadPhoto"
                  className="col-md-3 col-form-label body-regular"
                  style={{ color: "var(--Primary-Text, #333)" }}
                >
                  Upload Photo
                </label>
                <div className="col-md-9">
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
                      type="file"
                      name="uploadPhoto"
                      className="position-absolute w-100 h-100 opacity-0"
                      style={{ cursor: "pointer", top: 0, left: 0 }}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(
                          "uploadPhoto",
                          event.currentTarget.files
                            ? event.currentTarget.files[0]
                            : null
                        );
                      }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M21.4999 15.5508V19.5508C21.4999 20.0812 21.2892 20.5917 20.9141 20.9668C20.539 21.3419 20.0285 21.5508 19.4999 21.5508H5.49992C4.96949 21.5508 4.45896 21.3419 4.08389 20.9668C3.70882 20.5917 3.49992 20.0812 3.49992 19.5508V15.5508"
                        stroke="#457900"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.5 8.55078L12.5 4.55078L8.5 8.55078"
                        stroke="#457900"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.5 4.55078V15.5508"
                        stroke="#457900"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p
                      className="body-regular mb-1 mt-2"
                      style={{ color: "var(--Secondary-Text, #777)" }}
                    >
                      {values.uploadPhoto ? values.uploadPhoto.name : "Upload Photos"}
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
              <div className="row mb-3">
                <label
                  htmlFor="notes"
                  className="col-md-3 col-form-label body-regular"
                  style={{ color: "var(--Primary-Text, #333)" }}
                >
                  Notes
                </label>
                <div className="col-md-9">
                  <Field
                    as="textarea"
                    name="notes"
                    rows={4}
                    className="form-control bg-light"
                    placeholder="Enter notes here"
                    style={{ borderRadius: "0.5rem" }}
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
                  type="button"
                  onClick={() => resetForm()}
                  style={{ padding: "0.625rem 1rem", borderRadius: "0.375rem" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={!isValid || !dirty}
                  style={{ padding: "0.625rem 1rem", borderRadius: "0.375rem", background: "var(--Primary, #457900)" }}
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

export default LiveStockForm;