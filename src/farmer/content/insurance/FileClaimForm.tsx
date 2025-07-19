import React, { useState } from 'react';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { PiUploadSimpleThin } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

// File Claim Form Component
interface ClaimFormData {
  fullName: string;
  projectName: string;
  contactInfo: string;
  policyNumber: string;
  typeOfLoss: string;
  dateOfLoss: string;
  description: string;
  bankAccount: string;
  supportingDocuments: File | null;
  digitalSignature: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const FileClaimForm = () => {
  const [formData, setFormData] = useState<ClaimFormData>({
    fullName: '',
    projectName: '',
    contactInfo: '',
    policyNumber: '',
    typeOfLoss: '',
    dateOfLoss: '',
    description: '',
    bankAccount: '',
    supportingDocuments: null,
    digitalSignature: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    console.log('Going back to previous page...');
    // Navigate back to previous page
    navigate(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          supportingDocuments: 'Please upload PDF, PNG, or JPG files only'
        }));
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
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
        supportingDocuments: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }

    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    } else if (!/^(\+254|0)[0-9]{9}$/.test(formData.contactInfo.replace(/\s/g, ''))) {
      newErrors.contactInfo = 'Please enter a valid Kenyan phone number';
    }

    if (!formData.policyNumber.trim()) {
      newErrors.policyNumber = 'Policy number is required';
    }

    if (!formData.typeOfLoss.trim()) {
      newErrors.typeOfLoss = 'Type of loss is required';
    }

    if (!formData.dateOfLoss) {
      newErrors.dateOfLoss = 'Date of loss is required';
    } else if (new Date(formData.dateOfLoss) > new Date()) {
      newErrors.dateOfLoss = 'Date of loss cannot be in the future';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.bankAccount.trim()) {
      newErrors.bankAccount = 'Bank account is required';
    }

    if (!formData.digitalSignature.trim()) {
      newErrors.digitalSignature = 'Digital signature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call to submit claim
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Claim submitted:', formData);
      //alert('Claim filed successfully! You will receive a confirmation email shortly.');
      
      // Navigate to success page or dashboard
      navigate('/farmer/insurance/claims');
    } catch (error) {
      alert('Error filing claim. Please try again.');
    } {/*finally {
      setIsSubmitting(false);
    }*/}
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="ClaimForm-Wrapper">
      <div className="container-fluid bg-light min-vh-100 p-0 px-0 ms-0">
        {/* Header */}
        <div className="row">
          <div className="col-2 p-0">
            <div className="align-self-start p-0 bg-light" style={{ paddingLeft: '5px' }}>
              <button 
                className="btn btn-link text-muted p-0 ms-0"
                onClick={handleBack}
                style={{ paddingLeft: '0px' }}
              >
                <FaArrowLeft size={14} />
              </button>
              <span className="text-muted">Back</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="row w-100 p-0">
          <div className="col-12 p-0">
            <div className="bg-white rounded-top-5 px-1 pt-4 pb-5 ms-0 me-0">
              <h4 className="fw-semibold mb-4 text-start" style={{ paddingLeft: '15px' }}>File a Claim Form</h4>
              
              <form className='ms-3 '>
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
                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
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
                      aria-label="Select Project Name"
                      value={formData.projectName}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled selected hidden>Select Project Name</option>
                      <option value="Maize Farming Project">Maize Farming Project</option>
                      <option value="Wheat Cultivation">Wheat Cultivation</option>
                      <option value="Rice Plantation">Rice Plantation</option>
                      <option value="Vegetable Garden">Vegetable Garden</option>
                      <option value="Fruit Orchard">Fruit Orchard</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.projectName && <div className="invalid-feedback">{errors.projectName}</div>}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="contactInfo" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Contact Information <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="tel"
                      id="contactInfo"
                      className={`form-control ${errors.contactInfo ? 'is-invalid' : ''}`}
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      placeholder="+254 712345678"
                    />
                    {errors.contactInfo && <div className="invalid-feedback">{errors.contactInfo}</div>}
                  </div>
                </div>

                {/* Policy Number */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="policyNumber" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Policy Number <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      id="policyNumber"
                      className={`form-control ${errors.policyNumber ? 'is-invalid' : ''}`}
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your policy number"
                    />
                    {errors.policyNumber && <div className="invalid-feedback">{errors.policyNumber}</div>}
                  </div>
                </div>

                {/* Type of Loss */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="typeOfLoss" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Type of Loss <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <select
                      id="typeOfLoss"
                      className={`form-select ${errors.typeOfLoss ? 'is-invalid' : ''}`}
                      name="typeOfLoss"
                      aria-label="Select Type of Loss"
                      value={formData.typeOfLoss}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled selected hidden>Type</option>
                      <option value="Crop Damage">Crop Damage</option>
                      <option value="Livestock Loss">Livestock Loss</option>
                      <option value="Equipment Damage">Equipment Damage</option>
                      <option value="Weather Damage">Weather Damage</option>
                      <option value="Fire Damage">Fire Damage</option>
                      <option value="Theft">Theft</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.typeOfLoss && <div className="invalid-feedback">{errors.typeOfLoss}</div>}
                  </div>
                </div>

                {/* Date of Loss */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="dateOfLoss" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Date of Loss <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="date"
                      id="dateOfLoss"
                      className={`form-control ${errors.dateOfLoss ? 'is-invalid' : ''}`}
                      name="dateOfLoss"
                      value={formData.dateOfLoss}
                      onChange={handleInputChange}
                      max={today}
                    />
                    {errors.dateOfLoss && <div className="invalid-feedback">{errors.dateOfLoss}</div>}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3 row">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="description" className="form-label fw-normal mb-0 text-start" style={{fontSize: '12px'}}>
                      Description <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <textarea
                      id="description"
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the loss in detail..."
                      rows={1}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </div>
                </div>

                {/* Bank Account */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="bankAccount" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Bank Account <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      id="bankAccount"
                      className={`form-control ${errors.bankAccount ? 'is-invalid' : ''}`}
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      placeholder="Enter your bank account number"
                    />
                    {errors.bankAccount && <div className="invalid-feedback">{errors.bankAccount}</div>}
                  </div>
                </div>

                {/* Supporting Documents */}
                <div className="mb-4 row">
                  <div className="col-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="supportingDocuments" className="form-label fw-normal mb-0 text-start" style={{fontSize: '12px'}}>
                      Supporting Documents
                    </label>
                  </div>
                  <div className="col-12">
                    <div className="border-2 me-3 border-dashed rounded p-4 text-center" style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}>
                      <PiUploadSimpleThin className="text-muted mb-0" size={24} />
                      <p className="text-muted small" style={{fontSize: '12px'}}>Upload Evidence & Police Report</p>
                      <p className="text-muted mb-3 small" style={{fontSize: '10px'}}>PDF, PNG, JPG up to 10MB</p>
                      <input
                        type="file"
                        id="supportingDocuments"
                        className="form-control-file d-none"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="supportingDocuments" className="btn btn-outline-secondary btn-sm">
                        Choose File
                      </label>
                      {formData.supportingDocuments && (
                        <p className="text-success mt-2 small">
                          <FaCheck className="me-1" />
                          {formData.supportingDocuments.name}
                        </p>
                      )}
                    </div>
                    {errors.supportingDocuments && (
                      <div className="text-danger small mt-1">{errors.supportingDocuments}</div>
                    )}
                  </div>
                </div>

                {/* Digital Signature */}
                <div className="mb-4 row align-items-center">
                  <div className="col-2" style={{ paddingLeft: '15px' }}>
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
                      type="button"
                      className="btn py-2 px-5 fw-bold text-white w-100 me-3"
                      style={{ backgroundColor: '#556B2F', minWidth: '200px' }}
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? 'Filing Claim...' : 'File a Claim'}
                    </button>
                  </div>
                </div>
              </form>
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

export default FileClaimForm;