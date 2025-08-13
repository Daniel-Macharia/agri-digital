import React, { useState } from 'react';
import { FaCheck, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { PiUploadSimpleThin } from "react-icons/pi";

// Form data interfaces
interface ExpenditureItem {
  id: string;
  category: string;
  amountSpent: string;
  remarks: string;
}

interface CrowdfundingData {
  projectName: string;
  selectedProjectName: string;
  description: string;
  fundraisingGoal: string;
  duration: string;
  location: string;
  milestoneBasedRelease: 'Yes' | 'No' | '';
  fundDisbursement: string;
  expenditureBreakdown: ExpenditureItem[];
  supportingDocuments: File | null;
  agreeToTerms: boolean;
}

// Validation functions

{/*const validateExpenditureItem = (item: ExpenditureItem) => {
  const errors: Record<string, string> = {};
  if (!item.category.trim()) errors.category = 'Category is required';
  if (!item.amountSpent.trim()) {
    errors.amountSpent = 'Amount is required';
  } else if (!/^\d+(\.\d{1,2})?$/.test(item.amountSpent)) {
    errors.amountSpent = 'Amount must be a valid number';
  }
  if (!item.remarks.trim()) {
    errors.remarks = 'Remarks are required';
  } else if (item.remarks.length < 5) {
    errors.remarks = 'Remarks must be at least 5 characters';
  }
  return errors;
};*/}

const validateForm = (data: CrowdfundingData) => {
  const errors: Record<string, string> = {};
  
  if (!data.projectName.trim()) {
    errors.projectName = 'Project name is required';
  } else if (data.projectName.length < 5) {
    errors.projectName = 'Project name must be at least 5 characters';
  }
  
  if (!data.selectedProjectName) {
    errors.selectedProjectName = 'Please select a project name';
  }
  
  if (!data.description.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.length < 20) {
    errors.description = 'Description must be at least 20 characters';
  } else if (data.description.length > 1000) {
    errors.description = 'Description cannot exceed 1000 characters';
  }
  
  if (!data.fundraisingGoal.trim()) {
    errors.fundraisingGoal = 'Fundraising goal is required';
  } else if (!/^\d+(\.\d{1,2})?$/.test(data.fundraisingGoal)) {
    errors.fundraisingGoal = 'Fundraising goal must be a valid number';
  } else if (parseFloat(data.fundraisingGoal) < 50000) {
    errors.fundraisingGoal = 'Fundraising goal must be at least KES 50,000';
  }
  
  if (!data.duration) {
    errors.duration = 'Duration is required';
  }
  
  if (!data.location.trim()) {
    errors.location = 'Location is required';
  } else if (data.location.length < 2) {
    errors.location = 'Location must be at least 2 characters';
  }
  
  if (!data.milestoneBasedRelease) {
    errors.milestoneBasedRelease = 'Please select milestone-based release option';
  }
  
  if (!data.fundDisbursement) {
    errors.fundDisbursement = 'Fund disbursement method is required';
  }
  
  if (data.expenditureBreakdown.length === 0) {
    errors.expenditureBreakdown = 'At least one expenditure item is required';
  }
  
  if (!data.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms and conditions';
  }
  
  return errors;
};

const CrowdfundingForm = () => {
  const [formData, setFormData] = useState<CrowdfundingData>({
    projectName: 'Smart Farming Solutions for Rural Communities',
    selectedProjectName: '',
    description: 'lorem ipsum...',
    fundraisingGoal: '2000000',
    duration: '2025-02-10',
    location: 'Kisumu',
    milestoneBasedRelease: '',
    fundDisbursement: '',
    expenditureBreakdown: [
      {
        id: '1',
        category: 'Equipment & Machinery',
        amountSpent: '600000',
        remarks: 'Purchased tractors, irrigation pumps'
      },
      {
        id: '2',
        category: 'Seeds & Fertilizers',
        amountSpent: '250000',
        remarks: 'High-yield seeds, organic fertilizers'
      },
      {
        id: '3',
        category: 'Labor & Wages',
        amountSpent: '400000',
        remarks: 'Payment for farmworkers, seasonal labor'
      },
      {
        id: '4',
        category: 'Land Leasing & Maintenance',
        amountSpent: '900000',
        remarks: 'Rent, fencing, soil improvement'
      },
      {
        id: '5',
        category: 'Transportation & Logistics',
        amountSpent: '150000',
        remarks: 'Crop delivery, fuel, vehicle rental'
      },
      {
        id: '6',
        category: 'Marketing & Sales',
        amountSpent: '176000',
        remarks: 'Promoting, market research, advertising'
      }
    ],
    supportingDocuments: null,
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const projectOptions = [
    'Maize Farming Project',
    'Wheat Cultivation',
    'Rice Plantation',
    'Vegetable Garden',
    'Fruit Orchard',
    'Smart Farming Solutions for Rural Communities',
    'Other'
  ];

  const disbursementMethods = [
    'Method',
    'Bank Transfer',
    'M-Pesa',
    'Cheque',
    'Direct Deposit'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
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
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.supportingDocuments;
        return newErrors;
      });
    }
  };

  const addExpenditureItem = () => {
    const newItem: ExpenditureItem = {
      id: Date.now().toString(),
      category: '',
      amountSpent: '',
      remarks: ''
    };
    
    setFormData(prev => ({
      ...prev,
      expenditureBreakdown: [...prev.expenditureBreakdown, newItem]
    }));
  };

  const updateExpenditureItem = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      expenditureBreakdown: prev.expenditureBreakdown.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));

    // Clear expenditure errors when user types
    if (errors.expenditureBreakdown) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.expenditureBreakdown;
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form data:', formData);
      alert('Crowdfunding proposal submitted successfully!');
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

  const getTotalExpenditure = () => {
    return formData.expenditureBreakdown.reduce((total, item) => {
      return total + (parseFloat(item.amountSpent) || 0);
    }, 0);
  };

  return (
    <div className="container-fluid min-vh-100 p-0" style={{ backgroundColor: '#eeeeee' }}>
      {/* Form Container */}
      <div className="row">
        <div className="col-12">
          <div className="bg-white rounded-top-5 px-5 pt-4 pb-5 ms-3 me-3">
            <h4 className="fw-semibold mb-4 text-start" style={{ paddingLeft: '15px' }}>
              Crowd Funding
            </h4>
            
            <div className="ms-3">
              {/* Project Name */}
              <div className="mb-3 row align-items-center">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="projectName" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                    Project Name
                  </label>
                </div>
                <div className="col-10">
                  <input
                    type="text"
                    id="projectName"
                    className={`form-control form-control-uniform ${errors.projectName ? 'is-invalid' : ''}`}
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                    style={{ fontSize: '12px' }}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback text-start">{errors.projectName}</div>
                  )}
                </div>
              </div>

              {/* Project Name Dropdown */}
              <div className="mb-3 row align-items-center">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="selectedProjectName" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                    Select Project
                  </label>
                </div>
                <div className="col-10">
                  <select
                    id="selectedProjectName"
                    className={`form-select form-control-uniform ${errors.selectedProjectName ? 'is-invalid' : ''}`}
                    name="selectedProjectName"
                    value={formData.selectedProjectName}
                    onChange={handleInputChange}
                    style={{ fontSize: '12px' }}
                  >
                    <option value="">Select Project Name</option>
                    {projectOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.selectedProjectName && (
                    <div className="invalid-feedback">{errors.selectedProjectName}</div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-3 row">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="description" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                    Description
                  </label>
                </div>
                <div className="col-10">
                  <textarea
                    id="description"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project..."
                    rows={3}
                    style={{ fontSize: '12px', resize: 'vertical' }}
                  />
                  {errors.description && (
                    <div className="invalid-feedback text-start">{errors.description}</div>
                  )}
                </div>
              </div>

              {/* Fundraising Goal */}
              <div className="mb-3 row align-items-center">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="fundraisingGoal" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                    Fundraising Goal
                  </label>
                </div>
                <div className="col-10">
                  <div className="input-group">
                    <span className="input-group-text" style={{ fontSize: '12px' }}>KES</span>
                    <input
                      type="text"
                      id="fundraisingGoal"
                      className={`form-control form-control-uniform ${errors.fundraisingGoal ? 'is-invalid' : ''}`}
                      name="fundraisingGoal"
                      value={formData.fundraisingGoal}
                      onChange={handleInputChange}
                      placeholder="2,000,000"
                      style={{ fontSize: '12px' }}
                    />
                  </div>
                  {formData.fundraisingGoal && !errors.fundraisingGoal && (
                    <div className="form-text text-success" style={{ fontSize: '10px' }}>
                      {formatAmount(formData.fundraisingGoal)}
                    </div>
                  )}
                  {errors.fundraisingGoal && (
                    <div className="invalid-feedback text-start d-block">{errors.fundraisingGoal}</div>
                  )}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-3 row align-items-center">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="duration" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                    Duration
                  </label>
                </div>
                <div className="col-10">
                  <div className="input-group">
                    <input
                      type="date"
                      id="duration"
                      className={`form-control form-control-uniform ${errors.duration ? 'is-invalid' : ''}`}
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      style={{ fontSize: '12px' }}
                    />
                    <span className="input-group-text">
                      <FaCalendarAlt size={12} />
                    </span>
                  </div>
                  {errors.duration && (
                    <div className="invalid-feedback text-start d-block">{errors.duration}</div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="mb-3 row align-items-center">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="location" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                    Location
                  </label>
                </div>
                <div className="col-10">
                  <input
                    type="text"
                    id="location"
                    className={`form-control form-control-uniform ${errors.location ? 'is-invalid' : ''}`}
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    style={{ fontSize: '12px' }}
                  />
                  {errors.location && (
                    <div className="invalid-feedback text-start">{errors.location}</div>
                  )}
                </div>
              </div>

              {/* Milestone-Based Release */}
              <div className="mb-3 row align-items-center">
                <div className="col-12 col-sm-10" style={{ paddingLeft: '15px' }}>
                  <label className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                    Milestone-Based Release
                  </label>
                </div>
                <div className="col-2">
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="milestoneBasedRelease"
                        id="milestoneYes"
                        checked={formData.milestoneBasedRelease === 'Yes'}
                        onChange={() => handleRadioChange('milestoneBasedRelease', 'Yes')}
                      />
                      <label className="form-check-label" htmlFor="milestoneYes" style={{fontSize: '12px'}}>
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="milestoneBasedRelease"
                        id="milestoneNo"
                        checked={formData.milestoneBasedRelease === 'No'}
                        onChange={() => handleRadioChange('milestoneBasedRelease', 'No')}
                      />
                      <label className="form-check-label" htmlFor="milestoneNo" style={{fontSize: '12px'}}>
                        No
                      </label>
                    </div>
                  </div>
                  {errors.milestoneBasedRelease && (
                    <div className="text-danger small mt-1">{errors.milestoneBasedRelease}</div>
                  )}
                </div>
              </div>

              {/* Fund Disbursement */}
              <div className="mb-4 row align-items-center">
                <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                  <label htmlFor="fundDisbursement" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                    Fund Disbursement
                  </label>
                </div>
                <div className="col-10">
                  <select
                    id="fundDisbursement"
                    className={`form-select form-control-uniform ${errors.fundDisbursement ? 'is-invalid' : ''}`}
                    name="fundDisbursement"
                    value={formData.fundDisbursement}
                    onChange={handleInputChange}
                    style={{ fontSize: '12px' }}
                  >
                    {disbursementMethods.map((method) => (
                      <option key={method} value={method === 'Method' ? '' : method}>
                        {method}
                      </option>
                    ))}
                  </select>
                  {errors.fundDisbursement && (
                    <div className="invalid-feedback">{errors.fundDisbursement}</div>
                  )}
                </div>
              </div>

              {/* Expenditure Breakdown */}
              <div className="mb-4 row">
                <div className="col-12 col-sm-12" style={{ paddingLeft: '15px' }}>
                  <label className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                    Expenditure Breakdown
                  </label>
                </div>
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table table-bordered-rows">
                      <thead className="table-light">
                        <tr>
                          <th style={{fontSize: '11px', fontWeight: 'normal', padding: '12px 8px'}}>Category</th>
                          <th style={{fontSize: '11px', fontWeight: 'normal', padding: '12px 8px'}}>Amount Spent (KES)</th>
                          <th style={{fontSize: '11px', fontWeight: 'normal', padding: '12px 8px'}}>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.expenditureBreakdown.map((item) => (
                          <tr key={item.id}>
                            <td style={{ padding: '8px' }}>
                              <input
                                type="text"
                                className="form-control form-control-sm borderless-input"
                                value={item.category}
                                onChange={(e) => updateExpenditureItem(item.id, 'category', e.target.value)}
                                placeholder="Category"
                                style={{fontSize: '11px'}}
                              />
                            </td>
                            <td style={{ padding: '8px' }}>
                              <input
                                type="text"
                                className="form-control form-control-sm borderless-input"
                                value={item.amountSpent}
                                onChange={(e) => updateExpenditureItem(item.id, 'amountSpent', e.target.value)}
                                placeholder="Amount"
                                style={{fontSize: '11px'}}
                              />
                            </td>
                            <td style={{ padding: '8px' }}>
                              <input
                                type="text"
                                className="form-control form-control-sm borderless-input"
                                value={item.remarks}
                                onChange={(e) => updateExpenditureItem(item.id, 'remarks', e.target.value)}
                                placeholder="Remarks"
                                style={{fontSize: '11px'}}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="table-secondary">
                          <td style={{ padding: '12px 8px' }}><strong style={{fontSize: '11px'}}>Total</strong></td>
                          <td style={{ padding: '12px 8px' }}><strong style={{fontSize: '11px'}}>{formatAmount(getTotalExpenditure().toString())}</strong></td>
                          <td style={{ padding: '12px 8px' }}></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm mt-2"
                    onClick={addExpenditureItem}
                  >
                    <FaPlus size={10} className="me-1" />
                    Add Item
                  </button>
                  
                  {errors.expenditureBreakdown && (
                    <div className="text-danger small mt-1">{errors.expenditureBreakdown}</div>
                  )}
                </div>
              </div>

              {/* Supporting Documents */}
              <div className="mb-4 row">
                <div className="col-12 col-sm-12" style={{ paddingLeft: '15px' }}>
                  <label className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                    Supporting Documents
                  </label>
                </div>
                <div className="col-12">
                  <div 
                    className="border-2 border-dashed rounded p-4 text-center" 
                    style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}
                  >
                    <PiUploadSimpleThin className="text-muted mb-2" size={24} />
                    <p className="text-muted mb-1" style={{fontSize: '12px'}}>
                      Upload Proposal Document
                    </p>
                    <p className="text-muted mb-3 small" style={{fontSize: '10px'}}>
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
          .form-control:focus, .form-select:focus {
            border-color: #556B2F;
            box-shadow: 0 0 0 0.2rem rgba(85, 107, 47, 0.25);
          }
          .form-check-input:checked {
            background-color: #556B2F;
            border-color: #556B2F;
          }
          .form-check-input:focus {
            border-color: #556B2F;
            box-shadow: 0 0 0 0.2rem rgba(85, 107, 47, 0.25);
          }
          .btn-outline-secondary:hover {
            background-color: #556B2F;
            border-color: #556B2F;
          }
          .table th {
            background-color: #f8f9fa;
            border: none;
            padding: 12px 8px;
          }
          .table td {
            padding: 8px;
            vertical-align: middle;
            border: none;
          }
          .table-bordered-rows {
            border-collapse: separate !important;
            border-spacing: 0;
          }
          .table-bordered-rows tbody tr {
            border-bottom: 1px solid #333 !important;
          }
          .table-bordered-rows thead tr {
            border-bottom: 2px solid #333 !important;
          }
          .table-bordered-rows tfoot tr {
            border-top: 2px solid #333 !important;
          }
          .table-bordered-rows th,
          .table-bordered-rows td {
            border-left: 2px solid #333 !important;
            border-right: 2px solid #333 !important;
            border-top: 2px solid #333 !important;
            border-bottom: 2px solid #333 !important;
          }
          .borderless-input {
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            padding: 8px 12px !important;
          }
          .borderless-input:focus {
            border: none !important;
            background: rgba(85, 107, 47, 0.05) !important;
            box-shadow: none !important;
          }
          .form-control-uniform, .form-select {
            height: 38px;
            padding: 6px 12px;
            font-size: 12px;
            line-height: 1.5;
          }
          .input-group-text {
            background-color: #f8f9fa;
            border-color: #dee2e6;
            height: 38px;
            padding: 6px 12px;
            font-size: 12px;
            line-height: 1.5;
          }
          .input-group .form-control-uniform {
            height: 38px;
          }
          @media (max-width: 768px) {
            .table-responsive {
              font-size: 10px;
            }
            .col-sm-2 {
              margin-bottom: 0.5rem;
            }
            .ms-3 {
              margin-left: 0.5rem !important;
            }
            .me-3 {
              margin-right: 0.5rem !important;
            }
          }
          @media (max-width: 576px) {
            .table th, .table td {
              padding: 4px;
              font-size: 10px;
            }
            .btn-sm {
              padding: 0.25rem 0.5rem;
              font-size: 0.75rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CrowdfundingForm;