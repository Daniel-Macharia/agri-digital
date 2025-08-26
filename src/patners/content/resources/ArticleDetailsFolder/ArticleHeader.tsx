import React, { useState } from 'react';
import { FaClock, FaUser, FaStar, FaRegComment } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { MdOutlineFileDownload } from "react-icons/md";
//import {A}


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

interface ArticleHeaderProps {
  article: Article;
  isPurchased: boolean;
  onDownload?: () => void;
  onFavorite?: () => void;
  onComment?: () => void;
  isFavorited?: boolean;
  onRate?: (rating: number) => void;
  rating?: number;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  isPurchased,
  onDownload,
  onFavorite,
  onComment,
  isFavorited = false
}) => {
  const initialRating = article.rating ?? 4.5;
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const renderStars = () => {
    const rating = hoverRating || userRating || initialRating;

    return (
      <div className="d-flex align-items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={14}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className={
              star <= rating
                ? 'text-warning'
                : 'text-muted'
            }
            style={{ cursor: 'pointer', marginRight: '2px' }}
          />
        ))}
      </div>
    );
  };

  const handleRate = (rating: number) => {
    setUserRating(rating);
    console.log(`User rated ${rating} stars for article:`, article.title);
  };

  return (
    <div className="ard-article-header bg-white px-3 pt-3" style={{ borderRadius: '20 20 0 0' }}>
      <div className="position-relative">
        {/* Hero Image */}
        <img
          src={article.image}
          alt={article.title}
          className="img-fluid"
          style={{ 
            width: '100%', 
            height: '300px', 
            objectFit: 'cover', 
            borderRadius: '20px 20px 0 0' 
          }}
        />
        <div className="d-flex flex-wrap align-items-center gap-2 pt-3 px-3">
  {/* Category Badge */}
  {article.category && (
    <span className={`badge px-3 py-2 ${
      article.category === 'Agronomy' ? 'bg-warning text-dark' :
      article.category === 'Marketing' ? 'bg-primary' : 'bg-success'
    }`} style={{ borderRadius: '20px', fontSize: '0.75rem' }}>
      {article.category}
    </span>
  )}

  {/* Author */}
  {article.author && (
    <div className="d-flex align-items-center small text-muted me-3">
      <FaUser className="me-1" size={12} />
      {article.author}
    </div>
  )}

  {/* Read Time */}
  {article.readTime && (
    <div className="d-flex align-items-center small text-muted me-3">
      <FaClock className="me-1" size={12} />
      {article.readTime}
    </div>
  )}

  {/* Rating Stars */}
  <div className="d-flex align-items-center">
    {renderStars()}
  </div>
</div>

        
        {/* Title and Action Buttons Row */}
        <div className="d-flex justify-content-between align-items-start px-3">
          {/* Article Title */}
          <h4 className="fw-bold mb-3 flex-grow-1 me-3" style={{ fontSize: '1.5rem', lineHeight: '1.3' }}>
            {article.title}
          </h4>
          
          {/* Action Buttons - Right Side */}
          {isPurchased && (
            <div className="d-flex align-items-center" style={{ gap: '8px' }}>
              <button 
                className="btn p-2 d-flex align-items-center justify-content-center"
                onClick={onFavorite}
                style={{ 
                  color: isFavorited ? '#dc3545' : 'dark'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <CiHeart size={26} className=' border-1' />
              </button>
              
              <button 
                className="btn p-2 d-flex align-items-center justify-content-center"
                onClick={onComment}
                style={{ 
                  color: '#fff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <FaRegComment size={26} className='text-dark border-1' />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Row - Download Button and Publish Date */}
        <div className="d-flex justify-content-between align-items-center px-3">
          {/* Download Button - Only show when purchased */}
          <div className="d-flex align-items-center">
            {isPurchased && (
              <button 
                className="btn btn-outline-warning btn-sm me-2 d-flex align-items-center"
                onClick={onDownload}
                style={{ borderRadius: '10px', padding: '6px 12px' }}
              >
                <MdOutlineFileDownload size={22} className="me-1" />
                Download
              </button>
            )}
          </div>

          {/* Publish Date */}
          <div className="text-muted small">
            Published on 12/04/2025
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArticleHeader;