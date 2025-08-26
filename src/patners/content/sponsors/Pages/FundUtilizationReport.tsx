import React from 'react';
import { FiArrowLeft, FiDownload, FiShare2 } from 'react-icons/fi';
import { FundUtilizationData } from '../Types';

// Fund Utilization Report Component
const FundUtilizationReport: React.FC<{
  data: FundUtilizationData;
  onBack: () => void;
}> = ({ data, onBack }) => {
  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const generateReportContent = () => {
    const totalSpent = data.expenditure.reduce((sum, item) => sum + item.amount, 0);
    const balance = data.amountReceived - totalSpent;
    
    return `
FUND UTILIZATION REPORT
========================

Name: ${data.name}
Phone Number: ${data.phoneNumber}
Amount Received: ${formatCurrency(data.amountReceived)}

EXPENDITURE BREAKDOWN
=====================
${data.expenditure.map(item => 
  `${item.id}. ${item.category}: ${formatCurrency(item.amount)} - ${item.remarks}`
).join('\n')}

Total Spent: ${formatCurrency(totalSpent)}
Balance: ${formatCurrency(balance)}

Supporting Documents: ${data.receiptUploaded ? 'Receipt.png Uploaded' : 'No documents uploaded'}
Digital Signature: ${data.digitalSignature || 'Not provided'}

Generated on: ${new Date().toLocaleDateString()}
    `.trim();
  };

  const handleDownload = () => {
    const content = generateReportContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Fund_Utilization_Report_${data.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const content = generateReportContent();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Fund Utilization Report',
          text: content,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        fallbackShare(content);
      }
    } else {
      fallbackShare(content);
    }
  };

  const fallbackShare = (content: string) => {
    // Copy to clipboard as fallback
    navigator.clipboard.writeText(content).then(() => {
      alert('Report content copied to clipboard!');
    }).catch(() => {
      // If clipboard fails, show content in alert
      alert('Share not supported. Here\'s the report content:\n\n' + content);
    });
  };

  return (
    <div className="fund-utilization-report rounded-top-5">
      {/* Header with back button */}
      <div className="d-flex align-items-center mb-4">
        <button
          className="btn btn-link p-0 me-3 text-dark"
          onClick={onBack}
          style={{ textDecoration: 'none' }}
        >
          <FiArrowLeft size={20} />
        </button>
      </div>

      <div className="bg-white rounded shadow-sm p-4">
        {/* Basic Information */}
        <div className="mb-4">
          <h5 className="fw-semibold text-start pt-0 mb-3">Fund Utilization Report</h5>
          
          {/* Name row */}
          <div className="row mb-2">
            <div className="col-4">
              <label className="form-label text-secondary mb-0">Name</label>
            </div>
            <div className="col-8">
              <p className="fw-semibold mb-0 text-end">{data.name}</p>
            </div>
          </div>
          
          {/* Phone Number row */}
          <div className="row mb-2">
            <div className="col-4">
              <label className="form-label text-secondary mb-0">Phone Number</label>
            </div>
            <div className="col-8">
              <p className="fw-semibold mb-0 text-end">{data.phoneNumber}</p>
            </div>
          </div>
          
          {/* Amount Received row */}
          <div className="row mb-2">
            <div className="col-4">
              <label className="form-label text-secondary mb-0">Amount Received</label>
            </div>
            <div className="col-8">
              <p className="fw-semibold mb-0 text-end">
                {formatCurrency(data.amountReceived)}
              </p>
            </div>
          </div>
        </div>

        {/* Expenditure Breakdown */}
        <div className="mb-4">
          <h6 className="mb-3">Expenditure Breakdown</h6>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr>
                  <th style={{ fontSize: '0.875rem', fontWeight: '600' }}>Category</th>
                  <th style={{ fontSize: '0.875rem', fontWeight: '600' }}>Amount Spent (KES)</th>
                  <th style={{ fontSize: '0.875rem', fontWeight: '600' }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {data.expenditure.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontSize: '0.875rem' }}>
                      {item.id}. {item.category}
                    </td>
                    <td style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                      {formatCurrency(item.amount)}
                    </td>
                    <td style={{ fontSize: '0.875rem' }}>{item.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supporting Documents */}
        <div className="mb-4">
          <h6 className="mb-3">Supporting Documents</h6>
          <div className="d-flex align-items-center justify-content-center border rounded py-4">
            <div className="text-center">
              <div 
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  backgroundColor: '#556B2F',
                  color: 'white'
                }}
              >
                <FiDownload size={20} />
              </div>
              <p className="mb-0 text-muted" style={{ fontSize: '0.875rem' }}>
                {data.receiptUploaded ? 'Receipt.png Uploaded' : 'No documents uploaded'}
              </p>
            </div>
          </div>
        </div>

        {/* Digital Signature */}
        <div className="mb-4">
          <h6 className="mb-3">Digital Signature</h6>
          <div className="border rounded p-3" style={{ minHeight: '60px' }}>
            <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
              {data.digitalSignature || '-'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2 justify-content-end">
          <button 
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
            onClick={handleShare}
          >
            <FiShare2 size={16} />
            Share
          </button>
          <button 
            className="btn d-flex align-items-center gap-2"
            style={{ backgroundColor: '#556B2F', color: 'white' }}
            onClick={handleDownload}
          >
            <FiDownload size={16} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundUtilizationReport;