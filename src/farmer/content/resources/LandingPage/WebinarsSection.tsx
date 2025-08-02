import React, { useState } from 'react';
import { RiFlashlightLine } from 'react-icons/ri';
import TrainingCard from './TrainingCard';
import { Training } from '../types';

interface WebinarsSectionProps {
  trainings: Training[];
  title?: string;
  onViewMore?: () => void;
  showViewMore?: boolean;
  cardProps?: Record<string, unknown>;
  className?: string;
}

const WebinarsSection: React.FC<WebinarsSectionProps> = ({
  trainings = [],
  title = "Webinars and Trainings",
  onViewMore,
  showViewMore = true,
  cardProps = {},
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const itemsPerPage = 3;

  const handleViewMore = () => {
    if (trainings.length <= itemsPerPage) return;
         
    setIsSliding(true);
         
    setTimeout(() => {
      const nextIndex = currentIndex + itemsPerPage;
      if (nextIndex >= trainings.length) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(nextIndex);
      }
      setIsSliding(false);
    }, 300);

    onViewMore?.();
  };

  const getCurrentItems = () => {
    return trainings.slice(currentIndex, currentIndex + itemsPerPage);
  };

  const hasMoreItems = trainings.length > itemsPerPage;

  return (
    <div className={`mb-2 ${className}`} style={{
       border: 'none',
       backgroundColor: '#ffffff',
       borderRadius: '20px 20px 20px 20px',
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
            key={`${training.id}-${currentIndex}-${index}`}
            training={training}
            {...cardProps}
          />
        ))}
      </div>
             
      {trainings.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No trainings available</p>
        </div>
      )}
             
      {hasMoreItems && (
        <div className="text-center mt-3">
          <small className="text-muted">
            Showing {currentIndex + 1}-{Math.min(currentIndex + itemsPerPage, trainings.length)} of {trainings.length}
          </small>
        </div>
      )}
    </div>
  );
};

export default WebinarsSection;