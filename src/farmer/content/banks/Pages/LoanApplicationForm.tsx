import React, { useState } from 'react';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { PiUploadSimpleThin } from "react-icons/pi";
import * as Yup from 'yup';

// Validation Schema
const loanApplicationSchema = Yup.object().shape({
  // Personal Information
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Full name should only contain letters and spaces')
    .required('Full name is required'),
  
  contactInformation: Yup.string()
    .matches(/^\+254[0-9]{9}$/, 'Please enter a valid Kenyan phone number (+254XXXXXXXXX)')
    .required('Contact information is required'),
  
  projectName: Yup.string()
    .min(3, 'Project name must be at least 3 characters')
    .max(100, 'Project name must be less than 100 characters')
    .required('Project name is required'),
  
  farmRevenue: Yup.number()
    .positive('Farm revenue must be a positive number')
    .min(1000, 'Farm revenue must be at least KES 1,000')
    .max(100000000, 'Farm revenue cannot exceed KES 100,000,000')
    .required('Farm revenue is required'),
  
  hasBankAccount: Yup.string()
    .oneOf(['yes', 'no'], 'Please select if you have a bank account')
    .required('Bank account information is required'),
  
  existingLoans: Yup.string()
    .required('Please specify if you have existing loans'),
  
  // Loan Details
  loanAmount: Yup.number()
    .positive('Loan amount must be a positive number')
    .min(500, 'Minimum loan amount is KES 500')
    .max(10000000, 'Maximum loan amount is KES 10,000,000')
    .required('Loan amount is required'),
  
  loanPurpose: Yup.string()
    .min(10, 'Loan purpose must be at least 10 characters')
    .max(500, 'Loan purpose must be less than 500 characters')
    .required('Loan purpose is required'),
  
  repaymentPeriod: Yup.string()
    .oneOf(['6', '12', '18', '24'], 'Please select a valid repayment period')
    .required('Repayment period is required'),
  
  repaymentFrequency: Yup.string()
    .oneOf(['monthly', 'quarterly', 'semi-annually', 'annually'], 'Please select a valid repayment frequency')
    .required('Repayment frequency is required'),
  
  digitalSignature: Yup.string()
    .min(2, 'Digital signature must be at least 2 characters')
    .max(50, 'Digital signature must be less than 50 characters')
    .required('Digital signature is required')
});

export interface LoanApplicationFormProps {
  onBackToLoans?: () => void;
  onSubmitApplication?: (data: any) => void;
}

interface FormData {
  fullName: string;
  contactInformation: string;
  projectName: string;
  farmRevenue: string;
  hasBankAccount: string;
  existingLoans: string;
  loanAmount: string;
  loanPurpose: string;
  repaymentPeriod: string;
  repaymentFrequency: string;
  governmentId: File | null;
  farmOwnership: File | null;
  bankStatements: File | null;
  digitalSignature: string;
}

