import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, onBack }) => {
  return (
    <div className="d-flex align-items-center mb-4" style={{ background: '#f8f8f8', padding: '1rem 0' }}>
      <Button
        variant="link"
        className="p-0 me-3"
        style={{ color: '#333', textDecoration: 'none', fontSize: '1.2rem' }}
        onClick={onBack}
      >
        <FaArrowLeft />
      </Button>
      <div className="d-flex gap-3">
        <Button
          variant={activeTab === 'stock' ? 'success' : 'outline-success'}
          style={{ borderRadius: '1.5rem', minWidth: 120 }}
          onClick={() => onTabChange('stock')}
        >
          Level of Stock
        </Button>
        <Button
          variant={activeTab === 'weight' ? 'success' : 'outline-success'}
          style={{ borderRadius: '1.5rem', minWidth: 90 }}
          onClick={() => onTabChange('weight')}
        >
          Weight
        </Button>
        <Button
          variant={activeTab === 'feeding' ? 'success' : 'outline-success'}
          style={{ borderRadius: '1.5rem', minWidth: 150 }}
          onClick={() => onTabChange('feeding')}
        >
          Feeding Schedule
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
