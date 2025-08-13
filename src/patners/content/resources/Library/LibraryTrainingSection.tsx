// LibraryTrainingsSection.tsx
import React, { useState } from 'react';
import { RiFlashlightLine } from 'react-icons/ri';
import TrainingCard from '../LandingPage/TrainingCard';
import { Training } from '../types';

interface LibraryTrainingsSectionProps {
  trainings: Training[];
  registeredTrainingIds: Set<string | number>;
  title?: string;
  onViewMore?: () => void;
  showViewMore?: boolean;
  className?: string;
  onAccessClick?: (training: Training) => void;
  onDownloadCertificate?: (training: Training) => void;
}

const LibraryTrainingsSection: React.FC<LibraryTrainingsSectionProps> = ({
  trainings = [],
  registeredTrainingIds,
  title = "🎓 Webinars and Trainings",
  onViewMore,
  showViewMore = true,
  className = '',
  onAccessClick,
  onDownloadCertificate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const itemsPerPage = 3;

  // Filter only registered trainings
  const registeredTrainings = trainings.filter(training => 
    registeredTrainingIds.has(training.id)
  );

  const handleViewMore = () => {
    if (registeredTrainings.length <= itemsPerPage) return;
              
    setIsSliding(true);
              
    setTimeout(() => {
      const nextIndex = currentIndex + itemsPerPage;
      if (nextIndex >= registeredTrainings.length) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(nextIndex);
      }
      setIsSliding(false);
    }, 300);

    onViewMore?.();
  };

  const getCurrentItems = () => {
    return registeredTrainings.slice(currentIndex, currentIndex + itemsPerPage);
  };

  const hasMoreItems = registeredTrainings.length > itemsPerPage;

  if (registeredTrainings.length === 0) {
    return (
      <div className={`mb-2 ${className}`} style={{
        border: 'none',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '20px'
      }}>
        <div className="d-flex align-items-center mb-4">
          <RiFlashlightLine className="me-2" size={20} />
          <h5 className="mb-0 fw-bold">{title}</h5>
        </div>
        
        <div className="text-center py-5">
          <div className="mb-3">
            <RiFlashlightLine size={48} style={{ color: '#dee2e6' }} />
          </div>
          <h6 className="text-muted mb-2">No Registered Trainings Yet</h6>
          <p className="text-muted small">
            Trainings and webinars you register for will appear here for easy access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`mb-2 ${className}`} style={{
      border: 'none',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '20px'
    }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <RiFlashlightLine className="me-2" size={20}/>
          <h5 className="mb-0 fw-bold">{title}</h5>
        </div>
        {showViewMore && hasMoreItems && (
          <button
            className="btn btn-link fw-semibold"
            style={{ color: '#198754', textDecoration: 'none' }}
            onClick={handleViewMore}
            disabled={isSliding}
          >
            View More
          </button>
        )}
      </div>
                    
      <div
        className="row"
        style={{
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          transform: isSliding ? 'translateX(-20px)' : 'translateX(0)',
          opacity: isSliding ? 0.7 : 1
        }}
      >
        {getCurrentItems().map((training, index) => (
          <TrainingCard
            key={`library-training-${training.id}-${currentIndex}-${index}`}
            training={training}
            isLibraryMode={true}
            isRegistered={true}
            onAccessClick={onAccessClick}
            onDownloadCertificate={onDownloadCertificate}
            showPrice={false} // Don't show price in library mode
            showSlots={false} // Don't show slots in library mode
          />
        ))}
      </div>
                    
      {hasMoreItems && (
        <div className="text-center mt-3">
          <small className="text-muted">
            Showing {currentIndex + 1}-{Math.min(currentIndex + itemsPerPage, registeredTrainings.length)} of {registeredTrainings.length}
          </small>
        </div>
      )}
    </div>
  );
};

export default LibraryTrainingsSection;