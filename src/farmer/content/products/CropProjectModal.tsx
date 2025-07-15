import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaQuestion } from "react-icons/fa";
import { CropFormData, FormErrors, CropProjectModalProps } from './index';

const CropProjectModal: React.FC<CropProjectModalProps> = ({ show, onHide, onBack, onSubmit }) => {
  const [formData, setFormData] = useState<CropFormData>({
    projectName: ''
  });
     
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
        
    if (!formData.projectName) {
      newErrors.projectName = 'Please enter project name';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, projectName: e.target.value });
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" dialogClassName='mx-auto'>
      <Modal.Body className="p-4">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="text-center mb-4">
              <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: '50px', height: '50px', backgroundColor: '#F7F7F7' }}>
                <FaQuestion size={30} color="#F2C464" style={{ fontWeight: 'bold' }} />
              </div>
              <h5 className="fw-bold mb-2">Crop Project</h5>
            </div>
            
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12}>
                  <Form.Group controlId="projectName" className="mb-4">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control 
                      type="text"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      size="lg"
                    />
                    {errors.projectName && <Form.Text className="text-danger">{errors.projectName}</Form.Text>}
                  </Form.Group>
                </Col>
              </Row>
              
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 py-3 fw-medium"
                    style={{ backgroundColor: '#6B8E23', borderColor: '#6B8E23' }}
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

export default CropProjectModal;