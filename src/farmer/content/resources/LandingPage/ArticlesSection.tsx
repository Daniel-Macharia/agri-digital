import React, { useState } from 'react';
import { PiMedalLight } from 'react-icons/pi';
import ArticleCard from './ArticleCard';
import { Article } from '../types';

interface ArticlesSectionProps {
  articles: Article[];
  title?: string;
  onViewMore?: () => void;
  showViewMore?: boolean;
  cardProps?: Record<string, unknown>;
  className?: string;
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles = [],
  title = "Articles",
  onViewMore,
  showViewMore = true,
  cardProps = {},
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const itemsPerPage = 3;

  const handleViewMore = () => {
    if (articles.length <= itemsPerPage) return;
           
    setIsSliding(true);
           
    setTimeout(() => {
      const nextIndex = currentIndex + itemsPerPage;
      if (nextIndex >= articles.length) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(nextIndex);
      }
      setIsSliding(false);
    }, 300);

    onViewMore?.();
  };

  const getCurrentItems = () => {
    return articles.slice(currentIndex, currentIndex + itemsPerPage);
  };

  const hasMoreItems = articles.length > itemsPerPage;

  return (
    <div className={`mb-2 ars-articles-section ${className}`} style={{
      border: 'none',
      backgroundColor: '#ffffff',
      borderRadius: '20px 20px 20px 20px',
      padding: '20px'
    }}>
      <div className="d-flex justify-content-between align-items-center mb-4 ars-section-header">
        <div className="d-flex align-items-center">
          <PiMedalLight className="me-2 ars-medal-icon" size={20} style={{ color: '#198754' }} />
          <h5 className="mb-0 fw-bold ars-section-title">{title}</h5>
        </div>
        {showViewMore && hasMoreItems && (
          <button
            className="btn btn-link fw-semibold ars-view-more-btn"
            style={{ color: '#198754', textDecoration: 'none' }}
            onClick={handleViewMore}
            disabled={isSliding}
          >
            View More
          </button>
        )}
      </div>
                   
      <div
        className="row ars-articles-grid"
        style={{
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          transform: isSliding ? 'translateX(-20px)' : 'translateX(0)',
          opacity: isSliding ? 0.7 : 1
        }}
      >
        {getCurrentItems().map((article, index) => (
          <ArticleCard
            key={`${article.id}-${currentIndex}-${index}`}
            article={article}
            {...cardProps}
          />
        ))}
      </div>
                   
      {articles.length === 0 && (
        <div className="text-center py-5 ars-empty-state">
          <p className="text-muted">No articles available</p>
        </div>
      )}
                   
      {hasMoreItems && (
        <div className="text-center mt-3 ars-pagination-info">
          <small className="text-muted">
            Showing {currentIndex + 1}-{Math.min(currentIndex + itemsPerPage, articles.length)} of {articles.length}
          </small>
        </div>
      )}
    </div>
  );
};

export default ArticlesSection;