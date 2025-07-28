import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { getPolicyById, /*PolicyData*/ } from './InsurancePage';
import ProjectTypeSelectionModal from '../banks/ProjectTypeSelectionModal';
import ProjectSelectionModal from '../products/ProjectSelectionModal';
import LivestockProjectModal from '../products/LivestockProjectModal';
import CropProjectModal from '../products/CropProjectModal';
import { CropFormData, LivestockFormData } from '../products';

const PolicyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const policy = id ? getPolicyById(id) : null;

  const [showProjectSelectionModal, setShowProjectSelectionModal] = React.useState(false);
  const [showProjectTypeSelectionModal, setShowProjectTypeSelectionModal] = React.useState(false);
  const [showLivestockProjectModal, setShowLivestockProjectModal] = React.useState(false);
  const [showCropProjectModal, setShowCropProjectModal] = React.useState(false);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handlePurchase = (policyId: string) => {
    console.log(`Starting purchase process for policy ${policyId}`);
    // Start the modal flow by showing project type selection
    setShowProjectTypeSelectionModal(true);
  };

  const handlePayPolicy = (policyId: string) => {
    console.log(`Paying for policy ${policyId}`);
    navigate(`/farmer/insurance/payment`);
  };

  const handleFileClaim = (policyId: string) => {
    console.log(`Filing claim for policy ${policyId}`);
    navigate(`/farmer/insurance/file-claim/${policyId}`);
  };

  // Modal handlers for project type selection
  const handleCloseProjectTypeModal = () => {
    setShowProjectTypeSelectionModal(false);
  };

  const handleAddNowClick = () => {
    console.log("HandleAddNowClick fired");
    setShowProjectTypeSelectionModal(false);
    setTimeout(() => {
      console.log("Opening second modal: ProjectSelectionModal");
      setShowProjectSelectionModal(true);
    }, 300);
  };

  // Modal handlers for project selection
  const handleCloseProjectSelectionModal = () => {
    setShowProjectSelectionModal(false);
  };

  const handleCropProject = (): void => {
    setShowProjectSelectionModal(false);
    setShowCropProjectModal(true);
  };

  const handleLivestockProject = (): void => {
    setShowProjectSelectionModal(false);
    setShowLivestockProjectModal(true);
  };

  const handleBackToProjectSelection = (): void => {
    setShowLivestockProjectModal(false);
    setShowCropProjectModal(false);
    setShowProjectSelectionModal(true);
  };

  // Modal handlers for livestock project
  const handleCloseLivestockModal = (): void => {
    setShowLivestockProjectModal(false);
  };

  const handleLivestockSubmit = (formData: LivestockFormData): void => {
    console.log('Livestock Project Data:', formData);
    // Close the livestock modal
    setShowLivestockProjectModal(false);
    // Navigate to purchase form page
    if (policy) {
      navigate(`/farmer/insurance/purchase-policy/${policy.id}`);
    }
  };

  // Modal handlers for crop project
  const handleCloseCropModal = (): void => {
    setShowCropProjectModal(false);
  };

  const handleCropSubmit = (formData: CropFormData): void => {
    console.log('Crop Project Data:', formData);
    // Close the crop modal
    setShowCropProjectModal(false);
    // Navigate to purchase form page
    if (policy) {
      navigate(`/farmer/insurance/purchase-policy/${policy.id}`);
    }
  };

  // If policy not found, show error
  if (!policy) {
    return (
      <div className="container-fluid bg-light min-vh-100">
        <div className="row">
         <div className="col-12">
           <div className="d-flex align-items-center p-3 bg-white shadow-sm">
             <button
              className="btn btn-link p-0 text-light d-flex align-items-center"
              onClick={handleBack}
              >
              <FaArrowLeft size={12} />
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <h4 className="text-muted">Policy not found</h4>
            <p className="text-muted">The policy you're looking for doesn't exist.</p>
            <button 
              className="btn btn-success"
              onClick={handleBack}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const defaultFeatures = [
    'Up to KES 500,000 coverage per crop',
    '24/7 claim support',
    'Drought and flood protection',
    'Market price protection',
    'Pest damage coverage',
    'Expert agricultural assessment'
  ];

  const features = policy.features || defaultFeatures;

  return (
    <div className="container-fluid bg-light min-vh-100">
      {/* Header */}
      <div className="row">
        <div className=" col-2 d-flex align-items-center p-0 bg-light">
             <button
              className="btn btn-link p-0 text-muted d-flex align-items-center"
              onClick={handleBack}
              >
              <FaArrowLeft size={12} />
              </button>
            <span className="text-muted align-self-start pb-1">Back to Insurance</span>
          </div>
        </div>
      {/* Policy Details */}
      <div className="row">
        <div className="col-12">
          <div className="bg-white pt-4 px-4 rounded-top-5 mb-4 pb-1">
            <div className="position-relative mb-2" 
            style={{ height: '250px', overflow: 'hidden', }}>
            <img 
              src={policy.image} 
              alt={policy.title}
              className="w-100 h-100 rounded-top-5" 
              style={{ objectFit: 'cover',}}
            />
          </div>
            {/* Title and Company */}
            <div className="mb-3 text-start">
              <h4 className="fw-semibold mb-0">{policy.title}</h4>
              <p className="text-success mb-0">Provide by {policy.company}</p>
            </div>

            {/* Coverage Details Section */}
            <div className="mb-4">
                 <h6 className="fw-semibold mb-1 text-start">Coverage Details</h6>
                <div className="row">
                   <div className="col-12">
                      {features.map((feature, index) => (
                     <div key={index} className="d-flex align-items-center mb-1" style={{fontSize: '18px'}}>
                     <FaCheck className="text-success me-2 flex-shrink-0" size={8} />
                     <span className="small">{feature}</span>
                    </div>
                      ))}
              </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-2">
              <h6 className="fw-semibold mb-2 text-start">Pricing</h6>
              <div className="d-flex align-items-baseline" style={{color: '#556B2F'}}>
                <span className="h4 fw-bold  me-2">
                  {policy.price || 'KES 10,000'}
                </span>
                <span className="text-small">/month</span>
              </div>
              <p className="small text-muted text-start">Starting price for basic coverage</p>
            </div>
         {/* Action Buttons */}
            <div className="mt-1 mb-3">
              {policy.isPurchased ? (
                <div className="d-flex gap-4">
                  <button 
                    className="btn text-white fw-bold flex-fill py-2"
                    style={{ backgroundColor: '#556B2F' }}
                    onClick={() => handlePayPolicy(policy.id)}
                  >
                    Pay Policy
                  </button>
                  <button 
                    className="btn btn-outline-warning fw-bold flex-fill py-2"
                    onClick={() => handleFileClaim(policy.id)}
                  >
                    File a Claim
                  </button>
                </div>
              ) : (
                <button 
                  className="btn text-white w-100 py-2 fw-bold"
                  style={{ backgroundColor: '#556B2F' }}
                  onClick={() => handlePurchase(policy.id)}
                >
                  Purchase Policy
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Type Selection Modal */}
      <ProjectTypeSelectionModal
        show={showProjectTypeSelectionModal}
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

      <LivestockProjectModal
       show={showLivestockProjectModal}
       onHide={handleCloseLivestockModal}
       onBack={handleBackToProjectSelection}
       onSubmit={handleLivestockSubmit}
      />

      <CropProjectModal
       show={showCropProjectModal}
       onHide={handleCloseCropModal}
       onBack={handleBackToProjectSelection}
       onSubmit={handleCropSubmit}
        />

      <style>
        {`
          .rounded-top-5 {
            border-top-left-radius: 45px;
            border-top-right-radius: 45px;
          }
        `}
      </style>
    </div>
  );
};

export default PolicyDetailsPage;