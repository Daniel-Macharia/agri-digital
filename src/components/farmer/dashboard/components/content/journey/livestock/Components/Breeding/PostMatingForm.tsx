import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const postMatingValidationSchema = Yup.object({
  confirmationMethod: Yup.string().required('Confirmation method is required'),
  expectedDueDate: Yup.string().required('Expected due date is required'),
  actualDeliveryDate: Yup.string(),
  birthComplications: Yup.string().required('Required'),
  healthComplications: Yup.string().required('Required'),
  statusOfPregnancy: Yup.string().required('Status is required'),
  vetVisits: Yup.string().required('Required'),
  notes: Yup.string(),
  confirmationPhoto: Yup.mixed()
    .test('fileSize', 'File too large', (value: File | null) => !value || value.size <= 10 * 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value: File | null) => !value || ["application/pdf", "image/png", "image/jpeg"].includes(value.type)),
  deliveryPhoto: Yup.mixed()
    .test('fileSize', 'File too large', (value: File | null) => !value || value.size <= 10 * 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value: File | null) => !value || ["application/pdf", "image/png", "image/jpeg"].includes(value.type)),
});

export const postMatingInitialValues = {
  confirmationMethod: '',
  expectedDueDate: '',
  actualDeliveryDate: '',
  birthComplications: '',
  healthComplications: '',
  statusOfPregnancy: '',
  vetVisits: '',
  notes: '',
  confirmationPhoto: null as File | null,
  deliveryPhoto: null as File | null,
};

type PostMatingFormProps = { onSaved: () => void };

const PostMatingForm: React.FC<PostMatingFormProps> = ({ onSaved }) => (
  <Formik
    initialValues={postMatingInitialValues}
    validationSchema={postMatingValidationSchema}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        onSaved();
        setSubmitting(false);
        resetForm();
      }, 400);
    }}
  >
    {({ isSubmitting, setFieldValue, values, resetForm }) => (
      <Form>
        {/* Confirmation Method */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Confirmation Method</label>
          <div className="col-md-8">
            <Field type="text" name="confirmationMethod" className="form-control bg-light" placeholder="Ultra sound" />
            <ErrorMessage name="confirmationMethod" component="div" className="text-danger small text-start" />
          </div>
          <div className="col-md-2">
            <input
              id="confirmationPhoto"
              name="confirmationPhoto"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="form-control"
              onChange={event => setFieldValue('confirmationPhoto', event.currentTarget.files?.[0] || null)}
            />
            {values.confirmationPhoto && <span className="small">{(values.confirmationPhoto as File).name}</span>}
            <ErrorMessage name="confirmationPhoto" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Expected Due Date */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Expected Due Date</label>
          <div className="col-md-10">
            <Field type="date" name="expectedDueDate" className="form-control bg-light" />
            <ErrorMessage name="expectedDueDate" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Actual Delivery Date */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Actual Delivery Date</label>
          <div className="col-md-8">
            <Field type="date" name="actualDeliveryDate" className="form-control bg-light" />
            <ErrorMessage name="actualDeliveryDate" component="div" className="text-danger small text-start" />
          </div>
          <div className="col-md-2">
            <input
              id="deliveryPhoto"
              name="deliveryPhoto"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="form-control"
              onChange={event => setFieldValue('deliveryPhoto', event.currentTarget.files?.[0] || null)}
            />
            {values.deliveryPhoto && <span className="small">{(values.deliveryPhoto as File).name}</span>}
            <ErrorMessage name="deliveryPhoto" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Birth Complications */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Birth Complications</label>
          <div className="col-md-10">
            <div className="form-check form-check-inline">
              <Field type="radio" name="birthComplications" value="yes" className="form-check-input" id="birthCompYes" />
              <label className="form-check-label" htmlFor="birthCompYes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <Field type="radio" name="birthComplications" value="no" className="form-check-input" id="birthCompNo" />
              <label className="form-check-label" htmlFor="birthCompNo">No</label>
            </div>
            <ErrorMessage name="birthComplications" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Health Complications */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Health Complications</label>
          <div className="col-md-10">
            <div className="form-check form-check-inline">
              <Field type="radio" name="healthComplications" value="yes" className="form-check-input" id="healthCompYes" />
              <label className="form-check-label" htmlFor="healthCompYes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <Field type="radio" name="healthComplications" value="no" className="form-check-input" id="healthCompNo" />
              <label className="form-check-label" htmlFor="healthCompNo">No</label>
            </div>
            <ErrorMessage name="healthComplications" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Status of Pregnancy */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Status of Pregnancy</label>
          <div className="col-md-10">
            <Field type="text" name="statusOfPregnancy" className="form-control bg-light" />
            <ErrorMessage name="statusOfPregnancy" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Veterinary Visits */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Veterinary Visits</label>
          <div className="col-md-10">
            <div className="form-check form-check-inline">
              <Field type="radio" name="vetVisits" value="yes" className="form-check-input" id="vetVisitsYes" />
              <label className="form-check-label" htmlFor="vetVisitsYes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <Field type="radio" name="vetVisits" value="no" className="form-check-input" id="vetVisitsNo" />
              <label className="form-check-label" htmlFor="vetVisitsNo">No</label>
            </div>
            <ErrorMessage name="vetVisits" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Additional Notes */}
        <div className="row mb-3 align-items-start">
          <label className="col-md-2 col-form-label text-start">Additional Notes</label>
          <div className="col-md-10">
            <Field as="textarea" name="notes" rows={4} className="form-control bg-light" />
            <ErrorMessage name="notes" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Buttons */}
        <div className="d-flex justify-content-end mt-4">
          <button type="button" className="btn btn-outline-warning me-2" onClick={() => resetForm()}>Cancel</button>
          <button type="submit" className="btn btn-success" disabled={isSubmitting}>Continue</button>
        </div>
      </Form>
    )}
  </Formik>
);

export default PostMatingForm; 