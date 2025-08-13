import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const identificationOptions = [
  { value: '', label: 'Select the Livestock identification' },
  { value: 'cow-001', label: 'Cow 001' },
  { value: 'sheep-002', label: 'Sheep 002' },
];

const validationSchema = Yup.object({
  identification: Yup.string().required('Identification is required'),
  breed: Yup.string().required('Breed is required'),
  age: Yup.string().required('Age is required'),
  conceptionDate: Yup.string().required('Conception Date is required'),
  gestationPeriod: Yup.string().required('Gestation period is required'),
  notes: Yup.string(),
});

const initialValues = {
  identification: '',
  breed: '',
  age: '',
  conceptionDate: '',
  gestationPeriod: '',
  notes: '',
};

const PreMatingForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-100 rounded-4 bg-white border mt-3 p-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(_, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              navigate('/farmer/projects/livestock/breeding/new');
              setSubmitting(false);
              resetForm();
            }, 400);
          }}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              {/* Identification */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="identification" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Identification
                </label>
                <div className="col-md-10">
                  <Field as="select" id="identification" name="identification" className="form-select bg-light">
                    {identificationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="identification" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Breed */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="breed" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Breed
                </label>
                <div className="col-md-10">
                  <Field type="text" id="breed" name="breed" className="form-control bg-light" placeholder="Lorem Ipsum" />
                  <ErrorMessage name="breed" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Age */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="age" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Age
                </label>
                <div className="col-md-10">
                  <Field type="text" id="age" name="age" className="form-control bg-light" placeholder="23 Weeks" />
                  <ErrorMessage name="age" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Conception Date */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="conceptionDate" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Conception Date
                </label>
                <div className="col-md-10">
                  <Field type="date" id="conceptionDate" name="conceptionDate" className="form-control bg-light" />
                  <ErrorMessage name="conceptionDate" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Gestation period */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="gestationPeriod" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Gestation period
                </label>
                <div className="col-md-10">
                  <Field type="text" id="gestationPeriod" name="gestationPeriod" className="form-control bg-light" placeholder="Weeks" />
                  <ErrorMessage name="gestationPeriod" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="row mb-3 align-items-start">
                <label htmlFor="notes" className="col-md-2 col-form-label d-flex align-self-stretch text-primary-custom body-regular">
                  Additional Notes
                </label>
                <div className="col-md-10">
                  <Field as="textarea" id="notes" name="notes" rows={5} className="form-control bg-light" placeholder="" />
                  <ErrorMessage name="notes" component="div" className="text-danger small text-start" />
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-outline-warning ventilation-cancel-btn"
                  style={{ borderRadius: '0.375rem', padding: '0.375rem 1.25rem', fontSize: '0.95rem', minWidth: '100px' }}
                  onClick={() => resetForm()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#457900', color: 'white', borderRadius: '0.375rem', padding: '0.375rem 1.25rem', fontSize: '0.95rem', minWidth: '100px', border: 'none' }}
                  disabled={isSubmitting}
                >
                  Continue
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
    </>
  );
};

export default PreMatingForm;

