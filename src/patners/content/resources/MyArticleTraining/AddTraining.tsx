import React, { useState, useRef } from 'react';
import {
  FaArrowLeft,
  FaCheck,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa';
import { PiUploadSimpleThin } from 'react-icons/pi';
import { FiTag } from 'react-icons/fi';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ToastT from './ToastT';

/* ---------- Types ---------- */
interface TrainingFormData {
  title: string;
  organizerType: string;
  organizerName: string;
  organizerProfileLink: string;
  conductor: 'myself' | 'external' | '';
  externalSpeakerName?: string;
  description: string;
  category: string;
  targetAudience: string;
  mode: 'hybrid' | 'physical' | 'virtual' | '';
  maxAttendees: string;
  duration: string;
  trainingDate: Date | null;
  trainingTime: string;
  photo: File | null;
  documents: File[];
  costPerAttendee: string;
  tags: string[];
}

/* ---------- Validation ---------- */
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Training title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  organizerType: Yup.string().required('Organizer type is required'),
  organizerProfileLink: Yup.string()
    .url('Organizer profile link must be a valid URL')
    .nullable(),
  conductor: Yup.string().required('Please specify who will conduct the training'),
  externalSpeakerName: Yup.string().when('conductor', {
    is: 'external',
    then: (schema) => schema.required('External speaker name is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  description: Yup.string()
    .required('Training description is required')
    .min(20, 'Description must be at least 20 characters')
    .max(500, 'Description cannot exceed 500 characters'),
  category: Yup.string().required('Training category is required'),
  targetAudience: Yup.string().required('Target audience is required'),
  mode: Yup.string().required('Mode of training is required'),
  maxAttendees: Yup.string()
    .required('Maximum attendees is required')
    .matches(/^\d+$/, 'Maximum attendees must be a valid number')
    .test('min-attendees', 'Minimum 1 attendee required', (value) => {
      return value ? parseInt(value) >= 1 : false;
    }),
  duration: Yup.string()
    .required('Duration is required')
    .matches(/^\d+(\.\d{1,2})?$/, 'Duration must be a valid number (hours)'),
  trainingDate: Yup.date()
    .required('Training date is required')
    .min(
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      'Training must be scheduled at least one week in advance for review'
    ),
  trainingTime: Yup.string()
    .required('Training time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter valid time (HH:MM)'),
  costPerAttendee: Yup.string()
    .required('Cost per attendee is required')
    .test('cost-validation', 'Cost must be "free" or a valid number', (value) => {
      if (!value) return false;
      if (value.toLowerCase() === 'free') return true;
      return /^\d+(\.\d{1,2})?$/.test(value);
    }),
});

/* ---------- Props ---------- */
interface AddTrainingProps {
  initialOrganizerName?: string;
  onBack?: () => void;
  onSave?: (data: TrainingFormData) => void;
  onSubmit?: (data: TrainingFormData) => void;
}

/* ---------- Component ---------- */
const AddTraining: React.FC<AddTrainingProps> = ({
  initialOrganizerName = 'John Doe',
  onBack,
  onSave,
  onSubmit,
}) => {
  /* ---------- State ---------- */
  const [formData, setFormData] = useState<TrainingFormData>({
    title: '',
    organizerType: '',
    organizerName: initialOrganizerName,
    organizerProfileLink: '',
    conductor: '',
    externalSpeakerName: '',
    description: '',
    category: '',
    targetAudience: '',
    mode: '',
    maxAttendees: '',
    duration: '',
    trainingDate: null,
    trainingTime: '',
    photo: null,
    documents: [],
    costPerAttendee: '',
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
  const documentInputRef = useRef<HTMLInputElement>(null);

  /* ---------- Constants ---------- */
  const organizerTypes = ['Select', 'Individual', 'Organization', 'Expert', 'Institution'];
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

  const handleConductorChange = (conductor: 'myself' | 'external') => {
    setFormData(prev => ({
      ...prev,
      conductor,
      externalSpeakerName: conductor === 'myself' ? '' : prev.externalSpeakerName,
    }));
  };

  const handleModeChange = (mode: 'hybrid' | 'physical' | 'virtual') => {
    setFormData(prev => ({
      ...prev,
      mode,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      trainingDate: date,
    }));

    if (errors.trainingDate) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.trainingDate;
        return next;
      });
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: 'photo' | 'documents',
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (fileType === 'documents') {
      const validFiles = Array.from(files).filter(file => {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
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

      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxSize = 10 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        showToast('Please upload PNG, JPG files only', 'error');
        return;
      }
      if (file.size > maxSize) {
        showToast('File size must be less than 10MB', 'error');
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
      showToast('Training saved successfully!');
      onSave?.(formData);
    } catch {
      showToast('Error saving training', 'error');
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
      showToast('Training submitted for review!', 'success');
      onSubmit?.(formData);
    } catch {
      showToast('Error submitting training', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- Render ---------- */
  return (
    <div className="container-fluid min-vh-100 p-0" style={{ backgroundColor: '#eeeeee' }}>
      <ToastT {...toast} onClose={hideToast} />
          {/* Header */}
          <div className="d-flex align-items-center mb-2">
            <button
              type="button"
              className="btn btn-link p-0 me-1 text-decoration-none text-muted"
              onClick={onBack}
            >
              <FaArrowLeft size={14} />
            </button>
            <h6 className="mb-0 fw-normal">Back</h6>
          </div>
          <div className="bg-white rounded-5 shadow-sm p-4">
             <h4 className="mb-0 fw-normal">Add a Training</h4>
         <div className="container py-4 px-0">
          <div className="px-3">
            {/* Training Title */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Training Title
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

            {/* Organizer Type and Profile Link */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Organizer Type
              </label>
              <div className="col-sm-4">
                <select
                  name="organizerType"
                  value={formData.organizerType}
                  onChange={handleInputChange}
                  className={`form-select ${errors.organizerType ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                >
                  {organizerTypes.map(t => (
                    <option key={t} value={t === 'Select' ? '' : t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.organizerType && (
                  <div className="invalid-feedback">{errors.organizerType}</div>
                )}
              </div>
              <label className="col-sm-2 col-form-label text-muted text-end" style={{ fontSize: '14px' }}>
                Organizer profile link
              </label>
              <div className="col-sm-3">
                <input
                  type="url"
                  name="organizerProfileLink"
                  value={formData.organizerProfileLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com/profile"
                  className={`form-control ${errors.organizerProfileLink ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                />
                {errors.organizerProfileLink && (
                  <div className="invalid-feedback">{errors.organizerProfileLink}</div>
                )}
              </div>
            </div>

            {/* Who will be conducting */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Who will be conducting the training
              </label>
              <div className="col-sm-9">
                <div className="d-flex gap-4 align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="conductor"
                      checked={formData.conductor === 'myself'}
                      onChange={() => handleConductorChange('myself')}
                      id="myself"
                    />
                    <label className="form-check-label text-muted" htmlFor="myself" style={{ fontSize: '14px' }}>
                      Myself
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="conductor"
                      checked={formData.conductor === 'external'}
                      onChange={() => handleConductorChange('external')}
                      id="external"
                    />
                    <label className="form-check-label text-muted" htmlFor="external" style={{ fontSize: '14px' }}>
                      External Speaker(s)
                    </label>
                  </div>
                  {formData.conductor === 'external' && (
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        name="externalSpeakerName"
                        value={formData.externalSpeakerName}
                        onChange={handleInputChange}
                        placeholder="Speaker name"
                        className={`form-control ${errors.externalSpeakerName ? 'is-invalid' : ''}`}
                        style={{ fontSize: '14px' }}
                      />
                      {errors.externalSpeakerName && (
                        <div className="invalid-feedback">{errors.externalSpeakerName}</div>
                      )}
                    </div>
                  )}
                </div>
                {errors.conductor && (
                  <div className="text-danger small mt-1">{errors.conductor}</div>
                )}
              </div>
            </div>

            {/* Training Description */}
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Training Description
              </label>
              <div className="col-sm-9">
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what the participants will learn during this training"
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                />
                <div className="form-text small">{formData.description.length}/500</div>
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>
            </div>

            {/* Training Category and Target Audience */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Training Category
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

            {/* Mode of Training */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Mode of Training
              </label>
              <div className="col-sm-9">
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="mode"
                      checked={formData.mode === 'hybrid'}
                      onChange={() => handleModeChange('hybrid')}
                      id="hybrid"
                    />
                    <label className="form-check-label text-muted" htmlFor="hybrid" style={{ fontSize: '14px' }}>
                      Hybrid
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="mode"
                      checked={formData.mode === 'physical'}
                      onChange={() => handleModeChange('physical')}
                      id="physical"
                    />
                    <label className="form-check-label text-muted" htmlFor="physical" style={{ fontSize: '14px' }}>
                      Physical
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="mode"
                      checked={formData.mode === 'virtual'}
                      onChange={() => handleModeChange('virtual')}
                      id="virtual"
                    />
                    <label className="form-check-label text-muted" htmlFor="virtual" style={{ fontSize: '14px' }}>
                      Virtual
                    </label>
                  </div>
                </div>
                {errors.mode && (
                  <div className="text-danger small mt-1">{errors.mode}</div>
                )}
              </div>
            </div>

            {/* Maximum Attendees */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Maximum Attendees
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="maxAttendees"
                  value={formData.maxAttendees}
                  onChange={handleInputChange}
                  placeholder="Enter Maximum Capacity of Attendees"
                  className={`form-control ${errors.maxAttendees ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                />
                {errors.maxAttendees && <div className="invalid-feedback">{errors.maxAttendees}</div>}
              </div>
            </div>
                                    {/* Training Date and Time */}
<div className="mb-4 row align-items-center">
  <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
    Training Date
  </label>
  <div className="col-sm-4">
    <div className="input-group">
      <DatePicker
        selected={formData.trainingDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        minDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
        customInput={
          <div className="input-group">
            <input
              type="text"
              className={`form-control ${errors.trainingDate ? 'is-invalid' : ''}`}
              value={
                formData.trainingDate
                  ? new Date(formData.trainingDate).toISOString().split('T')[0]
                  : ''
              }
              readOnly
            />
            <span className="input-group-text">
              <FaCalendarAlt className="text-muted" size={14} />
            </span>
          </div>
        }
      />
    </div>
    {errors.trainingDate && (
      <div className="invalid-feedback d-block">{errors.trainingDate}</div>
    )}
  </div>

  <label className="col-sm-2 col-form-label text-muted text-end" style={{ fontSize: '14px' }}>
    Training Time
  </label>
  <div className="col-sm-3">
    <div className="input-group">
      <input
        type="time"
        name="trainingTime"
        value={formData.trainingTime}
        onChange={handleInputChange}
        className={`form-control ${errors.trainingTime ? 'is-invalid' : ''}`}
        style={{ fontSize: '14px' }}
      />
      <span className="input-group-text">
        <FaClock className="text-muted" size={14} />
      </span>
    </div>
    {errors.trainingTime && (
      <div className="invalid-feedback">{errors.trainingTime}</div>
    )}
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
                  <div className="text-muted mb-1" style={{ fontSize: '14px' }}>Upload Posters</div>
                  <div className="text-muted small mb-3">PDF, PNG, JPG up to 10MB</div>
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

            {/* Attach Documents */}
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Attach Documents
              </label>
              <div className="col-sm-9">
                <div className="border border-2 border-dashed rounded text-center p-4" style={{ borderColor: '#dee2e6' }}>
                  <PiUploadSimpleThin className="text-muted mb-2" size={24} />
                  <div className="text-muted mb-1" style={{ fontSize: '14px' }}>Upload Pre-reading Documents (Slides,PDFs)</div>
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

            {/* Cost Per Attendee */}
            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label text-muted" style={{ fontSize: '14px' }}>
                Cost Per Attendee
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="costPerAttendee"
                  value={formData.costPerAttendee}
                  onChange={handleInputChange}
                  placeholder='Enter "free" if no cost'
                  className={`form-control ${errors.costPerAttendee ? 'is-invalid' : ''}`}
                  style={{ fontSize: '14px' }}
                />
                <div className="form-text small">Enter amount in KES or type "free" for no cost</div>
                {errors.costPerAttendee && <div className="invalid-feedback">{errors.costPerAttendee}</div>}
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
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker__input-container input {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default AddTraining;