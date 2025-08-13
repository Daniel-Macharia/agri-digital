import React, { useState } from 'react';
import { FaClock, FaEye, FaUser, FaStar, FaRegComment } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { useTrainingResources } from '../TrainingResourcesContext';
import { IoMdBook } from 'react-icons/io';
import { MdOutlineFileDownload } from 'react-icons/md';

interface Article {
  id: number | string;
  title: string;
  author?: string;
  readTime?: string;
  views?: string;
  category?: string;
  description?: string;
  price?: number;
  image?: string;
  rating?: number;
  reviewCount?: number;
  datePublished?: string;
}

interface ArticleCardProps {
  article: Article;
  showPrice?: boolean;
  showAuthor?: boolean;
  showReadTime?: boolean;
  showViews?: boolean;
  className?: string;
  isLibraryMode?: boolean;
  isPurchased?: boolean;
  onReadClick?: (article: Article) => void;
  onDownloadClick?: (article: Article) => void;
  onFavoriteClick?: (article: Article) => void;
  onCommentClick?: (article: Article) => void;
  isFavorited?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  showPrice = true,
  showAuthor = true,
  showReadTime = true,
  showViews = true,
  className = '',
  isLibraryMode = false,
  isPurchased = false,
  onReadClick,
  onDownloadClick,
  onFavoriteClick,
  onCommentClick,
  isFavorited = false
}) => {
  const { handleArticlePurchase, handleArticleImageClick, purchasedArticles } = useTrainingResources();
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const isArticlePurchased = isPurchased || purchasedArticles.has(article.id);
  const initialRating = article.rating ?? 4.5;

  const renderStars = () => {
    const rating = hoverRating || userRating || initialRating;

    return (
      <div className="d-flex align-items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={12}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className={star <= rating ? 'text-warning' : 'text-muted'}
            style={{ cursor: 'pointer', marginRight: '2px' }}
          />
        ))}
      </div>
    );
  };

  const handleRate = (rating: number) => {
    if (isLibraryMode && isArticlePurchased) {
      setUserRating(rating);
      console.log(`User rated ${rating} stars for article:`, article.title);
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleArticleImageClick(article);
  };

  const handlePrimaryAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLibraryMode && isArticlePurchased) {
      onReadClick?.(article);
    } else {
      handleArticlePurchase(article);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownloadClick?.(article);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick?.(article);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCommentClick?.(article);
  };

  return (
    <div className={`col-md-4 mb-4 ${className}`}>
      <div
        className="h-100 arc-card-container"
        style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
        onClick={handleImageClick}
      >
        <div className="position-relative arc-image-container">
          <img
            src={article.image}
            alt={article.title}
            className="img-fluid arc-card-image"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          />
        </div>

        <div className="mt-3 arc-card-content">
          <div className="d-flex align-items-center justify-content-between arc-title-category">
            <h6 className="fw-bold mb-2 arc-card-title">{article.title}</h6>
            {article.category && (
              <div className="d-flex justify-content-end px-3 mt-0">
                <span className={`badge arc-category-badge ${
                  article.category === 'Agronomy' ? 'bg-warning' :
                  article.category === 'Marketing' ? 'bg-primary' : 'bg-success'
                }`}>
                  {article.category}
                </span>
              </div>
            )}
          </div>

          {showAuthor && article.author && (
            <p className="text-muted small mb-2 arc-author">
              <FaUser className="me-1" size={12} />
              {article.author}
            </p>
          )}

          <div className="d-flex align-items-center mb-3 arc-meta-info">
            {showReadTime && article.readTime && (
              <>
                <FaClock className="me-1 text-muted" size={12} />
                <span className="text-muted small me-3 arc-read-time">{article.readTime}</span>
              </>
            )}
            {showViews && article.views && (
              <>
                <FaEye className="me-1 text-muted" size={12} />
                <span className="text-muted small arc-views">{article.views}</span>
              </>
            )}
          </div>

          {article.description && (
            <p className="text-muted small mb-3 arc-description" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
              {article.description}
            </p>
          )}

          {isLibraryMode && isArticlePurchased && (
            <div className="d-flex align-items-center justify-content-between mb-3 arc-library-icons">
              <div className="d-flex align-items-center">
                {renderStars()}
              </div>

              <div className="d-flex align-items-center" style={{ gap: '8px' }}>
                <button
                  className="btn p-1 d-flex align-items-center justify-content-center"
                  onClick={handleFavorite}
                  style={{
                    color: isFavorited ? '#dc3545' : '#6c757d',
                    border: 'none',
                    background: 'transparent'
                  }}
                >
                  <CiHeart size={20} />
                </button>

                <button
                  className="btn p-1 d-flex align-items-center justify-content-center"
                  onClick={handleComment}
                  style={{
                    color: '#6c757d',
                    border: 'none',
                    background: 'transparent'
                  }}
                >
                  <FaRegComment size={16} />
                </button>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center arc-card-footer">
            {isLibraryMode && isArticlePurchased ? (
              <div className="d-flex justify-content-between w-100">
                <button
                  className="btn btn-success btn-sm py-2"
                  onClick={handlePrimaryAction}
                  style={{ maxWidth: '120px' }}
                >
                  <IoMdBook className="me-2" size={20} />
                  Read
                </button>
                <button
                  className="btn btn-outline-warning btn-sm py-2 ms-auto"
                  onClick={handleDownload}
                  style={{ maxWidth: '120px' }}
                >
                  <MdOutlineFileDownload className="me-2" size={20} />
                  Download
                </button>
              </div>
            ) : (
              <>
                <button
                  className="btn btn-primary btn-sm rounded-pill py-2 arc-purchase-btn"
                  onClick={handlePrimaryAction}
                >
                  Purchase Now
                </button>
                {showPrice && article.price && (
                  <span className="fw-bold text-dark arc-price">KES {article.price}</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
