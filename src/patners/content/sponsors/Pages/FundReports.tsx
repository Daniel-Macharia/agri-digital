import React, { useState } from 'react';
import FundReportsList from './FundReportsList';
import FundUtilizationReport from './FundUtilizationReport';
import { FundReport, FundUtilizationData } from '../Types';

interface FundReportsProps {
  onShowFundUtilizationReport: () => void;
  onHideFundUtilizationReport: () => void;
}

// Main Fund Reports Component
const FundReports: React.FC<FundReportsProps> = ({ 
  onShowFundUtilizationReport, 
  onHideFundUtilizationReport 
}) => {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // Sample data
  const reports: FundReport[] = [
    {
      id: '1',
      title: 'Q2 2023 Irrigation Project',
      date: '9.02.2025',
      time: '4:23am'
    },
    {
      id: '2',
      title: 'Q2 2023 Irrigation Project',
      date: '9.02.2025',
      time: '4:23am'
    },
    {
      id: '3',
      title: 'Q2 2023 Irrigation Project',
      date: '9.02.2025',
      time: '4:23am'
    }
  ];

  const sampleUtilizationData: FundUtilizationData = {
    name: 'Mkulima',
    phoneNumber: '+254 712345678',
    amountReceived: 5000000,
    expenditure: [
      {
        id: 1,
        category: 'Equipment & Machinery',
        amount: 400000,
        remarks: 'Purchased tractors, irrigation pumps'
      },
      {
        id: 2,
        category: 'Seeds & Fertilizers',
        amount: 250000,
        remarks: 'High-yield seeds, organic fertilizers'
      },
      {
        id: 3,
        category: 'Labor & Wages',
        amount: 450000,
        remarks: 'Payment for farmworkers, seasonal labor'
      },
      {
        id: 4,
        category: 'Land Leasing & Maintenance',
        amount: 900000,
        remarks: 'Rent, fencing, soil improvement'
      },
      {
        id: 5,
        category: 'Transportation & Logistics',
        amount: 150000,
        remarks: 'Crop delivery, fuel, vehicle rental'
      },
      {
        id: 7,
        category: 'Marketing & Sales',
        amount: 575000,
        remarks: 'Branding, market research, advertising'
      }
    ],
    receiptUploaded: true,
    digitalSignature: ''
  };

  const handleReportSelect = (reportId: string) => {
    setSelectedReportId(reportId);
    onShowFundUtilizationReport(); // Hide tabs when showing utilization report
  };

  const handleBack = () => {
    setSelectedReportId(null);
    onHideFundUtilizationReport(); // Show tabs when going back to reports list
  };

  if (selectedReportId) {
    return (
      <FundUtilizationReport
        data={sampleUtilizationData}
        onBack={handleBack}
      />
    );
  }

  return (
    <FundReportsList
      reports={reports}
      onReportSelect={handleReportSelect}
    />
  );
};

export default FundReports;