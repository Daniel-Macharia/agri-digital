import React from 'react';
import { FaClock, FaMapMarkerAlt, FaCalendarAlt, FaArrowLeft, FaTag } from 'react-icons/fa';
import DocumentsSection from './DocumentsSection';
import TrainingRegistrationModal from '../LandingPage/TrainingRegistrationModal';
import { useTrainingResources } from '../TrainingResourcesContext'; // Add this import

interface Training {
  id: number | string;
  title: string;
  organizationName?: string;
  duration?: string;
  location?: string;
  dateTime?: string;
  slotsLeft?: string;
  description?: string;
  price?: number;
  image?: string;
  datePublished?: string;
}

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  uploadedAt: Date;
  description?: string;
  pages?: number;
  body: string;
  createElement: (tag: string) => HTMLElement;
}

interface TrainingDetailPageProps {
  training: Training;
  onBackClick: () => void;
  isRegistered: boolean;
  onRegisterClick: (training: Training) => void;
  documents?: DocumentItem[];
}

const TrainingDetailPage: React.FC<TrainingDetailPageProps> = ({
  training,
  onBackClick,
  isRegistered,
  onRegisterClick,
  documents = []
}) => {
  // Get context values for modal handling
  const {
    showRegistrationModal,
    selectedTraining,
    closeRegistrationModal,
    handleProceedToPayment
  } = useTrainingResources();

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: '#eeeeee', minHeight: '100vh', padding: '0' }}>
        <div className="container py-4">
          {/* Back Button */}
          <div className="mb-2">
            <button 
              className="btn btn-link text-muted p-0 d-flex align-items-center"
              onClick={onBackClick}
              style={{ textDecoration: 'none' }}
            >
              <FaArrowLeft className="me-2" size={14} />
              Back to Training & Resources
            </button>
          </div>

          {/* Training Image */}
          <div className="mb-4">
            
          {/* Training Header */}
          <div className="bg-white p-4 mb-4 shadow-sm" style={{ borderRadius: '30px 30px 0 0' }}>
            <div className="position-relative">
              <img
                src={training.image || 'https://images.unsplash.com/photo-1730659370558-e2472828a61d?w=600&auto=format&fit=crop&q=60'}
                alt={training.title}
                className="img-fluid w-100"
                style={{ 
                  height: '300px', 
                  objectFit: 'cover', 
                  borderRadius: '20px'
                }}
              />
              {/* Slots Left Badge */}
              {training.slotsLeft && (
                <div className="position-relative mb-2 pt-3">
                  <span className="badge bg-warning text-dark px-3 py-2" style={{ fontSize: '0.9rem' }}>
                    {training.slotsLeft} Slots Left / 52 Slots
                  </span>
                  

            
              <small className="text-muted ms-3">{training.organizationName}</small>
            
            
                </div>
              )}
              <div className='col-12 d-flex align-space-between align-items-center'>
              <h5 className="fw-bold mb-3 col-sm-10">{training.title}</h5>
            
            
              {/* Register Button - Only show if not registered */}
              {!isRegistered && (
                <div className="position-relative align-content-end">
                  <button 
                    className="btn btn-success me-0 py-1"
                    style={{ borderRadius: '5px' }}
                    onClick={() => onRegisterClick(training)}
                  >
                    Register Now
                  </button>
                </div>
              )}
              </div>
            </div>
            <div className="mb-3">
              <small className="text-muted">Submitted on {training.datePublished || '12/04/2025'}</small>
            </div>

            {/* Training Details */}
            <div className="row mb-4">
              <div className="col-md-6">
                {isRegistered && (
                <><div className="d-flex align-items-center mb-2">
                      <FaCalendarAlt className="me-2 text-muted" size={16} />
                      <small className="text-muted me-2">Date & Time</small>
                    </div><div className="d-flex align-items-center mb-2">
                        <FaClock className="me-2 text-muted" size={16} />
                        <small className="text-muted me-2">Duration</small>
                      </div><div className="d-flex align-items-center mb-2">
                        <FaMapMarkerAlt className="me-2 text-muted" size={16} />
                        <small className="text me-2 text-primary" style={{ cursor: 'pointer' }}>Location for the training</small>
                      </div></>)}
                <div className="d-flex align-items-center mb-2">
                  <FaTag className="me-2 text-muted" size={16} />
                  <small className="text-muted me-2">Tags for topics covered</small>
                </div>
              </div>
            </div>

            {/* Speakers Section */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Speaker</h6>
              <div className="mb-2">
                <div className="d-flex align-items-center">
                  <div className="me-2" style={{ width: '20px', height: '20px', backgroundColor: '#28a745', borderRadius: '50%' }}></div>
                  <span className="fw-semibold">Sarah Jones</span>
                  <span className="text-muted ms-2">- AgriWork Product Manager</span>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex align-items-center">
                  <div className="me-2" style={{ width: '20px', height: '20px', backgroundColor: '#28a745', borderRadius: '50%' }}></div>
                  <span className="fw-semibold">Dr. Sarah Green</span>
                  <span className="text-muted ms-2">- Agricultural Economist & Farm Labor Specialist</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Description</h6>
              <p className="text-muted" style={{ lineHeight: '1.6' }}>
                {training.description || `Agriculture is the backbone of many economies, but one of the biggest challenges farmers face today is finding skilled labor to support their operations. Labor shortages, lack of efficiency, and high operational costs make farming more difficult, affecting productivity and profitability.

This is where AgriWork comes in—a revolutionary platform designed to connect farmers with skilled laborers to optimize farm operations, reduce inefficiencies, and improve productivity. In this article, we take a deep dive into how AgriWork is transforming the agricultural workforce and making farming more efficient.`}
              </p>
            </div>
          </div>
          </div>

          {/* Documents Section - Only show if registered */}
          {isRegistered && (
            <DocumentsSection 
              isPurchased={true}
              documents={documents}
            />
          )}
        </div>
      </div>

      {/* Training Registration Modal - Add this */}
      <TrainingRegistrationModal
        show={showRegistrationModal}
        training={selectedTraining}
        onHide={closeRegistrationModal}
        onProceedToPayment={handleProceedToPayment}
      />
    </>
  );
};

export default TrainingDetailPage;