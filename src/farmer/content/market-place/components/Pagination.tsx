import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const maxPagesToShow = 3;

    let startPage: number, endPage: number;
    if (totalPages <= maxPagesToShow + 2) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= maxPagesToShow) {
            startPage = 1;
            endPage = maxPagesToShow + 1;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - maxPagesToShow;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <BootstrapPagination className="justify-content-center">
            {startPage > 1 && <BootstrapPagination.First onClick={() => onPageChange(1)} />}
            {currentPage > 1 && <BootstrapPagination.Prev onClick={() => onPageChange(currentPage - 1)} />}

            {startPage > 1 && <BootstrapPagination.Ellipsis disabled />}

            {pageNumbers.map(number => (
                <BootstrapPagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
                    {number}
                </BootstrapPagination.Item>
            ))}

            {endPage < totalPages && <BootstrapPagination.Ellipsis disabled />}
            
            {currentPage < totalPages && <BootstrapPagination.Next onClick={() => onPageChange(currentPage + 1)} />}
            {endPage < totalPages && <BootstrapPagination.Last onClick={() => onPageChange(totalPages)} />}
        </BootstrapPagination>
    );
};

export default Pagination; 