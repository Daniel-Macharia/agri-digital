import React from 'react';
import { FundReport } from '../Types';
// Fund Reports List Component
const FundReportsList: React.FC<{
  reports: FundReport[];
  onReportSelect: (reportId: string) => void;
}> = ({ reports, onReportSelect }) => {
  return (
    <div className="fund-reports-list">
      <h4 className="mb-4">Fund Reports</h4>
      <div className="reports-container">
        {reports.map((report) => (
          <div
            key={report.id}
            className="report-item p-3 mb-3 border rounded cursor-pointer"
            style={{
              backgroundColor: '#fff',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
            }}
            onClick={() => onReportSelect(report.id)}
          >
            <h6 className="mb-2 fw-semibold">{report.title}</h6>
            <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
              {report.date}, {report.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundReportsList;