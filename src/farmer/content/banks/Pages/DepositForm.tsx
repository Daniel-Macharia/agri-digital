import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Types
interface DepositFormData {
  amount: number;
  method: string;
  transactionId: string;
  date: string;
  file?: File;
}

// Validation Schemas
const depositValidationSchema = Yup.object({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .min(50, 'Minimum deposit amount is KES 50'),
  method: Yup.string()
    .required('Deposit method is required'),
  transactionId: Yup.string()
    .when('method', {
      is: (method: string) => method && method !== 'cash',
      then: (schema) => schema.required('Transaction ID is required for electronic payments')
        .min(5, 'Transaction ID must be at least 5 characters'),
      otherwise: (schema) => schema.notRequired()
    }),
  date: Yup.date()
    .required('Date is required')
    .max(new Date(), 'Date cannot be in the future'),
  file: Yup.mixed()
    .test('fileSize', 'File size must be less than 10MB', (value: any) => {
      if (!value) return true;
      return value.size <= 10 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF, PNG, JPG files are allowed', (value: any) => {
      if (!value) return true;
      return ['application/pdf', 'image/png', 'image/jpeg'].includes(value.type);
    })
});

// Deposit Form Component
const DepositForm: React.FC = () => {
  const [formData, setFormData] = useState<DepositFormData>({
    amount: 12000,
    method: '',
    transactionId: '',
    date: '2025/02/10'
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    console.log('Going back...');
    // Navigate back logic here
  };

  const navigate = useNavigate();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));

    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async () => {
    //setIsSubmitting(true);
    navigate('/farmer/insurance/payment');
    try {
      await depositValidationSchema.validate(formData, { abortEarly: false });
      console.log('Deposit request submitted:', formData);
      alert('Deposit request submitted successfully!');
      // Handle successful submission
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: any = {};
        error.inner.forEach((err) => {
          if (err.path) validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for maximum date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="deposit-form-wrapper">
      <div className="container-fluid bg-light min-vh-100 p-0 px-0 ms-0" style={{ backgroundColor: '#eeeeeeff' }}>
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
            <div className="bg-white deposit-form-container px-1 pt-4 pb-5 ms-3" style={{ backgroundColor: '#eeeeeeff' }}>
              <h4 className="fw-semibold mb-4 text-start" style={{ paddingLeft: '15px' }}>Deposit Form</h4>
              
              <div className="ms-3">
                <h6 className="fw-normal mb-4 text-muted" style={{ paddingLeft: '15px', fontSize: '14px' }}>Information</h6>
                
                {/* Amount */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="amount" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Amount <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <div className="input-group">
                      <span className="input-group-text deposit-form-input-prefix" style={{fontSize: '12px', backgroundColor: '#f8f9fa'}}>KES</span>
                      <input
                        type="number"
                        id="amount"
                        className={`form-control deposit-form-input ${errors.amount ? 'is-invalid' : ''}`}
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="12,000"
                        min="50"
                      />
                      {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                    </div>
                  </div>
                </div>

                {/* Deposit Method */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="method" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Deposit Method <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <select
                      id="method"
                      className={`form-select deposit-form-select ${errors.method ? 'is-invalid' : ''}`}
                      name="method"
                      value={formData.method}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled hidden>Method...</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="mobile_money">Mobile Money (M-Pesa)</option>
                      <option value="cash">Cash</option>
                      <option value="cheque">Cheque</option>
                    </select>
                    {errors.method && <div className="invalid-feedback">{errors.method}</div>}
                  </div>
                </div>

                {/* Transaction ID - Only show if method is not cash */}
                {formData.method && formData.method !== 'cash' && (
                  <div className="mb-3 row align-items-center">
                    <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                      <label htmlFor="transactionId" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                        Transaction ID <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-10">
                      <input
                        type="text"
                        id="transactionId"
                        className={`form-control deposit-form-input ${errors.transactionId ? 'is-invalid' : ''}`}
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        placeholder="Enter transaction reference..."
                      />
                      {errors.transactionId && <div className="invalid-feedback">{errors.transactionId}</div>}
                    </div>
                  </div>
                )}

                {/* Deposit Date */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="date" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Deposit Date <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="date"
                      id="date"
                      className={`form-control deposit-form-input ${errors.date ? 'is-invalid' : ''}`}
                      name="date"
                      value={formData.date.replace(/\//g, '-')}
                      onChange={(e) => setFormData({...formData, date: e.target.value.replace(/-/g, '/')})}
                      max={today}
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                  </div>
                </div>

                {/* File Upload */}
                <div className="mb-4 row align-items-start">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="file" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Upload Screenshot
                    </label>
                  </div>
                  <div className="col-10">
                    <div className="deposit-form-upload-area border rounded p-4 text-center" style={{ borderStyle: 'dashed', borderColor: '#dee2e6' }}>
                      <FiUpload className="text-muted mb-2" size={24} />
                      <div className="text-muted small mb-2">
                        Upload Screenshot Confirmation<br />
                        <span style={{fontSize: '10px'}}>PDF, PNG, JPG up to 10MB</span>
                      </div>
                      <input
                        type="file"
                        id="file"
                        className="form-control deposit-form-file-input"
                        accept=".pdf,.png,.jpg,.jpeg"
                        style={{fontSize: '12px'}}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setFormData({...formData, file});
                        }}
                      />
                    </div>
                    {errors.file && <div className="text-danger small mt-1">{errors.file}</div>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="row">
                  <div className="col-12 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn py-2 px-5 fw-bold text-white w-100 me-3 deposit-form-btn"
                      style={{ backgroundColor: '#556B2F', minWidth: '200px' }}
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? 'Processing...' : 'Process Deposit'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          .deposit-form-container {
            border-top-right-radius: 2rem;
            border-top-left-radius: 2rem;
          }
          .deposit-form-select:focus,
          .deposit-form-input:focus {
            border-color: #556B2F;
            box-shadow: 0 0 0 0.2rem rgba(85, 107, 47, 0.25);
          }
          .deposit-form-input-prefix {
            color: #6c757d;
            font-weight: 500;
          }
          .deposit-form-btn:disabled {
            opacity: 0.6;
          }
          .deposit-form-btn:hover:not(:disabled) {
            background-color: #4a5d28 !important;
          }
          .deposit-form-upload-area {
            transition: border-color 0.15s ease-in-out;
          }
          .deposit-form-upload-area:hover {
            border-color: #556B2F !important;
          }
          .deposit-form-file-input {
            border: none;
            background: transparent;
          }
          .deposit-form-file-input:focus {
            box-shadow: none;
            border-color: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default DepositForm;