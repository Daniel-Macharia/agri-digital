import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Users, CheckCircle, CreditCard } from 'lucide-react';

const paymentMethods = [
  { label: 'Mpesa', value: 'mpesa', tag: 'SMS', color: '#00C851' },
  { label: 'Credit Card', value: 'credit_card', hasCards: true },
  { label: 'Wallet', value: 'wallet', color: '#FF8800' },
  { label: 'Barter Wallet', value: 'barter_wallet', color: '#FF8800' },
  { label: 'Ask a Friend to Pay', value: 'friend' },
];

const costBreakdown = [
  { label: 'Advertisement fee', value: 'KES 2000' },
  { label: 'Service fee', value: 'KES 100' },
  { label: 'VAT (16%)', value: 'KES 450' },
];

const ApprovedAd = () => {
  const [selectedMethod, setSelectedMethod] = useState('mpesa');

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: 0 }}>
      {/* Header with back arrow */}
      <div style={{ padding: '16px 20px', background: '#f8f9fa' }}>
        <ArrowLeft size={24} color="#666" style={{ cursor: 'pointer' }} />
      </div>

      {/* Success Banner */}
      <div style={{ 
        background: '#d4edda', 
        margin: '0 16px 24px 16px', 
        borderRadius: '8px', 
        padding: '12px 16px', 
        display: 'flex', 
        alignItems: 'center' 
      }}>
        <CheckCircle size={20} color="#28a745" style={{ marginRight: '8px' }} />
        <span style={{ color: '#155724', fontSize: '14px' }}>
          Your advert has been approved. Please complete payment to activate.
        </span>
      </div>

      {/* Main Content */}
      <div style={{ padding: '0 16px' }}>
        {/* Title */}
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#333', 
          marginBottom: '16px',
          lineHeight: '1.3'
        }}>
          Title of the Advertisement
        </h2>

        {/* Meta Info */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: '#666' }}>
            <Calendar size={16} style={{ marginRight: '8px' }} />
            <span style={{ fontSize: '14px' }}>Start Date</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: '#666' }}>
            <Clock size={16} style={{ marginRight: '8px' }} />
            <span style={{ fontSize: '14px' }}>Duration of the advert</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: '#666' }}>
            <Users size={16} style={{ marginRight: '8px' }} />
            <span style={{ fontSize: '14px' }}>Target Audience</span>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
            Brief Content of the advert
          </h3>
          <div style={{ 
            color: '#666', 
            fontSize: '14px', 
            lineHeight: '1.5',
            marginBottom: '16px'
          }}>
            Agriculture is the backbone of many economies, but one of the biggest challenges farmers face today is finding skilled labor to support their operations. Labor shortages, lack of efficiency, and high operational costs make farming more difficult, affecting productivity and profitability.
          </div>
          <div style={{ 
            color: '#666', 
            fontSize: '14px', 
            lineHeight: '1.5'
          }}>
            This is where AgriWork comes in—a revolutionary platform designed to connect farmers with skilled laborers to optimize farm operations, reduce inefficiencies, and improve productivity. In this article, we take a deep dive into how AgriWork is transforming the agricultural workforce and making farming more efficient.
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
            Choose Payment Method
          </h3>
          
          {paymentMethods.map((method) => (
            <div 
              key={method.value}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '12px 16px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                marginBottom: '8px',
                border: '1px solid #e9ecef',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedMethod(method.value)}
            >
              <input
                type="radio"
                checked={selectedMethod === method.value}
                onChange={() => setSelectedMethod(method.value)}
                style={{ marginRight: '12px' }}
              />
              
              {method.value === 'mpesa' && (
                <>
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    backgroundColor: method.color, 
                    borderRadius: '4px',
                    marginRight: '12px'
                  }}></div>
                  <span style={{ fontSize: '14px', flex: 1 }}>{method.label}</span>
                  <span style={{ 
                    backgroundColor: '#d4edda', 
                    color: '#28a745', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {method.tag}
                  </span>
                </>
              )}
              
              {method.value === 'credit_card' && (
                <>
                  <CreditCard size={20} color="#666" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', flex: 1 }}>{method.label}</span>
                  {method.hasCards && (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{ 
                        width: '20px', 
                        height: '14px', 
                        backgroundColor: '#1434CB', 
                        borderRadius: '2px',
                        fontSize: '10px',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}>VISA</div>
                      <div style={{ 
                        width: '20px', 
                        height: '14px', 
                        backgroundColor: '#EB001B', 
                        borderRadius: '2px'
                      }}></div>
                    </div>
                  )}
                </>
              )}
              
              {(method.value === 'wallet' || method.value === 'barter_wallet') && (
                <>
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    backgroundColor: method.color, 
                    borderRadius: '4px',
                    marginRight: '12px'
                  }}></div>
                  <span style={{ fontSize: '14px', flex: 1 }}>{method.label}</span>
                </>
              )}
              
              {method.value === 'friend' && (
                <>
                  <Users size={20} color="#666" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', flex: 1 }}>{method.label}</span>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Cost Breakdown */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px', 
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
            Cost Breakdown
          </h3>
          
          {costBreakdown.map((item, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '8px'
            }}>
              <span style={{ color: '#666', fontSize: '14px' }}>{item.label}</span>
              <span style={{ fontWeight: '500', fontSize: '14px', color: '#333' }}>{item.value}</span>
            </div>
          ))}
          
          <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #dee2e6' }} />
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontWeight: '600',
            fontSize: '16px'
          }}>
            <span>Total</span>
            <span>KES 1350</span>
          </div>
          
          <div style={{ 
            marginTop: '12px', 
            fontSize: '12px', 
            color: '#666',
            lineHeight: '1.4'
          }}>
            By placing this order, you are agreeing to{' '}
            <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>
              Terms and Conditions
            </a>.
          </div>
        </div>

        {/* Pay Button */}
        <button style={{ 
          width: '100%', 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          padding: '16px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '24px'
        }}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default ApprovedAd;