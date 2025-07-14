import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const preMatingValidationSchema = Yup.object({
  identification: Yup.string().required('Identification is required'),
  breed: Yup.string().required('Breed is required'),
  age: Yup.string().required('Age is required'),
  conceptionDate: Yup.string().required('Conception date is required'),
  gestationPeriod: Yup.string().required('Gestation period is required'),
  notes: Yup.string(),
  breedPhoto: Yup.mixed()
    .test('fileSize', 'File too large', (value: File | null) => !value || value.size <= 10 * 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value: File | null) => !value || ["application/pdf", "image/png", "image/jpeg"].includes(value.type)),
  agePhoto: Yup.mixed()
    .test('fileSize', 'File too large', (value: File | null) => !value || value.size <= 10 * 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value: File | null) => !value || ["application/pdf", "image/png", "image/jpeg"].includes(value.type)),
});

export const preMatingInitialValues = {
  identification: '',
  breed: '',
  age: '',
  conceptionDate: '',
  gestationPeriod: '',
  notes: '',
  breedPhoto: null as File | null,
  agePhoto: null as File | null,
};

type PreMatingFormProps = { onSaved: () => void };

const PreMatingForm: React.FC<PreMatingFormProps> = ({ onSaved }) => (
  <Formik
    initialValues={preMatingInitialValues}
    validationSchema={preMatingValidationSchema}
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
        {/* Identification */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Identification</label>
          <div className="col-md-10">
            <Field as="select" name="identification" className="form-control bg-light">
              <option value="">Select the Livestock identification</option>
              <option value="id1">ID 1</option>
              <option value="id2">ID 2</option>
            </Field>
            <ErrorMessage name="identification" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Breed */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Breed</label>
          <div className="col-md-8">
            <Field type="text" name="breed" className="form-control bg-light" placeholder="Lorem Ipsum" />
            <ErrorMessage name="breed" component="div" className="text-danger small text-start" />
          </div>
          <div className="col-md-2">
            <input
              id="breedPhoto"
              name="breedPhoto"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="form-control"
              onChange={event => setFieldValue('breedPhoto', event.currentTarget.files?.[0] || null)}
            />
            {values.breedPhoto && <span className="small">{(values.breedPhoto as File).name}</span>}
            <ErrorMessage name="breedPhoto" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Age */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Age</label>
          <div className="col-md-8">
            <Field type="text" name="age" className="form-control bg-light" placeholder="23 Weeks" />
            <ErrorMessage name="age" component="div" className="text-danger small text-start" />
          </div>
          <div className="col-md-2">
            <input
              id="agePhoto"
              name="agePhoto"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="form-control"
              onChange={event => setFieldValue('agePhoto', event.currentTarget.files?.[0] || null)}
            />
            {values.agePhoto && <span className="small">{(values.agePhoto as File).name}</span>}
            <ErrorMessage name="agePhoto" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Conception Date */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Conception Date</label>
          <div className="col-md-10">
            <Field type="date" name="conceptionDate" className="form-control bg-light" />
            <ErrorMessage name="conceptionDate" component="div" className="text-danger small text-start" />
          </div>
        </div>
        {/* Gestation period */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-start">Gestation period</label>
          <div className="col-md-10">
            <Field type="text" name="gestationPeriod" className="form-control bg-light" placeholder="Weeks" />
            <ErrorMessage name="gestationPeriod" component="div" className="text-danger small text-start" />
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

export default PreMatingForm; 