import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Program {
  id: number;
  name: string;
  targetGroup: string;
  beneficiaries: number;
  status: 'slots-left' | 'no-slots';
  startDate: string;
  region: string;
}

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for programs
  const programs: Program[] = [
    { id: 1, name: 'Program Title', targetGroup: 'Lorem Ipsum', beneficiaries: 10, status: 'slots-left', startDate: '2025/05/20', region: 'Kiambu' },
    { id: 2, name: 'Program Title', targetGroup: 'Lorem Ipsum', beneficiaries: 10, status: 'no-slots', startDate: '2025/05/20', region: 'Kiambu' },
    { id: 3, name: 'Program Title', targetGroup: 'Lorem Ipsum', beneficiaries: 10, status: 'slots-left', startDate: '2025/05/20', region: 'Kiambu' },
    { id: 4, name: 'Program Title', targetGroup: 'Lorem Ipsum', beneficiaries: 10, status: 'no-slots', startDate: '2025/05/20', region: 'Kiambu' },
    { id: 5, name: 'Program Title', targetGroup: 'Lorem Ipsum', beneficiaries: 10, status: 'slots-left', startDate: '2025/05/20', region: 'Kiambu' },
    { id: 6, name: 'Program Title', targetGroup: 'Lorem Ipsum', beneficiaries: 10, status: 'no-slots', startDate: '2025/05/20', region: 'Kiambu' },
    { id: 7, name: 'Program Title', targetGroup: 'Lorem Ipsum', beneficiaries: 10, status: 'no-slots', startDate: '2025/05/20', region: 'Kiambu' },
    { id: 8, name: 'Program Title', targetGroup: 'Lorem Ipsum', beneficiaries: 10, status: 'slots-left', startDate: '2025/05/20', region: 'Kiambu' },
    { id: 9, name: 'Program Title', targetGroup: 'Lorem Ipsum', beneficiaries: 10, status: 'slots-left', startDate: '2025/05/20', region: 'Kiambu' },
    { id: 10, name: 'Program Title', targetGroup: 'Lorem Ipsum', beneficiaries: 10, status: 'no-slots', startDate: '2025/05/20', region: 'Kiambu' },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'slots-left') {
      return <span className="badge bg-warning text-white rounded-pill">2 Slots Left</span>;
    } else {
      return <span className="badge bg-danger text-white rounded-pill">0 Slots Left</span>;
    }
  };

  const getActionButton = (id: number) => {
    if (id === 3) {
      return (
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted">View</span>
          <button 
            className="btn btn-success rounded-circle p-2" 
            style={{ width: '32px', height: '32px' }}
            onClick={() => navigate('/patners/programs/add')}
          >
            <i className="fas fa-dollar-sign text-white"></i>
          </button>
        </div>
      );
    } else if (id === 4) {
      return (
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted">View</span>
          <button 
            className="btn btn-success rounded-circle p-2" 
            style={{ width: '32px', height: '32px' }}
            onClick={() => navigate('/patners/programs/add')}
          >
            <i className="fas fa-seedling text-white"></i>
          </button>
        </div>
      );
    } else {
      return (
        <span 
          className="text-decoration-underline text-muted" 
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/patners/programs/add')}
        >
          View Details
        </span>
      );
    }
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="card shadow-sm border-0" style={{ borderRadius: '12px' }}>
        <div className="card-body p-4">
          {/* Header */}
          <div className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <button 
                className="btn btn-link p-0 me-3"
                onClick={() => navigate('/patners/home')}
              >
                <i className="fas fa-arrow-left fs-4 text-muted"></i>
              </button>
            </div>
            <h2 className="fw-bold text-dark mb-0">Programs</h2>
          </div>

          {/* Search and Filter Bar */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex gap-3">
              <div className="position-relative">
                <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                />
              </div>
              <button className="btn btn-outline-secondary d-flex align-items-center gap-2" style={{ borderRadius: '8px' }}>
                <i className="fas fa-filter"></i>
                Filter
              </button>
            </div>
            <button 
              className="btn btn-success px-4 py-2" 
              style={{ borderRadius: '8px' }}
              onClick={() => navigate('/patners/programs/add')}
            >
              Add a Program
            </button>
          </div>

          {/* Programs Table */}
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr className="border-0">
                  <th className="border-0 text-dark fw-semibold">
                    Name
                    <i className="fas fa-sort ms-2 text-muted"></i>
                  </th>
                  <th className="border-0 text-dark fw-semibold">
                    Target Group
                    <i className="fas fa-sort ms-2 text-muted"></i>
                  </th>
                  <th className="border-0 text-dark fw-semibold">
                    Beneficiaries
                    <i className="fas fa-sort ms-2 text-muted"></i>
                  </th>
                  <th className="border-0 text-dark fw-semibold">
                    Status
                    <i className="fas fa-sort ms-2 text-muted"></i>
                  </th>
                  <th className="border-0 text-dark fw-semibold">
                    Start Date
                    <i className="fas fa-sort ms-2 text-muted"></i>
                  </th>
                  <th className="border-0 text-dark fw-semibold">
                    Region
                    <i className="fas fa-sort ms-2 text-muted"></i>
                  </th>
                  <th className="border-0 text-dark fw-semibold">
                    Actions
                    <i className="fas fa-sort ms-2 text-muted"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program) => (
                  <tr key={program.id} className="border-bottom">
                    <td className="py-3">{program.name}</td>
                    <td className="py-3">{program.targetGroup}</td>
                    <td className="py-3">{program.beneficiaries}</td>
                    <td className="py-3">{getStatusBadge(program.status)}</td>
                    <td className="py-3">{program.startDate}</td>
                    <td className="py-3">{program.region}</td>
                    <td className="py-3">{getActionButton(program.id)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center align-items-center mt-4">
            <nav aria-label="Programs pagination">
              <ul className="pagination mb-0">
                <li className="page-item">
                  <button className="page-link border-0 me-2" style={{ borderRadius: '6px' }}>
                    1
                  </button>
                </li>
                <li className="page-item">
                  <button className="page-link border-0 me-2" style={{ borderRadius: '6px' }}>
                    2
                  </button>
                </li>
                <li className="page-item">
                  <button className="page-link border-0 me-2" style={{ borderRadius: '6px' }}>
                    3
                  </button>
                </li>
                <li className="page-item">
                  <span className="page-link border-0 me-2" style={{ borderRadius: '6px' }}>
                    ...
                  </span>
                </li>
                <li className="page-item">
                  <button className="page-link border-0 me-2" style={{ borderRadius: '6px' }}>
                    98
                  </button>
                </li>
                <li className="page-item">
                  <button className="page-link border-0 me-2" style={{ borderRadius: '6px' }}>
                    99
                  </button>
                </li>
                <li className="page-item">
                  <button className="page-link border-0 me-2" style={{ borderRadius: '6px' }}>
                    100
                  </button>
                </li>
                <li className="page-item ms-3">
                  <button className="btn btn-success px-3 py-2" style={{ borderRadius: '8px' }}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
