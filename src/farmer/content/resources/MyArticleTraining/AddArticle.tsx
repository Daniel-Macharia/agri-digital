import React, { useState, useRef } from 'react';
import {
  FaArrowLeft,
  FaCheck,
} from 'react-icons/fa';
import * as Yup from 'yup';
import Toast from './Toast';
import { PiUploadSimpleThin } from 'react-icons/pi';
import { FiTag } from 'react-icons/fi';

/* ---------- Types ---------- */
interface ArticleFormData {
  title: string;
  authorType: string;
  authorName: string;
  summary: string;
  content: string;
  photo: File | null;
  video: File | null;
  videoEmbedLink: string;
  documents: File[];
  category: string;
  targetAudience: string;
  readingFormat: 'downloadable' | 'readOnly' | '';
  cost: string;
  readingTime: string;
  tags: string[];
}

/* ---------- Validation ---------- */
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Article title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  authorType: Yup.string().required('Author type is required'),
  summary: Yup.string()
    .required('Article summary is required')
    .min(20, 'Summary must be at least 20 characters')
    .max(300, 'Summary cannot exceed 300 characters'),
  content: Yup.string()
    .required('Main content is required')
    .min(100, 'Content must be at least 100 characters'),
  category: Yup.string().required('Article category is required'),
  targetAudience: Yup.string().required('Target audience is required'),
  cost: Yup.string()
    .required('Cost is required')
    .matches(/^\d+(\.\d{1,2})?$/, 'Cost must be a valid number'),
  readingTime: Yup.string()
    .required('Reading time is required')
    .matches(/^\d+$/, 'Reading time must be a valid number'),
  videoEmbedLink: Yup.string()
    .url('Video embed link must be a valid URL')
    .nullable(),
});

/* ---------- Props ---------- */
interface AddArticleProps {
  initialAuthorName?: string;
  onBack?: () => void;
  onSave?: (data: ArticleFormData) => void;
  onSubmit?: (data: ArticleFormData) => void;
}

