import React, { useState} from 'react';
import { FiArrowLeft, FiShare2, FiCheckCircle } from 'react-icons/fi';
import { PiMoneyWavyThin } from 'react-icons/pi';
import InvitationModal from '../../sponsors/Components/InvitationModal';
import Pagination from '../../market-place/components/Pagination';
import ProjectSelectionModal from '../../products/ProjectSelectionModal';
import LivestockProjectModal from '../../products/LivestockProjectModal';
import CropProjectModal from '../../products/CropProjectModal';
import { CropFormData, LivestockFormData } from '../../products';
import ProjectTypeSelectionModal from '../../banks/ProjectTypeSelectionModal';
import SponsorshipApplicationForm from './SponsorshipApplicationForm';

interface TransactionRecord {
  id: string;
  date: string;
  type: 'Voucher' | 'Money';
  amount: string;
  purpose: string;
}

interface SponsorDetailsProps {
  sponsor: {
    id: string;
    title: string;
    organization: string;
    image: string;
    badge: {
      text: string;
      variant: 'warning' | 'success' | 'info' | 'danger';
    };
    award: {
      type: 'Voucher Award' | 'Cash Range' | 'Voucher Awarded' | 'Cash Awarded';
      amount: string;
    };
  };
  onBack: () => void;
  activeTab?: string;
}

