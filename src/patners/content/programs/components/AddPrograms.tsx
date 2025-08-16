import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProgramForm {
  programTitle: string;
  programObjectives: string;
  typeOfFarming: string;
  targetGroup: string;
  location: string;
  totalAmount: string;
  numberOfBeneficiaries: string;
  startDate: string;
  endDate: string;
  comments: string;
}

const AddPrograms: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProgramForm>({
    programTitle: 'Donation for Women',
    programObjectives: 'Lorem Ipsum',
    typeOfFarming: '',
    targetGroup: '',
    location: 'Kiambu',
    totalAmount: 'KES 5,000,000',
    numberOfBeneficiaries: '10',
    startDate: '',
    endDate: '',
    comments: 'Lorem Ipsum'
  });

  const handleInputChange = (field: keyof ProgramForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving program:', formData);
    // Add save logic here
  };

  const handleSendInvitation = () => {
    console.log('Sending invitation:', formData);
    // Add send invitation logic here
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="card shadow-sm border-0" style={{ borderRadius: '12px', position: 'relative' }}>
        <div className="card-body p-4">
          {/* Header */}
          <div className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <button 
                className="btn btn-link p-0 me-3"
                onClick={() => navigate('/patners/programs')}
              >
                <i className="fas fa-arrow-left fs-4 text-muted"></i>
              </button>
            </div>
            <h2 className="fw-bold text-dark mb-0">Add a Program</h2>
          </div>

          {/* Floating Icons */}
          <div className="position-absolute" style={{ top: '100px', right: '30px', zIndex: 10 }}>
            <div className="d-flex flex-column gap-3">
              <button className="btn btn-success rounded-circle p-3" style={{ width: '50px', height: '50px' }}>
                <i className="fas fa-dollar-sign text-white fs-5"></i>
              </button>
              <button className="btn btn-outline-success rounded-circle p-3" style={{ width: '50px', height: '50px' }}>
                <i className="fas fa-seedling text-success fs-5"></i>
              </button>
            </div>
          </div>

          {/* Form */}
          <form>
            <div className="row g-4">
              {/* Program Title */}
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                    Program Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.programTitle}
                    onChange={(e) => handleInputChange('programTitle', e.target.value)}
                    style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                  />
                </div>
              </div>

              {/* Program Objectives */}
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                    Program Objectives
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.programObjectives}
                    onChange={(e) => handleInputChange('programObjectives', e.target.value)}
                    style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                  />
                </div>
              </div>

              {/* Type of Farming */}
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                    Type of Farming
                  </label>
                  <select
                    className="form-select"
                    value={formData.typeOfFarming}
                    onChange={(e) => handleInputChange('typeOfFarming', e.target.value)}
                    style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                  >
                    <option value="">Select Type</option>
                    <option value="crop">Crop Farming</option>
                    <option value="livestock">Livestock Farming</option>
                    <option value="mixed">Mixed Farming</option>
                  </select>
                </div>
              </div>

              {/* Target Group */}
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                    Target Group
                  </label>
                  <select
                    className="form-select"
                    value={formData.targetGroup}
                    onChange={(e) => handleInputChange('targetGroup', e.target.value)}
                    style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                  >
                    <option value="">Select Group</option>
                    <option value="women">Women</option>
                    <option value="youth">Youth</option>
                    <option value="smallholders">Smallholder Farmers</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                  />
                </div>
              </div>

              {/* Total Amount */}
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                    Total Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.totalAmount}
                    onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                    style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                  />
                </div>
              </div>

              {/* Number of Beneficiaries */}
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                    No. of Beneficiaries
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.numberOfBeneficiaries}
                    onChange={(e) => handleInputChange('numberOfBeneficiaries', e.target.value)}
                    style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                  />
                </div>
              </div>

              {/* Start Date & End Date */}
              <div className="col-12">
                <div className="d-flex align-items-center gap-4">
                  <div className="d-flex align-items-center">
                    <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                      Start Date
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control pe-5"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        placeholder="Select date"
                        style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                      />
                      <i className="fas fa-calendar position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '100px' }}>
                      End Date
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control pe-5"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        placeholder="Select date"
                        style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                      />
                      <i className="fas fa-calendar position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <label className="form-label fw-semibold text-dark me-3" style={{ minWidth: '150px' }}>
                    Comments
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
                    style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-between mt-5">
              <button
                type="button"
                className="btn btn-outline-warning px-4 py-2"
                onClick={handleSave}
                style={{ borderRadius: '8px', borderColor: '#ffc107', color: '#ffc107' }}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-success px-4 py-2"
                onClick={handleSendInvitation}
                style={{ borderRadius: '8px' }}
              >
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPrograms;
