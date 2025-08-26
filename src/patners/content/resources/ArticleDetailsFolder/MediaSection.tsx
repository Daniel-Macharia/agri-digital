import React, { useState } from 'react';
import { BiPlay, BiDownload } from 'react-icons/bi';
import { FaImage, FaVideo } from 'react-icons/fa';
import { MediaItem } from '../types';
import { TfiGallery } from 'react-icons/tfi';

interface MediaSectionProps {
  isPurchased: boolean;
  mediaItems?: MediaItem[];
}

const MediaSection: React.FC<MediaSectionProps> = ({ 
  isPurchased, 
  mediaItems = [] 
}) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockMediaItems: MediaItem[] = mediaItems.length > 0 ? mediaItems : [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1730659370558-e2472828a61d?w=800&auto=format&fit=crop&q=80',
      title: 'Modern Irrigation System',
      description: 'Advanced drip irrigation setup for optimal water management',
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
      title: 'Sustainable Farming Practices',
      description: 'Complete guide to implementing sustainable farming methods',
      duration: '12:35',
      size: '45.7MB',
      uploadedAt: new Date('2024-01-25')
    },
  ];

  const handleMediaClick = (media: MediaItem) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
  };

  const handleDownload = async (media: MediaItem) => {
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

  React.useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!isPurchased) return null;

  return (
    <>
      <div className="ard-media-section bg-white p-4 mb-4 shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h5 className="ard-section-title fw-bold mb-0 d-flex align-items-center">
            <TfiGallery className="me-2" />
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
                      className="img-fluid"
                      style={{ maxHeight: '80vh', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer border-secondary">
                <div className="me-auto">
                  <p className="mb-1 small">{selectedMedia.description}</p>
                  <div className="d-flex gap-3 text-muted small">
                    <span>Size: {selectedMedia.size}</span>
                    <span>Uploaded: {selectedMedia.uploadedAt.toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-outline-light btn-sm"
                    onClick={() => handleDownload(selectedMedia)}
                  >
                    <BiDownload className="me-1" />
                    Download
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaSection;