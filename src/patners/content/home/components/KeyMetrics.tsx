const KeyMetrics = () => {
  return (
    <div className="row g-4 mb-4">
      <div className="col-lg-3 col-md-6 mb-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body text-center py-4">
            <h1 className="text-success mb-2 fw-bold" style={{fontSize: '2.5rem'}}>4</h1>
            <h6 className="card-title mb-2 fw-semibold">Requests</h6>
            <p className="card-text small text-muted mb-0">You have 4 pending requests from different farmers.</p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 mb-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body text-center py-4">
            <h1 className="text-success mb-2 fw-bold" style={{fontSize: '2.5rem'}}>14</h1>
            <h6 className="card-title mb-2 fw-semibold">No. of Programs</h6>
            <p className="card-text small text-muted mb-0">You have created 14 interventions.</p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 mb-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body text-center py-4">
            <h1 className="text-success mb-2 fw-bold" style={{fontSize: '2.5rem'}}>100</h1>
            <h6 className="card-title mb-2 fw-semibold">No. of Beneficiaries</h6>
            <p className="card-text small text-muted mb-0">You have created 100 sponsored farmers.</p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 mb-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body text-center py-4">
            <h1 className="text-success mb-2 fw-bold" style={{fontSize: '2.5rem'}}>4.8</h1>
            <h6 className="card-title mb-2 fw-semibold">Quality Score</h6>
            <p className="card-text small text-muted mb-0">Your rating to grow business.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
