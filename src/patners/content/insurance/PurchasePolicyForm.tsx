import React, { useState } from 'react';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { PiUploadSimpleThin } from "react-icons/pi";


import { useNavigate } from 'react-router-dom';

// Original Form Component with Payment Integration
interface FormData {
  fullName: string;
  projectName: string;
  contactInfo: string;
  insuranceType: string;
  coverageAmount: string;
  paymentMethod: string;
  dateOfLoss: string;
  policyEndDate: string;
  supportingDocuments: File | null;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const PurchasePolicyForm = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'payment'>('form');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    projectName: '',
    contactInfo: '',
    insuranceType: 'Crop Insurance',
    coverageAmount: '',
    paymentMethod: '',
    dateOfLoss: '',
    policyEndDate: '',
    supportingDocuments: null,
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('form');
    } else {
      console.log('Going back to insurance page...');
      // Navigate back to insurance page
    }
    navigate(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    if (!formData.insuranceType.trim()) {
      newErrors.insuranceType = 'Insurance type is required';
    }

    if (!formData.coverageAmount.trim()) {
      newErrors.coverageAmount = 'Coverage amount is required';
    } else if (isNaN(Number(formData.coverageAmount)) || Number(formData.coverageAmount) <= 0) {
      newErrors.coverageAmount = 'Coverage amount must be a valid positive number';
    }

    if (!formData.paymentMethod.trim()) {
      newErrors.paymentMethod = 'Payment method is required';
    }

    if (!formData.dateOfLoss) {
      newErrors.dateOfLoss = 'Date of loss is required';
    } else if (new Date(formData.dateOfLoss) > new Date()) {
      newErrors.dateOfLoss = 'Date of loss cannot be in the future';
    }

    if (!formData.policyEndDate) {
      newErrors.policyEndDate = 'Policy end date is required';
    } else if (new Date(formData.policyEndDate) <= new Date()) {
      newErrors.policyEndDate = 'Policy end date must be in the future';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      // Simulate API call to save form data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Move to payment step
      setCurrentStep('payment');
    } catch{
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
    navigate('/farmer/insurance/payment');
  };

  {/*const handlePaymentComplete = (paymentData: any) => {
    console.log('Form data:', formData);
    console.log('Payment data:', paymentData);
    
    // additional actions here, area:
    // 1. Send both form and payment data to your backend
    // 2. Show success message
    // 3. Navigate to success page or dashboard
    
    alert('Policy purchased successfully!');
  };*/}

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get tomorrow's date for minimum policy end date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minPolicyEndDate = tomorrow.toISOString().split('T')[0];

  // Payment info for the payment component
  {/*onst paymentInfo = {
    title: formData.insuranceType || 'Insurance Policy',
    amount: Number(formData.coverageAmount) || 0,
    currency: 'KES',
    period: 'policy',
    description: `${formData.projectName} - ${formData.insuranceType}`
  };*/}

  {/*if (currentStep === 'payment') {
    return (
      <PaymentComponent
        paymentInfo={paymentInfo}
        onBack={handleBack}
        onPaymentComplete={handlePaymentComplete}
        backTitle="Back to Policy Form"
      />
    );
  }*/}

  return (
    <div className="PolicyForm-Wrapper">
      <div className="container-fluid bg-light min-vh-100 p-0 px-0 ms-0">
        {/* Header */}
        <div className="row">
          <div className="col-2">
            <div className="align-self-start p-0 bg-light">
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
            <div className="bg-white rounded-top-5 px-1 pt-4 pb-5 ms-3">
              <h4 className="fw-semibold mb-4 text-start" style={{ paddingLeft: '15px' }}>Purchase Policy Form</h4>
              
              <form className='ms-3'>
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

                {/* Insurance Type */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="insuranceType" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Insurance Type <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <select
                      id="insuranceType"
                      className={`form-select ${errors.insuranceType ? 'is-invalid' : ''}`}
                      name="insuranceType"
                      aria-label="Select Insurance Type"
                      value={formData.insuranceType}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled selected hidden>Select Insurance Type</option>
                      <option value="Livestock Insurance">Livestock Insurance</option>
                      <option value="Equipment Insurance">Equipment Insurance</option>
                      <option value="Weather Insurance">Weather Insurance</option>
                    </select>
                    {errors.insuranceType && <div className="invalid-feedback">{errors.insuranceType}</div>}
                  </div>
                </div>

                {/* Coverage Amount */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="coverageAmount" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Coverage Amount (KES) <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="number"
                      id="coverageAmount"
                      className={`form-control ${errors.coverageAmount ? 'is-invalid' : ''}`}
                      name="coverageAmount"
                      value={formData.coverageAmount}
                      onChange={handleInputChange}
                      placeholder="50000"
                      min="1"
                    />
                    {errors.coverageAmount && <div className="invalid-feedback">{errors.coverageAmount}</div>}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="paymentMethod" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Payment Method <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <select
                      id="paymentMethod"
                      className={`form-select ${errors.paymentMethod ? 'is-invalid' : ''}`}
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled selected hidden>Select Payment Method</option>
                      <option value="M-Pesa">M-Pesa</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Cash">Cash</option>
                    </select>
                    {errors.paymentMethod && <div className="invalid-feedback">{errors.paymentMethod}</div>}
                  </div>
                </div>

                {/* Date of start */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="dateOfLoss" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Date of Start <span className="text-danger">*</span>
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

                {/* Policy End Date */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="policyEndDate" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Policy End Date <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="date"
                      id="policyEndDate"
                      className={`form-control ${errors.policyEndDate ? 'is-invalid' : ''}`}
                      name="policyEndDate"
                      value={formData.policyEndDate}
                      onChange={handleInputChange}
                      min={minPolicyEndDate}
                    />
                    {errors.policyEndDate && <div className="invalid-feedback">{errors.policyEndDate}</div>}
                  </div>
                </div>

                {/* Supporting Documents */}
                <div className="mb-4 row">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="supportingDocuments" className="form-label fw-normal mb-0 text-start" style={{fontSize: '12px'}}>
                      Supporting Documents
                    </label>
                  </div>
                  <div className="col-12">
                    <div className="border-2 me-3 border-dashed rounded p-4 text-center" style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}>
                      <PiUploadSimpleThin className="text-muted mb-0" size={24} />
                      <p className="text-muted small" style={{fontSize: '12px'}}>Upload Government ID</p>
                      <p className="text-muted mb-0 small" style={{fontSize: '10px'}}>PDF, PNG, JPG up to 10MB</p>
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

                {/* Terms and Conditions */}
                <div className="mb-4 row align-items-center justify-content-center">
                  <div className="col-12 d-flex justify-content-center">
                    <div className="form-check p-3">
                      <input
                        className={`form-check-input ${errors.agreeToTerms ? 'is-invalid' : ''}`}
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label ms-2" htmlFor="agreeToTerms" style={{fontSize: '12px'}}>
                        I agree to the <a href="#" className="text-decoration-none" style={{color: '#556B2F'}}>Terms of Service</a> and <a href="#" className="text-decoration-none" style={{color: '#556B2F'}}>Privacy Policy</a>
                      </label>
                      {errors.agreeToTerms && <div className="invalid-feedback d-block">{errors.agreeToTerms}</div>}
                    </div>
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
                      {isSubmitting ? 'Processing...' : 'Purchase Policy'}
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

export default PurchasePolicyForm;