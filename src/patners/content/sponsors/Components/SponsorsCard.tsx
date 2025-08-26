import React from 'react';
//import { FaEye } from 'react-icons/fa';
import { PiMoneyWavyThin } from 'react-icons/pi';

// Define the types directly in this file to avoid import issues
type SponsorCardData = {
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

interface SponsorCardProps {
  sponsor: SponsorCardData;
  onViewMore: (id: string) => void;
  isMyRewards?: boolean; //Distinguish between All Sponsors and My Rewards
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, onViewMore, isMyRewards = false }) => {
  // Determine if this is an awarded item (for My Rewards tab)
  const isAwarded = sponsor.award.type === 'Voucher Awarded' || sponsor.award.type === 'Cash Awarded';
  
  return (
    <div className="sponsors-page__card col-12 col-md-6 col-lg-4 mb-4">
      <div className="sponsors-page__card-inner card h-100 border-0 shadow-sm rounded-4">
        <div className="sponsors-page__card-image-container position-relative">
          <img 
            src={sponsor.image}
            alt={sponsor.title}
            className="sponsors-page__card-image card-img-top rounded-top-4"
            style={{ height: '200px', objectFit: 'cover', objectPosition: 'center', borderRadius: '20px 20px 20px 20px' }}
          />
          
          {/* Badge - different styling for My Rewards */}
          <span 
            className={`sponsors-page__card-badge position-absolute badge ${
              isMyRewards && isAwarded 
                ? `bg-${sponsor.badge.variant}`
                : `bg-${sponsor.badge.variant}`
            } rounded-pill px-3 py-1`}
            style={{ top: '12px', left: '12px', fontSize: '11px', fontWeight: '500' }}
          >
            {isMyRewards && isAwarded ? sponsor.badge.text : sponsor.badge.text}
          </span>
          
          {/* Hover overlay */}
          <div className="sponsors-page__card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0 rounded-top-4">
            <button 
              className="sponsors-page__view-btn btn btn-light rounded-circle p-2 shadow"
              //onClick={() => onViewMore(sponsor.id)}
              aria-label="View details"
            >
             {/* <FaEye size={16} />*/}
            </button>
          </div>
        </div>
        
        <div className="sponsors-page__card-body card-body p-3">
          <h3 className="sponsors-page__card-title card-title h6 mb-2 fw-bold">
            {sponsor.title}
          </h3>
          <p className="sponsors-page__card-org text-muted small mb-3">
            {sponsor.organization}
          </p>
          
          {/* Award Section - Icon and Text on the Same Line */}
          <div className="sponsors-page__card-award d-flex align-items-center mb-3 flex-nowrap">
            <PiMoneyWavyThin size={18} className="text-dark me-2 flex-shrink-0" />
            <div className="small text-dark fw-semibold text-nowrap text-truncate">
              {isMyRewards && isAwarded 
                ? `${sponsor.award.type} ${sponsor.award.amount}`
                : `${sponsor.award.type} ${sponsor.award.amount}`
              }
            </div>
          </div>
          
          <button 
            className="sponsors-page__view-more-btn btn w-100 rounded text-white py-2 fw-semibold"
            style={{ 
              backgroundColor: '#556B2F',
              border: 'none',
              fontSize: '14px'
            }}
            onClick={() => onViewMore(sponsor.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4a5f29';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#556B2F';
            }}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorCard;