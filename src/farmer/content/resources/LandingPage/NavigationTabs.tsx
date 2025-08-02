// NavigationTabs.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { PiSlidersThin } from 'react-icons/pi';

interface Tab {
  id: string;
  label: string;
}

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  tabs?: Tab[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onFilterChange?: (option: string) => void;
  filterOption?: string;
  showSearch?: boolean;
  showFilter?: boolean;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
  tabs = [
    { id: 'all', label: 'All Articles & Trainings' },
    { id: 'library', label: 'My Library' },
    { id: 'my-content', label: 'My Articles & Trainings' },
  ],
  searchValue = '',
  onSearchChange,
  onFilterChange,
  filterOption = 'all',
  showSearch = true,
  showFilter = true,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'author', label: 'Author' },
    { value: 'date', label: 'Date (Latest)' },
    { value: 'price', label: 'Price' },
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

  const handleFilterSelect = (option: string) => {
    onFilterChange?.(option);
    setShowFilterDropdown(false);
  };


  return (
    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
      <div className="d-flex mb-2 mb-md-0" style={{ gap: '8px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`btn ${activeTab === tab.id ? '' : ''}`}
            style={{
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 20px',
              borderRadius: '5px',
              border: activeTab === tab.id ? 'none' : '1px solid #eeeeee',
              backgroundColor: activeTab === tab.id ? '#7cb342' : '#eeeeee',
              color: activeTab === tab.id ? '#ffffff' : '#6b7280',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              boxShadow: 'none',
              outline: 'none'
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="d-flex align-items-center" style={{ gap: '12px' }}>
        {showSearch && (
          <div className="d-flex align-items-center" style={{
            backgroundColor: '#f9fafb',
            borderRadius: '25px',
            padding: '8px 16px',
            width: '280px',
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
              placeholder="Search"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
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
        )}

        {showFilter && (
          <div className="position-relative" ref={dropdownRef}>
            <button
              className="btn d-flex align-items-center"
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
            </button>

            {showFilterDropdown && (
              <div
                className="dropdown-menu show position-absolute"
                style={{
                  top: '100%',
                  right: 0,
                  left: 'auto',
                  minWidth: '150px',
                  zIndex: 1000,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: '#ffffff',
                  marginTop: '4px'
                }}
              >
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    className="dropdown-item"
                    onClick={() => handleFilterSelect(option.value)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      color: filterOption === option.value ? '#7cb342' : '#374151',
                      backgroundColor: filterOption === option.value ? '#f0f9e8' : 'transparent',
                      border: 'none',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationTabs;