import { FaPen } from "react-icons/fa";
import NavBar from "../../Shared/NavBar";

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
  return (
    <>
      <NavBar navItems={navItems} />

      <div className="container-fluid py-4 px-0">
        {/* Top Row: Cards */}
        <div className="row w-100 g-4 mb-3">
          {/* Ventilation Card */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="d-flex flex-column align-items-start gap-3 p-4 rounded-4 bg-white h-100 shadow-sm">
              <div className="d-flex align-items-center justify-content-between w-100">
                <span className="fw-bold">Ventilation</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge px-3 py-2" style={{ backgroundColor: "#457900", color: "white" }}>Excellent</span>
                  <FaPen style={{ color: "#457900", cursor: "pointer" }} />
                </div>
              </div>
              <div className="w-100">
                <div className="mb-2">
                  <span className="text-secondary">Type</span>{" "}
                  <span className="fw-bold float-end">Mechanical</span>
                </div>
                <div>
                  <span className="text-secondary">Notes</span>{" "}
                  <span className="float-end">--</span>
                </div>
              </div>
            </div>
          </div>
          {/* Space Card */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="d-flex flex-column align-items-start gap-3 p-4 rounded-4 bg-white h-100 shadow-sm">
              <div className="d-flex align-items-center justify-content-between w-100">
                <span className="fw-bold">Space</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge px-3 py-2" style={{ backgroundColor: "#457900", color: "white" }}>Excellent</span>
                  <FaPen style={{ color: "#457900", cursor: "pointer" }} />
                </div>
              </div>
              <div className="w-100">
                <div className="mb-2">
                  <span className="text-secondary">Total area in (m²)</span>{" "}
                  <span className="fw-bold float-end">15,000m²</span>
                </div>
                <div className="mb-2">
                  <span className="text-secondary">Animal Capacity</span>{" "}
                  <span className="fw-bold float-end">15 Cows</span>
                </div>
                <div className="mb-2">
                  <span className="text-secondary">Density</span>{" "}
                  <span className="fw-bold float-end">1 cow per 1000m²</span>
                </div>
                <div>
                  <span className="text-secondary">Notes</span>{" "}
                  <span className="float-end">--</span>
                </div>
              </div>
            </div>
          </div>
          {/* Waste Management Card */}
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column align-items-start gap-3 p-4 rounded-4 bg-white h-100 shadow-sm">
              <div className="d-flex align-items-center justify-content-between w-100">
                <span className="fw-bold">Waste Management</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge px-3 py-2" style={{ backgroundColor: "#457900", color: "white" }}>Excellent</span>
                  <FaPen style={{ color: "#457900", cursor: "pointer" }} />
                </div>
              </div>
              <div className="w-100">
                <div className="mb-2">
                  <span className="text-secondary">Disposal Method</span>{" "}
                  <span className="fw-bold float-end">Biogas Production</span>
                </div>
                <div className="mb-2">
                  <span className="text-secondary">Frequency</span>{" "}
                  <span className="fw-bold float-end">Daily</span>
                </div>
                <div className="mb-2">
                  <span className="text-secondary">Volume</span>{" "}
                  <span className="fw-bold float-end">12,000kg</span>
                </div>
                <div>
                  <span className="text-secondary">Notes</span>{" "}
                  <span className="float-end">--</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: Add Activity & Upcoming Activities */}
        <div className="row w-100 g-4 mb-3">
          {/* Add New Activity Form */}
          <div className="col-12 col-md-6">
            <div className="bg-white rounded-4 p-4 h-100 shadow-sm">
              <h6 className="fw-bold mb-3">Add New Activity</h6>
              <form>
                <div className="mb-3">
                  <label className="form-label">Activity Type</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lorem Ipsum"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="YYYY/MM/DD"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    placeholder="10:00 AM"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                <button type="submit" className="btn px-4" style={{ backgroundColor: "#457900", borderColor: "#457900", color: "white" }}>
                  Add Activity
                </button>
              </form>
            </div>
          </div>
          {/* Upcoming Activities */}
          <div className="col-12 col-md-6">
            <div className="bg-white rounded-4 p-4 h-100 shadow-sm">
              <h6 className="fw-bold mb-3">Upcoming Activities</h6>
              <div className="mb-3 p-3 rounded-3 border d-flex align-items-start gap-3">
                <input type="checkbox" style={{ width: 20, height: 20, marginTop: 2 }} />
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="fw-bold">Waste Disposal</span>
                    <span className="text-primary" style={{ fontSize: "0.95em" }}>
                      2025/12/03 <span className="text-decoration-underline">8:00am</span>
                    </span>
                  </div>
                  <div className="text-secondary" style={{ fontSize: "0.95em" }}>
                    Lorem Ipsum
                  </div>
                </div>
              </div>
              <div className="mb-3 p-3 rounded-3 border d-flex align-items-start gap-3">
                <span style={{ color: '#457900', fontSize: 20, marginTop: 2 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="20" rx="4" fill="#457900"/>
                    <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="fw-bold">Check Ventilation System</span>
                    <span style={{ color: "#457900", fontSize: "0.95em" }}>
                      <span className="fw-bold">Done</span>
                    </span>
                  </div>
                  <div className="text-secondary" style={{ fontSize: "0.95em" }}>
                    Lorem Ipsum
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Requests */}
        <div className="row w-100 g-4">
          <div className="col-12">
            <div className="bg-white rounded-4 p-4 shadow-sm">
              <h6 className="fw-bold mb-3">Requests</h6>
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between p-3 rounded-3 border mb-2">
                <div>
                  <div className="fw-bold">
                    Livestock Protection Service Request
                  </div>
                  <div
                    className="text-secondary"
                    style={{ fontSize: "0.95em" }}
                  >
                    2025/03/07
                  </div>
                  <div
                    className="text-secondary"
                    style={{ fontSize: "0.95em" }}
                  >
                    AgriFarm
                  </div>
                </div>
                <button className="btn px-4 mt-3 mt-md-0" style={{ backgroundColor: "#457900", borderColor: "#457900", color: "white" }}>
                  View Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