interface FormErrors {
  [key: string]: string;
}

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({
  onBackToLoans,
  onSubmitApplication
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    contactInformation: '',
    projectName: '',
    farmRevenue: '',
    hasBankAccount: '',
    existingLoans: '',
    loanAmount: '',
    loanPurpose: '',
    repaymentPeriod: '',
    repaymentFrequency: '',
    governmentId: null,
    farmOwnership: null,
    bankStatements: null,
    digitalSignature: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    if (onBackToLoans) {
      onBackToLoans();
    }
    console.log('Going back to loans page...');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'Please upload PDF, PNG, or JPG files only'
        }));
        return;
      }
      
      if (file.size > 15 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'File size must be less than 15MB'
        }));
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Convert string values to appropriate types for validation
      const dataToValidate = {
        ...formData,
        farmRevenue: formData.farmRevenue ? Number(formData.farmRevenue) : undefined,
        loanAmount: formData.loanAmount ? Number(formData.loanAmount) : undefined,
      };

      await loanApplicationSchema.validate(dataToValidate, { abortEarly: false });
      
      // Check required documents
      if (!formData.governmentId) {
        setErrors(prev => ({ ...prev, governmentId: 'Government ID is required' }));
      }
      if (!formData.farmOwnership) {
        setErrors(prev => ({ ...prev, farmOwnership: 'Farm ownership document is required' }));
      }
      if (formData.hasBankAccount === 'yes' && !formData.bankStatements) {
        setErrors(prev => ({ ...prev, bankStatements: 'Bank statements are required when you have a bank account' }));
      }
      
      // If validation passes and no file errors, submit the form
      if (formData.governmentId && formData.farmOwnership && 
          (formData.hasBankAccount === 'no' || formData.bankStatements)) {
        if (onSubmitApplication) {
          onSubmitApplication(formData);
        }
        console.log('Form submitted successfully:', formData);
      }
      
    } catch (validationErrors: any) {
      const newErrors: FormErrors = {};
      
      if (validationErrors.inner) {
        validationErrors.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
      }
      
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="PolicyForm-Wrapper">
      <div className="container-fluid min-vh-100 p-0 px-0 ms-0" style={{ backgroundColor: '#eeeeeeff' }}>
        {/* Header */}
        <div className="row">
          <div className="col-2">
            <div className="align-self-start p-0">
              <button 
                className="btn btn-link text-muted p-0 ms-0"
                onClick={handleBack}
                style={{ paddingLeft: '0px' }}
              >
                <FaArrowLeft size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="row">
          <div className="col-12">
            <div className="bg-white rounded-top-5 px-1 pt-4 pb-5 ms-3 me-3">
              <h4 className="fw-semibold mb-4 text-start" style={{ paddingLeft: '15px' }}>Loan Application Form</h4>
              

                {/* Personal Information Section */}
                <h6 className="fw-bold text-success mb-3" style={{ paddingLeft: '15px' }}>Personal Information</h6>

                {/* Full Name */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="fullName" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Full Name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      id="fullName"
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <div className="invalid-feedback text-start">{errors.fullName}</div>}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="contactInformation" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Contact Information <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="tel"
                      id="contactInformation"
                      className={`form-control ${errors.contactInformation ? 'is-invalid' : ''}`}
                      name="contactInformation"
                      value={formData.contactInformation}
                      onChange={handleInputChange}
                      placeholder="+254712345678"
                    />
                    {errors.contactInformation && <div className="invalid-feedback">{errors.contactInformation}</div>}
                  </div>
                </div>

                {/* Project Name */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="projectName" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Project Name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <select
                      id="projectName"
                      className={`form-select ${errors.projectName ? 'is-invalid' : ''}`}
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select Project Name</option>
                      <option value="Maize Farming Project">Maize Farming Project</option>
                      <option value="Wheat Cultivation">Wheat Cultivation</option>
                      <option value="Rice Plantation">Rice Plantation</option>
                      <option value="Vegetable Garden">Vegetable Garden</option>
                      <option value="Fruit Orchard">Fruit Orchard</option>
                      <option value="Dairy Farming">Dairy Farming</option>
                      <option value="Poultry Farming">Poultry Farming</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.projectName && <div className="invalid-feedback">{errors.projectName}</div>}
                  </div>
                </div>

                {/* Farm Revenue */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="farmRevenue" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Farm Revenue (KES) <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="number"
                      id="farmRevenue"
                      className={`form-control ${errors.farmRevenue ? 'is-invalid' : ''}`}
                      name="farmRevenue"
                      value={formData.farmRevenue}
                      onChange={handleInputChange}
                      placeholder="1250000"
                      min="1000"
                    />
                    {errors.farmRevenue && <div className="invalid-feedback">{errors.farmRevenue}</div>}
                  </div>
                </div>

                {/* Bank Account */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Bank Account <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="hasBankAccount"
                          id="bankAccountYes"
                          value="yes"
                          checked={formData.hasBankAccount === 'yes'}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="bankAccountYes" style={{fontSize: '12px'}}>
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="hasBankAccount"
                          id="bankAccountNo"
                          value="no"
                          checked={formData.hasBankAccount === 'no'}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="bankAccountNo" style={{fontSize: '12px'}}>
                          No
                        </label>
                      </div>
                    </div>
                    {errors.hasBankAccount && (
                      <div className="text-danger small mt-1">{errors.hasBankAccount}</div>
                    )}
                  </div>
                </div>

                {/* Existing Loans */}
                <div className="mb-4 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="existingLoans" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Existing Loans <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <select
                      id="existingLoans"
                      className={`form-select ${errors.existingLoans ? 'is-invalid' : ''}`}
                      name="existingLoans"
                      value={formData.existingLoans}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Do you have existing Loans?</option>
                      <option value="none">No existing loans</option>
                      <option value="1-loan">1 existing loan</option>
                      <option value="2-loans">2 existing loans</option>
                      <option value="3-plus-loans">3 or more existing loans</option>
                    </select>
                    {errors.existingLoans && <div className="invalid-feedback">{errors.existingLoans}</div>}
                  </div>
                </div>

                {/* Loan Details Section */}
                <h6 className="fw-bold text-success mb-3" style={{ paddingLeft: '15px' }}>Loan Details</h6>

                {/* Loan Amount */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="loanAmount" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Loan Amount (KES) <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="number"
                      id="loanAmount"
                      className={`form-control ${errors.loanAmount ? 'is-invalid' : ''}`}
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      placeholder="1200000"
                      min="500"
                    />
                    {errors.loanAmount && <div className="invalid-feedback">{errors.loanAmount}</div>}
                  </div>
                </div>

                {/* Loan Purpose */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="loanPurpose" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Loan Purpose <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <textarea
                      id="loanPurpose"
                      className={`form-control ${errors.loanPurpose ? 'is-invalid' : ''}`}
                      name="loanPurpose"
                      value={formData.loanPurpose}
                      onChange={handleInputChange}
                      placeholder="Describe the purpose of the loan..."
                      rows={3}
                    />
                    {errors.loanPurpose && <div className="invalid-feedback">{errors.loanPurpose}</div>}
                  </div>
                </div>

                {/* Repayment Period */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="repaymentPeriod" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Repayment Period <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <select
                      id="repaymentPeriod"
                      className={`form-select ${errors.repaymentPeriod ? 'is-invalid' : ''}`}
                      name="repaymentPeriod"
                      value={formData.repaymentPeriod}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select Period</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="18">18 months</option>
                      <option value="24">24 months</option>
                    </select>
                    {errors.repaymentPeriod && <div className="invalid-feedback">{errors.repaymentPeriod}</div>}
                  </div>
                </div>

                {/* Repayment Frequency */}
                <div className="mb-4 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="repaymentFrequency" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Repayment Frequency <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <select
                      id="repaymentFrequency"
                      className={`form-select ${errors.repaymentFrequency ? 'is-invalid' : ''}`}
                      name="repaymentFrequency"
                      value={formData.repaymentFrequency}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select Frequency</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="semi-annually">Semi-annually</option>
                      <option value="annually">Annually</option>
                    </select>
                    {errors.repaymentFrequency && <div className="invalid-feedback">{errors.repaymentFrequency}</div>}
                  </div>
                </div>

                {/* Supporting Documents Section */}
                <h6 className="fw-bold text-success mb-3" style={{ paddingLeft: '15px' }}>Supporting Documents</h6>

                {/* Government ID */}
                <div className="mb-4 row">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="governmentId" className="form-label fw-normal mb-0 text-start" style={{fontSize: '12px'}}>
                      Government ID <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <div className="border-2 me-3 border-dashed rounded p-4 text-center" style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}>
                      <PiUploadSimpleThin className="text-muted mb-0" size={24} />
                      <p className="text-muted small mb-1" style={{fontSize: '12px'}}>Upload Government ID</p>
                      <p className="text-muted mb-2 small" style={{fontSize: '10px'}}>PDF, PNG, JPG up to 15MB</p>
                      <input
                        type="file"
                        id="governmentId"
                        className="form-control-file d-none"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => handleFileChange(e, 'governmentId')}
                      />
                      <label htmlFor="governmentId" className="btn btn-outline-secondary btn-sm">
                        Choose File
                      </label>
                      {formData.governmentId && (
                        <p className="text-success mt-2 small">
                          <FaCheck className="me-1" />
                          {formData.governmentId.name}
                        </p>
                      )}
                    </div>
                    {errors.governmentId && (
                      <div className="text-danger small mt-1">{errors.governmentId}</div>
                    )}
                  </div>
                </div>

                {/* Farm Ownership */}
                <div className="mb-4 row">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="farmOwnership" className="form-label fw-normal mb-0 text-start" style={{fontSize: '12px'}}>
                      Farm Ownership <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <div className="border-2 me-3 border-dashed rounded p-4 text-center" style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}>
                      <PiUploadSimpleThin className="text-muted mb-0" size={24} />
                      <p className="text-muted small mb-1" style={{fontSize: '12px'}}>Upload Farm Ownership Documents</p>
                      <p className="text-muted mb-2 small" style={{fontSize: '10px'}}>PDF, PNG, JPG up to 15MB</p>
                      <input
                        type="file"
                        id="farmOwnership"
                        className="form-control-file d-none"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => handleFileChange(e, 'farmOwnership')}
                      />
                      <label htmlFor="farmOwnership" className="btn btn-outline-secondary btn-sm">
                        Choose File
                      </label>
                      {formData.farmOwnership && (
                        <p className="text-success mt-2 small">
                          <FaCheck className="me-1" />
                          {formData.farmOwnership.name}
                        </p>
                      )}
                    </div>
                    {errors.farmOwnership && (
                      <div className="text-danger small mt-1">{errors.farmOwnership}</div>
                    )}
                  </div>
                </div>

                {/* Bank Statements - Only show if user has bank account */}
                {formData.hasBankAccount === 'yes' && (
                  <div className="mb-4 row">
                    <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                      <label htmlFor="bankStatements" className="form-label fw-normal mb-0 text-start" style={{fontSize: '12px'}}>
                        Bank Statements <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-10">
                      <div className="border-2 me-3 border-dashed rounded p-4 text-center" style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}>
                        <PiUploadSimpleThin className="text-muted mb-0" size={24} />
                        <p className="text-muted small mb-1" style={{fontSize: '12px'}}>Upload Bank Statements</p>
                        <p className="text-muted mb-2 small" style={{fontSize: '10px'}}>PDF, PNG, JPG up to 15MB</p>
                        <input
                          type="file"
                          id="bankStatements"
                          className="form-control-file d-none"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => handleFileChange(e, 'bankStatements')}
                        />
                        <label htmlFor="bankStatements" className="btn btn-outline-secondary btn-sm">
                          Choose File
                        </label>
                        {formData.bankStatements && (
                          <p className="text-success mt-2 small">
                            <FaCheck className="me-1" />
                            {formData.bankStatements.name}
                          </p>
                        )}
                      </div>
                      {errors.bankStatements && (
                        <div className="text-danger small mt-1">{errors.bankStatements}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Digital Signature */}
                <div className="mb-4 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="digitalSignature" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Digital Signature <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      id="digitalSignature"
                      className={`form-control ${errors.digitalSignature ? 'is-invalid' : ''}`}
                      name="digitalSignature"
                      value={formData.digitalSignature}
                      onChange={handleInputChange}
                      placeholder="Type your full name as digital signature"
                    />
                    {errors.digitalSignature && <div className="invalid-feedback">{errors.digitalSignature}</div>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="row">
                  <div className="col-12 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn py-2 px-5 fw-bold text-white w-100 me-3"
                      style={{ backgroundColor: '#556B2F', minWidth: '200px' }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
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
          .form-check-input:checked {
            background-color: #556B2F;
            border-color: #556B2F;
          }
        `}
      </style>
    </div>
  );
};

export default LoanApplicationForm;