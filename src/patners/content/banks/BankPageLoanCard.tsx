import React from 'react';
import './type/index.ts';

export interface LoanCardProps {
  //icon: React.ReactNode;
  title: string;
  subtitle: string;
  interestRate: string;
  term: string;
  imageUrl: string;
  onViewMore: () => void;
}
const BankPageLoanCard: React.FC<LoanCardProps> = ({
  //icon,
  title,
  subtitle,
  interestRate,
  term,
  imageUrl,
  onViewMore
}) => {
  return (
    <div className="bankpage-card col-12 col-md-6 col-lg-4 mb-4">
      <div className="bankpage-card__container card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="bankpage-card__image-container position-relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="bankpage-card__image card-img-top"
            style={{ height: '180px', objectFit: 'cover', objectPosition: 'center', borderRadius: '20px 20px 20px 20px' }}
          />
         {/* <div className="bankpage-card__icon position-absolute top-50 start-50 translate-middle">
            {icon}
          </div>*/}
        </div>
        
        <div className="bankpage-card__content card-body d-flex flex-column">
          <h5 className="bankpage-card__title card-title fw-bold text-dark mb-1">
            {title}
          </h5>
          <p className="bankpage-card__subtitle text-muted small mb-3">
            {subtitle}
          </p>
          
          <div className="bankpage-card__details flex-grow-1">
            <div className="bankpage-card__rate d-flex align-items-center mb-2">
              <span className="small text-dark fw-semibold">{interestRate} interest Rate</span>
            </div>
            <div className="bankpage-card__term d-flex align-items-center mb-3">
              <span className="small text-muted">{term}</span>
            </div>
          </div>
          
          <button 
            className="bankpage-card__btn w-100 py-2 rounded-3 fw-semibold"
            style={{ backgroundColor: '#556b2f', color: 'white', border: 'none' }}
            onClick={onViewMore}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankPageLoanCard;