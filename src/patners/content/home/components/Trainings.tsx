const Trainings = () => {
  const trainings = [
    {
      date: 'September 1, 2023 | 9:00am',
      title: 'Lorem ipsum dolor sit amet, consectetur.',
    },
    {
      date: 'September 1, 2023 | 9:00am',
      title: 'Lorem ipsum dolor sit amet, consectetur.',
    },
  ];

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title fw-bold mb-0">Trainings</h5>
          <a href="#" className="btn btn-link text-success text-decoration-none fw-medium">View More</a>
        </div>
        {trainings.map((training, index) => (
          <div className="d-flex align-items-start mb-3" key={index}>
            <div className="bg-light p-2 rounded-3 me-3">
              <i className="bi bi-calendar-event fs-4 text-success"></i>
            </div>
            <div>
              <p className="small text-muted mb-1">{training.date}</p>
              <h6 className="fw-semibold small mb-0">{training.title}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainings;