/* ---------- Component ---------- */
const AddArticle: React.FC<AddArticleProps> = ({
  initialAuthorName = 'John Doe',
  onBack,
  onSave,
  onSubmit,
}) => {
  /* ---------- State ---------- */
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    authorType: '',
    authorName: initialAuthorName,
    summary: '',
    content: '',
    photo: null,
    video: null,
    videoEmbedLink: '',
    documents: [],
    category: '',
    targetAudience: '',
    readingFormat: '',
    cost: '',
    readingTime: '',
    tags: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error',
  });
  const [newTag, setNewTag] = useState('');

  /* ---------- Refs ---------- */
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  /* ---------- Constants ---------- */
  const authorTypes = ['Select', 'Individual', 'Organization', 'Expert', 'Institution'];
  const categories = [
    'Select',
    'Agronomy',
    'Marketing',
    'Technology',
    'Environment',
    'Organic Farming',
    'Finance',
    'Livestock',
  ];
  const targetAudiences = [
    'Select',
    'Farmers',
    'Students',
    'Researchers',
    'General Public',
    'Professionals',
  ];

  /* ---------- Helpers ---------- */
  const showToast = (message: string, type: 'success' | 'error' = 'success') =>
    setToast({ show: true, message, type });

  const hideToast = () => setToast({ show: false, message: '', type: 'success' });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleReadingFormatChange = (format: 'downloadable' | 'readOnly') => {
    setFormData(prev => ({
      ...prev,
      readingFormat: prev.readingFormat === format ? '' : format,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: 'photo' | 'video' | 'documents',
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (fileType === 'documents') {
      const validFiles = Array.from(files).filter(file => {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        const maxSize = 10 * 1024 * 1024;
        return allowedTypes.includes(file.type) && file.size <= maxSize;
      });
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...validFiles],
      }));
    } else {
      const file = files[0];
      if (!file) return;

      const allowedTypes =
        fileType === 'photo'
          ? ['image/png', 'image/jpeg', 'image/jpg']
          : ['video/mp4', 'video/avi', 'video/mov'];
      const maxSize = fileType === 'photo' ? 5 * 1024 * 1024 : 100 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        showToast(
          `Please upload ${fileType === 'photo' ? 'PNG, JPG' : 'MP4, AVI, MOV'} only`,
          'error',
        );
        return;
      }
      if (file.size > maxSize) {
        showToast(`File size must be < ${maxSize / 1024 / 1024} MB`, 'error');
        return;
      }

      setFormData(prev => ({ ...prev, [fileType]: file }));
    }
  };

  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, trimmed] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) =>
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));

  const removeDocument = (index: number) =>
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const next: Record<string, string> = {};
        err.inner.forEach(e => {
          if (e.path) next[e.path] = e.message;
        });
        setErrors(next);
      }
      return false;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      showToast('Article saved successfully!');
      onSave?.(formData);
    } catch {
      showToast('Error saving article', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    const ok = await validateForm();
    if (!ok) {
      showToast('Please fix the errors before submitting', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 2000));
      showToast('Article submitted for review!', 'success');
      onSubmit?.(formData);
    } catch {
      showToast('Error submitting article', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- Render ---------- */
  return (
    <div className="container-fluid min-vh-100 p-0" style={{ backgroundColor: '#eeeeee' }}>
      <Toast {...toast} onClose={hideToast} />

   
          {/* Header - Only back button and title */}
          <div className="d-flex align-items-center mb-1">
            <button
              type="button"
              className="btn btn-link p-0 me-1 text-decoration-none text-muted"
              onClick={onBack}
            >
              <FaArrowLeft size={16} />
            </button>
            <h6 className="mb-0 fw-normal">Back</h6>
          </div>
             <div className="container py-0 px-0">
             <div className="bg-white rounded-5 shadow-sm p-4">

          <div className="px-3">
             <h4 className="mb-2 fw-normal">Add an Article</h4>
            {/* Article Title */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Article Title
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Lorem Ipsum"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
            </div>

            {/* Author Type and Author Name - Same Row */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Author Type
              </label>
              <div className="col-sm-4">
                <select
                  name="authorType"
                  value={formData.authorType}
                  onChange={handleInputChange}
                  className={`form-select ${errors.authorType ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                >
                  {authorTypes.map(t => (
                    <option key={t} value={t === 'Select' ? '' : t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.authorType && (
                  <div className="invalid-feedback">{errors.authorType}</div>
                )}
              </div>
              <label className="col-sm-2 col-form-label text-muted text-end" style={{ fontSize: '14px' }}>
                Author Name
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  readOnly
                  value={formData.authorName}
                  className="form-control bg-light"
                  style={{ fontSize: '14px' }}
                />
              </div>
            </div>

            {/* Articles Summary */}
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Articles Summary
              </label>
              <div className="col-sm-9">
                <textarea
                  name="summary"
                  rows={3}
                  value={formData.summary}
                  onChange={handleInputChange}
                  placeholder="Brief summary of your article (150–250 characters)"
                  className={`form-control ${errors.summary ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                />
                <div className="form-text small">{formData.summary.length}/300</div>
                {errors.summary && <div className="invalid-feedback">{errors.summary}</div>}
              </div>
            </div>

            {/* Main Content */}
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Main Content
              </label>
              <div className="col-sm-9">
                <div className="mb-0 col-12 bg-warning p-2 rounded-top">
                  <button type="button" className="btn btn-sm btn-outline-secondary me-1">
                    <strong>B</strong>
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary me-1">
                    <em>I</em>
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">
                    <u>U</u>
                  </button>
                </div>
                <textarea
                  name="content"
                  rows={6}
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your article content here..."
                  className={`col-12 border-top-0 form-control rounded-bottom ${errors.content ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                />
                {errors.content && <div className="invalid-feedback">{errors.content}</div>}
              </div>
            </div>

            {/* Upload Photo */}
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Upload Photo
              </label>
              <div className="col-sm-9">
                <div className="border border-2 border-dashed rounded text-center p-4" style={{ borderColor: '#dee2e6' }}>
                  <PiUploadSimpleThin className="text-muted mb-2" size={24} />
                  <div className="text-muted mb-1" style={{ fontSize: '14px' }}>Upload Photos</div>
                  <div className="text-muted small mb-3">PNG, PNG, JPG up to 10MB</div>
                  <input
                    type="file"
                    ref={photoInputRef}
                    className="d-none"
                    accept=".png,.jpg,.jpeg"
                    onChange={e => handleFileChange(e, 'photo')}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => photoInputRef.current?.click()}
                  >
                    Choose File
                  </button>
                  {formData.photo && (
                    <div className="mt-2 small text-success">
                      <FaCheck /> {formData.photo.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Upload Video */}
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Upload Video
              </label>
              <div className="col-sm-9">
                <div className="border border-2 border-dashed rounded text-center p-4" style={{ borderColor: '#dee2e6' }}>
                  <PiUploadSimpleThin className="text-muted mb-2" size={24} />
                  <div className="text-muted mb-1" style={{ fontSize: '14px' }}>Upload Video</div>
                  <div className="text-muted small mb-3">MP4 up to 10MB</div>
                  <input
                    type="file"
                    ref={videoInputRef}
                    className="d-none"
                    accept=".mp4,.avi,.mov"
                    onChange={e => handleFileChange(e, 'video')}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => videoInputRef.current?.click()}
                  >
                    Choose File
                  </button>
                  {formData.video && (
                    <div className="mt-2 small text-success">
                      <FaCheck /> {formData.video.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Video Embed Link */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Video Embed Link
              </label>
              <div className="col-sm-9">
                <input
                  type="url"
                  name="videoEmbedLink"
                  value={formData.videoEmbedLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com/video"
                  className={`form-control ${errors.videoEmbedLink ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                />
                {errors.videoEmbedLink && (
                  <div className="invalid-feedback">{errors.videoEmbedLink}</div>
                )}
              </div>
            </div>

            {/* Attach Documents */}
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Attach Documents
              </label>
              <div className="col-sm-9">
                <div className="border border-2 border-dashed rounded text-center p-4" style={{ borderColor: '#dee2e6' }}>
                  <PiUploadSimpleThin className="text-muted mb-2" size={24} />
                  <div className="text-muted mb-1" style={{ fontSize: '14px' }}>Upload Documents (Slides,PDFs)</div>
                  <div className="text-muted small mb-3">MP4 up to 10MB</div>
                  <input
                    type="file"
                    ref={documentInputRef}
                    className="d-none"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    multiple
                    onChange={e => handleFileChange(e, 'documents')}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => documentInputRef.current?.click()}
                  >
                    Choose Files
                  </button>

                  {formData.documents.length > 0 && (
                    <div className="mt-3">
                      {formData.documents.map((doc, idx) => (
                        <div
                          key={idx}
                          className="d-flex justify-content-between align-items-center bg-light rounded px-3 py-2 mb-2"
                        >
                          <span className="small">{doc.name}</span>
                          <button
                            type="button"
                            className="btn-close btn-sm"
                            aria-label="Remove"
                            onClick={() => removeDocument(idx)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Article Category and Target Audience - Same Row */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Article Category
              </label>
              <div className="col-sm-4">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                >
                  {categories.map(c => (
                    <option key={c} value={c === 'Select' ? '' : c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="invalid-feedback">{errors.category}</div>
                )}
              </div>
              <label className="col-sm-2 col-form-label text-muted text-end" style={{ fontSize: '14px' }}>
                Target Audience
              </label>
              <div className="col-sm-3">
                <select
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  className={`form-select ${errors.targetAudience ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                >
                  {targetAudiences.map(a => (
                    <option key={a} value={a === 'Select' ? '' : a}>
                      {a}
                    </option>
                  ))}
                </select>
                {errors.targetAudience && (
                  <div className="invalid-feedback">{errors.targetAudience}</div>
                )}
              </div>
            </div>

            {/* Reading Format */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Reading Format
              </label>
              <div className="col-sm-9">
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.readingFormat === 'downloadable'}
                      onChange={() => handleReadingFormatChange('downloadable')}
                      id="downloadable"
                    />
                    <label className="form-check-label text-muted" htmlFor="downloadable" style={{ fontSize: '14px' }}>
                      Downloadable
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.readingFormat === 'readOnly'}
                      onChange={() => handleReadingFormatChange('readOnly')}
                      id="readOnly"
                    />
                    <label className="form-check-label text-muted" htmlFor="readOnly" style={{ fontSize: '14px' }}>
                      Read Only ( In App View)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Reader's Cost and Reading Time - Same Row */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Reader's Cost (KES)
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  placeholder="KES"
                  className={`form-control ${errors.cost ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                />
                {errors.cost && <div className="invalid-feedback">{errors.cost}</div>}
              </div>
              <label className="col-sm-2 col-form-label text-muted text-end" style={{ fontSize: '14px' }}>
                Reading Time ( Mins)
              </label>
              <div className="col-sm-3">
                <div className="input-group">
                  <input
                    type="text"
                    name="readingTime"
                    value={formData.readingTime}
                    onChange={handleInputChange}
                    placeholder="0"
                    className={`form-control ${errors.readingTime ? 'is-invalid' : ''}`}
                    style={{ fontSize: '14px' }}
                  />
                  <span className="input-group-text">
                    <i className="fas fa-info-circle text-muted"></i>
                  </span>
                </div>
                {errors.readingTime && (
                  <div className="invalid-feedback">{errors.readingTime}</div>
                )}
              </div>
            </div>

            {/* Tags / Keywords */}
            <div className="mb-5 row">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                <FiTag className="me-1" size={16} />
                Tags / Keywords
              </label>
              <div className="col-sm-9">
                <div className="input-group">
                  <input
                    type="text"
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add keywords to help with discovery (e.g. maize, pest control)"
                    className="form-control"
                    style={{ fontSize: '14px' }}
                  />
                  <button type="button" className="btn btn-outline-secondary" onClick={addTag}>
                    Add
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {formData.tags.map(tag => (
                    <span key={tag} className="badge bg-secondary d-flex align-items-center">
                      {tag}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-1"
                        style={{ fontSize: '0.6rem' }}
                        aria-label="Remove"
                        onClick={() => removeTag(tag)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons - Bottom positioned, furthest ends */}
            <div className="row mt-5 pt-4">
              <div className="col-12 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-warning px-4"
                  disabled={isSaving}
                  onClick={handleSave}
                  style={{ minWidth: '120px' }}
                >
                  {isSaving && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                  )}
                  Save
                </button>

                <button
                  type="button"
                  className="btn text-white px-4"
                  style={{ backgroundColor: '#556B2F', minWidth: '160px' }}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                  )}
                  Submit for Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .form-check-input:checked {
          background-color: #556B2F;
          border-color: #556B2F;
        }
        .border-dashed {
          border-style: dashed !important;
        }
        .input-group-text {
          background-color: transparent;
          border-left: none;
        }
        .form-control:focus {
          border-color: #556B2F;
          box-shadow: 0 0 0 0.2rem rgba(85, 107, 47, 0.25);
        }
        .form-select:focus {
          border-color: #556B2F;
          box-shadow: 0 0 0 0.2rem rgba(85, 107, 47, 0.25);
        }
      `}</style>
    </div>
  );
};

export default AddArticle;