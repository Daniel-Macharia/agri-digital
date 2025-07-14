import { useState } from "react";
import { FaSearch, FaPen } from "react-icons/fa";

const mockData = [
  { id: 1, name: "Hannah" },
  { id: 2, name: "Stella" },
  { id: 3, name: "Alex" },
  { id: 4, name: "Alex" },
  { id: 5, name: "Alex" },
  { id: 6, name: "Alex" },
  { id: 7, name: "Alex" },
  { id: 8, name: "Alex" },
];

const WeightandFeedingSchedule = () => {
  const [search, setSearch] = useState("");
  
  const filteredData = mockData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid px-2 px-md-3 mb-4">
      <div className="row">
        <div className="col-12">
          <div className="bg-white rounded-4 p-3 p-md-4" style={{ minHeight: "490px" }}>
            {/* Header Section */}
            <div className="row align-items-center mb-3 mb-md-4">
              <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                <h5 className="mb-0 fs-5 fs-md-4">Weight & Feeding Schedule</h5>
              </div>
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2">
                  {/* Search Input */}
                  <div className="input-group flex-grow-1">
                    <span className="input-group-text bg-light border-0">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 bg-light"
                      placeholder="Search by Livestock Name"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  {/* Add Button */}
                  <button className="btn btn-success px-3 px-md-4 rounded-3 fw-semibold text-nowrap">
                    <span className="d-none d-sm-inline">+ Add Livestock</span>
                    <span className="d-sm-none">+ Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="text-nowrap">Livestock ID</th>
                    <th className="text-nowrap d-none d-md-table-cell">Type of Feed</th>
                    <th className="text-nowrap d-none d-lg-table-cell">Quantity of Feed</th>
                    <th className="text-nowrap d-none d-xl-table-cell">Feeding Time</th>
                    <th className="text-nowrap d-none d-lg-table-cell">Previous Weight</th>
                    <th className="text-nowrap d-none d-md-table-cell">Current Weight</th>
                    <th className="text-nowrap d-none d-sm-table-cell">Status</th>
                    <th className="text-nowrap">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="text-nowrap">{`${row.id}. ${row.name}`}</td>
                      <td className="text-nowrap d-none d-md-table-cell">Lorem Ipsum</td>
                      <td className="text-nowrap d-none d-lg-table-cell">Lorem Ipsum</td>
                      <td className="text-nowrap d-none d-xl-table-cell">Lorem Ipsum</td>
                      <td className="text-nowrap d-none d-lg-table-cell">Lorem Ipsum</td>
                      <td className="text-nowrap d-none d-md-table-cell">Lorem Ipsum</td>
                      <td className="text-nowrap d-none d-sm-table-cell">Lorem Ipsum</td>
                      <td className="text-center">
                        <button className="btn btn-link p-0" title="Edit">
                          <FaPen className="text-success" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (Alternative for very small screens) */}
            <div className="d-block d-sm-none mt-4">
              <div className="row g-3">
                {filteredData.map((row, idx) => (
                  <div key={row.id} className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="card-title mb-0">{`${row.id}. ${row.name}`}</h6>
                          <button className="btn btn-link p-0" title="Edit">
                            <FaPen className="text-success" />
                          </button>
                        </div>
                        <div className="row g-2">
                          <div className="col-6">
                            <p className="card-text mb-1">
                              <small className="text-muted">Feed Type:</small><br />
                              <span className="fw-medium">Lorem Ipsum</span>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="card-text mb-1">
                              <small className="text-muted">Quantity:</small><br />
                              <span className="fw-medium">Lorem Ipsum</span>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="card-text mb-1">
                              <small className="text-muted">Feeding Time:</small><br />
                              <span className="fw-medium">Lorem Ipsum</span>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="card-text mb-1">
                              <small className="text-muted">Status:</small><br />
                              <span className="fw-medium">Lorem Ipsum</span>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="card-text mb-0">
                              <small className="text-muted">Previous Weight:</small><br />
                              <span className="fw-medium">Lorem Ipsum</span>
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="card-text mb-0">
                              <small className="text-muted">Current Weight:</small><br />
                              <span className="fw-medium">Lorem Ipsum</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightandFeedingSchedule;