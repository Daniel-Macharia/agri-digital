import React from 'react';
import { FaArrowLeft, FaHandshake } from 'react-icons/fa';


// 1. Header Component
// Header Component
const BankPageHeader: React.FC<{ onRequestPartnership: () => void, showPartnership: boolean }> = ({ 
  onRequestPartnership, 
  showPartnership 
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center" style={{backgroundColor: '#efeeeeff'}}>
      <button className="btn col-3 border-0 bg-transparent text-start">
        <FaArrowLeft size={16} className="text-secondary text-start" />
      </button>
      {showPartnership && (
        <button 
          className="btn px-4 py-2 text-white"
          style={{ backgroundColor: '#556B2F', fontSize: '0.875rem' }}
          onClick={onRequestPartnership}
        >
          <FaHandshake className="me-2" />
          <span className="d-none d-sm-inline">Request Partnership</span>
          <span className="d-inline d-sm-none">Partner</span>
        </button>
      )}
    </div>
  );
};

export default BankPageHeader;