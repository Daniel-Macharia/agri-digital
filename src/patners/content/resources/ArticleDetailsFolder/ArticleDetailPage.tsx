import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Article } from '../types';
import DocumentsSection from './DocumentationSection';
import ArticleContent from './ArticleContent';
import MediaSection from './MediaSection';
import ArticleHeader from './ArticleHeader';
import { useTrainingResources } from '../TrainingResourcesContext';
import Toast from '../Toast';

interface ArticleDetailPageProps {
  article: Article;
  onBackClick: () => void;
  onPurchaseClick: (article: Article) => void;
  isPurchased?: boolean;
}



const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onBackClick,
  onPurchaseClick,
  isPurchased = false
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { handleArticlePurchase } = useTrainingResources();

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; show: boolean }>({
    message: '',
    type: 'success',
    show: false
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, show: true });
  };

  const handleDownload = () => {
    if (!isPurchased) {
      showToast('Please purchase the article to download it.', 'error');
      return;
    }

    const fileUrl = `/downloads/${article.id}.pdf`;

    // Verify the file exists before downloading
    fetch(fileUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = `${article.title.replace(/\s+/g, '_')}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          console.log('Downloading article:', article.title);
          showToast('Download started!');
        } else {
          throw new Error('File not found');
        }
      })
      .catch(() => {
        showToast('File could not be downloaded.', 'error');
      });
  };

  const handleFavorite = () => {
    const newState = !isFavorited;
    setIsFavorited(newState);
    const action = newState ? 'added to' : 'removed from';
    showToast(`Article ${action} favorites!`);
  };

  const handleComment = () => {
    if (!isPurchased) {
      showToast('Please purchase the article to comment.', 'error');
      return;
    }

    const comment = prompt('Enter your comment:');
    if (comment) {
      console.log('Comment added:', comment);
      showToast('Comment added successfully!');
    }
  };

  const handlePurchase = () => {
    console.log('Initiating purchase for article:', article.id);
    handleArticlePurchase(article);
    onPurchaseClick(article);
  };

  return (
    <div className="ard-article-detail-container" style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
      {/* Header */}
      <div className="ard-header-section py-3 p-lg-2" style={{ position: 'sticky', backgroundColor: '#eeeeee', top: 0, zIndex: 10 }}>
        <div className="container">
          <button 
            className="btn btn-link p-0 ard-back-button" 
            onClick={onBackClick}
            style={{ color: '#666', textDecoration: 'none' }}
          >
            <FaArrowLeft className="me-2" size={16} />
            Back to Training & Resources
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container py-4" style={{ borderRadius: '30px 30px 0 0' }}>
        <div className="row">
          <div className="col-lg-12 mx-auto">
            <div className="mb-4" style={{ borderRadius: '30px 30px 0 0'}}>
              <ArticleHeader 
                article={article}
                isPurchased={isPurchased}
                onDownload={handleDownload}
                onFavorite={handleFavorite}
                onComment={handleComment}
                isFavorited={isFavorited}
              />
              <ArticleContent 
                article={article}
                isPurchased={isPurchased}
                onPurchaseClick={handlePurchase}
              />
            </div>

            {isPurchased && (
              <>
                <div className="mb-4">
                  <MediaSection isPurchased={isPurchased} />
                </div>
                <div className="mb-4">
                  <DocumentsSection isPurchased={isPurchased} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default ArticleDetailPage;