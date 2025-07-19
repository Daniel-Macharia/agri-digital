

const sampleData = [
  { id: 1, name: "Hannah" },
  { id: 2, name: "Stella" },
  { id: 3, name: "Alex" },
  ...Array.from({ length: 7 }, (_, i) => ({ id: i + 4, name: "Lorem Ipsum" })),
];

const Productionrecords = () => {
  return (
    <div className="position-relative" style={{ minHeight: 500 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" style={{ color: "#222" }}>Production Records</h5>
        <div className="d-flex align-items-center" style={{ gap: 16 }}>
          <div className="input-group" style={{ width: 260 }}>
            <span className="input-group-text bg-light border-0">
              <i className="fa fa-search" style={{ color: '#bbb' }} />
            </span>
            <input
              type="text"
              className="form-control bg-light border-0"
              placeholder="Search by Livestock Name"
              style={{ fontSize: 14 }}
              disabled
            />
          </div>
          <button
            className="btn"
            style={{ background: "#457900", color: "#fff", borderRadius: 8, fontWeight: 500, minWidth: 140 }}
            disabled
          >
            + Add Livestock
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered align-middle" style={{ fontSize: 14 }}>
          <thead className="bg-light">
            <tr>
              <th>Livestock Identification</th>
              <th>Produce Records</th>
              <th>Age</th>
              <th>Growth Rate</th>
              <th>Feed Conversion Ratio</th>
              <th>Slaughter Age</th>
              <th>Yield</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row, idx) => (
              <tr key={row.id}>
                <td>{idx + 1}. {row.name}</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>
                  <button className="btn p-1" style={{ color: '#457900' }} disabled>
                    <i className="fa fa-pen" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Floating donation icons */}
      <div style={{ position: "fixed", top: "40%", right: 32, zIndex: 1000, display: "flex", flexDirection: "column", gap: 24 }}>
        <button
          className="d-flex align-items-center justify-content-center"
          style={{ width: 48, height: 48, borderRadius: "50%", background: "#fff", border: "2px solid #8bc34a", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: 0 }}
          disabled
        >
          <i className="fa fa-money-bill-wave" style={{ color: "#4caf50", fontSize: 22 }} />
        </button>
        <button
          className="d-flex align-items-center justify-content-center"
          style={{ width: 48, height: 48, borderRadius: "50%", background: "#fff", border: "2px solid #8bc34a", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          disabled
        >
          <i className="fa fa-hand-holding-usd" style={{ color: "#4caf50", fontSize: 22 }} />
        </button>
      </div>
    </div>
  );
};

export default Productionrecords;