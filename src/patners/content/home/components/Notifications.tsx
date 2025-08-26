const Notifications = () => {
  const notifications = [
    {
      source: 'AgriFarmers',
      message: 'Viamly to buy 500 kg of Tomatoes at KES 150/kg',
      time: '17 mins ago',
    },
    {
      source: 'AgriBank',
      message: 'Offering loan of KES 25,000 at 4.5% for 36 months',
      time: '1 hour ago',
    },
    {
      source: 'AgriFarmers',
      message: 'Viamly to buy 500 kg of Tomatoes at KES 150/kg',
      time: 'Yesterday',
    },
  ];

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title fw-bold mb-0">Notifications</h5>
          <a href="#" className="btn btn-link text-success text-decoration-none fw-medium">View More</a>
        </div>
        {notifications.map((notification, index) => (
          <div className="d-flex align-items-start mb-3" key={index}>
            <div className="bg-light p-2 rounded-3 me-3">
              <i className="bi bi-bell fs-4 text-success"></i>
            </div>
            <div className="w-100">
              <p className="fw-semibold small mb-1">{notification.source}</p>
              <div className="d-flex justify-content-between">
                <p className="small text-muted mb-0">{notification.message}</p>
                <a href="#" className="btn btn-sm btn-outline-success">View Details</a>
              </div>
              <p className="small text-muted mt-1"><i className="bi bi-clock"></i> {notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
