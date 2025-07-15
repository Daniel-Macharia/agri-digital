

const LandingPage = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 py-3 sales-landing-page">
      {/* Info Bar */}
      <div className="alert alert-warning text-center fw-semibold mb-4 py-2 d-flex align-items-center justify-content-center gap-2" role="alert" style={{ borderRadius: 8, fontSize: 14 }}>
        <span role="img" aria-label="info" className="me-2">🛈</span>
        <span>Milk prices in Mombasa just increased by 10%!</span>
      </div>
      <div className="row gx-4 align-items-start">
        {/* Left Column */}
        <div className="col-lg-8 d-flex flex-column gap-3">
          {/* Upload Product */}
          <div className="card shadow-sm mb-2">
            <div className="card-body">
              <h6 className="card-title fw-bold mb-3">Upload Photo</h6>
              <div className="border border-2 border-secondary border-dashed rounded p-3 text-center text-muted mb-3" style={{ borderStyle: 'dashed', background: '#fafbfc' }}>
                <div className="fs-2 mb-2">📷</div>
                <div>Upload Photo of the Product<br/>(JPG, PNG, GIF - up to 10MB)</div>
              </div>
              <form className="row g-2 align-items-end">
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="Product Name" />
                </div>
                <div className="col-md-3">
                  <input type="number" className="form-control" placeholder="Quantity" />
                </div>
                <div className="col-md-3">
                  <input type="number" className="form-control" placeholder="Price" />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-success w-100 fw-semibold">Save</button>
                </div>
              </form>
            </div>
          </div>

          {/* My Products */}
          <div className="row g-3">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold">My Products</span>
                    <span className="text-success" role="button" style={{ fontSize: 18 }}>✎</span>
                  </div>
                  <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=200&q=80" alt="Cow" className="img-fluid rounded mb-2" style={{ height: 80, objectFit: 'cover', width: '100%' }} />
                  <div className="fw-semibold">Cow</div>
                  <div className="text-muted small">Type: Dairy</div>
                  <div className="text-muted small">Quantity: 1</div>
                  <div className="fw-bold text-success my-2">KES 42,000</div>
                  <button className="btn btn-success w-100 fw-semibold">Post to Market Place</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold">My Products</span>
                    <span className="text-success" role="button" style={{ fontSize: 18 }}>✎</span>
                  </div>
                  <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80" alt="Manure" className="img-fluid rounded mb-2" style={{ height: 80, objectFit: 'cover', width: '100%' }} />
                  <div className="fw-semibold">Manure</div>
                  <div className="text-muted small">Type: Cattle Manure</div>
                  <div className="text-muted small">Quantity: 200kg</div>
                  <div className="fw-bold text-success my-2">KES 48,000</div>
                  <button className="btn btn-success w-100 fw-semibold">Post to Market Place</button>
                </div>
              </div>
            </div>
          </div>

          {/* Market Insights */}
          <div className="card shadow-sm mt-2">
            <div className="card-body">
              <h6 className="card-title fw-bold mb-3">Market Insights</h6>
              {/* Chart Placeholder */}
              <div className="bg-success bg-opacity-10 rounded d-flex align-items-center justify-content-center mb-3" style={{ height: 120, color: '#388E3C', fontWeight: 600, fontSize: 18 }}>
                [Chart Placeholder]
              </div>
              <div className="fw-semibold mb-2">Market Updates</div>
              <ul className="list-unstyled mb-0 small">
                <li className="mb-1"><b>Price Updates:</b> Price of milk up by 10% <span className="text-muted ms-2">2 hours ago</span></li>
                <li className="mb-1"><b>Regional Demand:</b> Nairobi has a high demand for tomatoes <span className="text-muted ms-2">3 hours ago</span></li>
                <li><b>Export Market:</b> EU market offering KES 100/kg for organically grown tomatoes <span className="text-muted ms-2">1 day ago</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-4 d-flex flex-column gap-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold">Buyer Offers</span>
                <a href="#" className="text-success fw-semibold small">View all Offers</a>
              </div>
              {/* Offer Card 1 */}
              <div className="border rounded mb-3 p-3 bg-success bg-opacity-10 position-relative">
                <div className="fw-bold mb-1">Global Foods Inc.</div>
                <div className="text-muted small mb-1">Buyer Type: Wholesale Distributor</div>
                <div className="text-warning fw-bold small mb-1">Order Request: Pending</div>
                <div className="text-muted small">Negotiation Status: Open</div>
                <div className="text-muted small">Proposed Price: <b>KES 100/kg</b></div>
                <div className="text-muted small">Quantity: 2000kg</div>
                <div className="text-muted small">Total Price: <b>KES 120,000</b></div>
                <div className="text-muted small mb-2">Delivery Method: Buyer Pickup</div>
                <div className="d-flex gap-2">
                  <button className="btn btn-success fw-semibold flex-fill">Accept</button>
                  <button className="btn btn-warning fw-semibold flex-fill">Negotiate</button>
                </div>
              </div>
              {/* Offer Card 2 */}
              <div className="border rounded p-3 bg-success bg-opacity-25">
                <div className="fw-bold mb-1">Local Markets Ltd.</div>
                <div className="text-muted small mb-1">Buyer Type: Regional Distributor</div>
                <div className="text-success fw-bold small mb-1">Order Request: Completed</div>
                <div className="text-muted small">Negotiation Status: Completed</div>
                <div className="text-muted small">Proposed Price: <b>KES 110/kg</b></div>
                <div className="text-muted small">Quantity: 1500kg</div>
                <div className="text-muted small">Total Price: <b>KES 154,500</b></div>
                <div className="text-muted small mb-2">Delivery Method: Farmer Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;