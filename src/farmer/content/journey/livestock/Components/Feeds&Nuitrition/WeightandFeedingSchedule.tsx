import { useState } from "react";
import { FaSearch, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  
  const filteredData = mockData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-2 px-md-3 mb-4">
      <div className="w-100">
        <div className="bg-white rounded-4 p-3 p-md-4" style={{ minHeight: "490px" }}>
          {/* Header Section */}
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-3 mb-md-4 gap-3">
            <div className="flex-shrink-0">
              <h5 className="h3-semibold mb-0">Weight & Feeding Schedule</h5>
            </div>
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
              <button className="btn btn-success px-3 px-md-4 rounded-3 fw-semibold text-nowrap"
                style={{ backgroundColor: '#457900', color: 'white' }}
                onClick={() => navigate('/farmer/projects/livestock/feeds/weight')}
              >
                <span className="d-none d-sm-inline">+ Add Livestock</span>
                <span className="d-sm-none">+ Add</span>
              </button>
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
                {filteredData.map((row) => (
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

         
        </div>
      </div>
    </div>
  );
};

export default WeightandFeedingSchedule;