const DonationRequests = () => {
  const requests = [
    { name: 'John Doe', email: 'johnd@example.com', gender: 'Male', date: '2023/05/29' },
    { name: 'Jane Doe', email: 'janed@example.com', gender: 'Female', date: '2023/05/29' },
    { name: 'John Doe', email: 'johnd@example.com', gender: 'Male', date: '2023/05/29' },
    { name: 'Jane Doe', email: 'janed@example.com', gender: 'Female', date: '2023/05/29' },
    { name: 'John Doe', email: 'johnd@example.com', gender: 'Male', date: '2023/05/29' },
    { name: 'Jane Doe', email: 'janed@example.com', gender: 'Female', date: '2023/05/29' },
  ];

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title fw-bold mb-0">Donation Requests</h5>
          <a href="#" className="btn btn-link text-success text-decoration-none fw-medium">View More</a>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th className="text-muted small fw-semibold">Beneficiary</th>
                <th className="text-muted small fw-semibold">Email Address <i className="bi bi-arrow-down-up small"></i></th>
                <th className="text-muted small fw-semibold">Gender <i className="bi bi-arrow-down-up small"></i></th>
                <th className="text-muted small fw-semibold">Date of Request <i className="bi bi-arrow-down-up small"></i></th>
                <th className="text-muted small fw-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => (
                <tr key={i}>
                  <td className="fw-medium">{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.gender}</td>
                  <td>{r.date}</td>
                  <td><a href="#" className="btn btn-sm btn-outline-success">View Details</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="d-flex justify-content-center flex-wrap">
          <ul className="pagination">
            <li className="page-item disabled"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item disabled"><span className="page-link">...</span></li>
            <li className="page-item"><a className="page-link" href="#">98</a></li>
            <li className="page-item"><a className="page-link" href="#">99</a></li>
            <li className="page-item"><a className="page-link" href="#">100</a></li>
            <li className="page-item"><a className="page-link bg-success text-white" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DonationRequests;
