import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Shared/NavBar";

type Livestock = {
  id: number;
  identification: string;
  sex: string;
  breed: string;
  purpose: string;
  birthWeight: string;
  dateOfBirth: string;
};

const livestockData: Livestock[] = [
  {
    id: 1,
    identification: "Hannah",
    sex: "Female",
    breed: "Friesian",
    purpose: "Milk",
    birthWeight: "30kg",
    dateOfBirth: "2024-02-10",
  },
  {
    id: 2,
    identification: "Bella",
    sex: "Female",
    breed: "Jersey",
    purpose: "Milk",
    birthWeight: "28kg",
    dateOfBirth: "2024-01-15",
  },
  {
    id: 3,
    identification: "Daisy",
    sex: "Female",
    breed: "Holstein",
    purpose: "Milk",
    birthWeight: "32kg",
    dateOfBirth: "2024-02-01",
  },
  {
    id: 4,
    identification: "Molly",
    sex: "Female",
    breed: "Friesian",
    purpose: "Milk",
    birthWeight: "29kg",
    dateOfBirth: "2024-01-20",
  },
  {
    id: 5,
    identification: "Luna",
    sex: "Female",
    breed: "Jersey",
    purpose: "Milk",
    birthWeight: "27kg",
    dateOfBirth: "2024-02-05",
  },
  {
    id: 6,
    identification: "Ruby",
    sex: "Female",
    breed: "Holstein",
    purpose: "Milk",
    birthWeight: "31kg",
    dateOfBirth: "2024-01-25",
  },
  {
    id: 7,
    identification: "Willow",
    sex: "Female",
    breed: "Friesian",
    purpose: "Milk",
    birthWeight: "30kg",
    dateOfBirth: "2024-02-15",
  },
  {
    id: 8,
    identification: "Stella",
    sex: "Female",
    breed: "Jersey",
    purpose: "Milk",
    birthWeight: "28kg",
    dateOfBirth: "2024-01-30",
  },
  {
    id: 9,
    identification: "Nova",
    sex: "Female",
    breed: "Holstein",
    purpose: "Milk",
    birthWeight: "33kg",
    dateOfBirth: "2024-02-20",
  },
  {
    id: 10,
    identification: "Aurora",
    sex: "Female",
    breed: "Friesian",
    purpose: "Milk",
    birthWeight: "29kg",
    dateOfBirth: "2024-02-25",
  },
];

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


const LivestockRecord: React.FC = () => {
  const navigate = useNavigate();

  // Get the base path and construct the path to TypeBreedForm
  const basePath = location.pathname.split("/").slice(0, -1).join("/");
  const requestServicePath = basePath;

  return (
    <>
      <NavBar navItems={navItems} />
      
      <div className="bg-white rounded-3 shadow-sm p-4 mt-4 mb-5">
        {/* Search, count, and status filter row */}
        <div className="d-flex justify-content-end w-100 rounded-4 p-3 mb-3">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="position-relative" style={{ maxWidth: 320 }}>
              <input
                type="text"
                className="form-control border-0 bg-white ps-5 rounded-pill"
                placeholder="Search"
                aria-label="Search"
              />
              <span
                className="position-absolute text-muted"
                style={{
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <i className="fa fa-search"></i>
              </span>
            </div>
            <span className="me-3 text-dark small">
              Showing 1-10 of 100 Livestock
            </span>
            <div className="dropdown">
              <button
                className="btn btn-link dropdown-toggle p-0 text-dark fw-medium text-decoration-none small"
                type="button"
                id="statusDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Status
              </button>
              <ul className="dropdown-menu" aria-labelledby="statusDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    All
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Active
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Inactive
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* End search, count, and status filter row */}

        <div className="w-100">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h3 className="h5 fw-bold text-dark mb-0">My Cows Records</h3>
            </div>
            <div>
              <button
                className="btn btn-primary d-flex justify-content-center align-items-center gap-2 px-3 py-2 rounded"
                style={{
                  whiteSpace: "nowrap",
                  minWidth: "fit-content",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                onClick={() => navigate(requestServicePath)}
              >
                <span className="small fw-medium text-white">
                  + Livestock
                </span>
              </button>
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover mb-0 rounded-3 overflow-hidden">
              <thead className="table-light">
                <tr>
                  <th className="fw-bold text-dark p-3 border-bottom border-2">
                    Livestock Identification
                  </th>
                  <th className="fw-bold text-dark p-3 border-bottom border-2">
                    Sex
                  </th>
                  <th className="fw-bold text-dark p-3 border-bottom border-2">
                    Breed
                  </th>
                  <th className="fw-bold text-dark p-3 border-bottom border-2">
                    Purpose
                  </th>
                  <th className="fw-bold text-dark p-3 border-bottom border-2">
                    Birth Weight
                  </th>
                  <th className="fw-bold text-dark p-3 border-bottom border-2">
                    Date of Birth
                  </th>
                  <th className="fw-bold text-dark p-3 border-bottom border-2">
                    Quality Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {livestockData.map((cow, index) => (
                  <tr key={cow.id} className={index % 2 === 1 ? "bg-light" : "bg-white"}>
                    <td className="p-3 text-dark">
                      {index + 1}. {cow.identification}
                    </td>
                    <td className="p-3 text-dark">{cow.sex}</td>
                    <td className="p-3 text-dark">{cow.breed}</td>
                    <td className="p-3 text-dark">{cow.purpose}</td>
                    <td className="p-3 text-dark">{cow.birthWeight}</td>
                    <td className="p-3 text-dark">{cow.dateOfBirth}</td>
                    <td className="p-3">
                      <a href="#" className="text-success fw-semibold text-decoration-none">
                        View Quality Score
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LivestockRecord;