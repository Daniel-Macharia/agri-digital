import React, { useState, useEffect } from 'react';
//import { BiDownload } from 'react-icons/bi';
import { IoMdBook } from "react-icons/io";
import { BiDownload, BiFileBlank } from 'react-icons/bi';
import { DocumentItem } from '../types';

interface DocumentsSectionProps {
  isPurchased: boolean;
  documents?: DocumentItem[];
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  isPurchased,
  documents = []
}) => {
  const [isReading, setIsReading] = useState<string | null>(null);
  const [readerModal, setReaderModal] = useState<DocumentItem | null>(null);

  const mockDocuments: DocumentItem[] = documents.length > 0 ? documents : [
    {
      id: '1',
      name: 'Farming_Guidelines_2023.pdf',
      type: 'pdf',
      size: '2.5MB',
      url: 'https://www.fao.org/3/cb9479en/cb9479en.pdf',
      uploadedAt: new Date('2023-01-15'),
      description: 'Comprehensive guide to modern agricultural practices and sustainable farming methods',
      pages: 45,
      createElement: (tag: string) => document.createElement(tag),
      body: `# Farming Guidelines 2023

  Introduction
Modern agriculture faces unprecedented challenges including climate change, population growth, and resource scarcity. This comprehensive guide outlines the latest best practices for sustainable and profitable farming.

  Key Principles
1. **Soil Health Management**
   - Crop rotation strategies
   - Cover crop integration
   - Organic matter enhancement

 Implementation Guidelines
Follow these step-by-step procedures to implement sustainable farming practices on your land...`
    },
    {
      id: '2',
      name: 'Farming_Guidelines_2023.pdf',
      type: 'pdf',
      size: '2.5MB',
      url: 'https://www.extension.iastate.edu/alternativeag/cropinfofiles/pdf/CropRotationBenefits.pdf',
      uploadedAt: new Date('2023-02-01'),
      description: 'Detailed guide to modern agricultural practices and sustainable farming methods',
      pages: 28,
      createElement: (tag: string) => document.createElement(tag),

      body: `# Farming Guidelines 2023

Overview
This guide provides an overview of modern farming techniques.

 Benefits
- **Soil Fertility**: Different crops contribute various nutrients
- **Pest Control**: Breaks pest and disease cycles

 Planning Your Rotation
Consider factors such as climate, soil type, market demands, and available resources...`
    }
  ];

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

  //const link = document.createElement('a') as HTMLAnchorElement;
  const handleDownload = async (doc: DocumentItem) => {
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
      if (event.key === 'Escape' && readerModal) {
        closeReader();
      }
    };

    if (readerModal) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [readerModal]);

  if (!isPurchased) return null;

  return (
    <>
      <div className="p-3 bg-white rounded shadow-sm">
        <h5 className="mb-3 d-flex align-items-center text-dark">
          <BiFileBlank className="me-2" size={20} />
          Attached Documents
        </h5>
        {mockDocuments.map((doc) => (
          <div key={doc.id} className="d-flex align-items-center justify-content-between p-2 mb-2 bg-light rounded">
            <div className="d-flex align-items-center">
              {getFileIcon(doc.type)}
              <div className="ms-2">
                <div className="fw-bold text-truncate text-success" style={{ maxWidth: '200px' }}>{doc.name}</div>
                <small className="text-success">{doc.size}</small>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-success btn-sm d-flex align-items-center"
                onClick={() => handleRead(doc)}
                disabled={isReading === doc.id}
              >
                <IoMdBook className="me-1" size={24} />
                Read
              </button>
              <button
                className="btn border-warning btn-sm d-flex align-items-center text-warning"
                style={{ borderRadius: '10px' }}
                onClick={() => handleDownload(doc)}
              >
                <BiDownload className="me-1 text-warning"  size={24} />
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

      {readerModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1055 }} onClick={closeReader}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', width: '100%', maxHeight: '90vh' }}>
            <div className="modal-content h-100">
              <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title">{readerModal.name}</h5>
                <button type="button" className="btn-close" onClick={closeReader} aria-label="Close"></button>
              </div>
              <div className="modal-body p-0 h-100">
                <div className="h-100 overflow-auto p-4" style={{ backgroundColor: '#f8f9fa' }}>
                  {readerModal.url.startsWith('http') ? (
                    <div className="text-center">
                      <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(readerModal.url)}&embedded=true`}
                        width="100%"
                        height="600px"
                        className="border-0 rounded shadow-sm"
                        title={readerModal.name}
                      />
                      <div className="mt-3">
                        <p className="text-muted">
                          If the document doesn't load above, you can{' '}
                          <a href={readerModal.url} target="_blank" rel="noopener noreferrer" className="text-primary">
                            open it in a new tab
                          </a>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded p-4 shadow-sm">
                      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif', lineHeight: '1.6' }}>
                        {readerModal.body}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer bg-light border-top">
                <button className="btn btn-secondary btn-sm" onClick={closeReader}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentsSection;