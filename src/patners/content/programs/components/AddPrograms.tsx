import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface ProgramForm {
  programTitle: string;
  programObjectives: string;
  typeOfFarming: string;
  targetGroup: string;
  location: string;
  totalAmount: string;
  numberOfBeneficiaries: string;
  startDate: string;
  endDate: string;
  comments: string;
}

// Validation schema
const ProgramValidationSchema = Yup.object().shape({
  programTitle: Yup.string()
    .min(3, 'Program title must be at least 3 characters')
    .max(100, 'Program title must be less than 100 characters')
    .required('Program title is required'),
  programObjectives: Yup.string()
    .min(10, 'Program objectives must be at least 10 characters')
    .max(500, 'Program objectives must be less than 500 characters')
    .required('Program objectives are required'),
  typeOfFarming: Yup.string()
    .required('Type of farming is required'),
  targetGroup: Yup.string()
    .required('Target group is required'),
  location: Yup.string()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must be less than 100 characters')
    .required('Location is required'),
  totalAmount: Yup.string()
    .matches(/^KES\s\d{1,3}(,\d{3})*$/, 'Amount must be in format: KES X,XXX,XXX')
    .required('Total amount is required'),
  numberOfBeneficiaries: Yup.string()
    .matches(/^\d+$/, 'Number of beneficiaries must be a number')
    .test('min-beneficiaries', 'Must have at least 1 beneficiary', value => {
      return parseInt(value) >= 1;
    })
    .test('max-beneficiaries', 'Cannot exceed 10,000 beneficiaries', value => {
      return parseInt(value) <= 10000;
    })
    .required('Number of beneficiaries is required'),
  startDate: Yup.string()
    .required('Start date is required')
    .test('valid-date', 'Please enter a valid date', value => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    }),
  endDate: Yup.string()
    .required('End date is required')
    .test('valid-date', 'Please enter a valid date', value => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .test('after-start-date', 'End date must be after start date', function(value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return true;
      return new Date(value) > new Date(startDate);
    }),
  comments: Yup.string()
    .max(1000, 'Comments must be less than 1000 characters')
});

const AddPrograms: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: ProgramForm = {
    programTitle: 'Donation for Women',
    programObjectives: 'Lorem Ipsum',
    typeOfFarming: '',
    targetGroup: '',
    location: 'Kiambu',
    totalAmount: 'KES 5,000,000',
    numberOfBeneficiaries: '10',
    startDate: '',
    endDate: '',
    comments: 'Lorem Ipsum'
  };

  const handleSave = (values: ProgramForm) => {
    console.log('Saving program:', values);
    // Add save logic here
  };

  const handleSendInvitation = (values: ProgramForm) => {
    console.log('Sending invitation:', values);
    // Add send invitation logic here
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="card shadow-sm border-0" style={{ borderRadius: '12px', position: 'relative' }}>
        <div className="card-body p-4">
          {/* Header */}
          <div className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <button 
                className="btn btn-link p-0 me-3"
                onClick={() => navigate('/patners/programs')}
              >
                <i className="fas fa-arrow-left fs-4 text-muted"></i>
              </button>
            </div>
            <h2 className="fw-bold text-dark mb-0">Add a Program</h2>
          </div>

          {/* Floating Icons */}
          <div className="position-absolute" style={{ top: '100px', right: '30px', zIndex: 10 }}>
            <div className="d-flex flex-column gap-3">
              <button className="btn btn-success rounded-circle p-3" style={{ width: '50px', height: '50px' }}>
                <i className="fas fa-dollar-sign text-white fs-5"></i>
              </button>
              <button className="btn btn-outline-success rounded-circle p-3" style={{ width: '50px', height: '50px' }}>
                <i className="fas fa-seedling text-success fs-5"></i>
              </button>
            </div>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={ProgramValidationSchema}
            onSubmit={(values) => {
              console.log('Form submitted:', values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, isValid, dirty }) => (
              <Form>
                <div className="row g-4">
                  {/* Program Title */}
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                        Program Title
                      </label>
                      <div className="flex-grow-1">
                        <Field
                          type="text"
                          name="programTitle"
                          className={`form-control ${errors.programTitle && touched.programTitle ? 'is-invalid' : ''}`}
                          style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                        />
                        <ErrorMessage name="programTitle" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                  </div>

                  {/* Program Objectives */}
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                        Program Objectives
                      </label>
                      <div className="flex-grow-1">
                        <Field
                          type="text"
                          name="programObjectives"
                          className={`form-control ${errors.programObjectives && touched.programObjectives ? 'is-invalid' : ''}`}
                          style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                        />
                        <ErrorMessage name="programObjectives" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                  </div>

                  {/* Type of Farming */}
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                        Type of Farming
                      </label>
                      <div className="flex-grow-1">
                        <Field
                          as="select"
                          name="typeOfFarming"
                          className={`form-select ${errors.typeOfFarming && touched.typeOfFarming ? 'is-invalid' : ''}`}
                          style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                        >
                          <option value="">Select Type</option>
                          <option value="crop">Crop Farming</option>
                          <option value="livestock">Livestock Farming</option>
                          <option value="mixed">Mixed Farming</option>
                        </Field>
                        <ErrorMessage name="typeOfFarming" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                  </div>

                  {/* Target Group */}
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                        Target Group
                      </label>
                      <div className="flex-grow-1">
                        <Field
                          as="select"
                          name="targetGroup"
                          className={`form-select ${errors.targetGroup && touched.targetGroup ? 'is-invalid' : ''}`}
                          style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                        >
                          <option value="">Select Group</option>
                          <option value="women">Women</option>
                          <option value="youth">Youth</option>
                          <option value="smallholders">Smallholder Farmers</option>
                        </Field>
                        <ErrorMessage name="targetGroup" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                        Location
                      </label>
                      <div className="flex-grow-1">
                        <Field
                          type="text"
                          name="location"
                          className={`form-control ${errors.location && touched.location ? 'is-invalid' : ''}`}
                          style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                        />
                        <ErrorMessage name="location" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                        Total Amount
                      </label>
                      <div className="flex-grow-1">
                        <Field
                          type="text"
                          name="totalAmount"
                          className={`form-control ${errors.totalAmount && touched.totalAmount ? 'is-invalid' : ''}`}
                          style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                          placeholder="KES 1,000,000"
                        />
                        <ErrorMessage name="totalAmount" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                  </div>

                  {/* Number of Beneficiaries */}
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                        No. of Beneficiaries
                      </label>
                      <div className="flex-grow-1">
                        <Field
                          type="text"
                          name="numberOfBeneficiaries"
                          className={`form-control ${errors.numberOfBeneficiaries && touched.numberOfBeneficiaries ? 'is-invalid' : ''}`}
                          style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                        />
                        <ErrorMessage name="numberOfBeneficiaries" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                  </div>

                  {/* Start Date & End Date */}
                  <div className="col-12">
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center">
                        <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                          Start Date
                        </label>
                        <div className="position-relative">
                          <Field
                            type="date"
                            name="startDate"
                            className={`form-control pe-5 ${errors.startDate && touched.startDate ? 'is-invalid' : ''}`}
                            style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                          />
                          <i className="fas fa-calendar position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                          <ErrorMessage name="startDate" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '100px' }}>
                          End Date
                        </label>
                        <div className="position-relative">
                          <Field
                            type="date"
                            name="endDate"
                            className={`form-control pe-5 ${errors.endDate && touched.endDate ? 'is-invalid' : ''}`}
                            style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                          />
                          <i className="fas fa-calendar position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                          <ErrorMessage name="endDate" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                        Comments
                      </label>
                      <div className="flex-grow-1">
                        <Field
                          type="text"
                          name="comments"
                          className={`form-control ${errors.comments && touched.comments ? 'is-invalid' : ''}`}
                          style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                        />
                        <ErrorMessage name="comments" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-between mt-5">
                  <button
                    type="button"
                    className="btn btn-outline-warning px-4 py-2"
                    onClick={() => handleSave(values)}
                    disabled={!isValid || !dirty}
                    style={{ borderRadius: '8px', borderColor: '#ffc107', color: '#ffc107' }}
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success px-4 py-2"
                    disabled={!isValid || !dirty}
                    style={{ borderRadius: '8px' }}
                  >
                    Send Invitation
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddPrograms;
