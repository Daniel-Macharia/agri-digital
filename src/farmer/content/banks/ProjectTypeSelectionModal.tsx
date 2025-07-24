import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaQuestion } from "react-icons/fa";

interface ProjectTypeSelectionModalProps {
  show: boolean;
  onHide: () => void;
  onAddNow: () => void; // This will open the ProjectSelectionModal
}

const ProjectTypeSelectionModal: React.FC<ProjectTypeSelectionModalProps> = ({
  show,
  onHide,
  onAddNow
}) => {
  return (
    <Modal 
      show={show}
      onHide={onHide}
      centered
      size='sm'
      className="px-2"
      dialogClassName='mx-auto'
      backdrop="static"
    >
      <Modal.Body className="p-4 text-center">
        {/* Header with Icon and Emoji */}
        <div className="mb-4">
          <div 
            className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3 position-relative"
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#E5E5E5',
              border: '2px dashed #CCCCCC'
            }}
          >
            <span style={{ fontSize: '32px' }}>🦆</span>
            <div 
              className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
              style={{
                top: '-8px',
                right: '-8px',
                width: '24px',
                height: '24px',
                backgroundColor: '#FFA500',
                border: '2px solid white'
              }}
            >
              <FaQuestion size={12} color="white" />
            </div>
          </div>
          
          <h4 className="fw-bold text-dark mb-2">Hello</h4>
          <p className="text-muted mb-0" style={{ fontSize: '15px' }}>
            You have not created a project. Please<br />
            add at least one to continue.
          </p>
        </div>

        {/* Action Buttons */}
        <Row className="g-2 justify-content-center">
          <Col xs={6}>
            <Button
              variant="outline-success"
              onClick={onHide}
              className="w-100 py-2 fw-normal border-2"
              style={{
                color: '#6B8E23',
                borderColor: '#6B8E23',
                fontSize: '14px'
              }}
            >
              LATER
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              variant="success"
              onClick={() => {
                console.log("ADD NOW button clicked");
                onAddNow();
              }}
              className="w-100 py-2 fw-normal"
              style={{
                backgroundColor: '#6B8E23',
                borderColor: '#6B8E23',
                fontSize: '14px'
              }}
            >
              ADD NOW
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectTypeSelectionModal;
