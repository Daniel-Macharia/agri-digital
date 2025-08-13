// Enhanced TrainingCard.tsx with Library Mode
import React from 'react';
import { FaClock, FaMapMarkerAlt, FaCalendarAlt} from 'react-icons/fa';
import { useTrainingResources } from '../TrainingResourcesContext';

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
}

interface TrainingCardProps {
  training: Training;
  showPrice?: boolean;
  showOrganization?: boolean;
  showSlots?: boolean;
  className?: string;
  // New props for library mode
  isLibraryMode?: boolean;
  isRegistered?: boolean;
  onAccessClick?: (training: Training) => void;
  onDownloadCertificate?: (training: Training) => void;
}

const TrainingCard: React.FC<TrainingCardProps> = ({
  training,
  showPrice = true,
  showOrganization = true,
  showSlots = true,
  className = '',
  isLibraryMode = false,
  isRegistered = false,
  onAccessClick,
 // onDownloadCertificate
}) => {
  const { handleTrainingRegister, handleTrainingImageClick, registeredTrainings } = useTrainingResources();

  // Check if training is registered (either from props or context)
  const isTrainingRegistered = isRegistered || registeredTrainings.has(training.id);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleTrainingImageClick(training);
  };

  const handlePrimaryAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLibraryMode && isTrainingRegistered) {
      // In library mode, clicking should access the training (go to detail page)
      //onAccessClick?.(training) || handleTrainingImageClick(training);
      if (onAccessClick) {
        onAccessClick(training);
      }
    } else {
      // In regular mode, handle registration
      handleTrainingRegister(training);
    }
  };

  return (
    <div className={`col-md-4 mb-4 ${className}`}>
      <div
        className="h-100"
        style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
        {...(!isLibraryMode && { onClick: handleImageClick })}
      >
        <div className="position-relative" style={{ cursor: 'pointer' }}>
          <img
            src={training.image}
            alt={training.title}
            className="img-fluid"
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '20px' }}
          />
        </div>

        <div className="mt-3">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="fw-bold mb-2">{training.title}</h6>
            {/* Show registration status in library mode, slots in regular mode */}
            {isLibraryMode && isTrainingRegistered ? (
              <div className="d-flex justify-content-end px-3">
                <span className="badge bg-success">
                {/* <FaCheckCircle className="me-2" size={12} /> */}
                </span>
              </div>
            ) : showSlots && training.slotsLeft && !isLibraryMode && (
              <div className="d-flex justify-content-end px-3">
                <span className="badge bg-warning text-dark">
                  {training.slotsLeft} Slots Left
                </span>
              </div>
            )}
          </div>
                                
          {showOrganization && training.organizationName && (
            <p className="text-primary small mb-2">{training.organizationName}</p>
          )}

          <div className="mb-3">
            {training.dateTime && (
              <div className="d-flex align-items-center mb-1">
                <FaCalendarAlt className="me-2 text-muted" size={12} />
                <span className="small text-muted">{training.dateTime}</span>
              </div>
            )}
            {training.duration && (
              <div className="d-flex align-items-center mb-1">
                <FaClock className="me-2 text-muted" size={12} />
                <span className="small text-muted">{training.duration}</span>
              </div>
            )}
            {training.location && (
              <div className="d-flex align-items-center mb-2">
                <FaMapMarkerAlt className="me-2 text-muted" size={12} />
                <span className="small text-muted">{training.location}</span>
              </div>
            )}
          </div>

          {training.description && (
            <p className="text-muted small mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
              {training.description}
            </p>
          )}

          <div className="d-flex justify-content-between align-items-center">
           
              {!isLibraryMode &&
              <>
                <button
                  className="btn btn-primary btn-sm rounded-pill py-2"
                  onClick={handlePrimaryAction}
                >
                  Register Now
                </button>
                {showPrice && training.price && (
                  <span className="fw-bold text-dark">KES {training.price}</span>
                )}
              </>}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;