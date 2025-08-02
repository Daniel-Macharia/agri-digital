import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface PageHeaderProps {
  onBackClick?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onBackClick }) => (
  <div className="d-flex align-items-center mb-4">
    <FaArrowLeft
      className="me-3 text-muted"
      size={20}
      style={{ cursor: 'pointer' }}
      onClick={onBackClick}
    />
  </div>
);

export default PageHeader;
