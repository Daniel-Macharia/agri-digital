import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";  

const validationSchema = Yup.object({
  confirmationMethod: Yup.string().required("Confirmation Method is required"),
  expectedDueDate: Yup.date().required("Expected Due Date is required"),
  actualDeliveryDate: Yup.date(),
  birthComplications: Yup.string().required("Birth Complications is required"),
  healthComplications: Yup.string().required("Health Complications is required"),
  statusOfPregnancy: Yup.string().required("Status of Pregnancy is required"),
  veterinaryVisits: Yup.string().required("Veterinary Visits is required"),
  additionalNotes: Yup.string(),
});

const initialValues = {
  confirmationMethod: "",
  expectedDueDate: "",
  actualDeliveryDate: "",
  birthComplications: "",
  healthComplications: "",
  statusOfPregnancy: "",
  veterinaryVisits: "",
  additionalNotes: "",
};

const PostMatingForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-100 rounded-4 bg-white border mt-3 p-4">  
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(_values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              navigate('/farmer/projects/livestock/breeding/new');
              setSubmitting(false);
              resetForm();
            }, 400);
          }}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              {/* Confirmation Method */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="confirmationMethod"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Confirmation Method
                </label>
                <div className="col-md-10">
                  <Field
                    as="select"
                    id="confirmationMethod"
                    name="confirmationMethod"
                    className="form-control bg-light"
                  >
                    <option value="">Select Confirmation Method</option>
                    <option value="ultrasound">Ultra sound</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="confirmationMethod"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Expected Due Date */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="expectedDueDate"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Expected Due Date
                </label>
                <div className="col-md-10">
                  <Field
                    type="date"
                    id="expectedDueDate"
                    name="expectedDueDate"
                    className="form-control bg-light"
                  />
                  <ErrorMessage
                    name="expectedDueDate"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Actual Delivery Date */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="actualDeliveryDate"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Actual Delivery Date
                </label>
                <div className="col-md-10">
                  <Field
                    type="date"
                    id="actualDeliveryDate"
                    name="actualDeliveryDate"
                    className="form-control bg-light"
                  />
                  <ErrorMessage
                    name="actualDeliveryDate"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Birth Complications */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="birthComplications"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Birth Complications
                </label>
                <div className="col-md-10 d-flex justify-content-end align-items-center">
                  <div className="d-flex gap-3">
                    <label className="custom-radio-label position-relative d-flex align-items-center" style={{ cursor: 'pointer' }}>
                      <Field type="radio" name="birthComplications" value="yes" className="custom-radio-input" />
                      <span className="custom-radio-span ms-2"></span>
                      Yes
                    </label>
                    <label className="custom-radio-label position-relative d-flex align-items-center" style={{ cursor: 'pointer' }}>
                      <Field type="radio" name="birthComplications" value="no" className="custom-radio-input" />
                      <span className="custom-radio-span ms-2"></span>
                      No
                    </label>
                  </div>
                  <ErrorMessage
                    name="birthComplications"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Health Complications */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="healthComplications"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Health Complications
                </label>
                <div className="col-md-10 d-flex justify-content-end align-items-center">
                  <div className="d-flex gap-3">
                    <label className="custom-radio-label position-relative d-flex align-items-center" style={{ cursor: 'pointer' }}>
                      <Field type="radio" name="healthComplications" value="yes" className="custom-radio-input" />
                      <span className="custom-radio-span ms-2"></span>
                      Yes
                    </label>
                    <label className="custom-radio-label position-relative d-flex align-items-center" style={{ cursor: 'pointer' }}>
                      <Field type="radio" name="healthComplications" value="no" className="custom-radio-input" />
                      <span className="custom-radio-span ms-2"></span>
                      No
                    </label>
                  </div>
                  <ErrorMessage
                    name="healthComplications"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Status of Pregnancy */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="statusOfPregnancy"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Status of Pregnancy
                </label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    id="statusOfPregnancy"
                    name="statusOfPregnancy"
                    className="form-control bg-light"
                  />
                  <ErrorMessage
                    name="statusOfPregnancy"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Veterinary Visits */}
              <div className="row mb-3 align-items-center">
                <label
                  htmlFor="veterinaryVisits"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Veterinary Visits
                </label>
                <div className="col-md-10 d-flex justify-content-end align-items-center">
                  <div className="d-flex gap-3">
                    <label className="custom-radio-label position-relative d-flex align-items-center" style={{ cursor: 'pointer' }}>
                      <Field type="radio" name="veterinaryVisits" value="yes" className="custom-radio-input" />
                      <span className="custom-radio-span ms-2"></span>
                      Yes
                    </label>
                    <label className="custom-radio-label position-relative d-flex align-items-center" style={{ cursor: 'pointer' }}>
                      <Field type="radio" name="veterinaryVisits" value="no" className="custom-radio-input" />
                      <span className="custom-radio-span ms-2"></span>
                      No
                    </label> 
                  </div>
                  <ErrorMessage
                    name="veterinaryVisits"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="row mb-3 align-items-start">
                <label
                  htmlFor="additionalNotes"
                  className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular"
                >
                  Additional Notes
                </label>
                <div className="col-md-10">
                  <Field
                    as="textarea"
                    id="additionalNotes"
                    name="additionalNotes"
                    rows={5}
                    className="form-control bg-light"
                    placeholder="Lorem Ipsum"
                  />
                  <ErrorMessage
                    name="additionalNotes"
                    component="div"
                    className="text-danger small text-start"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-outline-warning "
                  style={{ borderRadius: "0.375rem", padding: "0.375rem 1.25rem", fontSize: "0.95rem", minWidth: "100px", backgroundColor: "#f4a261" }}
                  onClick={() => resetForm()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: "#457900", color: "white", borderRadius: "0.375rem", padding: "0.375rem 1.25rem", fontSize: "0.95rem", minWidth: "100px", border: "none" }}
                  disabled={isSubmitting}
                >
                  Continue
                </button>
              </div>
              <style>{`
                .ventilation-cancel-btn:hover, .ventilation-cancel-btn:focus {
                  background-color: transparent !important;
                  color: #f4a261 !important;
                  border-color: #f4a261 !important;
                }
                .custom-radio-input {
                  position: absolute;
                  opacity: 0;
                  width: 0;
                  height: 0;
                }
                .custom-radio-span {
                  display: inline-block;
                  width: 18px;
                  height: 18px;
                  border-radius: 50%;
                  border: 2px solid #ccc;
                  background: #fff;
                  margin-right: 8px;
                  vertical-align: middle;
                  transition: border-color 0.2s, background 0.2s;
                }
                .custom-radio-input:checked + .custom-radio-span {
                  background: #457900;
                  border-color: #457900;
                }
              `}</style>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default PostMatingForm;