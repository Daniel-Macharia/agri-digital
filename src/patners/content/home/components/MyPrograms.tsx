const MyPrograms = () => {
  const programs = [
    {
      title: 'Intervention Title',
      category: 'Peaches',
      status: '4 Slots Left',
      beneficiaries: 110,
      image: '/assets/images/home/d1.png',
    },
    {
      title: 'Intervention Title',
      category: 'Farm Produce',
      status: '4 Slots Left',
      beneficiaries: 5,
      image: '/assets/images/home/d2.png',
    },
    {
      title: 'Intervention Title',
      category: 'Honey',
      status: '12 Slots Left',
      beneficiaries: 28,
      image: '/assets/images/home/d3.png',
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
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-3" key={index}>
              <div className="card h-100 rounded-4 border-0 shadow-sm" style={{overflow: 'hidden'}}>
                {/* Image Section - 60% of card height */}
                <div 
                     style={{
                       height: '60%', 
                       backgroundColor: '#28a745',
                       position: 'relative',
                       overflow: 'hidden'
                     }}>
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    style={{
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover'
                    }} 
                  />
                </div>
                
                {/* Text Section - 40% of card height */}
                <div className="card-body d-flex flex-column justify-content-between" 
                     style={{height: '40%', padding: '1rem'}}>
                  <div>
                    <h6 className="fw-bold mb-1 fs-6">{program.title}</h6>
                    <p className="text-success small mb-2">{program.category}</p>
                    <span className="badge bg-warning text-dark mb-2">{program.status}</span>
                    <p className="small text-muted mb-2">
                      <i className="fas fa-wallet me-1"></i>
                      {program.beneficiaries} Beneficiaries
                    </p>
                  </div>
                  <a href="#" className="btn btn-success w-100 btn-sm">See More</a>
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
