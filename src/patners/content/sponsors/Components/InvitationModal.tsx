import React, { useState } from 'react';
import { FiMail, FiLink, FiX, FiCopy, FiUserPlus, } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookMessenger} from 'react-icons/fa';
import { FaCommentSms } from "react-icons/fa6";
import { BsThreeDots } from 'react-icons/bs';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl?: string;
}

const InvitationModal: React.FC<InvitationModalProps> = ({ 
  isOpen, 
  onClose, 
  shareUrl = "https://shambabot.app/invite" 
}) => {
  const [activeTab, setActiveTab] = useState<'email' | 'link'>('email');
  const [emailInputs, setEmailInputs] = useState<string[]>(['']);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleEmailChange = (index: number, value: string) => {
    const updatedEmails = [...emailInputs];
    updatedEmails[index] = value;
    setEmailInputs(updatedEmails);
  };

  const addAnotherFarmer = () => {
    setEmailInputs([...emailInputs, '']);
  };

  const removeEmailInput = (index: number) => {
    if (emailInputs.length > 1) {
      const updatedEmails = emailInputs.filter((_, i) => i !== index);
      setEmailInputs(updatedEmails);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSendInvites = () => {
    if (activeTab === 'email') {
      const validEmails = emailInputs.filter(email => email.trim() !== '');
      console.log('Sending invites to:', validEmails);
    }
    onClose();
  };

  const handleSocialShare = (platform: string) => {
    const text = 'Join me on ShambaBot - connecting farmers with opportunities!';
    const url = encodeURIComponent(shareUrl);
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`, '_blank');
        break;
      case 'messenger':
        window.open(`https://www.facebook.com/dialog/send?link=${url}&app_id=YOUR_APP_ID`, '_blank');
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(text + ' ' + shareUrl)}`, '_blank');
        break;
      default:
        console.log('Share via:', platform);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1055 }}>
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '400px' }}>
          <div className="modal-content border-0 shadow-lg rounded-4">
            {/* Header */}
            <div className="modal-header border-0 pb-2">
              <h5 className="modal-title fw-semibold text-dark">Send Invitations</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="modal-body px-4 pt-0">
              {/* Tab Navigation */}
              <div className="nav nav-pills mb-4" role="tablist">
                <button
                  className={`nav-link px-4 py-2 border-0 rounded-pill me-2 d-flex align-items-center ${
                    activeTab === 'email' ? 'active' : ''
                  }`}
                  style={{
                    backgroundColor: activeTab === 'email' ? '#556B2F' : '#f8f9fa',
                    color: activeTab === 'email' ? 'white' : '#6c757d',
                    fontWeight: '500'
                  }}
                  onClick={() => setActiveTab('email')}
                >
                  <FiMail size={16} className="me-2" />
                  Via Email
                </button>
                <button
                  className={`nav-link px-4 py-2 border-0 rounded-pill d-flex align-items-center ${
                    activeTab === 'link' ? 'active' : ''
                  }`}
                  style={{
                    backgroundColor: activeTab === 'link' ? '#556B2F' : '#f8f9fa',
                    color: activeTab === 'link' ? 'white' : '#6c757d',
                    fontWeight: '500'
                  }}
                  onClick={() => setActiveTab('link')}
                >
                  <FiLink size={16} className="me-2" />
                  Via Link
                </button>
              </div>

              {/* Email Tab Content */}
              {activeTab === 'email' && (
                <div>
                  <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
                    Share this link with other farmers to invite them directly:
                  </p>

                  {/* Email Inputs */}
                  <div className="mb-3">
                    {emailInputs.map((email, index) => (
                      <div key={index} className="mb-3 position-relative">
                        <input
                          type="email"
                          className="form-control py-3 pe-5"
                          placeholder="Enter farmer's email"
                          value={email}
                          onChange={(e) => handleEmailChange(index, e.target.value)}
                          style={{
                            border: '2px solid #e9ecef',
                            borderRadius: '12px',
                            fontSize: '14px'
                          }}
                        />
                        {emailInputs.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3 text-muted"
                            onClick={() => removeEmailInput(index)}
                            style={{ zIndex: 5 }}
                          >
                            <FiX size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Another Farmer Button */}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none d-flex align-items-center mb-4"
                    onClick={addAnotherFarmer}
                    style={{ color: '#556B2F', fontWeight: '500', fontSize: '14px' }}
                  >
                    <FiUserPlus size={16} className="me-2" />
                    Add another farmer
                  </button>

                  {/* Send Invites Button */}
                  <button
                    className="btn w-100 py-3 fw-semibold rounded-3"
                    style={{
                      backgroundColor: '#556B2F',
                      borderColor: '#556B2F',
                      color: 'white',
                      fontSize: '16px'
                    }}
                    onClick={handleSendInvites}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#4a5f29';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#556B2F';
                    }}
                  >
                    Send Invites
                  </button>
                </div>
              )}

              {/* Link Tab Content */}
              {activeTab === 'link' && (
                <div>
                  <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
                    Share this link with other farmers to invite them directly:
                  </p>

                  {/* Copy Link Section */}
                  <div className="d-flex align-items-center p-3 mb-4 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                    <span className="flex-grow-1 text-truncate me-3" style={{ fontSize: '14px', color: '#6c757d' }}>
                      {shareUrl}
                    </span>
                    <button
                      className="btn btn-sm d-flex align-items-center px-3 py-2"
                      style={{
                        backgroundColor: copySuccess ? '#28a745' : '#556B2F',
                        borderColor: copySuccess ? '#28a745' : '#556B2F',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                      onClick={handleCopyLink}
                    >
                      <FiCopy size={14} className="me-2" />
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </button>
                  </div>

                  {/* Or share via text */}
                  <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
                    Or share via:
                  </p>

                  {/* Social Share Buttons */}
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn d-flex flex-column align-items-center p-3 border-0"
                      style={{ backgroundColor: 'transparent', minWidth: '70px' }}
                      onClick={() => handleSocialShare('whatsapp')}
                    >
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                        style={{ 
                          width: '48px', 
                          height: '48px', 
                          backgroundColor: '#25D366' 
                        }}
                      >
                        <FaWhatsapp size={24} color="white" />
                      </div>
                      <span style={{ fontSize: '12px', color: '#6c757d' }}>WhatsApp</span>
                    </button>

                    <button
                      className="btn d-flex flex-column align-items-center p-3 border-0"
                      style={{ backgroundColor: 'transparent', minWidth: '70px' }}
                      onClick={() => handleSocialShare('messenger')}
                    >
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                        style={{ 
                          width: '48px', 
                          height: '48px', 
                          backgroundColor: '#0084FF' 
                        }}
                      >
                        <FaFacebookMessenger size={24} color="white" />
                      </div>
                      <span style={{ fontSize: '12px', color: '#6c757d' }}>Messenger</span>
                    </button>

                    <button
                      className="btn d-flex flex-column align-items-center p-3 border-0"
                      style={{ backgroundColor: 'transparent', minWidth: '70px' }}
                      onClick={() => handleSocialShare('sms')}
                    >
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mb-2 bg-warning"
                        style={{ 
                          width: '48px', 
                          height: '48px', 
                          backgroundColor: '#f8fc19ff' 
                        }}
                      >
                        <FaCommentSms size={20} color="white" />
                      </div>
                      <span style={{ fontSize: '12px', color: '#6c757d' }}>SMS</span>
                    </button>

                    <button
                      className="btn d-flex flex-column align-items-center p-3 border-0"
                      style={{ backgroundColor: 'transparent', minWidth: '70px' }}
                      onClick={() => handleSocialShare('more')}
                    >
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mb-2 bg-light border-1"
                        style={{ 
                          width: '48px', 
                          height: '48px', 
                          backgroundColor: '#ffffff' 
                        }}
                      >
                        <BsThreeDots size={20} color="#6c757d" />
                      </div>
                      <span style={{ fontSize: '12px', color: '#6c757d' }}>More</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .btn-close {
          background: none;
          border: none;
          padding: 0;
          font-size: 1rem;
          color: #6c757d;
        }

        .btn-close:hover {
          color: #000;
        }

        .nav-pills .nav-link:not(.active):hover {
          background-color: #e9ecef !important;
          color: #495057 !important;
        }

        .form-control:focus {
          border-color: #556B2F !important;
          box-shadow: 0 0 0 0.2rem rgba(85, 107, 47, 0.25) !important;
        }

        @media (max-width: 576px) {
          .modal-dialog {
            margin: 1rem;
            max-width: calc(100% - 2rem) !important;
          }
          
          .nav-pills {
            flex-direction: column;
          }
          
          .nav-pills .nav-link {
            margin-bottom: 0.5rem;
            margin-right: 0 !important;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default InvitationModal;