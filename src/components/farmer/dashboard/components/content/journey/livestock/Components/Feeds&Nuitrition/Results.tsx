
import NavBar from '../../Shared/NavBar';


const navItems = [
  {
    label: 'Type & Breed',
    img: '/assets/images/livestockmenu/One Cow.svg',   
    path: '/farmer/projects/livestock/typebreed',
  },
  {
    label: 'Housing',
    img: '/assets/images/livestockmenu/cow shed.svg',
    path: '/farmer/projects/livestock/housing',
  },
  {
    label: 'Feeding',
    img: '/assets/images/livestockmenu/cow feed.svg',
    path: '/farmer/projects/livestock/feeds',
  },  
  {
    label: 'Health Management',
    img: '/assets/images/livestockmenu/cow with black vet.svg',
    path: '/farmer/projects/livestock/health',
  },
  {
    label: 'Breeding',
    img: '/assets/images/livestockmenu/cow breeding.svg',
    path: '/farmer/projects/livestock/breeding',
  },
  {
    label: 'Production',
    img: '/assets/images/livestockmenu/sale.svg',
    path: '/farmer/projects/livestock/production',

  },
  {
    label: 'Sales',
    img: '/assets/images/livestockmenu/milk from a cow.svg', 
    path: '/farmer/projects/livestock/sales',
  },
];


const Results = () => {
  // Placeholder data for tables
  const feedStockData = Array(8).fill({
    feedName: 'Lorem Ipsum',
    feedType: 'Lorem Ipsum',
    feedVariety: 'Lorem Ipsum',
    feedWeight: 'Lorem Ipsum',
    quantity: 'Lorem Ipsum',
    date: 'Lorem Ipsum',
    status: 'Lorem Ipsum',
  });
  const livestockData = [
    { id: 1, name: 'J. Smith' },
    { id: 2, name: 'J. Alex' },
    { id: 3, name: 'J. Alex' },
    { id: 4, name: 'J. Alex' },
    { id: 5, name: 'J. Alex' },
    { id: 6, name: 'J. Alex' },
    { id: 7, name: 'J. Alex' },
    { id: 8, name: 'J. Alex' },
  ];

  return (

    <>

    <NavBar navItems={navItems}/>


     <div className="container-fluid py-4 px-0">
      {/* Feed Stock Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-bold mb-0">Feed Stock</h5>
          <div className="d-flex align-items-center gap-2">
            <input type="text" className="form-control form-control-sm" placeholder="Search by name, type or variety" style={{ maxWidth: 250 }} />
            <button className="btn btn-success btn-sm px-3">+ Add Feed</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Feed Name</th>
                <th>Feed Type</th>
                <th>Feed Variety</th>
                <th>Quantity of Feed</th>
                <th>Date of Purchase</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {feedStockData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.feedName}</td>
                  <td>{row.feedType}</td>
                  <td>{row.feedVariety}</td>
                  <td>{row.feedWeight}</td>
                  <td>{row.date}</td>
                  <td>{row.status}</td>
                  <td>
                    <button className="btn btn-outline-success btn-sm">
                      <i className="fa fa-pen" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weight & Feeding Schedule Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-bold mb-0">Weight & Feeding Schedule</h5>
          <div className="d-flex align-items-center gap-2">
            <input type="text" className="form-control form-control-sm" placeholder="Search by Livestock Name" style={{ maxWidth: 250 }} />
            <button className="btn btn-success btn-sm px-3">+ Add Livestock</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Livestock Identification</th>
                <th>Type of Feed</th>
                <th>Quantity of Feed</th>
                <th>Feeding Time</th>
                <th>Previous Weight</th>
                <th>Current Weight</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {livestockData.map((row, idx) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>Lorem Ipsum</td>
                  <td>Lorem Ipsum</td>
                  <td>Lorem Ipsum</td>
                  <td>Lorem Ipsum</td>
                  <td>Lorem Ipsum</td>
                  <td>Lorem Ipsum</td>
                  <td>
                    <button className="btn btn-outline-success btn-sm">
                      <i className="fa fa-pen" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section: Add New Activity & Upcoming Activities */}
      <div className="row mt-4">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card p-4 h-100">
            <h6 className="fw-bold mb-3">Add New Activity</h6>
            <form>
              <div className="mb-3">
                <label className="form-label">Activity Type</label>
                <input type="text" className="form-control" placeholder="Lorem Ipsum" />
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" defaultValue="2025-02-27" />
              </div>
              <div className="mb-3">
                <label className="form-label">Time</label>
                <input type="time" className="form-control" defaultValue="10:00" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input type="text" className="form-control" placeholder="" />
              </div>
              <button type="submit" className="btn btn-success px-4">Add Activity</button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-4 h-100">
            <h6 className="fw-bold mb-3">Upcoming Activities</h6>
            <div className="mb-3 p-3 rounded-3 border">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="fw-bold">Waste Disposal</span>
                <span className="text-primary" style={{ fontSize: '0.95em' }}>2025/12/03 <span className="text-decoration-underline">8:00am</span></span>
              </div>
              <div className="text-secondary" style={{ fontSize: '0.95em' }}>Lorem Ipsum</div>
            </div>
            <div className="mb-3 p-3 rounded-3 border">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="fw-bold">Check Ventilation System</span>
                <span className="text-success" style={{ fontSize: '0.95em' }}><span className="fw-bold">Done</span></span>
              </div>
              <div className="text-secondary" style={{ fontSize: '0.95em' }}>Lorem Ipsum</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default Results;