// ... (previous code remains unchanged until the cut-off point in the media modal)
import React, { useState, useEffect } from 'react';
import { BiDownload, BiFileBlank } from 'react-icons/bi';
import { FaClock, FaUser, FaStar, FaRegStar, FaArrowLeft, FaRegComment, FaImage, FaVideo } from 'react-icons/fa';
import { IoBookOutline,  } from 'react-icons/io5';
import { CiEraser, CiHeart } from 'react-icons/ci';
import { LuTrash2 } from 'react-icons/lu';
import { BiPlay } from 'react-icons/bi';
import {TfiGallery} from 'react-icons/tfi';

interface MyArticle {
  id: string | number;
  title: string;
  author?: string;
  readTime?: string;
  views?: number;
  attendees?: number;
  status: 'Published' | 'Under Review';
  price?: number;
  date?: string;
  ratings?: number;
  category?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  downloads?: number;
  reads?: number;
}

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  description: string;
  size: string;
  uploadedAt: Date;
  thumbnail?: string;
  duration?: string;
}

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  uploadedAt: Date;
  description?: string;
  pages?: number;
  body: string;
}

interface MyArticleDetailProps {
  article: MyArticle;
  onBackClick: () => void;
  onEdit?: (article: MyArticle) => void;
  onDelete?: (article: MyArticle) => void;
  mediaItems?: MediaItem[];
  documents?: DocumentItem[];
}

