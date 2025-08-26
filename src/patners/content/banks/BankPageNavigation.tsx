import React from 'react';
const BankPageNavigation: React.FC<{ activeTab: string, onTabChange: (tab: string) => void }> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const tabs = ['Loans', 'Withdraw', 'Deposit', 'Active Loans'];

  return (
    <div className="px-3 py-2" style={{backgroundColor: '#efeeeeff'}}>
      <div className="d-flex gap-2 flex-nowrap col-10 col-md-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`btn px-3 py-2 rounded-pill border text-nowrap ${
              activeTab === tab 
                ? 'text-white' 
                : 'btn-light text-muted'
            }`}
            style={{ 
              backgroundColor: activeTab === tab ? '#556B2F' : 'white',
              fontSize: '0.875rem' 
            }}
            onClick={() => onTabChange(tab)}
          >
            <span className="d-none d-sm-inline">{tab}</span>
            <span className="d-inline d-sm-none">
              {tab === 'Active Loans' ? 'Active' : tab}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};


export default BankPageNavigation;