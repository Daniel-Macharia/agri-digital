import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaSort, 
  FaSortUp, 
  FaSortDown,
  FaTimes,
  FaUserPlus,
  FaTrash,
  FaEnvelope,
  FaFileAlt,
  FaHandHoldingUsd,
  FaChevronLeft
} from 'react-icons/fa';

interface Farmer {
  id: number;
  name: string;
  email: string;
  gender: 'Male' | 'Female';
  status: 'Active' | 'Inactive';
  registeredDate: string;
  interventions: string;
}

const RegisteredFarmers: React.FC = () => {
  const [selectedFarmers, setSelectedFarmers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Farmer>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock data
  const mockFarmers: Farmer[] = [
    { id: 1, name: 'John doe', email: 'john@example.com', gender: 'Male', status: 'Active', registeredDate: '2025/05/20', interventions: 'Title of intervention' },
    { id: 2, name: 'Jane doe', email: 'jane@example.com', gender: 'Female', status: 'Inactive', registeredDate: '2025/05/20', interventions: 'Title of intervention' },
    { id: 3, name: 'Mike Smith', email: 'mike@example.com', gender: 'Male', status: 'Active', registeredDate: '2025/05/20', interventions: 'Title of intervention' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah@example.com', gender: 'Female', status: 'Active', registeredDate: '2025/05/20', interventions: 'Title of intervention' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', gender: 'Male', status: 'Inactive', registeredDate: '2025/05/20', interventions: 'Title of intervention' },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFarmers(mockFarmers.map(farmer => farmer.id));
    } else {
      setSelectedFarmers([]);
    }
  };

  const handleSelectFarmer = (farmerId: number, checked: boolean) => {
    if (checked) {
      setSelectedFarmers([...selectedFarmers, farmerId]);
    } else {
      setSelectedFarmers(selectedFarmers.filter(id => id !== farmerId));
    }
  };

  const handleSort = (field: keyof Farmer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Farmer) => {
    if (sortField !== field) {
      return <FaSort className="text-muted" />;
    }
    return sortDirection === 'asc' 
      ? <FaSortUp className="text-primary" />
      : <FaSortDown className="text-primary" />;
  };

  const clearSelection = () => {
    setSelectedFarmers([]);
  };

  const filteredFarmers = mockFarmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFarmers = [...filteredFarmers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link text-dark p-0">
            <FaChevronLeft size={20} />
          </button>
          <h2 className="mb-0 fw-bold text-dark">Registered Farmers</h2>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-3 flex-grow-1 me-4">
          <div className="position-relative flex-grow-1">
            <FaSearch 
              className="position-absolute top-50 start-3 translate-middle-y text-muted"
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
            />
          </div>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
            <FaFilter />
            Filter
          </button>
        </div>
        <button className="btn btn-success d-flex align-items-center gap-2">
          <FaUserPlus />
          Register Farmer
        </button>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 px-3 py-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedFarmers.length === mockFarmers.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="border-0 px-3 py-3">
                    <button 
                      className="btn btn-link text-dark text-decoration-none p-0 d-flex align-items-center gap-2"
                      onClick={() => handleSort('name')}
                    >
                      Name {getSortIcon('name')}
                    </button>
                  </th>
                  <th className="border-0 px-3 py-3">
                    <button 
                      className="btn btn-link text-dark text-decoration-none p-0 d-flex align-items-center gap-2"
                      onClick={() => handleSort('email')}
                    >
                      Email {getSortIcon('email')}
                    </button>
                  </th>
                  <th className="border-0 px-3 py-3">
                    <button 
                      className="btn btn-link text-dark text-decoration-none p-0 d-flex align-items-center gap-2"
                      onClick={() => handleSort('gender')}
                    >
                      Gender {getSortIcon('gender')}
                    </button>
                  </th>
                  <th className="border-0 px-3 py-3">
                    <button 
                      className="btn btn-link text-dark text-decoration-none p-0 d-flex align-items-center gap-2"
                      onClick={() => handleSort('status')}
                    >
                      Status {getSortIcon('status')}
                    </button>
                  </th>
                  <th className="border-0 px-3 py-3">
                    <button 
                      className="btn btn-link text-dark text-decoration-none p-0 d-flex align-items-center gap-2"
                      onClick={() => handleSort('registeredDate')}
                    >
                      Registered Date {getSortIcon('registeredDate')}
                    </button>
                  </th>
                  <th className="border-0 px-3 py-3">
                    <button 
                      className="btn btn-link text-dark text-decoration-none p-0 d-flex align-items-center gap-2"
                      onClick={() => handleSort('interventions')}
                    >
                      Interventions {getSortIcon('interventions')}
                    </button>
                  </th>
                  <th className="border-0 px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedFarmers.map((farmer) => (
                  <tr key={farmer.id} className="border-bottom">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedFarmers.includes(farmer.id)}
                        onChange={(e) => handleSelectFarmer(farmer.id, e.target.checked)}
                      />
                    </td>
                    <td className="px-3 py-3">{farmer.name}</td>
                    <td className="px-3 py-3">{farmer.email}</td>
                    <td className="px-3 py-3">{farmer.gender}</td>
                    <td className="px-3 py-3">
                      <span className={`badge rounded-pill ${
                        farmer.status === 'Active' ? 'bg-success' : 'bg-warning'
                      }`}>
                        {farmer.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">{farmer.registeredDate}</td>
                    <td className="px-3 py-3">{farmer.interventions}</td>
                    <td className="px-3 py-3">
                      <button className="btn btn-link text-success text-decoration-none p-0">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Selection Action Bar */}
      {selectedFarmers.length > 0 && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4 bg-success text-white px-4 py-3 rounded-pill shadow">
          <div className="d-flex align-items-center gap-4">
            <button 
              className="btn btn-link text-white text-decoration-none p-0"
              onClick={clearSelection}
            >
              <FaTimes />
            </button>
            <span className="fw-bold">{selectedFarmers.length} Selected</span>
            <div className="vr text-white"></div>
            <button className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-2">
              <FaUserPlus />
              Support Farmer
            </button>
            <button className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-2">
              <FaTrash />
              Delete Farmer
            </button>
            <button className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-2">
              <FaEnvelope />
              Email Farmer
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <nav>
          <ul className="pagination mb-0">
            <li className="page-item">
              <button className="page-link border-0 bg-success text-white rounded me-2">1</button>
            </li>
            <li className="page-item">
              <button className="page-link border-0 text-dark rounded me-2">2</button>
            </li>
            <li className="page-item">
              <button className="page-link border-0 text-dark rounded me-2">3</button>
            </li>
            <li className="page-item">
              <span className="page-link border-0 text-dark">...</span>
            </li>
            <li className="page-item">
              <button className="page-link border-0 text-dark rounded me-2">98</button>
            </li>
            <li className="page-item">
              <button className="page-link border-0 text-dark rounded me-2">99</button>
            </li>
            <li className="page-item">
              <button className="page-link border-0 text-dark rounded">100</button>
            </li>
          </ul>
        </nav>
        <button className="btn btn-success">
          Next
        </button>
      </div>

      {/* Floating Action Buttons */}
      <div className="position-fixed end-4 bottom-4 d-flex flex-column gap-3">
        <button className="btn btn-success rounded-circle shadow" style={{ width: '60px', height: '60px' }}>
          <FaFileAlt size={20} />
        </button>
        <button className="btn btn-success rounded-circle shadow" style={{ width: '60px', height: '60px' }}>
          <FaHandHoldingUsd size={20} />
        </button>
      </div>
    </div>
  );
};

export default RegisteredFarmers;
