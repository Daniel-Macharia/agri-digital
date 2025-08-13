const MyPrograms = () => {
  const programs = [
    {
      title: 'Intervention Title',
      category: 'Peaches',
      status: '4 Slots Left',
      beneficiaries: 110,
      image: '/assets/images/home/program1.png',
    },
    {
      title: 'Intervention Title',
      category: 'Farm Produce',
      status: '4 Slots Left',
      beneficiaries: 5,
      image: '/assets/images/home/program2.png',
    },
    {
      title: 'Intervention Title',
      category: 'Honey',
      status: '12 Slots Left',
      beneficiaries: 28,
      image: '/assets/images/home/program3.png',
    },
  ];

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title fw-bold mb-0">My Programs</h5>
          <a href="#" className="btn btn-link text-success text-decoration-none fw-medium">View More</a>
        </div>
        <div className="row g-3">
          {programs.map((program, index) => (
            <div className="col-lg-4 col-md-6 mb-3" key={index}>
              <div className="card h-100 rounded-4" style={{backgroundColor: '#F4FAF7'}}>
                <div className="card-body text-center">
                  <img src={program.image} alt={program.title} className="rounded-circle mb-3" style={{width: '80px', height: '80px', objectFit: 'cover'}} />
                  <h6 className="fw-bold">{program.title}</h6>
                  <p className="text-muted small">{program.category}</p>
                  <span className="badge bg-warning text-dark mb-2">{program.status}</span>
                  <p className="small text-muted">{program.beneficiaries} Beneficiaries</p>
                  <a href="#" className="btn btn-success w-100">See More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPrograms;
