import React, { useState, useRef } from 'react';
import { FaArrowLeft, FaEdit, FaTrash, FaPlus, FaSearch, FaPencilAlt, FaUpload, FaFileAlt, FaLeaf, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';

export default function Settings() {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [notifications, setNotifications] = useState({
        task1: { inApp: true, email: false, sms: false },
        task2: { inApp: true, email: true, sms: false },
        task3: { inApp: true, email: false, sms: true },
        task4: { inApp: true, email: false, sms: false }
    });

    // File upload states
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadError, setUploadError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleNotificationChange = (task: string, type: string) => {
        setNotifications(prev => ({
            ...prev,
            [task]: {
                ...prev[task as keyof typeof prev],
                [type]: !prev[task as keyof typeof prev][type as keyof typeof prev[typeof task]]
            }
        }));
    };

    // File upload handlers
    const validateFile = (file: File): boolean => {
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!allowedTypes.includes(file.type)) {
            setUploadError('Please upload only PDF, PNG, or JPG files.');
            return false;
        }

        if (file.size > maxSize) {
            setUploadError('File size must be less than 10MB.');
            return false;
        }

        setUploadError('');
        return true;
    };

    const handleFileUpload = (files: FileList | null) => {
        if (!files) return;

        const newFiles = Array.from(files).filter(validateFile);
        if (newFiles.length > 0) {
            setUploadedFiles(prev => [...prev, ...newFiles]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFileUpload(e.dataTransfer.files);
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const render = () => {
        return (
            <div className="container-fluid bg-light min-vh-100 py-4">
                <div className="row">
                    <div className="col-12 mb-3">
                        <button className="btn btn-link text-dark p-0">
                            <FaArrowLeft className="me-2" />
                            Back
                        </button>
                    </div>
                </div>

                <div className="row">
                    {/* Left Column */}
                    <div className="col-lg-6">
                        {/* Personal Information */}
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold">Personal Information</h5>
                                <button className="btn btn-success btn-sm">
                                    <FaEdit className="me-1" />
                                    Edit
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-md-4 col-12">
                                        <small className="text-muted">Profile Picture</small>
                                    </div>
                                    <div className="col-md-8 col-12 d-flex align-items-center">
                                        <img 
                                            src="https://via.placeholder.com/60x60/6c757d/ffffff?text=JD" 
                                            alt="Profile" 
                                            className="rounded-circle me-3"
                                            style={{width: '60px', height: '60px'}}
                                        />
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-success btn-sm">
                                                Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row mb-2">
                                    <div className="col-md-4 col-12">
                                        <small className="text-muted">Name</small>
                                    </div>
                                    <div className="col-md-8 col-12 text-md-end text-start">
                                        <span>John Doe</span>
                                    </div>
                                </div>
                                
                                <div className="row mb-2">
                                    <div className="col-md-4 col-12">
                                        <small className="text-muted">Gender</small>
                                    </div>
                                    <div className="col-md-8 col-12 text-md-end text-start">
                                        <span>Female</span>
                                    </div>
                                </div>
                                
                                <div className="row mb-2">
                                    <div className="col-md-4 col-12">
                                        <small className="text-muted">Email Address</small>
                                    </div>
                                    <div className="col-md-8 col-12 text-md-end text-start">
                                        <span>example@gmail.com</span>
                                    </div>
                                </div>
                                
                                <div className="row mb-2">
                                    <div className="col-md-4 col-12">
                                        <small className="text-muted">ID photo</small>
                                    </div>
                                    <div className="col-md-8 col-12 text-md-end text-start">
                                        <span>ID.jpg</span>
                                    </div>
                                </div>
                                
                                <div className="row mb-2">
                                    <div className="col-md-4 col-12">
                                        <small className="text-muted">Phone Number</small>
                                    </div>
                                    <div className="col-md-8 col-12 text-md-end text-start">
                                        <span>+254 712345678</span>
                                    </div>
                                </div>
                                
                                <div className="row mb-2">
                                    <div className="col-md-4 col-12">
                                        <small className="text-muted">Address</small>
                                    </div>
                                    <div className="col-md-8 col-12 text-md-end text-start">
                                        <span>Kiambu</span>
                                    </div>
                                </div>
                            </div>
                        </div>





                        {/* Credit Cards */}
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold">Credit Cards</h5>
                                <button className="btn btn-success btn-sm">
                                    <FaPlus className="me-1" />
                                    Add a New Card
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="border rounded p-3 mb-3" style={{borderColor: '#28a745 !important'}}>
                                    <div className="row mb-2">
                                        <div className="col-md-4 col-12">
                                            <small className="text-muted">Name On Card</small>
                                        </div>
                                        <div className="col-md-8 col-12 text-md-end text-start">
                                            <span className="fw-bold">John Doe</span>
                                        </div>
                                    </div>
                                    
                                    <div className="row mb-2">
                                        <div className="col-md-4 col-12">
                                            <small className="text-muted">Card Number</small>
                                        </div>
                                        <div className="col-md-8 col-12 text-md-end text-start">
                                            <span className="fw-bold">**** **** **** 2345</span>
                                        </div>
                                    </div>
                                    
                                    <div className="row mb-2">
                                        <div className="col-md-4 col-12">
                                            <small className="text-muted">Expiry Date</small>
                                        </div>
                                        <div className="col-md-8 col-12 text-md-end text-start">
                                            <span className="fw-bold">04/26</span>
                                        </div>
                                    </div>
                                    
                                    <div className="row mb-2">
                                        <div className="col-md-4 col-12">
                                            <small className="text-muted">CVV</small>
                                        </div>
                                        <div className="col-md-8 col-12 text-md-end text-start">
                                            <span className="fw-bold">123</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="d-flex gap-2">
                                    <button className="btn btn-success btn-sm">
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Next of Kin */}
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header bg-white border-0">
                                <h5 className="mb-0 fw-bold">Next of Kin</h5>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="input-group" style={{maxWidth: '300px'}}>
                                        <span className="input-group-text bg-white border-end-0">
                                            <FaSearch />
                                        </span>
                                        <input type="text" className="form-control border-start-0" placeholder="Search" />
                                    </div>
                                    <button className="btn btn-success btn-sm">
                                        <FaPlus className="me-1" />
                                        Add Next of Kin
                                    </button>
                                </div>
                                
                                <div className="card mb-3 shadow-sm">
                                    <div className="card-body d-flex align-items-center">
                                        <img 
                                            src="https://via.placeholder.com/50x50/FFD700/ffffff?text=JD" 
                                            alt="Next of Kin" 
                                            className="rounded-circle me-3"
                                            style={{width: '50px', height: '50px'}}
                                        />
                                        <div className="flex-grow-1">
                                            <p className="mb-0 fw-bold">Jane Doe</p>
                                            <small className="text-muted">Daughter</small>
                                        </div>
                                        <button className="btn btn-success btn-sm">
                                            <FaPencilAlt />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="card shadow-sm">
                                    <div className="card-body d-flex align-items-center">
                                        <img 
                                            src="https://via.placeholder.com/50x50/FFB6C1/ffffff?text=JD" 
                                            alt="Next of Kin" 
                                            className="rounded-circle me-3"
                                            style={{width: '50px', height: '50px'}}
                                        />
                                        <div className="flex-grow-1">
                                            <p className="mb-0 fw-bold">Jane Doe</p>
                                            <small className="text-muted">Wife</small>
                                        </div>
                                        <button className="btn btn-success btn-sm">
                                            <FaPencilAlt />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Delete Account */}
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header bg-white border-0">
                                <h5 className="mb-0 fw-bold">Delete Account</h5>
                            </div>
                            <div className="card-body">
                                <p className="text-muted mb-3">Once you delete your account there is no going back. Please be certain.</p>
                                <div className="text-end">
                                    <button className="btn btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-6">
                        {/* Certifications & Experience */}
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold">Certifications & Experience</h5>
                                <button className="btn btn-success btn-sm">
                                    <FaEdit className="me-1" />
                                    Edit
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col-md-4 col-12">
                                        <small className="text-muted">Years of Experience</small>
                                    </div>
                                    <div className="col-md-8 col-12 text-md-end text-start">
                                        <span className="fw-bold">2 years</span>
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-md-4 col-12">
                                        <small className="text-muted">Type of Farming</small>
                                    </div>
                                    <div className="col-md-8 col-12 text-md-end text-start">
                                        <span className="fw-bold">Crop</span>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <small className="text-muted d-block mb-2">Supporting Documents</small>
                                    <div 
                                        className={`border-2 border-dashed rounded p-4 text-center position-relative ${
                                            isDragOver ? 'border-success bg-light' : 'border-secondary'
                                        }`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            accept=".pdf,.png,.jpg,.jpeg"
                                            onChange={(e) => handleFileUpload(e.target.files)}
                                            style={{ display: 'none' }}
                                        />
                                        <FaUpload className={`fs-1 mb-2 ${isDragOver ? 'text-success' : 'text-muted'}`} />
                                        <p className="text-muted mb-0">
                                            {isDragOver ? 'Drop files here' : 'Upload Certificates'}
                                        </p>
                                        <p className="text-muted small mb-0">PDF, PNG, JPG up to 10MB</p>
                                        
                                        {uploadError && (
                                            <div className="alert alert-danger mt-2 py-1">
                                                <small>{uploadError}</small>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {uploadedFiles.length > 0 && (
                                        <div className="mt-3">
                                            <h6 className="mb-2">Uploaded Files:</h6>
                                            {uploadedFiles.map((file, index) => (
                                                <div key={index} className="d-flex align-items-center justify-content-between p-2 border rounded mb-2">
                                                    <div className="d-flex align-items-center">
                                                        <FaFileAlt className="text-success me-2" />
                                                        <div>
                                                            <small className="fw-bold">{file.name}</small>
                                                            <br />
                                                            <small className="text-muted">{formatFileSize(file.size)}</small>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => removeFile(index)}
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Password Change */}
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header bg-white border-0">
                                <h5 className="mb-0 fw-bold">Password Change</h5>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Old Password</label>
                                    <div className="input-group">
                                        <input 
                                            type={showOldPassword ? "text" : "password"} 
                                            className="form-control" 
                                            placeholder="********"
                                        />
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button"
                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                        >
                                            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <div className="input-group">
                                        <input 
                                            type={showNewPassword ? "text" : "password"} 
                                            className="form-control" 
                                            placeholder="********"
                                        />
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <div className="input-group">
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            className="form-control" 
                                            placeholder="********"
                                        />
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="text-end">
                                    <button className="btn btn-success">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header bg-white border-0">
                                <h5 className="mb-0 fw-bold">Notifications</h5>
                            </div>
                            <div className="card-body">
                                {Object.entries(notifications).map(([task, settings], index) => (
                                    <div key={task} className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="fw-bold">Task Reminders</span>
                                        </div>
                                        <div className="row g-2">
                                            <div className="col-md-4 col-6">
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2 small">In-App</span>
                                                    <div className="form-check form-switch">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            checked={settings.inApp}
                                                            onChange={() => handleNotificationChange(task, 'inApp')}
                                                            style={{backgroundColor: settings.inApp ? '#28a745' : '#6c757d'}}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-6">
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2 small">E-Mail</span>
                                                    <div className="form-check form-switch">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            checked={settings.email}
                                                            onChange={() => handleNotificationChange(task, 'email')}
                                                            style={{backgroundColor: settings.email ? '#28a745' : '#6c757d'}}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2 small">SMS</span>
                                                    <div className="form-check form-switch">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            checked={settings.sms}
                                                            onChange={() => handleNotificationChange(task, 'sms')}
                                                            style={{backgroundColor: settings.sms ? '#28a745' : '#6c757d'}}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="text-end">
                                    <button className="btn btn-success">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return render();
}