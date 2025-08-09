import { useState } from 'react';

const Results = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for treatment history
  const treatmentHistory = [
    {
      id: 1,
      livestockId: "1. Hannah",
      diagnosis: "Mastitis",
      symptoms: "Lorem ipsum",
      medicationName: "Lorem ipsum",
      treatmentMethod: "Lorem ipsum",
      vitalStatus: "Lorem ipsum",
      medicalReport: "View Treatment Report"
    },
    {
      id: 2,
      livestockId: "2. Stella",
      diagnosis: "Tsetse flies",
      symptoms: "Lorem ipsum",
      medicationName: "Lorem ipsum",
      treatmentMethod: "Lorem ipsum",
      vitalStatus: "Lorem ipsum",
      medicalReport: "View Treatment Report"
    },
    {
      id: 3,
      livestockId: "3. Alex",
      diagnosis: "Foot & Mouth",
      symptoms: "Lorem ipsum",
      medicationName: "Lorem ipsum",
      treatmentMethod: "Lorem ipsum",
      vitalStatus: "Lorem ipsum",
      medicalReport: "View Treatment Report"
    }
  ];

  // Mock data for upcoming activities
  const upcomingActivities = [
    {
      id: 1,
      title: "Waste Disposal",
      date: "2025/12/03 8:00am",
      description: "Lorem Ipsum",
      completed: false
    },
    {
      id: 2,
      title: "Check Ventilation System",
      date: "2025/12/03 8:00am",
      description: "Lorem Ipsum",
      completed: true
    }
  ];

  // Mock data for requests
  const requests = [
    {
      id: 1,
      title: "Bio Security",
      date: "2025/03/07",
      type: "Expert Consultation",
      status: "Pending"
    },
    {
      id: 2,
      title: "Treatment for Jane",
      date: "2005/08/07",
      type: "Expert Consultation",
      status: "Scheduled"
    },
    {
      id: 3,
      title: "Treatment for Jane",
      date: "2005/08/07",
      type: "Expert Consultation",
      status: "Scheduled"
    }
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      sender: "AgriFamers",
      title: "Diagnosis and Recommendations for Hannah",
      time: "12 mins ago"
    },
    {
      id: 2,
      sender: "AgriFamers",
      title: "Diagnosis and Recommendations for Hannah",
      time: "12 mins ago"
    },
    {
      id: 3,
      sender: "AgriFamers",
      title: "Diagnosis and Recommendations for Hannah",
      time: "12 mins ago"
    }
  ];

  const filteredTreatmentHistory = treatmentHistory.filter(item =>
    item.livestockId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid p-4">
      {/* Treatment History Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Treatment History</h5>
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Livestock Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <i className="fas fa-search position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }}></i>
                </div>
                <button className="btn btn-success">
                  <i className="fas fa-plus me-2"></i>
                  Add Livestock
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Livestock Identification</th>
                      <th>Diagnosis</th>
                      <th>Symptoms</th>
                      <th>Medication Name</th>
                      <th>Treatment Method</th>
                      <th>Vital Status</th>
                      <th>Medical Report</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTreatmentHistory.map((item) => (
                      <tr key={item.id}>
                        <td>{item.livestockId}</td>
                        <td>{item.diagnosis}</td>
                        <td>{item.symptoms}</td>
                        <td>{item.medicationName}</td>
                        <td>{item.treatmentMethod}</td>
                        <td>{item.vitalStatus}</td>
                        <td>
                          <a href="#" className="text-decoration-none text-primary">
                            {item.medicalReport}
                          </a>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-success">
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Activity and Upcoming Activities Row */}
      <div className="row mb-4">
        {/* Add New Activity */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0">Add New Activity</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Activity Type</label>
                  <input type="text" className="form-control" placeholder="Lorem Ipsum" />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" defaultValue="2025-02-27" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Time</label>
                    <input type="time" className="form-control" defaultValue="10:00" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows={3} placeholder="Enter activity description"></textarea>
                </div>
                <button type="submit" className="btn btn-success">
                  Add Activity
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Upcoming Activities */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0">Upcoming Activities</h5>
            </div>
            <div className="card-body">
              {upcomingActivities.map((activity) => (
                <div key={activity.id} className="d-flex align-items-center mb-3 p-3 border rounded">
                  <input
                    type="checkbox"
                    className="form-check-input me-3"
                    checked={activity.completed}
                    readOnly
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{activity.title}</h6>
                    <small className="text-muted">{activity.date}</small>
                    <p className="mb-0 small">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Request and Notifications Row */}
      <div className="row">
        {/* Request */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0">Request</h5>
            </div>
            <div className="card-body">
              {requests.map((request) => (
                <div key={request.id} className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
                  <div>
                    <h6 className="mb-1">{request.title}</h6>
                    <small className="text-muted">{request.date}</small>
                    <p className="mb-0 small">{request.type}</p>
                  </div>
                  <span className={`badge ${request.status === 'Pending' ? 'bg-danger' : 'bg-success'}`}>
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Notifications</h5>
              <a href="#" className="text-decoration-none text-primary">View All</a>
            </div>
            <div className="card-body">
              {notifications.map((notification) => (
                <div key={notification.id} className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
                  <div>
                    <h6 className="mb-1">{notification.sender}</h6>
                    <p className="mb-1 small">{notification.title}</p>
                    <small className="text-muted">{notification.time}</small>
                  </div>
                  <button className="btn btn-sm btn-success">View More</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;


