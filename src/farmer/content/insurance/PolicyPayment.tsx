import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaArrowLeft} from 'react-icons/fa';

interface PaymentInfo {
  title: string;
  amount: number;
  currency: string;
  period?: string;
  description?: string;
}

interface PaymentComponentProps {
  paymentInfo: PaymentInfo;
  onBack: () => void;
  onPaymentComplete: (paymentData: any) => void;
  backTitle?: string;
}

interface PaymentFormData {
  paymentMethod: string;
  phoneNumber: string;
  walletBalance: number;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const PolicyPayment: React.FC<PaymentComponentProps> = ({
  paymentInfo,
  onBack,
  onPaymentComplete,
  backTitle = 'Back to Insurance',
}) => {
  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    paymentMethod: '',
    phoneNumber: '+254 712345678',
    walletBalance: 500000,
    cardName: 'John Doe',
    cardNumber: '1234 5678 9012',
    expiryDate: '12 / 25',
    cvv: '123',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'mpesa', name: 'Mpesa', fields: ['phoneNumber'] },
    { id: 'wallet', name: 'Wallet', fields: ['walletBalance'] },
    { id: 'creditCard', name: 'Credit Card', fields: ['cardName', 'cardNumber', 'expiryDate', 'cvv'] },
    { id: 'barterWallet', name: 'Barter Wallet', fields: [] },
  ];

  const handlePaymentMethodChange = (methodId: string) => {
    setPaymentData((prev) => ({ ...prev, paymentMethod: methodId }));
  };

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompletePayment = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onPaymentComplete({
        amount: paymentInfo.amount,
        currency: paymentInfo.currency,
        ...paymentData,
      });
      alert('Payment completed successfully!');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  const renderPaymentMethodFields = () => {
    const method = paymentMethods.find((m) => m.id === paymentData.paymentMethod);
    if (!method || !method.fields) return null;

    return (
      <div className="mt-3">
        {method.fields.includes('phoneNumber') && (
          <Form.Group className="mb-3">
            <Form.Label className="small text-muted">Phone Number</Form.Label>
            <Form.Control
              type="tel"
              value={paymentData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+254 712345678"
            />
          </Form.Group>
        )}

        {method.fields.includes('walletBalance') && (
          <Form.Group className="mb-3">
            <Form.Label className="small text-muted">Wallet</Form.Label>
            <div className="text-muted small">
              <strong>Wallet Balance</strong> {formatCurrency(paymentData.walletBalance, paymentInfo.currency)}
            </div>
          </Form.Group>
        )}

        {method.fields.includes('cardName') && (
          <>
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted">Card Name</Form.Label>
              <Form.Control
                type="text"
                value={paymentData.cardName}
                onChange={(e) => handleInputChange('cardName', e.target.value)}
                placeholder="John Doe"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted">Card Number</Form.Label>
              <Form.Control
                type="text"
                value={paymentData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Label className="small text-muted">Expiry Date</Form.Label>
                <Form.Control
                  type="text"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  placeholder="12 / 25"
                />
              </Col>
              <Col>
                <Form.Label className="small text-muted">CVV</Form.Label>
                <Form.Control
                  type="text"
                  value={paymentData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  placeholder="123"
                />
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  };

  return (
    <Container fluid className="bg-light min-vh-100 px-0">
      <Row className="px-3 pt-3">
        <Col>
          <div className="col-3 d-flex align-items-center">
            <Button variant="link" className="text-muted p-0" onClick={onBack}>
              <FaArrowLeft size={16} />
            </Button>
            <span className="text-muted small">{backTitle}</span>
          </div>
        </Col>
      </Row>

      <Row className="px-3 pt-3">
        <Col>
          <Card className="rounded-top-5 p-4">
            <h5 className="fw-bold mb-4 text-start">Complete Your Purchase</h5>
            <div className="mb-4">
              <h6 className="text fw-bold text-start mb-4" style={{ color: '#556B2F' }}>Choose Payment Method</h6>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="mb-2 d-flex align-items-center border rounded px-3 py-2"
                  style={{ borderColor: '#dee2e6' }}
                >
                  <Form.Check
                    type="radio"
                    id={method.id}
                    name="paymentMethod"
                    checked={paymentData.paymentMethod === method.id}
                    onChange={() => handlePaymentMethodChange(method.id)}
                    className="me-2"
                    label={method.name}
                  />
                </div>
              ))}
              {renderPaymentMethodFields()}
            </div>

            <div className="mb-4 text-start">
              <h6 className="text fw-bold" style={{ color: '#556B2F' }}>Insurance</h6>
              <h6 className="fw-bold mb-0">{paymentInfo.title}</h6>
              <div className="d-flex align-items-baseline mb-2">
                <span className="h4 fw-bold me-2" style={{ color: '#556B2F' }}>
                  {formatCurrency(paymentInfo.amount, paymentInfo.currency)}
                  <span>/{paymentInfo.period || 'month'}</span>
                </span>
                {paymentInfo.period && <span className="text-muted">/{paymentInfo.period}</span>}
              </div>
              {paymentInfo.description && <p className="text-muted small mt-2">{paymentInfo.description}</p>}
            </div>

            <div className="d-grid">
              <Button
                size="lg"
                style={{ backgroundColor: '#556B2F' }}
                className="text-white fw-bold rounded-3 w-100"
                onClick={handleCompletePayment}
                disabled={!paymentData.paymentMethod || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Complete Purchase'}
              </Button>
            </div>
          </Card>
        </Col>
          <style>{`
            .rounded-top-5 {
            border-top-left-radius: 2rem;
            border-top-right-radius: 2rem;
            }
            }
          `}</style>
      </Row>
    </Container>
  );
};

export default PolicyPayment;
