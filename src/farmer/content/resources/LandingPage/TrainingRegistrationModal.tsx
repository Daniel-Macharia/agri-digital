// TrainingRegistrationModal.tsx
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FiX, FiUser, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

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

interface RegistrationFormData {
  name: string;
  email: string;
}

interface TrainingRegistrationModalProps {
  show: boolean;
  training: Training | null;
  onHide: () => void;
  onProceedToPayment: (training: Training, formData: RegistrationFormData) => void;
}

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required')
});

const TrainingRegistrationModal: React.FC<TrainingRegistrationModalProps> = ({
  show,
  training,
  onHide,
  onProceedToPayment
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Validate form
  const validateForm = async (): Promise<boolean> => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const errorMessages: Partial<RegistrationFormData> = {};
      
      if (validationErrors instanceof Yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            errorMessages[error.path as keyof RegistrationFormData] = error.message;
          }
        });
      }
      
      setErrors(errorMessages);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = await validateForm();
    
    if (isValid && training) {
      // Proceed to payment
      onProceedToPayment(training, formData);
      
      // Reset form
      setFormData({ name: '', email: '' });
      setErrors({});
    }

    setIsSubmitting(false);
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({ name: '', email: '' });
    setErrors({});
    setIsSubmitting(false);
    onHide();
  };

  if (!training) return null;

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="w-100 text-center">
          <h5 className="mb-0 fw-bold">Register for Training</h5>
        </Modal.Title>
        <Button
          variant="link"
          className="btn-close-custom p-0 border-0 bg-transparent"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          <FiX size={20} color="#6c757d" />
        </Button>
      </Modal.Header>

      <Modal.Body className="px-4 py-3">
        <Form onSubmit={handleSubmit}>
          {/* Name Field */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-dark mb-2">
              Name
            </Form.Label>
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                isInvalid={!!errors.name}
                className="ps-5"
                style={{
                  borderRadius: '8px',
                  border: errors.name ? '1px solid #dc3545' : '1px solid #ced4da',
                  fontSize: '0.95rem',
                  padding: '12px 16px 12px 40px'
                }}
              />
              <FiUser 
                size={16} 
                color="#6c757d"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10
                }}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.name}
                </Form.Control.Feedback>
              )}
            </div>
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-dark mb-2">
              Email Address
            </Form.Label>
            <div className="position-relative">
              <Form.Control
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                isInvalid={!!errors.email}
                className="ps-5"
                style={{
                  borderRadius: '8px',
                  border: errors.email ? '1px solid #dc3545' : '1px solid #ced4da',
                  fontSize: '0.95rem',
                  padding: '12px 16px 12px 40px'
                }}
              />
              <FiMail 
                size={16} 
                color="#6c757d"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10
                }}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </div>
          </Form.Group>

          {/* Training Info */}
          <div className="bg-light rounded p-3 mb-4">
            <h6 className="fw-bold mb-2 text-dark">{training.title}</h6>
            <div className="row text-muted small">
              {training.organizationName && (
                <div className="col-6 mb-1">
                  <strong>Organization:</strong> {training.organizationName}
                </div>
              )}
              {training.dateTime && (
                <div className="col-6 mb-1">
                  <strong>Date & Time:</strong> {training.dateTime}
                </div>
              )}
              {training.duration && (
                <div className="col-6 mb-1">
                  <strong>Duration:</strong> {training.duration}
                </div>
              )}
              {training.location && (
                <div className="col-6 mb-1">
                  <strong>Location:</strong> {training.location}
                </div>
              )}
            </div>
            {training.price && (
              <div className="mt-2 pt-2 border-top">
                <span className="fw-bold text-success">
                  Registration Fee: KES {training.price}
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{
                //backgroundColor: '#28a745',
                //borderColor: '#28a745',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: '600'
              }}
              className="border-0 bg-primary text-white"
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>
        </Form>
      </Modal.Body>

      <style>{`
        .btn-close-custom:hover {
          background-color: #f8f9fa !important;
          border-radius: 50%;
        }

        .btn-close-custom:focus {
          box-shadow: none;
          outline: none;
        }

        .modal-content {
          border-radius: 12px;
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          position: relative;
          justify-content: center;
          padding: 1.5rem 1.5rem 0 1.5rem;
        }

        .btn-close-custom {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
        }

        .form-control:focus {
          border-color: #28a745;
          box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
        }

        .form-control.is-invalid:focus {
          border-color: #dc3545;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }

        .invalid-feedback {
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        .bg-light {
          background-color: #f8f9fa !important;
        }
      `}</style>
    </Modal>
  );
};

export default TrainingRegistrationModal;