const SponsorDetailsPage: React.FC<SponsorDetailsProps> = ({ sponsor, onBack, activeTab = 'all-sponsors' }) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Date');
  const [sortedTransactions, setSortedTransactions] = useState<TransactionRecord[]>([]);
  const [showProjectTypeModal, setShowProjectTypeModal] = useState(false);
  const [showProjectSelectionModal, setShowProjectSelectionModal] = useState(false);
  const [showLivestockModal, setShowLivestockModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  
  const additionalDetails = {
    description: 'GreenGrowth Foundation is committed to supporting sustainable agricultural practices and empowering farmers through financial assistance and resource provision. We focus on projects that demonstrate innovation, sustainability, and potential for community impact.',
    eligibility: [
      'Must be a registered farmer',
      'Minimum 2 years of farming experience',
      'Valid government ID'
    ]
  };

  // Mock transaction data for My Rewards view
  const transactionHistory: TransactionRecord [] = [
    {
      id: '1',
      date: '2024/10/15',
      type: 'Voucher',
      amount: '2,000',
      purpose: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed.'
    },
    {
      id: '2',
      date: '2024/10/20',
      type: 'Money',
      amount: '15,000',
      purpose: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed.'
    },
    {
      id: '3',
      date: '2024/10/25',
      type: 'Voucher',
      amount: '3,000',
      purpose: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed.'
    },
    {
      id: '4',
      date: '2024/11/01',
      type: 'Money',
      amount: '10,000',
      purpose: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed.'
    },
    {
      id: '5',
      date: '2024/11/05',
      type: 'Voucher',
      amount: '1,500',
      purpose: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed.'
    },
    {
      id: '6',
      date: '2024/11/10',
      type: 'Voucher',
      amount: '2,500',
      purpose: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed.'
    },
    {
      id: '7',
      date: '2024/11/15',
      type: 'Money',
      amount: '12,000',
      purpose: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed.'
    },
    {
      id: '8',
      date: '2024/11/20',
      type: 'Voucher',
      amount: '4,000',
      purpose: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed.'
    }
  ];

  React.useEffect(() => {
    setSortedTransactions(transactionHistory);
  }, []);

  const itemsPerPage = 10;
  const isMyRewards = activeTab === 'my-rewards';

  const handleApply = () => {
    setShowProjectTypeModal(true);
  };

  const handleCloseProjectTypeModal = () => {
    setShowProjectTypeModal(false);
  };

  const handleAddNowClick = () => {
    console.log("HandleAddNowClick fired");
    setShowProjectTypeModal(false);
    setTimeout(() => {
      console.log("Opening second modal: ProjectSelectionModal");
      setShowProjectSelectionModal(true);
    }, 300);
  };

  const handleCropProject = (): void => {
    setShowProjectSelectionModal(false);
    setShowCropModal(true);
  };

  const handleLivestockProject = (): void => {
    setShowProjectSelectionModal(false);
    setShowLivestockModal(true);
  };

  const handleBackToProjectSelection = (): void => {
    setShowLivestockModal(false);
    setShowCropModal(false);
    setShowProjectSelectionModal(true);
  };

  const handleCloseProjectSelectionModal = () => {
    setShowProjectSelectionModal(false);
  };

  const handleCloseLivestockModal = (): void => {
    setShowLivestockModal(false);
  };

  const handleCloseCropModal = (): void => {
    setShowCropModal(false);
  };

  const handleLivestockSubmit = (formData: LivestockFormData): void => {
    console.log('Livestock Project Data:', formData);
    // Close the livestock modal
    setShowLivestockModal(false);
    // Navigate to application form
    setShowApplicationForm(true);
  };

  const handleCropSubmit = (formData: CropFormData): void => {
    console.log('Crop Project Data:', formData);
    // Close the crop modal
    setShowCropModal(false);
    // Navigate to application form
    setShowApplicationForm(true);
  };

  const handleBackFromApplication = () => {
    setShowApplicationForm(false);
  };

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    const sorted = [...transactionHistory];
    
    switch (sortType) {
      case 'Date':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'Type':
        sorted.sort((a, b) => a.type.localeCompare(b.type));
        break;
      case 'Amount':
        sorted.sort((a, b) => parseFloat(b.amount.replace(',', '')) - parseFloat(a.amount.replace(',', '')));
        break;
      default:
        break;
    }
    
    setSortedTransactions(sorted);
    setCurrentPage(1);
  };

  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const renderPagination = () => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4">
        <nav>
          <ul className="mb-0">
            {totalPages > 0 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={(page) => setCurrentPage(page)} 
              />
            )}
          </ul>
        </nav>
      </div>
    );
  };

  // Show application form if requested
  if (showApplicationForm) {
    return (
      <SponsorshipApplicationForm 
        sponsor={sponsor}
        onBack={handleBackFromApplication}
      />
    );
  }

  return (
    <div className="sponsor-details container-fluid m-0 p-0" style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
      {/* Header */}
      <div className="sponsor-details__header" style={{ backgroundColor: '#eeeeee', padding: '1rem 0' }}>
        <div className="container">
          <button 
            className="btn btn-link p-0 text-decoration-none text-dark d-flex align-items-center"
            onClick={onBack}
          >
            <FiArrowLeft size={20} className="me-2" />
            <span>Back to Sponsors</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="sponsor-details__content card border-0 shadow-sm rounded-4 mb-4">
          {/* Image Section */}
          <div className="position-relative sponsor-details__image-section">
            <img 
              src={sponsor.image || "https://via.placeholder.com/800x250"}
              alt={sponsor.title}
              className="w-100"
              style={{ height: '250px', objectFit: 'cover', objectPosition: 'center', borderRadius: '20px 0 0 20px' }}
            />
            <span 
              className={`position-absolute badge bg-${sponsor.badge.variant} rounded-pill px-3 py-2`}
              style={{ top: '20px', left: '20px', fontSize: '12px', fontWeight: '500' }}
            >
              {sponsor.badge.text}
            </span>
          </div>

          <div className="card-body p-4">
            {/* Title + Share Row */}
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
              <div>
                <h6 className="sponsor-details__title h3 fw-semibold mb-2">
                  {sponsor.title}
                </h6>
                <p className="sponsor-details__org text-success mb-3">
                  {sponsor.organization}
                </p>
              </div>
              <button 
                className="btn btn-link d-flex align-items-center text-dark sponsor-details__share-btn"
                onClick={() => setIsModalOpen(true)}
              >
                <FiShare2 size={18} className="me-2" />
                <span className="sponsor-details__share-text">Share with a Friend</span>
              </button>
            </div>
            
            {/* Key Details */}
            <div className="sponsor-details__key-details mb-1">
              <h2 className="h5 fw-semibold mb-3">Key Details</h2>
              <p className="text-muted lh-lg">
                {additionalDetails.description}
              </p>
            </div>
            
            {/* Award Info */}
            <div className="sponsor-details__award col-12 d-flex align-items-center mb-4">
              <div className="sponsor-details__award-icon me-1 p-2">
                <PiMoneyWavyThin size={24} className="text-dark" />
              </div>
              <div>
                <span className="fw-semibold text-dark me-2">
                  {sponsor.award.type}
                </span>
                <span className="text-success fw-bold">
                  {sponsor.award.amount}
                </span>
              </div>
            </div>

            {/* Conditional Content Based on View Type */}
            {isMyRewards ? (
              // Transaction History for My Rewards
              <div className="sponsor-details__transaction-history mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 fw-bold mb-0">Transaction History</h2>
                  <div className="d-flex align-items-center">
                    <span className="text-muted me-2" style={{ fontSize: '14px' }}>
                      Showing 1-10 of 100 Transaction History
                    </span>
                    <span className="text-muted me-2" style={{ fontSize: '14px' }}>Sort By:</span>
                    <div className="dropdown">
                      <button 
                        className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown"
                        style={{ fontSize: '14px' }}
                      >
                        {sortBy}
                      </button>
                      <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => handleSort('Date')}>Date</button></li>
                        <li><button className="dropdown-item" onClick={() => handleSort('Type')}>Type</button></li>
                        <li><button className="dropdown-item" onClick={() => handleSort('Amount')}>Amount</button></li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Transaction Table */}
                <div className="table-responsive">
                  <table className="table table-borderless mb-0">
                    <thead>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th className="fw-semibold text-muted" style={{ fontSize: '14px', padding: '12px 16px', border: 'none' }}>REF ID</th>
                        <th className="fw-semibold text-muted" style={{ fontSize: '14px', padding: '12px 16px', border: 'none' }}>Date</th>
                        <th className="fw-semibold text-muted" style={{ fontSize: '14px', padding: '12px 16px', border: 'none' }}>Type</th>
                        <th className="fw-semibold text-muted" style={{ fontSize: '14px', padding: '12px 16px', border: 'none' }}>Amount</th>
                        <th className="fw-semibold text-muted" style={{ fontSize: '14px', padding: '12px 16px', border: 'none' }}>Purpose</th>
                      </tr>
                      <br/>
                    </thead>
                    <tbody>
                      {paginatedTransactions.map((transaction, index) => (
                        <tr
                          key={transaction.id} 
                          style={{ 
                            backgroundColor: transaction.type === 'Money' ? '#e8f5e8' : '#f8f9fa',
                            border: 'none'
                          }}
                        >
                          <td style={{ padding: '16px', fontSize: '14px', border: 'none' }}>
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td style={{ padding: '16px', fontSize: '14px', border: 'none' }}>
                            {transaction.date}
                          </td>
                          <td style={{ padding: '16px', fontSize: '14px', border: 'none' }}>
                            <span className="fw-medium text-dark">
                              {transaction.type}
                            </span>
                          </td>
                          <td style={{ padding: '16px', fontSize: '14px', border: 'none' }}>
                            <span className="text-warning fw-semibold">
                              + {transaction.amount}
                            </span>
                          </td>
                          <td style={{ padding: '16px', fontSize: '14px', color: '#6c757d', border: 'none' }}>
                            {transaction.purpose}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {renderPagination()}
              </div>
            ) : (
              // Eligibility for All Sponsors
              <div className="sponsor-details__eligibility mb-4">
                <h2 className="h5 fw-bold mb-3">Eligibility & Requirements</h2>
                <div className="row">
                  {additionalDetails.eligibility.map((requirement, index) => (
                    <div key={index} className="col-12 mb-2">
                      <div className="d-flex align-items-start">
                        <FiCheckCircle 
                          size={20} 
                          className="text-success me-3 mt-1 flex-shrink-0" 
                        />
                        <span className="text-dark">{requirement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Apply Button */}
            <div className="sponsor-details__apply-section">
              <button 
                className="btn btn-success w-100 py-3 fw-semibold rounded-3"
                style={{ 
                  backgroundColor: '#556B2F',
                  borderColor: '#556B2F',
                  fontSize: '16px'
                }}
                onClick={handleApply}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4a5f29';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#556B2F';
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <InvitationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shareUrl="https://shambabot.app/invite"
      />
      
      {/* Project Type Selection Modal */}
      <ProjectTypeSelectionModal
        show={showProjectTypeModal}
        onHide={handleCloseProjectTypeModal}
        onAddNow={handleAddNowClick}
      />
      
      {/* Project Selection Modal */}
      <ProjectSelectionModal
        show={showProjectSelectionModal}
        onHide={handleCloseProjectSelectionModal}
        onCropProject={handleCropProject}
        onLivestockProject={handleLivestockProject}
      />
      
      {/* Livestock Project Modal */}
      <LivestockProjectModal
        show={showLivestockModal}
        onHide={handleCloseLivestockModal}
        onBack={handleBackToProjectSelection}
        onSubmit={handleLivestockSubmit}
      />

      {/* Crop Project Modal */}
      <CropProjectModal
        show={showCropModal}
        onHide={handleCloseCropModal}
        onBack={handleBackToProjectSelection}
        onSubmit={handleCropSubmit}
      />

      {/* Custom Styles */}
      <style>{`
        .sponsor-details__image-section img {
          transition: transform 0.3s ease;
        }

        .sponsor-details__image-section:hover img {
          transform: scale(1.02);
        }

        .sponsor-details__award-icon {
          transition: transform 0.2s ease;
        }

        .sponsor-details__award:hover .sponsor-details__award-icon {
          transform: scale(1.1);
        }

        .sponsor-details__content {
          transition: box-shadow 0.3s ease;
        }

        .sponsor-details__content:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
        }

        .sponsor-details__share-btn {
          text-decoration: none;
          font-weight: 500;
        }

        .sponsor-details__share-btn:hover .sponsor-details__share-text {
          color: #258024ff;
        }

        .table th {
          border: none !important;
          font-weight: 600;
        }

        .table td {
          border: none !important;
          vertical-align: middle;
        }

        .table tbody tr {
          border-bottom: 2px solid #ffffff !important;
        }

        .dropdown-toggle::after {
          margin-left: 0.5rem;
        }
        @media (max-width: 768px) {
          .sponsor-details__image-section img {
            height: 200px !important;
          }

          .table-responsive {
            font-size: 12px;
          }

          .sponsor-details__transaction-history .d-flex {
            flex-direction: column;
            align-items: flex-start !important;
          }

          .sponsor-details__transaction-history .d-flex > div:last-child {
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SponsorDetailsPage;