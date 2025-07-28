import React, { useState } from 'react';
import { FiArrowLeft, FiUpload, FiCheck } from 'react-icons/fi';
import { PiUploadSimpleThin } from "react-icons/pi";
import * as yup from 'yup';
import { ValidationError } from 'yup';

// Form data interface
interface SponsorshipApplicationData {
  fullName: string;
  projectName: string;
  contactInformation: string;
  justification: string;
  sponsorshipType: string;
  supportingDocuments: File | null;
  digitalSignature: string;
}

// Validation schema using Yup
const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Full name should only contain letters and spaces'),
  projectName: yup
    .string()
    .required('Project name is required')
    .min(3, 'Project name must be at least 3 characters'),
  contactInformation: yup
    .string()
    .required('Contact information is required')
    .matches(/^\+254\d{9}$/, 'Please enter a valid Kenyan phone number (+254XXXXXXXXX)'),
  justification: yup
    .string()
    .required('Justification is required')
    .min(50, 'Justification must be at least 50 characters')
    .max(1000, 'Justification cannot exceed 1000 characters'),
  sponsorshipType: yup
    .string()
    .required('Type of sponsorship is required'),
  digitalSignature: yup
    .string()
    .required('Digital signature is required')
    .min(2, 'Please enter your full name as signature'),
});

interface SponsorshipApplicationFormProps {
  sponsor: {
    id: string;
    title: string;
    organization: string;
    award: {
      type: string;
      amount: string;
    };
  };
  onBack: () => void;
}

const SponsorshipApplicationForm: React.FC<SponsorshipApplicationFormProps> = ({ sponsor, onBack }) => {
  const [formData, setFormData] = useState<SponsorshipApplicationData>({
    fullName: 'John Doe',
    projectName: '',
    contactInformation: '+254 712345678',
    justification: '',
    sponsorshipType: '',
    supportingDocuments: null,
    digitalSignature: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SponsorshipApplicationData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sponsorshipTypes = [
    'Crop Production',
    'Livestock Farming',
    'Equipment Purchase',
    'Infrastructure Development',
    'Training & Education',
    'Market Access',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof SponsorshipApplicationData]) {
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
        const newErrors: Partial<Record<keyof SponsorshipApplicationData, string>> = {};
        validationErrors.inner.forEach(error => {
          if (error.path && error.message) {
            newErrors[error.path as keyof SponsorshipApplicationData] = error.message;
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
      console.log('Application data:', formData);
      console.log('Sponsor details:', sponsor);
      alert('Sponsorship application submitted successfully!');
      onBack();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 p-0" style={{ backgroundColor: '#eeeeee' }}>
      {/* Header */}
      <div className="sponsor-application__header" style={{ backgroundColor: '#eeeeee', padding: '1rem 0' }}>
        <div className="container">
          <button 
            className="btn btn-link p-0 text-decoration-none text-dark d-flex align-items-center"
            onClick={onBack}
          >
            <FiArrowLeft size={20} className="me-2" />
            <span>Back to Sponsors</span>
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="bg-white rounded-4 shadow-sm px-4 pt-4 pb-5">
              <h4 className="fw-semibold mb-4 text-start">
                Application Form
              </h4>
              
              {/* Sponsor Info Banner */}
              <div className="alert alert-light border mb-4">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-semibold">{sponsor.title}</h6>
                    <p className="mb-1 text-success">{sponsor.organization}</p>
                    <small className="text-muted">{sponsor.award.type}: {sponsor.award.amount}</small>
                  </div>
                </div>
              </div>
              
              {/* Full Name */}
              <div className="mb-4 row align-items-center">
                <div className="col-12 col-md-2">
                  <label htmlFor="fullName" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Full Name <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-12 col-md-10">
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

              {/* Project Name */}
              <div className="mb-4 row align-items-center">
                <div className="col-12 col-md-2">
                  <label htmlFor="projectName" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Project Name
                  </label>
                </div>
                <div className="col-12 col-md-10">
                  <select
                    id="projectName"
                    className={`form-select ${errors.projectName ? 'is-invalid' : ''}`}
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    style={{ fontSize: '14px' }}
                    
                  >
                    <option value="">Select Project Name</option>
                    <option value="Smart Farming Project">Smart Farming Project</option>
                    <option value="Livestock Development">Livestock Development</option>
                    <option value="Crop Enhancement Initiative">Crop Enhancement Initiative</option>
                    <option value="Agricultural Equipment Upgrade">Agricultural Equipment Upgrade</option>
                    <option value="Farm Infrastructure Development">Farm Infrastructure Development</option>
                  </select>
                  {errors.projectName && (
                    <div className="invalid-feedback text-start">{errors.projectName}</div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-4 row align-items-center">
                <div className="col-12 col-md-2">
                  <label htmlFor="contactInformation" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Contact Information<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-12 col-md-10">
                  <input
                    type="tel"
                    id="contactInformation"
                    className={`form-control ${errors.contactInformation ? 'is-invalid' : ''}`}
                    name="contactInformation"
                    value={formData.contactInformation}
                    onChange={handleInputChange}
                    placeholder="+254 712345678"
                    style={{ fontSize: '14px' }}
                  />
                  {errors.contactInformation && (
                    <div className="invalid-feedback text-start">{errors.contactInformation}</div>
                  )}
                </div>
              </div>

              {/* Justification */}
              <div className="mb-4 row">
                <div className="col-12 col-md-2">
                  <label htmlFor="justification" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Justification <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-12 col-md-10">
                  <textarea
                    id="justification"
                    className={`form-control ${errors.justification ? 'is-invalid' : ''}`}
                    name="justification"
                    value={formData.justification}
                    onChange={handleInputChange}
                    placeholder="Explain why you need this sponsorship and how it will benefit your project..."
                    rows={4}
                    style={{ fontSize: '14px', resize: 'vertical' }}
                  />
                  <div className="form-text text-muted" style={{ fontSize: '12px' }}>
                    {formData.justification.length}/1000 characters
                  </div>
                  {errors.justification && (
                    <div className="invalid-feedback text-start">{errors.justification}</div>
                  )}
                </div>
              </div>

              {/* Type of Sponsorship */}
              <div className="mb-4 row align-items-center">
                <div className="col-12 col-md-2">
                  <label htmlFor="sponsorshipType" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Type of Sponsorship
                  </label>
                </div>
                <div className="col-12 col-md-10">
                  <select
                    id="sponsorshipType"
                    className={`form-select ${errors.sponsorshipType ? 'is-invalid' : ''}`}
                    name="sponsorshipType"
                    value={formData.sponsorshipType}
                    onChange={handleInputChange}
                    style={{ fontSize: '14px' }}
                  >
                    <option value="">Type</option>
                    {sponsorshipTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.sponsorshipType && (
                    <div className="invalid-feedback text-start">{errors.sponsorshipType}</div>
                  )}
                </div>
              </div>

              {/* Supporting Documents */}
              <div className="mb-4 row">
                <div className="col-12 col-md-12">
                  <label htmlFor="supportingDocuments" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Supporting Documents
                  </label>
                </div>
                <div className="col-12 col-md-12">
                  <div 
                    className="border-2 border-dashed rounded p-4 text-center" 
                    style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}
                  >
                    <PiUploadSimpleThin className="text-muted mb-2" size={32} />
                    <p className="text-muted mb-1" style={{fontSize: '14px'}}>
                      Upload Business plan
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
                      <FiUpload className="me-1" />
                      Choose File
                    </label>
                    {formData.supportingDocuments && (
                      <div className="mt-3">
                        <p className="text-success small mb-0">
                          <FiCheck className="me-1" />
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

              {/* Digital Signature */}
              <div className="mb-4 row align-items-center">
                <div className="col-12 col-md-2">
                  <label htmlFor="digitalSignature" className="form-label fw-normal mb-0" style={{fontSize: '14px'}}>
                    Digital Signature <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-12 col-md-10">
                  <input
                    type="text"
                    id="digitalSignature"
                    className={`form-control ${errors.digitalSignature ? 'is-invalid' : ''}`}
                    name="digitalSignature"
                    value={formData.digitalSignature}
                    onChange={handleInputChange}
                    placeholder="digital signature"
                    style={{ fontSize: '14px' }}
                  />
                  {errors.digitalSignature && (
                    <div className="invalid-feedback text-start">{errors.digitalSignature}</div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="row">
                <div className="col-12 d-flex justify-content-center w-100">
                  <button
                    type="button"
                    className="btn py-2 px-5 fw-bold text-white w-100"
                    style={{ 
                      backgroundColor: '#556B2F', 
                      border: 'none',
                      //maxWidth: '400px'
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
                      'Submit Application'
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
          .border-dashed {
            border: 2px dashed #dee2e6 !important;
          }
          .form-control:focus, .form-select:focus {
            border-color: #556B2F;
            box-shadow: 0 0 0 0.2rem rgba(85, 107, 47, 0.25);
          }
          .btn-outline-secondary:hover {
            background-color: #556B2F;
            border-color: #556B2F;
          }
          .alert-light {
            background-color: #f8f9fa;
            border-color: #dee2e6;
          }
          @media (max-width: 768px) {
            .col-md-3 {
              margin-bottom: 0.5rem;
            }
            .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SponsorshipApplicationForm;