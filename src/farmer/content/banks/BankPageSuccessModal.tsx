import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
const BankPageSuccessModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="bankpage-success text-center p-4">
      <div className="bankpage-success__icon mb-3">
        <FaCheckCircle size={60} className="text-success" />
      </div>
      <h4 className="bankpage-success__title fw-bold mb-3">Request Sent Successfully!</h4>
      <p className="bankpage-success__message text-muted mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <button 
        className="bankpage-success__btn btn btn-success px-4 py-2 rounded-3 fw-semibold"
        onClick={onClose}
      >
        Return to Bank
      </button>
    </div>
  );
};

export default BankPageSuccessModal;