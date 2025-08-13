// LibraryArticlesSection.tsx
import React, { useState } from 'react';
import { PiMedalLight } from 'react-icons/pi';
import ArticleCard from '../LandingPage/ArticleCard';
import { Article } from '../types';

interface LibraryArticlesSectionProps {
  articles: Article[];
  purchasedArticleIds: Set<string | number>;
  title?: string;
  onViewMore?: () => void;
  showViewMore?: boolean;
  className?: string;
  onReadClick?: (article: Article) => void;
  onDownloadClick?: (article: Article) => void;
}

const LibraryArticlesSection: React.FC<LibraryArticlesSectionProps> = ({
  articles = [],
  purchasedArticleIds,
  title = "📚 Purchased Articles",
  onViewMore,
  showViewMore = true,
  className = '',
  onReadClick,
  onDownloadClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const itemsPerPage = 3;

  // Filter only purchased articles
  const purchasedArticles = articles.filter(article => 
    purchasedArticleIds.has(article.id)
  );

  const handleViewMore = () => {
    if (purchasedArticles.length <= itemsPerPage) return;
                
    setIsSliding(true);
                
    setTimeout(() => {
      const nextIndex = currentIndex + itemsPerPage;
      if (nextIndex >= purchasedArticles.length) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(nextIndex);
      }
      setIsSliding(false);
    }, 300);

    onViewMore?.();
  };

  const getCurrentItems = () => {
    return purchasedArticles.slice(currentIndex, currentIndex + itemsPerPage);
  };

  const hasMoreItems = purchasedArticles.length > itemsPerPage;

  if (purchasedArticles.length === 0) {
    return (
      <div className={`mb-2 ${className}`} style={{
        border: 'none',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '20px'
      }}>
        <div className="d-flex align-items-center mb-4">
          <PiMedalLight className="me-2" size={20} style={{ color: '#198754' }} />
          <h5 className="mb-0 fw-bold">{title}</h5>
        </div>
        
        <div className="text-center py-5">
          <div className="mb-3">
            <PiMedalLight size={48} style={{ color: '#dee2e6' }} />
          </div>
          <h6 className="text-muted mb-2">No Purchased Articles Yet</h6>
          <p className="text-muted small">
            Articles you purchase will appear here for easy access and download.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`mb-2 ${className}`} style={{
      border: 'none',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '20px'
    }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <PiMedalLight className="me-2" size={20} style={{ color: '#198754' }} />
          <h5 className="mb-0 fw-bold">{title}</h5>
        </div>
        {showViewMore && hasMoreItems && (
          <button
            className="btn btn-link fw-semibold"
            style={{ color: '#198754', textDecoration: 'none' }}
            onClick={handleViewMore}
            disabled={isSliding}
          >
            View More
          </button>
        )}
      </div>
                        
      <div
        className="row"
        style={{
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          transform: isSliding ? 'translateX(-20px)' : 'translateX(0)',
          opacity: isSliding ? 0.7 : 1
        }}
      >
        {getCurrentItems().map((article, index) => (
          <ArticleCard
            key={`library-article-${article.id}-${currentIndex}-${index}`}
            article={article}
            isLibraryMode={true}
            isPurchased={true}
            onReadClick={onReadClick}
            onDownloadClick={onDownloadClick}
            showPrice={false} // Don't show price in library mode
          />
        ))}
      </div>
                        
      {hasMoreItems && (
        <div className="text-center mt-3">
          <small className="text-muted">
            Showing {currentIndex + 1}-{Math.min(currentIndex + itemsPerPage, purchasedArticles.length)} of {purchasedArticles.length}
          </small>
        </div>
      )}
    </div>
  );
};

export default LibraryArticlesSection;
