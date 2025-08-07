import React, { useState, useMemo, useEffect } from 'react';
import { CiEraser } from 'react-icons/ci';
import { FaClock, FaMapMarkerAlt, FaCalendarAlt, FaArrowLeft, FaUsers, FaSearch, FaPrint } from 'react-icons/fa';
import { LuTrash2 } from 'react-icons/lu';
import { PiSlidersThin } from 'react-icons/pi';
import { FiTag } from 'react-icons/fi';
import { BiDownload, BiFileBlank } from 'react-icons/bi';
import { IoMdBook } from "react-icons/io";
import Pagination from '../../market-place/components/Pagination';

interface MyTraining {
  id: string | number;
  title: string;
  organizationName?: string;
  duration?: string;
  location?: string;
  dateTime?: string;
  slotsLeft?: string;
  status: 'Done' | 'Under Review' | 'In Progress';
  price?: number;
  date?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  totalSlots?: number;
  registeredCount?: number;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  paymentStatus: 'Complete' | 'Pending';
  amountPaid: number;
  registeredDate: string;
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

interface MyTrainingDetailProps {
  training: MyTraining;
  onBackClick: () => void;
  onEdit?: (training: MyTraining) => void;
  onDelete?: (training: MyTraining) => void;
  participants?: Participant[];
  documents?: DocumentItem[];
}

const MyTrainingDetail: React.FC<MyTrainingDetailProps> = ({
  training,
  onBackClick,
  onEdit,
  onDelete,
  participants = [],
  documents = []
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isReading, setIsReading] = useState<string | null>(null);
  const [readerModal, setReaderModal] = useState<DocumentItem | null>(null);
  const itemsPerPage = 10;

  // Mock participants data
  const mockParticipants = useMemo(() => {
    if (participants.length > 0) {
      return participants;
    } else {
      return [
        { id: '1', name: 'John Doe', email: 'john@example.com', paymentStatus: 'Complete' as const, amountPaid: 5000, registeredDate: '2025/01/20' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', paymentStatus: 'Complete' as const, amountPaid: 5000, registeredDate: '2025/01/21' },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', paymentStatus: 'Complete' as const, amountPaid: 5000, registeredDate: '2025/01/22' },
        { id: '4', name: 'Alice Brown', email: 'alice@example.com', paymentStatus: 'Pending' as const, amountPaid: 5000, registeredDate: '2025/01/23' },
        { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', paymentStatus: 'Complete' as const, amountPaid: 5000, registeredDate: '2025/01/24' },
        { id: '6', name: 'Diana Davis', email: 'diana@example.com', paymentStatus: 'Complete' as const, amountPaid: 5000, registeredDate: '2025/01/25' },
        { id: '7', name: 'Edward Miller', email: 'edward@example.com', paymentStatus: 'Pending' as const, amountPaid: 5000, registeredDate: '2025/01/26' },
        { id: '8', name: 'Fiona Garcia', email: 'fiona@example.com', paymentStatus: 'Complete' as const, amountPaid: 5000, registeredDate: '2025/01/27' },
        { id: '9', name: 'George Martinez', email: 'george@example.com', paymentStatus: 'Pending' as const, amountPaid: 5000, registeredDate: '2025/01/28' },
        { id: '10', name: 'Helen Anderson', email: 'helen@example.com', paymentStatus: 'Complete' as const, amountPaid: 5000, registeredDate: '2025/01/29' },
        { id: '11', name: 'Ian Taylor', email: 'ian@example.com', paymentStatus: 'Complete' as const, amountPaid: 5000, registeredDate: '2025/01/30' },
        { id: '12', name: 'Julia Thomas', email: 'julia@example.com', paymentStatus: 'Pending' as const, amountPaid: 5000, registeredDate: '2025/01/31' },
        { id: '13', name: 'Kevin White', email: 'kevin@example.com', paymentStatus: 'Complete' as const, amountPaid: 5000, registeredDate: '2025/02/01' },
        { id: '14', name: 'Laura Lee', email: 'laura@example.com', paymentStatus: 'Pending' as const, amountPaid: 5000, registeredDate: '2025/02/02' },
        { id: '15', name: 'Michael Scott', email: 'michael@example.com', paymentStatus: 'Complete' as const, amountPaid: 5000, registeredDate: '2025/02/03' }
      ];
    }
  }, [participants]);

  // Mock documents
  const mockDocuments: DocumentItem[] = documents.length > 0 ? documents : [
    {
      id: '1',
      name: 'Training_Manual_2023.pdf',
      type: 'pdf',
      size: '3.2MB',
      url: 'https://www.fao.org/3/cb9479en/cb9479en.pdf',
      uploadedAt: new Date('2023-01-15'),
      description: 'Comprehensive training manual with step-by-step instructions',
      pages: 45,
      body: `# Training Manual 2023

## Introduction
This comprehensive training manual covers all aspects of modern agricultural practices and digital marketing strategies.

## Module 1: Agricultural Fundamentals
Learn the basics of sustainable farming practices and modern agricultural techniques.

## Module 2: Digital Marketing for Agriculture
Discover how to effectively market agricultural products using digital platforms.

## Implementation Guidelines
Follow these step-by-step procedures to implement the strategies covered in this training.`
    },
    {
      id: '2',
      name: 'Training_Resources_Guide.pdf',
      type: 'pdf',
      size: '2.8MB',
      url: 'https://www.extension.iastate.edu/alternativeag/cropinfofiles/pdf/CropRotationBenefits.pdf',
      uploadedAt: new Date('2023-02-01'),
      description: 'Additional resources and reference materials for the training',
      pages: 28,
      body: `# Training Resources Guide

## Overview
This guide provides additional resources and reference materials to supplement your training experience.

## Additional Reading Materials
- **Resource 1**: Advanced agricultural techniques
- **Resource 2**: Digital marketing strategies
- **Resource 3**: Market analysis tools

## Practice Exercises
Complete these exercises to reinforce your learning from the training sessions.`
    }
  ];

  const filteredParticipants = useMemo(() => {
    let filtered = [...mockParticipants];

    if (searchValue.trim()) {
      filtered = filtered.filter(participant =>
        participant.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (filterDate !== 'all') {
      const today = new Date();
      filtered = filtered.filter(participant => {
        const regDate = new Date(participant.registeredDate);
        if (filterDate === 'today') {
          return regDate.toDateString() === today.toDateString();
        } else if (filterDate === 'week') {
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return regDate >= weekAgo;
        } else if (filterDate === 'month') {
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return regDate >= monthAgo;
        }
        return true;
      });
    }

    if (filterPayment !== 'all' && training.status !== 'Done') {
      filtered = filtered.filter(participant => participant.paymentStatus === filterPayment);
    }

    return filtered;
  }, [mockParticipants, searchValue, filterDate, filterPayment, training.status]);

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentParticipants = filteredParticipants.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = () => {
    onDelete?.(training);
    setShowDeleteModal(false);
  };

  const handlePrintAttendees = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const participantsList = filteredParticipants.map(p => 
        `${p.name} - ${p.email} - ${p.paymentStatus} - KES ${p.amountPaid} - ${p.registeredDate}`
      ).join('\n');
      
      printWindow.document.write(`
        <html>
          <head>
            <title>Registered Participants - ${training.title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h2, h3 { color: #333; }
              pre { background: #f5f5f5; padding: 15px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <h2>${training.title}</h2>
            <h3>Registered Participants (${filteredParticipants.length} total)</h3>
            <pre>${participantsList}</pre>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              Generated on ${new Date().toLocaleString()}
            </p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchValue('');
    setFilterDate('all');
    setFilterPayment('all');
    setCurrentPage(1);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Complete':
        return { backgroundColor: '#28a745', color: 'white' };
      case 'Pending':
        return { backgroundColor: '#ffc107', color: '#212529' };
      default:
        return { backgroundColor: '#6c757d', color: 'white' };
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

  const isUnderReview = training.status === 'Under Review';
  const isDone = training.status === 'Done';
  const inProgress = training.status === 'In Progress';
  const canEdit = isUnderReview || inProgress;

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

          {/* Training Header */}
          <div className="bg-white p-4 mb-4 shadow-sm" style={{ borderRadius: '30px 30px 0 0' }}>
            <div className="position-relative">
              {/* Hero Image */}
              <img
                src={training.image || 'https://images.unsplash.com/photo-1730659370558-e2472828a61d?w=600&auto=format&fit=crop&q=60'}
                alt={training.title}
                className="img-fluid w-100"
                style={{ 
                  height: '300px', 
                  objectFit: 'cover', 
                  borderRadius: '20px'
                }}
              />

              {/* Status and Organization */}
              <div className="d-flex flex-wrap align-items-center gap-2 pt-3">
                <span className={`badge px-3 py-2 ${
                  training.status === 'Done' ? 'bg-success' :
                  training.status === 'In Progress' ? 'bg-primary' : 'bg-warning text-dark'
                }`} style={{ borderRadius: '20px', fontSize: '0.75rem' }}>
                  {training.status}
                </span>

                {training.organizationName && (
                  <small className="text-muted">{training.organizationName}</small>
                )}
              </div>

              {/* Title and Action Buttons Row */}
              <div className="d-flex justify-content-between align-items-start mt-3">
                <h4 className="fw-bold mb-3 flex-grow-1 me-3" style={{ fontSize: '1.5rem', lineHeight: '1.3' }}>
                  {training.title}
                </h4>
                
                {/* Action Buttons - Only for Under Review and In Progress */}
                {canEdit && (
                  <div className="d-flex align-items-center gap-2">
                    <button 
                      className="btn btn-sm d-flex align-items-center"
                      onClick={() => onEdit?.(training)}
                      style={{padding: '6px 12px' }}
                    >
                      <CiEraser size={14} className="me-1" color='green' />
                    </button>
                    <button 
                      className="btn btn-sm d-flex align-items-center"
                      onClick={() => setShowDeleteModal(true)}
                      style={{padding: '6px 12px' }}
                    >
                      <LuTrash2 size={14} className="me-1" color='red' />
                    </button>
                  </div>
                )}
              </div>

              {/* Training Details */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-2">
                    <FaCalendarAlt className="me-2 text-muted" size={16} />
                    <small className="text-muted me-2">Date & Time:</small>
                    <small className="text-dark">{training.dateTime || 'TBD'}</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <FaClock className="me-2 text-muted" size={16} />
                    <small className="text-muted me-2">Duration:</small>
                    <small className="text-dark">{training.duration || 'TBD'}</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <FaMapMarkerAlt className="me-2 text-muted" size={16} />
                    <small className="text-muted me-2">Location:</small>
                    <small className="text-primary" style={{ cursor: 'pointer' }}>{training.location || 'TBD'}</small>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center mb-2">
                <FiTag className="me-2 text-muted" size={16} />
                <small className="text-muted me-2">Topics: Agriculture, Digital Marketing, Sustainable Farming</small>
              </div>
            </div>

            {/* Training Description */}
            <div className="bg-white py-5">
              <h6 className="fw-bold mb-3">Description</h6>
              <div className="text-muted" style={{ lineHeight: '1.6' }}>
                {training.description || `Agriculture is the backbone of many economies, but one of the biggest challenges farmers face today is finding skilled labor to support their operations. Labor shortages, lack of efficiency, and high operational costs make farming more difficult, affecting productivity and profitability.

This is where AgriWork comes in—a revolutionary platform designed to connect farmers with skilled laborers to optimize farm operations, reduce inefficiencies, and improve productivity. In this training, we take a deep dive into how AgriWork is transforming the agricultural workforce and making farming more efficient.

What you'll learn in this comprehensive training:

• Understanding current agricultural labor market dynamics
• How to effectively use AgriWork platform features
• Best practices for farm-worker collaboration
• Strategies for optimizing farm operations and productivity
• Case studies of successful agricultural transformations
• Future trends in agricultural technology and employment

This training is designed for farmers, agricultural entrepreneurs, and anyone interested in modernizing agricultural operations through effective workforce management.`}
              </div>
            </div>

            {/* Registered Participants Section */}
            <div className="bg-white">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="fw-bold mb-0 d-flex align-items-center">
                  Registered Participants
                  <span className="badge bg-primary ms-2">{mockParticipants.length}</span>
                </h6>
                <button 
                  className="btn btn-success btn-sm d-flex align-items-center"
                  onClick={handlePrintAttendees}
                >
                  <FaPrint className="me-1" size={14} />
                  Print Attendees
                </button>
              </div>

              {/* Filter Bar */}
              <div className="mb-2">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <div className="position-relative flex-grow-1" style={{ maxWidth: '250px' }}>
                    <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={14} />
                    <input
                      type="text"
                      className="form-control ps-5"
                      placeholder="Search by name or email..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      style={{ borderRadius: '8px' }}
                    />
                  </div>

                  <button
                    className={`btn btn-outline-secondary d-flex align-items-center ${showFilters ? 'active' : ''}`}
                    onClick={() => setShowFilters(!showFilters)}
                    style={{ borderRadius: '8px' }}
                  >
                    <PiSlidersThin className="me-1" size={16} />
                    Filters
                  </button>

                  {(searchValue || filterDate !== 'all' || filterPayment !== 'all') && (
                    <button
                      className="btn btn-link text-muted p-0"
                      onClick={clearFilters}
                      style={{ textDecoration: 'none' }}
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {showFilters && (
                  <div className="mt-3 p-3 bg-light rounded-3">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small text-muted">Registration Date</label>
                        <select
                          className="form-select"
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                          style={{ borderRadius: '8px' }}
                        >
                          <option value="all">All Dates</option>
                          <option value="today">Today</option>
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                        </select>
                      </div>
                      {!isDone && (
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Payment Status</label>
                          <select
                            className="form-select"
                            value={filterPayment}
                            onChange={(e) => setFilterPayment(e.target.value)}
                            style={{ borderRadius: '8px' }}
                          >
                            <option value="all">All Payments</option>
                            <option value="Complete">Complete</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Participants Table */}
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e5e7eb' }}>
                    <tr>
                      <th style={{ padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Name</th>
                      <th style={{ padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Email</th>
                      <th style={{ padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Payment Status</th>
                      <th style={{ padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Amount Paid</th>
                      <th style={{ padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Registered Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentParticipants.map((participant) => (
                      <tr key={participant.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                          {participant.name}
                        </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                          {participant.email}
                        </td>
                          <td style={{ padding: '16px' }}>
                            <span
                              style={{
                                ...getStatusStyle(participant.paymentStatus),
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '500',
                                display: 'inline-block',
                                textAlign: 'center',
                                minWidth: '80px'
                              }}
                            >
                              {participant.paymentStatus}
                            </span>
                          </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                          KES {participant.amountPaid}
                        </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                          {participant.registeredDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {currentParticipants.length === 0 && (
                  <div className="text-center py-5">
                    <div className="text-muted">
                      <FaUsers size={48} className="mb-3" />
                      <h6>No participants found</h6>
                      <p>Try adjusting your search or filter criteria</p>
                    </div>
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="mb-0 pt-4" style={{ backgroundColor: '#ffffff' }}>
                  <Pagination currentPage={currentPage} totalPages={100} onPageChange={handlePageChange} />
                </div>
              )}

              {/* Summary Statistics */}
              <div className="row mt-4 pt-4" style={{ borderTop: '1px solid #e5e7eb' }}>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="h5 text-primary mb-1">{mockParticipants.length}</div>
                    <small className="text-muted">Total Registered</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="h5 text-success mb-1">
                      {mockParticipants.filter(p => p.paymentStatus === 'Complete').length}
                    </div>
                    <small className="text-muted">Payments Complete</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="h5 text-warning mb-1">
                      {mockParticipants.filter(p => p.paymentStatus === 'Pending').length}
                    </div>
                    <small className="text-muted">Payments Pending</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="h5 text-info mb-1">
                      KES {mockParticipants.reduce((total, p) => total + p.amountPaid, 0).toLocaleString()}
                    </div>
                    <small className="text-muted">Total Revenue</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documentation Section */}
          <div className="bg-white rounded-4 p-4 mb-4 shadow-sm">
            <h5 className="mb-3 d-flex align-items-center text-black">
              <BiFileBlank className="me-2" size={20} />
              Training Documents
            </h5>
            {mockDocuments.map((doc) => (
              <div key={doc.id} className="d-flex flex-wrap-sm align-items-center justify-content-between p-2 mb-2 bg-light rounded">
                <div className="d-flex align-items-center">
                  {getFileIcon(doc.type)}
                  <div className="ms-2">
                    <div className="fw-bold text-truncate text-success" style={{ maxWidth: '200px' }}>{doc.name}</div>
                    <small className="text-success">{doc.size}</small>
                    {doc.description && <small className="d-block text-black">{doc.description}</small>}
                  </div>
                </div>
                <div className="d-flex gap-2 flex-sm-wrap">
                  <button
                    className="btn btn-success btn-sm d-flex align-items-center"
                    onClick={() => handleRead(doc)}
                    disabled={isReading === doc.id}
                  >
                    <IoMdBook className="me-1" size={16} />
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
                <p className="text-muted">No training documents available</p>
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
                <p>Are you sure you want to delete this training?</p>
                <p className="fw-semibold">"{training.title}"</p>
                <p className="text-muted small">This action cannot be undone and will affect all registered participants.</p>
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
                  Delete Training
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Reader Modal */}
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

export default MyTrainingDetail;