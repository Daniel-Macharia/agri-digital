
import React from 'react';
import { FaQuestion, FaTimes } from 'react-icons/fa';

interface CreateContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateArticle: () => void;
  onCreateTraining: () => void;
}

const CreateContentModal: React.FC<CreateContentModalProps> = ({
  isOpen,
  onClose,
  onCreateArticle,
  onCreateTraining
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Bootstrap Modal Backdrop */}
      <div 
        className="modal-backdrop fade show"
        onClick={onClose}
        style={{ zIndex: 1040 }}
      ></div>

      {/* Bootstrap Modal */}
      <div 
        className="modal fade show d-block"
        tabIndex={-1}
        style={{ zIndex: 1050 }}
        role="dialog"
        aria-labelledby="createContentModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}>
            {/* Modal Header */}
            <div className="modal-header border-0 pb-2" style={{ padding: '1.5rem 1.5rem 0 1.5rem' }}>
              <button
                type="button"
                className="btn-close ms-auto"
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  color: '#6b7280',
                  cursor: 'pointer',
                  padding: '0',
                  opacity: '0.7'
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body text-center" style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
              {/* Question Icon */}
              <div className="mb-0 d-flex align-items-center justify-content-center rounded-circle bg-accent" style={{ width: '80px', height: '80px', margin: '0 auto' }}>
                <FaQuestion size={32}
                  style={{ 
                    color: '#f59e0b',
                    filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.2))'
                  }} 
                />
              </div>

              {/* Title */}
              <h4 
                className="modal-title mb-3" 
                id="createContentModalLabel"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.75rem'
                }}
              >
                Create Something New
              </h4>

              {/* Subtitle */}
              <p 
                className="text-muted mb-4"
                style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  marginBottom: '2rem'
                }}
              >
                What would you like to create today?
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                {/* Create Article Button */}
                <button
                  type="button"
                  className="btn btn-success flex-fill"
                  onClick={() => {
                    onCreateArticle();
                    onClose();
                  }}
                  style={{
                    backgroundColor: '#7cb342',
                    borderColor: '#7cb342',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    border: 'none',
                    boxShadow: '0 2px 4px rgba(124, 179, 66, 0.2)',
                    transition: 'all 0.2s ease-in-out',
                    minWidth: '140px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#689f38';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(124, 179, 66, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#7cb342';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(124, 179, 66, 0.2)';
                  }}
                >
                  An Article
                </button>

                {/* Create Training Button */}
                <button
                  type="button"
                  className="btn btn-outline-warning flex-fill"
                  onClick={() => {
                    onCreateTraining();
                    onClose();
                  }}
                  style={{
                    borderColor: '#f59e0b',
                    color: '#f59e0b',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    borderWidth: '2px',
                    backgroundColor: 'transparent',
                    transition: 'all 0.2s ease-in-out',
                    minWidth: '140px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f59e0b';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(245, 158, 11, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#f59e0b';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  A Training
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateContentModal;