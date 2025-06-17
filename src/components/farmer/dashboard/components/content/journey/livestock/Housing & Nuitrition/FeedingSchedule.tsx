import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

interface FormValues {
  identification: string;
  feedType: string;
  feedingTime: string;
  quantity: string;
  reminder: string;
  notes: string;
}

const validationSchema = Yup.object({
  identification: Yup.string().required('Identification is required'),
  feedType: Yup.string().required('Feed Type is required'),
  feedingTime: Yup.string().required('Feeding Time is required'),
  quantity: Yup.string()
    .required('Quantity per Cattle is required')
    .matches(/^\d+kg$/, 'Quantity must be in kg format (e.g., 25kg)'),
  reminder: Yup.string().required('Feeding Reminder is required'),
  notes: Yup.string(),
});

const initialValues: FormValues = {
  identification: '',
  feedType: '',
  feedingTime: '',
  quantity: '',
  reminder: '',
  notes: '',
};

const livestockData = [
  { id: 1, identification: 'Hannah' },
  { id: 2, identification: 'Stella' },
  { id: 3, identification: 'Alex' },
  { id: 4, identification: 'Lorem Ipsum' },
  { id: 5, identification: 'Lorem Ipsum' },
  { id: 6, identification: 'Lorem Ipsum' },
  { id: 7, identification: 'Lorem Ipsum' },
  { id: 8, identification: 'Lorem Ipsum' },
  { id: 9, identification: 'Lorem Ipsum' },
  { id: 10, identification: 'Lorem Ipsum' },
];

const FeedingSchedule: React.FC = () => {
  return (
    <div className="container-fluid p-3 p-md-4 p-lg-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Feeding Schedule</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ setFieldValue, isSubmitting, values }) => (
              <Form>
                <div className="row mb-3">
                  <label htmlFor="identification" className="col-md-3 col-form-label">Livestock Identification</label>
                  <div className="col-md-9">
                    <Field
                      as="select"
                      name="identification"
                      id="identification"
                      className="form-select"
                    >
                      <option value="">Select Identification</option>
                      {livestockData.map((livestock) => (
                        <option key={livestock.id} value={livestock.identification}>
                          {livestock.identification}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="identification" component="div" className="text-danger small" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="feedType" className="col-md-3 col-form-label">Feed Type</label>
                  <div className="col-md-9">
                    <Field
                      name="feedType"
                      type="text"
                      id="feedType"
                      className="form-control"
                      placeholder="Hay, Grain, Silage, etc."
                    />
                    <ErrorMessage name="feedType" component="div" className="text-danger small" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="feedingTime" className="col-md-3 col-form-label">Feeding Time</label>
                  <div className="col-md-9">
                    <TimePicker
                      onChange={(time) => setFieldValue('feedingTime', time)}
                      value={values.feedingTime}
                      className="form-control"
                      clearIcon={null}
                      clockIcon={null}
                    />
                    <ErrorMessage name="feedingTime" component="div" className="text-danger small" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="quantity" className="col-md-3 col-form-label">Quantity per Cattle</label>
                  <div className="col-md-9">
                    <Field
                      name="quantity"
                      type="text"
                      id="quantity"
                      className="form-control"
                      placeholder="e.g., 25kg"
                    />
                    <ErrorMessage name="quantity" component="div" className="text-danger small" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 col-form-label">Feeding Reminder</label>
                  <div className="col-md-9 d-flex align-items-center">
                    <div className="form-check form-check-inline">
                      <Field
                        type="radio"
                        name="reminder"
                        value="Yes"
                        className="form-check-input"
                        id="reminderYes"
                      />
                      <label className="form-check-label" htmlFor="reminderYes">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <Field
                        type="radio"
                        name="reminder"
                        value="No"
                        className="form-check-input"
                        id="reminderNo"
                      />
                      <label className="form-check-label" htmlFor="reminderNo">No</label>
                    </div>
                    <ErrorMessage name="reminder" component="div" className="text-danger small ms-3" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="notes" className="col-md-3 col-form-label">Notes</label>
                  <div className="col-md-9">
                    <Field
                      as="textarea"
                      name="notes"
                      id="notes"
                      rows={5}
                      className="form-control"
                      placeholder="Lorem Ipsum"
                    />
                    <ErrorMessage name="notes" component="div" className="text-danger small" />
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-outline-warning">Cancel</button>
                  <button type="submit" className="btn btn-success" disabled={isSubmitting}>Save</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FeedingSchedule;