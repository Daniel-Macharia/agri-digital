// MyContentSearchFilter.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaChevronDown} from 'react-icons/fa';
import { PiSlidersThin } from 'react-icons/pi';

interface MyContentSearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (type: string) => void;
  filterStatus: string;
  onFilterStatusChange: (status: string) => void;
  filterDate: string;
  onFilterDateChange: (date: string) => void;
  onCreateClick?: () => void; // Optional create handler
}

const MyContentSearchFilter: React.FC<MyContentSearchFilterProps> = ({
  searchValue,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  filterStatus,
  onFilterStatusChange,
  filterDate,
  onFilterDateChange,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Article', label: 'Articles' },
    { value: 'Training', label: 'Trainings' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Published', label: 'Published' },
    { value: 'Under Review', label: 'Under Review' },
    { value: 'Done', label: 'Done' },
    { value: 'In Progress', label: 'In Progress' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Dates' },
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filterType !== 'all') count++;
    if (filterStatus !== 'all') count++;
    if (filterDate !== 'all') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Clear all filters
  const clearAllFilters = () => {
    onFilterTypeChange('all');
    onFilterStatusChange('all');
    onFilterDateChange('all');
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap">
      {/* Search and Filter Container */}
      <div className="d-flex align-items-center gap-3 mb-2 mb-md-0">
        {/* Search */}
        <div className="d-flex align-items-center" style={{
          backgroundColor: '#f9fafb',
          borderRadius: '25px',
          padding: '8px 16px',
          width: '300px',
          border: '1px solid #e5e7eb'
        }}>
          <FaSearch 
            style={{ 
              color: '#9ca3af', 
              fontSize: '14px',
              marginRight: '12px'
            }} 
          />
          <input
            type="text"
            placeholder="Search articles and trainings"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              flex: 1,
              fontSize: '14px',
              color: '#374151'
            }}
          />
        </div>

        {/* Filter */}
        <div className="position-relative" ref={dropdownRef}>
          <button
            className="btn d-flex align-items-center position-relative"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            style={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '25px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6b7280',
              gap: '8px',
              boxShadow: 'none',
              outline: 'none'
            }}
          >
            <PiSlidersThin style={{ fontSize: '16px' }} />
            Filter
            <FaChevronDown style={{ fontSize: '12px' }} />
            
            {/* Active filter badge */}
            {activeFilterCount > 0 && (
              <span
                className="position-absolute"
                style={{
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#7cb342',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>

          {showFilterDropdown && (
            <div
              className="dropdown-menu show position-absolute"
              style={{
                top: '100%',
                right: 0,
                left: 'auto',
                minWidth: '250px',
                zIndex: 1000,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',
                marginTop: '4px',
                padding: '16px'
              }}
            >
              {/* Filter Header */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0" style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>
                  Filters
                </h6>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#7cb342',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      padding: '0'
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Type Filter */}
              <div className="mb-3">
                <label className="form-label mb-2" style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  TYPE
                </label>
                <select
                  className="form-select"
                  value={filterType}
                  onChange={(e) => onFilterTypeChange(e.target.value)}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    padding: '8px 12px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {typeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="mb-3">
                <label className="form-label mb-2" style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  STATUS
                </label>
                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => onFilterStatusChange(e.target.value)}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    padding: '8px 12px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="form-label mb-2" style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                  DATE
                </label>
                <select
                  className="form-select"
                  value={filterDate}
                  onChange={(e) => onFilterDateChange(e.target.value)}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    padding: '8px 12px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {dateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyContentSearchFilter;