import React, { useState } from 'react';
import './type/index.ts';

interface FormData {
  bankName: string;
  bankEmail: string;
}
//Validation functions
const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email address is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

const validateBankName = (name: string): string | null => {
  if (!name) return 'Bank name is required';
  if (name.length < 2) return 'Bank name must be at least 2 characters';
  return null;
};
const BankPagePartnershipForm: React.FC<{ 
  onClose: () => void; 
  onSubmit: (data: FormData) => void 
}> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    bankName: '',
    bankEmail: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const bankNameError = validateBankName(formData.bankName);
    const bankEmailError = validateEmail(formData.bankEmail);
    
    const newErrors: Partial<FormData> = {};
    if (bankNameError) newErrors.bankName = bankNameError;
    if (bankEmailError) newErrors.bankEmail = bankEmailError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    setErrors({});
    onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="bankpage-form__header modal-header border-0 pb-0">
        <h5 className="bankpage-form__title modal-title fw-bold">Request Partnership</h5>
        <button 
          type="button" 
          className="bankpage-form__close-btn btn-close"
          onClick={onClose}
          aria-label="Close"
        />
      </div>
      
      <div className="bankpage-form__body modal-body pt-3">
        <div className="bankpage-form__group mb-3">
          <label className="bankpage-form__label form-label text-muted small">
            Name of the bank
          </label>
          <input
            type="text"
            className={`bankpage-form__input form-control py-3 ${errors.bankName ? 'is-invalid' : ''}`}
            placeholder="eg Equity"
            value={formData.bankName}
            onChange={(e) => handleInputChange('bankName', e.target.value)}
          />
          {errors.bankName && (
            <div className="bankpage-form__error invalid-feedback d-block">
              {errors.bankName}
            </div>
          )}
        </div>
        
        <div className="bankpage-form__group mb-4">
          <label className="bankpage-form__label form-label text-muted small">
            Email Address of the bank
          </label>
          <input
            type="email"
            className={`bankpage-form__input form-control py-3 ${errors.bankEmail ? 'is-invalid' : ''}`}
            placeholder="example@gmail.com"
            value={formData.bankEmail}
            onChange={(e) => handleInputChange('bankEmail', e.target.value)}
          />
          {errors.bankEmail && (
            <div className="bankpage-form__error invalid-feedback d-block">
              {errors.bankEmail}
            </div>
          )}
        </div>
        
        <button 
          type="button"
          className="bankpage-form__submit-btn btn btn-success w-100 py-3 rounded-3 fw-semibold"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Sending...' : 'Send Request'}
        </button>
      </div>
    </>
  );
};

export default BankPagePartnershipForm;