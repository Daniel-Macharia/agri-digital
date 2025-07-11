import React from "react";
import { useNavigate } from "react-router-dom";
import "./LivestockRecord.css";
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
    path: 'typebreed',
  },
  {
    label: 'Housing',
    img: '/assets/images/livestockmenu/cow shed.svg',
    path: 'housing',
  },
  {
    label: 'Feeding',
    img: '/assets/images/livestockmenu/cow feed.svg',
    path: 'feeds',
  },  
  {
    label: 'Health Management',
    img: '/assets/images/livestockmenu/cow with black vet.svg',
    path: 'health',
  },
  {
    label: 'Breeding',
    img: '/assets/images/livestockmenu/cow breeding.svg',
    path: 'breeding',
  },
  {
    label: 'Production',
    img: '/assets/images/livestockmenu/sale.svg',
    path: 'production',

  },
  {
    label: 'Sales',
    img: '/assets/images/livestockmenu/milk from a cow.svg', 
    path: 'sales',
  },
];

const LivestockRecord: React.FC = () => {
  const navigate = useNavigate();

  // // Get the base path and construct the path to TypeBreedForm
  const basePath = location.pathname.split("/").slice(0, -1).join("/");
  const requestServicePath = basePath;

  return (
    <>

    <NavBar navItems={navItems} />
   

    <div className="livestock-table-container mb-5">
      {/* Search, count, and status filter row */}
      <div
        className="d-flex justify-content-end w-100 "
        style={{ borderRadius: "24px", padding: "16px 24px" }}
      >
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative" style={{ maxWidth: 320 }}>
            <input
              type="text"
              className="form-control border-0 bg-white ps-5"
              placeholder="Search"
              aria-label="Search"
              style={{ borderRadius: "24px" }}
            />

            <span
              className="position-absolute"
              style={{
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#bdbdbd",
                pointerEvents: "none",
              }}
            >
              <i className="fa fa-search"></i>
            </span>
          </div>
          <span className="me-3" style={{ color: "#222", fontSize: 15 }}>
            Showing 1-10 of 100 Livestock
          </span>
          <div className="dropdown">
            <button
              className="btn btn-link dropdown-toggle p-0"
              type="button"
              id="statusDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                color: "#222",
                fontWeight: 500,
                fontSize: 15,
                textDecoration: "none",
              }}
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
        <div className="livestock-header-row">
          <div>
            <h3 className="livestock-header-title">My Cows Records</h3>
          </div>
          <div>
            <button
              className="btn  justify-content-center align-items-center gap-2 px-3 py-2 rounded bg-primary"
              style={{
                whiteSpace: "nowrap", // Prevent text from wrapping
                minWidth: "fit-content", // Ensure button width adjusts to content
                overflow: "hidden", // Hide overflow content
                textOverflow: "ellipsis", // Add ellipsis for long text
              }}
              onClick={() => navigate(requestServicePath)}
            >
              <span
                className="small-medium"
                style={{
                  color: "#fff",
                }}
              >
                + Livestock
              </span>
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="livestock-table">
            <thead>
              <tr>
                <th>Livestock Identification</th>
                <th>Sex</th>
                <th>Breed</th>
                <th>Purpose</th>
                <th>Birth Weight</th>
                <th>Date of Birth</th>
                <th>Quality Score</th>
              </tr>
            </thead>
            <tbody>
              {livestockData.map((cow, index) => (
                <tr key={cow.id}>
                  <td>
                    {index + 1}. {cow.identification}
                  </td>
                  <td>{cow.sex}</td>
                  <td>{cow.breed}</td>
                  <td>{cow.purpose}</td>
                  <td>{cow.birthWeight}</td>
                  <td>{cow.dateOfBirth}</td>
                  <td>
                    <a href="#" className="view-score-link">
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