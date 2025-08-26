import React, { useState } from 'react';
import {FaCheck, FaUpload } from 'react-icons/fa';
import { PiUploadSimpleThin } from "react-icons/pi";
import * as yup from 'yup';
import { ValidationError } from 'yup';

// Form data interface
interface ProjectProposalData {
  fullName: string;
  projectTitle: string;
  description: string;
  grantAmount: string;
  expectedImpact: string;
  supportingDocuments: File | null;
}

// Validation schema using Yup
const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Full name should only contain letters and spaces'),
  projectTitle: yup
    .string()
    .required('Project title is required')
    .min(5, 'Project title must be at least 5 characters')
    .max(100, 'Project title cannot exceed 100 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description cannot exceed 1000 characters'),
  grantAmount: yup
    .string()
    .required('Grant amount is required')
    .matches(/^\d+(\.\d{1,2})?$/, 'Grant amount must be a valid number')
    .test('min-amount', 'Grant amount must be at least KES 10,000', (value) => {
      return value ? parseFloat(value) >= 10000 : false;
    })
    .test('max-amount', 'Grant amount cannot exceed KES 10,000,000', (value) => {
      return value ? parseFloat(value) <= 10000000 : false;
    }),
  expectedImpact: yup
    .string()
    .required('Expected impact is required')
    .min(20, 'Expected impact must be at least 20 characters')
    .max(1000, 'Expected impact cannot exceed 1000 characters'),
});

