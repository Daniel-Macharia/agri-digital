// BankPageLoanGrid.tsx
import React from "react";
import BankPageLoanCard from "./BankPageLoanCard";

interface BankPageProps {
  onViewMore: (loanData?: any) => void;
}

interface LoanData {
  id: string;
  title: string;
  subtitle: string;
  interestRate: string;
  term: string;
  imageUrl: string;
  provider: string;
  loanAmount: string;
  repaymentPeriod: string;
  collateral: string;
  eligibility: string[];
}

// 7. Loan Grid Component
const BankPageLoanGrid: React.FC<BankPageProps> = ({ onViewMore }) => {
  const loansData: LoanData[] = [
    {
      id: '1',
      title: 'Farm Equipment Loan',
      subtitle: 'Provided by AgriBank',
      interestRate: '5%',
      term: '6-24 months',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1742902896884-12ee0687a42e?w=600&auto=format&fit=crop&q=80',
      provider: 'Provided by AgriBank',
      loanAmount: '$500 - $10,000',
      repaymentPeriod: '6-24 months',
      collateral: 'Required',
      eligibility: [
        'Must be a registered farmer',
        'Minimum 2 years of farming experience',
        'Valid government ID'
      ]
    },
    {
      id: '2',
      title: 'Livestock Financing',
      subtitle: 'Provided by CoopBank',
      interestRate: '7%',
      term: '12-36 months',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1741386372405-28da4809416c?w=600&auto=format&fit=crop&q=80',
      provider: 'Provided by CoopBank',
      loanAmount: '$1,000 - $25,000',
      repaymentPeriod: '12-36 months',
      collateral: 'Required',
      eligibility: [
        'Must be a registered farmer',
        'Minimum 3 years of livestock experience',
        'Valid government ID',
        'Proof of livestock insurance'
      ]
    },
    {
      id: '3',
      title: 'Livestock Farming Loan',
      subtitle: 'Provided by KCB Bank',
      interestRate: '6%',
      term: '6-18 months',
      imageUrl: 'https://images.unsplash.com/photo-1440428099904-c6d459a7e7b5?w=600&auto=format&fit=crop&q=60',
      provider: 'Provided by KCB Bank',
      loanAmount: '$300 - $15,000',
      repaymentPeriod: '6-18 months',
      collateral: 'Optional',
      eligibility: [
        'Must be a registered farmer',
        'Minimum 1 year of farming experience',
        'Valid government ID',
        'Land ownership certificate'
      ]
    },
    {
      id: '4',
      title: 'Agribusiness Expansion',
      subtitle: 'Provided by Equity Bank',
      interestRate: '8%',
      term: '12-60 months',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1742622406037-1262af194aa4?w=600&auto=format&fit=crop&q=60',
      provider: 'Provided by Equity Bank',
      loanAmount: '$2,000 - $50,000',
      repaymentPeriod: '12-60 months',
      collateral: 'Required',
      eligibility: [
        'Must have existing agribusiness',
        'Minimum 2 years of business operation',
        'Valid business registration',
        'Financial statements for last 2 years'
      ]
    },
    {
      id: '5',
      title: 'Irrigation System Loan',
      subtitle: 'Provided by NCBA Bank',
      interestRate: '5.5%',
      term: '24-48 months',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661963967380-7aa4e5647929?w=600&auto=format&fit=crop&q=60',
      provider: 'Provided by NCBA Bank',
      loanAmount: '$1,500 - $30,000',
      repaymentPeriod: '24-48 months',
      collateral: 'Required',
      eligibility: [
        'Must be a registered farmer',
        'Minimum 2 years of farming experience',
        'Valid government ID',
        'Water source verification'
      ]
    },
    {
      id: '6',
      title: 'Greenhouse Financing',
      subtitle: 'Provided by Absa Bank',
      interestRate: '6.5%',
      term: '18-36 months',
      imageUrl: 'https://images.unsplash.com/photo-1579227114496-27346f474519?w=600&auto=format&fit=crop&q=60',
      provider: 'Provided by Absa Bank',
      loanAmount: '$3,000 - $40,000',
      repaymentPeriod: '18-36 months',
      collateral: 'Required',
      eligibility: [
        'Must be a registered farmer',
        'Technical training certificate',
        'Valid government ID',
        'Market linkage agreement'
      ]
    }
  ];

  const handleViewMore = (loan: LoanData) => {
    // Transform loan data to match LoanDetails component expectations
    const loanDetailsData = {
      title: loan.title,
      provider: loan.provider,
      loanAmount: loan.loanAmount,
      interestRate: `${loan.interestRate} per annum`,
      repaymentPeriod: loan.repaymentPeriod,
      collateral: loan.collateral,
      eligibility: loan.eligibility
    };
    
    onViewMore(loanDetailsData);
  };

  return (
    <div className="bankpage-grid container-fluid px-0 py-4" style={{backgroundColor: '#efeeeeff'}}>
      <div className="row g-4">
        {loansData.map((loan: LoanData) => (
          <BankPageLoanCard
            key={loan.id}
            title={loan.title}
            subtitle={loan.subtitle}
            interestRate={loan.interestRate}
            term={loan.term}
            imageUrl={loan.imageUrl}
            onViewMore={() => handleViewMore(loan)}
          />
        ))}
      </div>
    </div>
  );
};

export default BankPageLoanGrid;