const MyArticleDetail: React.FC<MyArticleDetailProps> = ({
  article,
  onBackClick,
  onEdit,
  onDelete,
  mediaItems = [],
  documents = []
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReading, setIsReading] = useState<string | null>(null);
  const [readerModal, setReaderModal] = useState<DocumentItem | null>(null);

  // Mock media items for articles
  const mockMediaItems: MediaItem[] = mediaItems.length > 0 ? mediaItems : [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1730659370558-e2472828a61d?w=800&auto=format&fit=crop&q=80',
      title: 'Modern Agricultural Techniques',
      description: 'Advanced farming methods showcased in the article',
      size: '2.4MB',
      uploadedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1589922583749-6b8473a85048?w=800&auto=format&fit=crop&q=80',
      title: 'Precision Agriculture Equipment',
      description: 'GPS-guided tractor for precision farming operations',
      size: '3.2MB',
      uploadedAt: new Date('2024-01-20')
    },
    {
      id: '3',
      type: 'video',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1721240074674-35a47e1bdb13?w=400&auto=format&fit=crop&q=60',
      title: 'Agricultural Innovation Demo',
      description: 'Video demonstration of innovative farming techniques',
      duration: '8:45',
      size: '32.5MB',
      uploadedAt: new Date('2024-01-25')
    }
  ];

  // Mock documents for articles
  const mockDocuments: DocumentItem[] = documents.length > 0 ? documents : [
    {
      id: '1',
      name: 'Article_References_2023.pdf',
      type: 'pdf',
      size: '2.5MB',
      url: 'https://www.fao.org/3/cb9479en/cb9479en.pdf',
      uploadedAt: new Date('2023-01-15'),
      description: 'Comprehensive reference materials and citations used in the article',
      pages: 45,
      body: `# Article References 2023

## Introduction
This document contains all the reference materials, citations, and supplementary information for the main article.

## Key References
1. **Modern Agricultural Practices** - Latest research findings
2. **Sustainability Guidelines** - Best practices for sustainable farming
3. **Technology Integration** - How to integrate technology in agriculture

## Additional Resources
Detailed bibliography and further reading materials for deeper understanding of the topics covered.`
    },
    {
      id: '2',
      name: 'Supplementary_Data.pdf',
      type: 'pdf',
      size: '1.8MB',
      url: 'https://www.extension.iastate.edu/alternativeag/cropinfofiles/pdf/CropRotationBenefits.pdf',
      uploadedAt: new Date('2023-02-01'),
      description: 'Additional data sets and analysis supporting the article findings',
      pages: 28,
      body: `# Supplementary Data Analysis

## Data Overview
This document provides additional data analysis and statistical information that supports the main article findings.

## Statistical Analysis
- **Sample Size**: 1,500 farms
- **Geographic Coverage**: 12 regions
- **Time Period**: 2020-2023

## Key Findings
Detailed breakdown of research results and methodological approaches used in the study.`
    }
  ];

  const handleDelete = () => {
    onDelete?.(article);
    setShowDeleteModal(false);
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} size={14} className="text-warning me-1" />
        ) : (
          <FaRegStar key={i} size={14} className="text-muted me-1" />
        )
      );
    }
    return <div className="d-flex align-items-center">{stars}</div>;
  };

  // Media Section Functions
  const handleMediaClick = (media: MediaItem) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
  };

  const handleMediaDownload = async (media: MediaItem) => {
    try {
      const response = await fetch(media.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${media.title.replace(/\s+/g, '_')}.${media.type === 'video' ? 'mp4' : 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(media.url, '_blank');
    }
  };

  // Documentation Section Functions
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <BiFileBlank className="text-muted" size={20} />;
      default:
        return <BiFileBlank className="text-muted" size={20} />;
    }
  };

  const handleRead = async (document: DocumentItem) => {
    setIsReading(document.id);
    setTimeout(() => {
      setReaderModal(document);
      setIsReading(null);
    }, 1000);
  };

  const handleDownloadDoc = async (doc: DocumentItem) => {
    try {
      const link = document.createElement('a');
      link.href = doc.url;
      link.download = doc.name;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(doc.url, '_blank');
    }
  };

  const closeReader = () => {
    setReaderModal(null);
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isModalOpen) {
          handleCloseModal();
        }
        if (readerModal) {
          closeReader();
        }
      }
    };

    if (isModalOpen || readerModal) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, readerModal]);

  const isUnderReview = article.status === 'Under Review';
  const isPublished = article.status === 'Published';

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: '#eeeeee', minHeight: '100vh', padding: '0' }}>
        <div className="container py-4 px-0">
          {/* Back Button */}
          <div className="mb-2">
            <button 
              className="btn btn-link text-muted p-0 d-flex align-items-center"
              onClick={onBackClick}
              style={{ textDecoration: 'none' }}
            >
              <FaArrowLeft className="me-2" size={14} />
              Back to My Articles & Trainings
            </button>
          </div>

          {/* Article Header */}
          <div className="bg-white p-4 mb-4 shadow-sm" style={{ borderRadius: '30px 30px 0 0' }}>
            <div className="position-relative">
              {/* Hero Image */}
              <img
                src={article.image || 'https://images.unsplash.com/photo-1695756133141-e72a22bc9594?w=600&auto=format&fit=crop&q=60'}
                alt={article.title}
                className="img-fluid w-100"
                style={{ 
                  height: '300px', 
                  objectFit: 'cover', 
                  borderRadius: '20px'
                }}
              />

              {/* Category Badge and Status */}
              <div className="d-flex flex-wrap align-items-center gap-2 pt-3">
                {article.category && (
                  <span className={`badge px-3 py-2 ${
                    article.category === 'Agronomy' ? 'bg-warning text-dark' :
                    article.category === 'Marketing' ? 'bg-primary' : 'bg-success'
                  }`} style={{ borderRadius: '20px', fontSize: '0.75rem' }}>
                    {article.category}
                  </span>
                )}

                {article.author && (
                  <div className="d-flex align-items-center small text-muted me-3">
                    <FaUser className="me-1" size={12} />
                    {article.author}
                  </div>
                )}

                {article.readTime && (
                  <div className="d-flex align-items-center small text-muted me-3">
                    <FaClock className="me-1" size={12} />
                    {article.readTime}
                  </div>
                )}

                {isPublished && article.ratings && (
                  <div className="d-flex align-items-center">
                    {renderStars(article.ratings)}
                  </div>
                )}
              </div>

              {/* Title and Action Buttons Row */}
              <div className="d-flex justify-content-between align-items-start mt-3">
                <h4 className="fw-bold mb-3 flex-grow-1 me-3" style={{ fontSize: '1.5rem', lineHeight: '1.3' }}>
                  {article.title}
                </h4>
                
                {isPublished && (
                  <div className="d-flex align-items-center">
                    <CiHeart className="me-4" size={20} />
                    <span><FaRegComment className="me-1" size={20} /></span>
                  </div>
                )}
                
                {isUnderReview && (
                  <div className="d-flex align-items-center gap-2">
                    <button 
                      className="btn btn-sm d-flex align-items-center"
                      onClick={() => onEdit?.(article)}
                      style={{ padding: '6px 12px' }}
                    >
                      <CiEraser size={18} className="me-1" color='green' />
                    </button>
                    <button 
                      className="btn btn-sm d-flex align-items-center"
                      onClick={() => setShowDeleteModal(true)}
                      style={{padding: '6px 12px' }}
                    >
                      <LuTrash2 size={18} className="me-1" color='red' />
                    </button>
                  </div>
                )}
              </div>

              {/* Published Articles */}
              {isPublished && (
                <div className="row mb-3">
                  <div className="col d-flex align-items-start">
                    <BiDownload className="me-2 text-success" size={20} />
                    <span className="text-success me-1">{article.downloads || 0}</span>
                    <span className="fw-normal text-success me-4">Downloads</span>
                    <IoBookOutline className="me-2 text-success" size={20} />
                    <span className="text-success me-1">{article.reads || 0}</span>
                    <span className="fw-normal text-success">Reads</span>
                  </div>
                  <div className="col-auto d-flex align-items-start justify-content-end">
                    <span className="fw-bold me-1">Published on</span>
                    <span className="text-muted">{article.datePublished || article.date}</span>
                  </div>
                </div>
              )}

              {/* Price and Date for Under Review */}
              {isUnderReview && (
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="text-muted small">
                    {article.price && `Price: KES ${article.price}`}
                  </div>
                  <div className="text-muted small">
                    Submitted on {article.datePublished || article.date || '12/04/2025'}
                  </div>
                </div>
              )}

              {/* Article Description */}
              <div className="bg-white pt-4">
                <h6 className="fw-bold mb-3">Description</h6>
                <div className="text-muted" style={{ lineHeight: '1.6' }}>
                  {article.description || `Agriculture is the backbone of many economies, but one of the biggest challenges farmers face today is finding skilled labor to support their operations. Labor shortages, lack of efficiency, and high operational costs make farming more difficult, affecting productivity and profitability.

This is where AgriWork comes in—a revolutionary platform designed to connect farmers with skilled laborers to optimize farm operations, reduce inefficiencies, and improve productivity. In this article, we take a deep dive into how AgriWork is transforming the agricultural workforce and making farming more efficient.

Key topics covered in this comprehensive guide include:

• Understanding the current agricultural labor market challenges
• How AgriWork's platform connects farmers with skilled workers
• Case studies of successful farm-worker partnerships
• Best practices for optimizing agricultural operations
• Future trends in agricultural employment and technology integration

This article provides actionable insights for farmers looking to improve their operations through better workforce management and strategic labor allocation.`}
                </div>
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="bg-white rounded-4 p-4 mb-4 shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 className="fw-bold mb-0 d-flex align-items-center">
                <TfiGallery className="me-2" size={20} />
                Images & Videos
                <span className="badge bg-primary ms-2">{mockMediaItems.length}</span>
              </h5>
              <small className="text-muted">
                {mockMediaItems.filter(item => item.type === 'image').length} Images • {' '}
                {mockMediaItems.filter(item => item.type === 'video').length} Videos
              </small>
            </div>

            <div className="row g-3">
              {mockMediaItems.map((media) => (
                <div key={media.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="position-relative">
                    <img
                      src={media.type === 'video' ? media.thumbnail || media.url : media.url}
                      alt={media.title}
                      className="w-100"
                      style={{ 
                        height: '200px', 
                        objectFit: 'cover',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease'
                      }}
                      onClick={() => handleMediaClick(media)}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    {media.type === 'video' && (
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <div 
                          className="bg-dark bg-opacity-75 rounded-circle p-3 d-flex align-items-center justify-content-center"
                          style={{ cursor: 'pointer', width: '60px', height: '60px' }}
                          onClick={() => handleMediaClick(media)}
                        >
                          <BiPlay className="text-white" size={28} />
                        </div>
                      </div>
                    )}
                    <div className="text-start mt-2">
                      <p className="mb-0 text-dark">{media.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mockMediaItems.length === 0 && (
              <div className="text-center py-5">
                <div className="mb-3">
                  <FaImage size={48} className="text-muted" />
                </div>
                <h6 className="text-muted">No media items available</h6>
                <p className="text-muted small">Media files will appear here once uploaded</p>
              </div>
            )}
          </div>

          {/* Documentation Section */}
          <div className="bg-white rounded-4 p-4 mb-4 shadow-sm">
            <h5 className="mb-3 d-flex align-items-center text-black">
              <BiFileBlank className="me-2" size={20} />
              Attached Documents
            </h5>
            {mockDocuments.map((doc) => (
              <div key={doc.id} className="d-flex align-items-center justify-content-between p-2 mb-2 bg-light rounded">
                <div className="d-flex align-items-center text-success">
                  {getFileIcon(doc.type)}
                  <div className="ms-2">
                    <div className="fw-bold text-truncate text-success" style={{ maxWidth: '200px' }}>{doc.name}</div>
                    <small className="text-success">{doc.size}</small>
                    {doc.description && <small className="d-block text-success">{doc.description}</small>}
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm d-flex align-items-center"
                    onClick={() => handleRead(doc)}
                    disabled={isReading === doc.id}
                  >
                    <IoBookOutline className="me-1" size={16} />
                    {isReading === doc.id ? 'Loading...' : 'Read'}
                  </button>
                  <button
                    className="btn border-warning btn-sm d-flex align-items-center text-warning"
                    style={{ borderRadius: '10px' }}
                    onClick={() => handleDownloadDoc(doc)}
                  >
                    <BiDownload className="me-1 text-warning" size={16} />
                    Download
                  </button>
                </div>
              </div>
            ))}
            {mockDocuments.length === 0 && (
              <div className="text-center py-3">
                <p className="text-muted">No documents available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1055 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this article?</p>
                <p className="fw-semibold">"{article.title}"</p>
                <p className="text-muted small">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Modal */}
      {isModalOpen && selectedMedia && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1055 }}
          onClick={handleCloseModal}
        >
          <div 
            className="modal-dialog modal-xl modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark text-white border-0">
              <div className="modal-header border-secondary">
                <h5 className="modal-title d-flex align-items-center">
                  {selectedMedia.type === 'video' ? (
                    <FaVideo className="me-2 text-danger" />
                  ) : (
                    <FaImage className="me-2 text-success" />
                  )}
                  {selectedMedia.title}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0">
                {selectedMedia.type === 'video' ? (
                  <div className="position-relative">
                    <video 
                      controls 
                      autoPlay
                      className="w-100" 
                      style={{ maxHeight: '70vh', backgroundColor: '#000' }}
                      poster={selectedMedia.thumbnail}
                      preload="metadata"
                    >
                      <source src={selectedMedia.url} type="video/mp4" />
                      <source src={selectedMedia.url} type="video/webm" />
                      <source src={selectedMedia.url} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                    {selectedMedia.duration && (
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-dark bg-opacity-75">
                          Duration: {selectedMedia.duration}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <img 
                      src={selectedMedia.url} 
                      alt={selectedMedia.title}
                      className="img-

fluid w-100" 
                      style={{ maxHeight: '70vh', objectFit: 'contain', backgroundColor: '#000' }}
                    />
                  </div>
                )}
                <div className="p-3">
                  <p className="text-muted mb-2">{selectedMedia.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Size: {selectedMedia.size} • Uploaded: {selectedMedia.uploadedAt.toLocaleDateString()}
                    </small>
                    <button
                      className="btn btn-sm btn-outline-light d-flex align-items-center"
                      onClick={() => handleMediaDownload(selectedMedia)}
                    >
                      <BiDownload className="me-1" size={16} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reader Modal */}
      {readerModal && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1055 }}
          onClick={closeReader}
        >
          <div 
            className="modal-dialog modal-xl modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-white">
              <div className="modal-header">
                <h5 className="modal-title d-flex align-items-center">
                  <BiFileBlank className="me-2" />
                  {readerModal.name}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeReader}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="markdown-body">
                  {/* Render markdown content; for simplicity, display body as plain text */}
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{readerModal.body}</pre>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-sm btn-outline-primary d-flex align-items-center"
                  onClick={() => handleDownloadDoc(readerModal)}
                >
                  <BiDownload className="me-1" size={16} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyArticleDetail;