import React, { useState } from 'react';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import ProjectSelectionModal from '../../products/ProjectSelectionModal';
import ProjectTypeSelectionModal from '../ProjectTypeSelectionModal';

export interface LoanDetailsProps {
  loanData?: {
    title: string;
    provider: string;
    loanAmount: string;
    interestRate: string;
    repaymentPeriod: string;
    collateral: string;
    eligibility: string[];
  };
  onApplyNow: () => void;
  onBackToLoans: () => void;
}

const LoanDetails: React.FC<LoanDetailsProps> = ({
  loanData = {
    title: "Farm Equipment Loan",
    provider: "Provided by AgriBank",
    loanAmount: "$500 - $10,000",
    interestRate: "5% per annum",
    repaymentPeriod: "6-24 months",
    collateral: "Required",
    eligibility: [
      "Must be a registered farmer",
      "Minimum 2 years of farming experience",
      "Valid government ID"
    ]
  },
  onApplyNow,
  onBackToLoans
}) => {
  const [showProjectTypeModal, setShowProjectTypeModal] = useState(false);
  const [showProjectSelectionModal, setShowProjectSelectionModal] = useState(false);

  const handleApplyNowClick = () => {
    console.log("Apply Now clicked");
    setShowProjectTypeModal(true);
  };

  const handleCloseProjectTypeModal = () => {
    setShowProjectTypeModal(false);
  };

  const handleAddNowClick = () => {
    console.log("HandleAddNowClick fired");
    setShowProjectTypeModal(false);
    setTimeout(() => {
      console.log("Opening second modal: ProjectSelectionModal");
      setShowProjectSelectionModal(true);
    }, 300);
  };

  const handleCloseProjectSelectionModal = () => {
    setShowProjectSelectionModal(false);
  };

  const handleCropProject = () => {
    setShowProjectSelectionModal(false);
    console.log('Creating crop project...');
    onApplyNow();
  };

  const handleLivestockProject = () => {
    setShowProjectSelectionModal(false);
    console.log('Creating livestock project...');
    onApplyNow();
  };

  return (
    <div className="loan-details-container bg-light min-vh-100 px-0">
      <div className="container py-2 px-0" style={{ backgroundColor: '#eeeeeeff' }}>
        <div className="row mb-4">
          <div className="col-12">
            <button
              className="btn btn-link p-0 text-decoration-none text-muted d-flex align-items-center mb-1"
              onClick={onBackToLoans}
            >
              <FaArrowLeft className="me-2" />
              Back to Loans
            </button>
          </div>
        </div>

        <div className="row justify-content-start">
          <div className="col-12 col-lg-12">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="card-header bg-white border-0 p-4">
                <h5 className="card-title fw-bold text-dark mb-2">{loanData.title}</h5>
                <p className="text-success mb-0 fw-semibold">{loanData.provider}</p>
              </div>

              <div className="card-body p-4">
                <div className="mb-4">
                  <h6 className="fw-bold text-dark mb-3">Key Details</h6>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="p-3 h-100 bg-light">
                        <label className="small text-muted fw-semibold mb-1">Loan Amount</label>
                        <p className="h6 fw-bold text-dark mb-0">{loanData.loanAmount}</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="p-3 h-100 bg-light">
                        <label className="small text-muted fw-semibold mb-1">Interest Rate</label>
                        <p className="h6 fw-bold text-dark mb-0">{loanData.interestRate}</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="p-3 h-100 bg-light">
                        <label className="small text-muted fw-semibold mb-1">Repayment Period</label>
                        <p className="h6 fw-bold text-dark mb-0">{loanData.repaymentPeriod}</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="p-3 h-100 bg-light">
                        <label className="small text-muted fw-semibold mb-1">Collateral</label>
                        <p className="h6 fw-bold text-dark mb-0">{loanData.collateral}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="fw-normal text-dark mb-0">Eligibility & Requirements</h6>
                  <div className="p-2 ms-0">
                    {loanData.eligibility.map((requirement, index) => (
                      <div key={index} className="d-flex align-items-start mb-2">
                        <FaCheck size={10} className="me-1 text-success" />
                        <span className="text-dark">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-100">
                  <button
                    className="btn btn-lg py-2 rounded-3 fw-normal w-100"
                    style={{
                      backgroundColor: '#556b2f',
                      borderColor: '#556b2f',
                      color: 'white',
                      fontSize: '0.875rem'
                    }}
                    onClick={handleApplyNowClick}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="alert alert-info border-0 rounded-3" role="alert">
                  <div className="d-flex">
                    <i className="bi bi-info-circle-fill me-2 flex-shrink-0"></i>
                    <div>
                      <strong>Important:</strong> Please ensure you have all required documents ready before starting your application.
                      The application process typically takes 3-5 business days for approval.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Type Selection Modal */}
      <ProjectTypeSelectionModal
        show={showProjectTypeModal}
        onHide={handleCloseProjectTypeModal}
        onAddNow={handleAddNowClick}
      />

      {/* Project Selection Modal */}
      <ProjectSelectionModal
        show={showProjectSelectionModal}
        onHide={handleCloseProjectSelectionModal}
        onCropProject={handleCropProject}
        onLivestockProject={handleLivestockProject}
      />
    </div>
  );
};

export default LoanDetails;
