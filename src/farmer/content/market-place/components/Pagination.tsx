import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pages = [];
        
        // Always show first 3 pages when on first 3 pages
        if (currentPage <= 3) {
            for (let i = 1; i <= 3; i++) {
                pages.push(
                    <BootstrapPagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => onPageChange(i)}
              >
                        {i}
                    </BootstrapPagination.Item>
                );
            }
            if (totalPages > 6) {
                pages.push(<BootstrapPagination.Ellipsis key="ellipsis" disabled />);
            }
            // Show last 3 pages
            for (let i = totalPages - 2; i <= totalPages; i++) {
                if (i > 3) { // Ensure no duplicate pages
                    pages.push(
                        <BootstrapPagination.Item
                            key={i}
                            active={i === currentPage}
                            onClick={() => onPageChange(i)}
                    >
                            {i}
                        </BootstrapPagination.Item>
                    );
                }
            }
        }
        // Show last 3 pages when on last 3 pages
        else if (currentPage >= totalPages - 2) {
            // Show first 3 pages
            for (let i = 1; i <= 3; i++) {
                pages.push(
                    <BootstrapPagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => onPageChange(i)}
          >
                        {i}
                    </BootstrapPagination.Item>
                );
            }
            if (totalPages > 6) {
                pages.push(<BootstrapPagination.Ellipsis key="ellipsis" disabled />);
            }
            // Show last 3 pages
            for (let i = totalPages - 2; i <= totalPages; i++) {
                pages.push(
                    <BootstrapPagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => onPageChange(i)}
                     >
                        {i}
                    </BootstrapPagination.Item>
                );
            }
        }
        // Middle pages - show current page and adjacent pages
        else {
            // Show first 3 pages
            for (let i = 1; i <= 3; i++) {
                pages.push(
                    <BootstrapPagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </BootstrapPagination.Item>
                );
            }
            pages.push(<BootstrapPagination.Ellipsis key="first-ellipsis" disabled />);
            
            // Show current page and adjacent pages
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                if (i > 3 && i < totalPages - 2) {
                    pages.push(
                        <BootstrapPagination.Item
                            key={i}
                            active={i === currentPage}
                            onClick={() => onPageChange(i)}
                        >
                            {i}
                        </BootstrapPagination.Item>
                    );
                }
            }
            
            pages.push(<BootstrapPagination.Ellipsis key="last-ellipsis" disabled />);
            // Show last 3 pages
            for (let i = totalPages - 2; i <= totalPages; i++) {
                pages.push(
                    <BootstrapPagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </BootstrapPagination.Item>
                );
            }
        }

        return pages;
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <BootstrapPagination className="mb-0 custom-pagination">
                {renderPageNumbers()}
            </BootstrapPagination>
            
            {currentPage < totalPages && (
                <button
                    className="btn btn-success ms-5 py-0"
                    onClick={() => onPageChange(currentPage + 1)}
                    style={{
                        backgroundColor: '#6B8E23',
                        borderColor: '#6B8E23',
                        fontWeight: '300',
                        //position: 'sticky',
                    }}
                >
                    Next
                </button>
            )}
        </div>
    );
};
export default Pagination;