import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


// Example livestock options (should be replaced with real data source if available)
const identificationOptions = [
  { value: "", label: "Select the Livestock identification" },
  { value: "cow-001", label: "Cow 001" },
  { value: "sheep-002", label: "Sheep 002" },
];

const detectionMethodOptions = [
  { value: "", label: "Select Detection Method" },
  { value: "Visual", label: "Visual" },
  { value: "Mount Detector", label: "Mount Detector" },
  { value: "Activity Monitor", label: "Activity Monitor" },
];

const initialValues = {
  identification: "",
  detectionMethod: "Visual",
  startDate: "",
  endDate: "",
  nextAction: "Lorem Ipsum",
  notes: "Lorem Ipsum",
};

const validationSchema = Yup.object({
  identification: Yup.string().required("Identification is required"),
  detectionMethod: Yup.string().required("Detection Method is required"),
  startDate: Yup.date().nullable().required("Start Date is required"),
  endDate: Yup.date().nullable().required("End Date is required"),
  nextAction: Yup.string().required("Next Action is required"),
  notes: Yup.string(),
});

const ErusDetection: React.FC = () => {
  return (
    
    <div className="w-100 rounded-4 bg-white border mt-3 p-4">
        <h5 className="mb-4 text-start" style={{ color: "#333" }}>Estrus Detection</h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ isSubmitting, resetForm }) => ( 
            <Form>
              {/* Identification */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="identification" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">Identification</label>
                <div className="col-md-10">
                  <Field
                    as="select"
                    id="identification"
                    name="identification"
                    className="form-select bg-light "
                  >
                    {identificationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="identification" component="div" className="text-danger small" />
                </div>
              </div>

              {/* Detection Method */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="detectionMethod" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">Detection Method</label>
                <div className="col-md-10">
                  <Field
                    as="select"
                    id="detectionMethod"
                    name="detectionMethod"
                    className="form-select bg-light"
                  >
                    {detectionMethodOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="detectionMethod" component="div" className="text-danger small" />
                </div>
              </div>

              {/* Start Date */}
              <div className="row mb-3 align-items-center ">
                <label htmlFor="startDate" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">Start Date</label>
                <div className="col-md-10">
                  <Field
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="form-control w-100 bg-light"
                    placeholder="Select Start Date"
                  />
                  <ErrorMessage name="startDate" component="div" className="text-danger small w-100" />
                </div>
              </div>

              {/* End Date */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="endDate" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">End Date</label>
                <div className="col-md-10">
                  <Field
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="form-control bg-light"
                    placeholder="Select End Date"
                  />
                  <ErrorMessage name="endDate" component="div" className="text-danger small w-100" />
                </div>
              </div>

              {/* Next Action */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="nextAction" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">Next Action</label>
                <div className="col-md-10">
                  <Field
                    name="nextAction"
                    type="text"
                    id="nextAction"
                    className="form-control bg-light"
                    placeholder="Lorem Ipsum"
                  />
                  <ErrorMessage name="nextAction" component="div" className="text-danger small" />
                </div>
              </div>

              {/* Notes */}
              <div className="row mb-3 align-items-start">
                <label htmlFor="notes" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">Notes</label>
                <div className="col-md-10">
                  <Field
                    as="textarea"
                    id="notes"
                    name="notes"
                    rows={5}
                    className="form-control bg-light"
                    placeholder="Lorem Ipsum"
                  />
                  <ErrorMessage name="notes" component="div" className="text-danger small" />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button type="button" className="btn btn-outline-warning" onClick={() => resetForm()}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#457900', color: 'white' }} disabled={isSubmitting}>Continue</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    
  );
};

export default ErusDetection;


