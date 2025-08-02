// ArticleContent.tsx
import React from 'react';
import { FaLock } from 'react-icons/fa';
import { Article } from '../types';

interface ArticleContentProps {
  article: Article;
  isPurchased: boolean;
  onPurchaseClick: (article: Article) => void;
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  article,
  isPurchased,
  onPurchaseClick
}) => {
  // Mock full article content
  const fullContent = `
    Agriculture is the backbone of many economies, but one of the biggest challenges farmers face today is finding skilled labor to support their operations. Labor shortages, lack of efficiency, and high operational costs make farming more difficult, affecting productivity and profitability.

    This is where AgriWork comes in—a revolutionary platform designed to connect farmers with skilled laborers to optimize farm operations, reduce inefficiencies, and improve productivity. In this article, we take a deep dive into how AgriWork is transforming the agricultural workforce and making farming more efficient.

    How AgriWork Is Revolutionizing Farm Productivity

    Agriculture is the backbone of many economies, but one of the biggest challenges farmers face today is finding skilled labor to support their operations. Labor shortages, lack of efficiency, and high operational costs make farming more difficult, affecting productivity and profitability.

    This is where AgriWork comes in—a revolutionary platform designed to connect farmers with skilled laborers to optimize farm operations, reduce inefficiencies, and improve productivity. In this article, we take a deep dive into how AgriWork is transforming the agricultural workforce and making farming more efficient.

       The Challenge of Agricultural Labor

    Modern farming requires specialized skills and knowledge that go beyond traditional farming methods. From operating complex machinery to understanding crop rotation patterns and soil management, today's agricultural work demands expertise.

    Many farmers struggle with:
    - Finding qualified workers during peak seasons
    - Training new employees on specialized equipment
    - Managing seasonal workforce fluctuations
    - Ensuring consistent quality of work

      AgriWork's Solution

    AgriWork addresses these challenges by creating a comprehensive platform that bridges the gap between farmers and skilled agricultural workers. The platform offers:

      1. Skilled Worker Network
    AgriWork maintains a database of pre-vetted agricultural workers with verified skills and experience. Each worker undergoes a thorough screening process to ensure they meet the platform's quality standards.

       2. Smart Matching Algorithm
    The platform uses advanced algorithms to match farmers with workers based on:
    - Required skills and experience
    - Geographic location
    - Availability and scheduling
    - Previous performance ratings

      3. Training and Certification Programs
    AgriWork doesn't just connect farmers with workers; it also invests in developing the agricultural workforce through:
    - Specialized training programs
    - Certification courses
    - Continuous skill development
    - Safety and compliance training

       Impact on Farm Productivity

    Farms using AgriWork have reported significant improvements in:
    - Operational efficiency (up to 35% increase)
    - Crop yield quality
    - Reduced labor costs
    - Improved harvest timing
    - Better resource utilization

      Future of Agricultural Employment

    As agriculture continues to evolve with technology and changing market demands, platforms like AgriWork are becoming essential for:
    - Modernizing farm operations
    - Creating sustainable employment opportunities
    - Building resilient agricultural supply chains
    - Supporting rural economic development

    The success of AgriWork demonstrates how technology can solve traditional agricultural challenges while creating new opportunities for both farmers and workers in the agricultural sector.
  `;

  const previewContent = fullContent.substring(0, 600) + "...";

  return (
    <div className="ard-article-content bg-white p-4">
      <h5 className="ard-section-title fw-bold mb-2">Introduction</h5>
      
      <div className="ard-content-text" style={{ lineHeight: '1.8', fontSize: '1rem' }}>
        {isPurchased ? (
          <div dangerouslySetInnerHTML={{ __html: fullContent.replace(/\n/g, '<br/>') }} />
        ) : (
          <>
            <p>{previewContent}</p>
            
            {/* Paywall Section */}
            <div className="ard-paywall-section">
              {/* Blurred content preview */}
              <div className="ard-blurred-content position-relative" style={{ 
                filter: 'blur(3px)', 
                pointerEvents: 'none',
                opacity: 0.5
              }}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>

                <p className="text-danger fw-semibold">
                  Purchase this article to continue reading and get full access to the content.
                </p>
                
                
              {/* Purchase prompt */}
              <div className="ard-purchase-prompt text-center mt-0 pt-0" style={{ 
                backgroundColor: '#ccfcd4ff', 
                borderRadius: '15px',
                border: '1px solid #200f54ff'
              }}>
                <div className="ard-purchase-section rounded-4 p-4 mt-4" style={{ backgroundColor: '#ccfcd4ff' }}>
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <FaLock className="me-2" size={20} style={{ color: '#198754' }} />
                    <h5 className="mb-0 fw-bold">Continue Reading This Article</h5>
                  </div>
                  <p className="text-muted mb-4">
                    Purchase this article for a one-time fee of KES {article.price} to continue reading and get full access to the content.
                  </p>
                  <button 
                    className="btn btn-primary px-5 py-2 fw-semibold ard-purchase-btn"
                    onClick={() => onPurchaseClick(article)}
                    style={{ borderRadius: '25px' }}
                  >
                    Purchase Article - KES {article.price}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleContent;