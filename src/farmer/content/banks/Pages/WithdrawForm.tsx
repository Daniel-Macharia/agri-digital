import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import * as Yup from 'yup';

// Types
interface WithdrawFormData {
  amount: number;
  reason: string;
  method: string;
  date: string;
}

// Validation Schemas
const withdrawValidationSchema = Yup.object({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .min(100, 'Minimum withdrawal amount is KES 100')
    .max(1000000, 'Maximum withdrawal amount is KES 1,000,000'),
  reason: Yup.string()
    .required('Withdrawal reason is required')
    .min(5, 'Reason must be at least 5 characters')
    .max(200, 'Reason must not exceed 200 characters'),
  method: Yup.string()
    .required('Withdrawal method is required'),
  date: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Date cannot be in the past')
});

// Withdraw Form Component
const WithdrawForm: React.FC = () => {
  const [formData, setFormData] = useState<WithdrawFormData>({
    amount: 12000,
    reason: '',
    method: '',
    date: '2025/02/10'
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    console.log('Going back...');
    // Navigate back logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    setIsSubmitting(true);
    setErrors({});

    try {
      await withdrawValidationSchema.validate(formData, { abortEarly: false });
      console.log('Withdraw request submitted:', formData);
      // Handle successful submission
      alert('Withdrawal request submitted successfully!');
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

  // Get today's date in YYYY-MM-DD format for minimum date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="withdraw-form-wrapper">
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
            <div className="bg-white withdraw-form-container px-1 pt-4 pb-5 ms-3">
              <h4 className="fw-semibold mb-4 text-start" style={{ paddingLeft: '15px' }}>Withdraw Form</h4>
              
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
                      <span className="input-group-text withdraw-form-input-prefix" style={{fontSize: '12px', backgroundColor: '#f8f9fa'}}>KES</span>
                      <input
                        type="number"
                        id="amount"
                        className={`form-control withdraw-form-input ${errors.amount ? 'is-invalid' : ''}`}
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="12,000"
                        min="100"
                        max="1000000"
                      />
                      {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                    </div>
                  </div>
                </div>

                {/* Withdraw Reason(s) */}
                <div className="mb-3 row align-items-start">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="reason" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Withdraw Reason(s) <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <textarea
                      id="reason"
                      className={`form-control withdraw-form-textarea ${errors.reason ? 'is-invalid' : ''}`}
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="Enter your withdrawal reason..."
                      rows={3}
                      maxLength={200}
                      style={{ resize: 'vertical', minHeight: '80px' }}
                    />
                    <div className="form-text text-end" style={{fontSize: '10px'}}>
                      {formData.reason.length}/200 characters
                    </div>
                    {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
                  </div>
                </div>

                {/* Withdraw Method */}
                <div className="mb-3 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="method" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Withdraw Method <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <select
                      id="method"
                      className={`form-select withdraw-form-select ${errors.method ? 'is-invalid' : ''}`}
                      name="method"
                      value={formData.method}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled hidden>Method...</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="mobile_money">Mobile Money (M-Pesa)</option>
                      <option value="cash">Cash Pickup</option>
                      <option value="cheque">Cheque</option>
                    </select>
                    {errors.method && <div className="invalid-feedback">{errors.method}</div>}
                  </div>
                </div>

                {/* Withdraw Date */}
                <div className="mb-4 row align-items-center">
                  <div className="col-12 col-sm-2" style={{ paddingLeft: '15px' }}>
                    <label htmlFor="date" className="form-label fw-normal mb-0" style={{fontSize: '12px'}}>
                      Withdraw Date <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="date"
                      id="date"
                      className={`form-control withdraw-form-input ${errors.date ? 'is-invalid' : ''}`}
                      name="date"
                      value={formData.date.replace(/\//g, '-')}
                      onChange={(e) => setFormData({...formData, date: e.target.value.replace(/-/g, '/')})}
                      min={today}
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="row">
                  <div className="col-12 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn py-2 px-5 fw-bold text-white w-100 me-3 withdraw-form-btn"
                      style={{ backgroundColor: '#556B2F', minWidth: '200px' }}
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? 'Processing...' : 'Process Withdraw'}
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
          .withdraw-form-container {
            border-top-right-radius: 2rem;
            border-top-left-radius: 2rem;
          }
          .withdraw-form-select:focus,
          .withdraw-form-input:focus,
          .withdraw-form-textarea:focus {
            border-color: #556B2F;
            box-shadow: 0 0 0 0.2rem rgba(85, 107, 47, 0.25);
          }
          .withdraw-form-input-prefix {
            color: #6c757d;
            font-weight: 500;
          }
          .withdraw-form-btn:disabled {
            opacity: 0.6;
          }
          .withdraw-form-btn:hover:not(:disabled) {
            background-color: #4a5d28 !important;
          }
        `}
      </style>
    </div>
  );
};

export default WithdrawForm;