const ProjectProposalForm = () => {
  const [formData, setFormData] = useState<ProjectProposalData>({
    fullName: 'John Doe',
    projectTitle: 'Smart Farming Solutions for Rural Communities',
    description: 'lorem ipsum...',
    grantAmount: '2000000',
    expectedImpact: 'lorem ipsum...',
    supportingDocuments: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProjectProposalData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof ProjectProposalData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          supportingDocuments: 'Please upload PDF, PNG, or JPG files only'
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          supportingDocuments: 'File size must be less than 10MB'
        }));
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      supportingDocuments: file
    }));

    if (errors.supportingDocuments) {
      setErrors(prev => ({
        ...prev,
        supportingDocuments: ''
      }));
    }
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      if (validationErrors instanceof ValidationError) {
        const newErrors: Partial<Record<keyof ProjectProposalData, string>> = {};
        validationErrors.inner.forEach(error => {
          if (error.path && error.message) {
            newErrors[error.path as keyof ProjectProposalData] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error('Unexpected validation error:', validationErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form data:', formData);
      alert('Project proposal submitted successfully!');
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('Error submitting proposal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatAmount = (amount: string) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

   return (
    <div className="container-fluid min-vh-100 p-0" style={{ backgroundColor: '#eeeeee' }}>
      {/* Form Container */}
      <div className="row">
        <div className="col-12">
          <div className="bg-white rounded-top-5 px-1 pt-4 pb-5 ms-3">
            <h4 className="fw-semibold mb-4 text-start" style={{ paddingLeft: '15px' }}>
              Project Proposal
            </h4>
            
            <div className="ms-3">
              {/* Full Name */}
              <div className="mb-4 row align-items-center">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="fullName" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Full Name <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-12 col-sm-10 me-0">
                  <input
                    type="text"
                    id="fullName"
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    style={{ fontSize: '14px' }}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback text-start">{errors.fullName}</div>
                  )}
                </div>
              </div>

              {/* Project Title */}
              <div className="mb-4 row align-items-center">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="projectTitle" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Project Title <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-12 col-sm-10">
                  <input
                    type="text"
                    id="projectTitle"
                    className={`form-control ${errors.projectTitle ? 'is-invalid' : ''}`}
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder="Enter project title"
                    style={{ fontSize: '14px' }}
                  />
                  {errors.projectTitle && (
                    <div className="invalid-feedback text-start">{errors.projectTitle}</div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 row">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="description" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Description <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-12 col-sm-10">
                  <textarea
                    id="description"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project in detail..."
                    rows={4}
                    style={{ fontSize: '14px', resize: 'vertical' }}
                  />
                  <div className="form-text text-muted" style={{ fontSize: '12px' }}>
                    {formData.description.length}/1000 characters
                  </div>
                  {errors.description && (
                    <div className="invalid-feedback text-start">{errors.description}</div>
                  )}
                </div>
              </div>

              {/* Grant Amount */}
              <div className="mb-4 row align-items-center">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="grantAmount" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Grant Amount <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-12 col-sm-10">
                  <div className="input-group">
                    <span className="input-group-text" style={{ fontSize: '14px' }}>KES</span>
                    <input
                      type="text"
                      id="grantAmount"
                      className={`form-control ${errors.grantAmount ? 'is-invalid' : ''}`}
                      name="grantAmount"
                      value={formData.grantAmount}
                      onChange={handleInputChange}
                      placeholder="2,000,000"
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                  {formData.grantAmount && !errors.grantAmount && (
                    <div className="form-text text-success" style={{ fontSize: '12px' }}>
                      {formatAmount(formData.grantAmount)}
                    </div>
                  )}
                  {errors.grantAmount && (
                    <div className="invalid-feedback text-start d-block">{errors.grantAmount}</div>
                  )}
                </div>
              </div>

              {/* Expected Impact */}
              <div className="mb-4 row">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="expectedImpact" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Expected Impact <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-12 col-sm-10">
                  <textarea
                    id="expectedImpact"
                    className={`form-control ${errors.expectedImpact ? 'is-invalid' : ''}`}
                    name="expectedImpact"
                    value={formData.expectedImpact}
                    onChange={handleInputChange}
                    placeholder="Describe the expected impact of your project..."
                    rows={4}
                    style={{ fontSize: '14px', resize: 'vertical' }}
                  />
                  <div className="form-text text-muted" style={{ fontSize: '12px' }}>
                    {formData.expectedImpact.length}/1000 characters
                  </div>
                  {errors.expectedImpact && (
                    <div className="invalid-feedback text-start">{errors.expectedImpact}</div>
                  )}
                </div>
              </div>

              {/* Supporting Documents */}
              <div className="mb-4 row">
                <div className="col-12 col-sm-3" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="supportingDocuments" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Supporting Documents
                  </label>
                </div>
                <div className="col-12 col-sm-12">
                  <div 
                    className="border-2 border-dashed rounded p-4 text-center" 
                    style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}
                  >
                    <PiUploadSimpleThin className="text-muted mb-2" size={32} />
                    <p className="text-muted mb-1" style={{fontSize: '14px'}}>
                      Upload Proposal Document
                    </p>
                    <p className="text-muted mb-3 small" style={{fontSize: '12px'}}>
                      PDF, PNG, JPG up to 10MB
                    </p>
                    <input
                      type="file"
                      id="supportingDocuments"
                      className="form-control-file d-none"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="supportingDocuments" className="btn btn-outline-secondary btn-sm">
                      <FaUpload className="me-1" />
                      Choose File
                    </label>
                    {formData.supportingDocuments && (
                      <div className="mt-3">
                        <p className="text-success small mb-0">
                          <FaCheck className="me-1" />
                          {formData.supportingDocuments.name}
                        </p>
                        <p className="text-muted small mb-0">
                          {(formData.supportingDocuments.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    )}
                  </div>
                  {errors.supportingDocuments && (
                    <div className="text-danger small mt-1">{errors.supportingDocuments}</div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="row">
                <div className="col-12 d-flex justify-content-center gap-3">
                  <button
                    type="button"
                    className="btn py-2 px-5 fw-bold text-white w-100"
                    style={{ 
                      backgroundColor: '#556B2F', 
                      minWidth: '200px',
                      border: 'none'
                    }}
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Proposal'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          .rounded-top-5 {
            border-top-right-radius: 2rem;
            border-top-left-radius: 2rem;
          }
          .border-dashed {
            border: 2px dashed #dee2e6 !important;
          }
          .form-control:focus {
            border-color: #556B2F;
            box-shadow: 0 0 0 0.2rem rgba(85, 107, 47, 0.25);
          }
          .btn-outline-secondary:hover {
            background-color: #556B2F;
            border-color: #556B2F;
          }
          @media (max-width: 576px) {
            .col-sm-3 {
              margin-bottom: 0.5rem;
            }
            .ms-3 {
              margin-left: 0.5rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProjectProposalForm;