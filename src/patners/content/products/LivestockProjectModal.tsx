import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaQuestion } from "react-icons/fa";
import {
  FormErrors,
  LivestockFormData,
  LivestockProjectModalProps,
} from "./index";

const LivestockProjectModal: React.FC<LivestockProjectModalProps> = ({
  show,
  onHide,
  onBack,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<LivestockFormData>({
    projectName: "",
    livestockType: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.projectName) {
      newErrors.projectName = "Please enter project name";
    }

    if (!formData.livestockType) {
      newErrors.livestockType = "Please select animal type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleProjectNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({ ...formData, projectName: e.target.value });
  };
  const handleAnimalTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({ ...formData, livestockType: e.target.value });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      dialogClassName="mx-auto"
    >
      <Modal.Body className="p-4">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="text-center mb-4">
              <div
                className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
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
              <h5 className="fw-bold mb-2">Livestock Project</h5>
            </div>

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12}>
                  <Form.Group controlId="projectName" className="mb-3">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.projectName}
                      onChange={handleProjectNameChange}
                      size="lg"
                    />
                    {errors.projectName && (
                      <Form.Text className="text-danger">
                        {errors.projectName}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Form.Group controlId="animalType" className="mb-4">
                    <Form.Label>Animal Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.livestockType}
                      onChange={handleAnimalTypeChange}
                      size="lg"
                    >
                      <option value="">SELECT</option>
                      <option value="Cattle">Cattle</option>
                      <option value="Sheep">Sheep</option>
                      <option value="Goats">Goats</option>
                    </Form.Control>
                    {errors.livestockType && (
                      <Form.Text className="text-danger">
                        {errors.livestockType}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 py-3 fw-medium"
                    style={{
                      backgroundColor: "#6B8E23",
                      borderColor: "#6B8E23",
                    }}
                  >
                    Begin
                  </Button>
                </Col>
                <Col xs={12} sm={6}>
                  <Button
                    variant="outline-secondary"
                    onClick={onBack}
                    className="w-100 py-3 fw-medium"
                  >
                    Back
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default LivestockProjectModal;
