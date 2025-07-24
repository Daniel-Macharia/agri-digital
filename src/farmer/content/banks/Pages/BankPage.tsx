import React, { useState, Suspense } from 'react';
import { lazy } from 'react';

const BankPageHeader = lazy(() => import('../BankPageHeader'));
const BankPageNavigation = lazy(() => import('../BankPageNavigation'));
const BankPageLoanGrid = lazy(() => import('../BankPageLoanGrid'));
const BankPageModal = lazy(() => import('../BankPageModal'));
const BankPagePartnershipForm = lazy(() => import('../BankPagePartnershipForm'));
const BankPageSuccessModal = lazy(() => import('../BankPageSuccessModal'));

import { FormData } from '../type';

// Loading component
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

interface BankPageProps {
  onViewMore: (loanData?: any) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BankPage: React.FC<BankPageProps> = ({
  onViewMore,
  activeTab,
  onTabChange
}) => {
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRequestPartnership = () => {
    setShowPartnershipModal(true);
  };

  const handleCloseModals = () => {
    setShowPartnershipModal(false);
    setShowSuccessModal(false);
  };

  const handleSubmitPartnership = (data: FormData) => {
    console.log('Partnership request submitted:', data);
    setShowPartnershipModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="bankpage-container bg-light min-vh-100">
      <Suspense fallback={<LoadingSpinner />}>
        <BankPageHeader
          onRequestPartnership={handleRequestPartnership}
          showPartnership={activeTab === 'Loans'}
        />
        <BankPageNavigation
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
        <BankPageLoanGrid onViewMore={onViewMore} />
      </Suspense>

      {/* Partnership Request Modal */}
      <Suspense fallback={null}>
        <BankPageModal show={showPartnershipModal} onHide={handleCloseModals}>
          <BankPagePartnershipForm
            onClose={handleCloseModals}
            onSubmit={handleSubmitPartnership}
          />
        </BankPageModal>
      </Suspense>

      {/* Success Modal */}
      <Suspense fallback={null}>
        <BankPageModal show={showSuccessModal} onHide={handleCloseModals}>
          <BankPageSuccessModal onClose={handleCloseModals} />
        </BankPageModal>
      </Suspense>
    </div>
  );
};

export default BankPage;