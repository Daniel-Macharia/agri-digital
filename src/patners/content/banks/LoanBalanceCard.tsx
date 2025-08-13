import React from 'react';

const LoanBalanceCard: React.FC = () => (
  <div className="col-12 col-md-4 pt-5 col-lg-3 mb-4 ms-0">
    <div className="relative overflow-hidden rounded-3 p-4 text-white" 
         style={{ 
           backgroundColor: '#556B2F',
           minHeight: '120px',
           position: 'relative'
         }}>
      
      {/* Main geometric overlays matching the design */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Top rectangular overlay with gradient */}
        <div 
          className="absolute"
          style={{
            width: '100%',
            height: '40%',
            background: 'linear-gradient(180deg, rgba(139, 169, 19, 0.6) 0%, rgba(107, 142, 35, 0.3) 100%)',
            top: '0',
            left: '0'
          }}
        />
        
        {/* Left side rectangular overlay */}
        <div 
          className="absolute"
          style={{
            width: '45%',
            height: '60%',
            background: 'linear-gradient(90deg, rgba(85, 107, 47, 0.8) 0%, rgba(107, 142, 35, 0.4) 100%)',
            bottom: '0',
            left: '0'
          }}
        />
        
        {/* Right side curved/angular overlay */}
        <div 
          className="absolute"
          style={{
            width: '60%',
            height: '70%',
            background: 'linear-gradient(135deg, rgba(143, 188, 143, 0.3) 0%, rgba(107, 142, 35, 0.5) 50%, rgba(85, 107, 47, 0.7) 100%)',
            top: '15%',
            right: '0',
            clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }}
        />
        
        {/* Subtle accent lines */}
        <div 
          className="absolute"
          style={{
            width: '1px',
            height: '50%',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)',
            top: '25%',
            right: '25%'
          }}
        />
        
        {/* Bottom accent shape */}
        <div 
          className="absolute"
          style={{
            width: '80%',
            height: '30%',
            background: 'linear-gradient(45deg, rgba(107, 142, 35, 0.4) 0%, rgba(143, 188, 143, 0.2) 100%)',
            bottom: '0',
            right: '0',
            clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }}
        />
        
        {/* Overlay for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(85, 107, 47, 0.1) 0%, rgba(107, 142, 35, 0.05) 50%, rgba(143, 188, 143, 0.1) 100%)'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="mb-2">
          <small style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Loan Balance</small>
        </div>
        <h3 className="mb-0 fw-bold">KES 1,000,000</h3>
      </div>
    </div>
  </div>
);

export default LoanBalanceCard;