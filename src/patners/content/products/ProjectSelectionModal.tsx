import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FaQuestion } from "react-icons/fa";
import { ProjectSelectionModalProps } from "./index";

const ProjectSelectionModal: React.FC<ProjectSelectionModalProps> = ({
  show,
  onHide,
  onCropProject,
  onLivestockProject,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="sm"
      className="px-2"
      dialogClassName="mx-auto"
    >
      <Modal.Body className="p-2 p-sm-3 p-md-4">
        <Row className="justify-content-center">
          <Col xs={12}>
            <div className="text-center mb-3 mb-md-4">
              <div
                className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-2 mb-md-3"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#F7F7F7",
                }}
              >
                <FaQuestion
                  size={30}
                  color="#F2C464"
                  style={{ fontWeight: "bold" }}
                />
              </div>
              <h5 className="fw-bold mb-2">Project</h5>
              <p className="text-muted mb-1 small">
                Ready to start your farming adventure?
              </p>
              <p className="text-muted small">Choose your journey?</p>
            </div>

            {/* Stack vertically on xs, horizontal on sm+ */}
            <Row className="g-2 g-sm-3">
              <Col xs={12} sm={6}>
                <Button
                  variant="success"
                  onClick={onCropProject}
                  className="w-100 py-2 py-sm-3 fw-medium"
                  style={{ backgroundColor: "#6B8E23", borderColor: "#6B8E23" }}
                >
                  <span className="d-block d-sm-inline">Crop</span>
                </Button>
              </Col>
              <Col xs={12} sm={6}>
                <Button
                  variant="outline-success"
                  onClick={onLivestockProject}
                  className="w-100 py-2 py-sm-3 fw-medium"
                  style={{
                    color: "#8B4513",
                    borderColor: "#8B4513",
                    backgroundColor: "#D2691E",
                  }}
                >
                  <span className="d-block d-sm-inline">Livestock </span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectSelectionModal;
