import React from "react";
import Activities from "../Feeds&Nuitrition/Activities";

const Results = () => {
  return (
    <div className="breeding-page" style={{ background: '#f7f7f7', minHeight: '100vh', padding: '24px' }}>
      {/* Header */}
      <div className="breeding-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontWeight: 500 }}>Breeding</h2>
        <button style={{ background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>+ Add Livestock</button>
      </div>

      {/* Livestock Cards */}
      <div className="livestock-cards" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {/* Hannah Card */}
        <div className="livestock-card" style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Hannah</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
            <div>
              <div style={{ color: '#888' }}>Estrus Start Date</div>
              <div>2025/01/12</div>
            </div>
            <div>
              <div style={{ color: '#888' }}>Estrus End Date</div>
              <div>2025/02/10</div>
            </div>
            <div>
              <div style={{ color: '#888' }}>Next Action</div>
              <div style={{ color: '#888' }}>Skipped</div>
            </div>
          </div>
        </div>
        {/* Jane Card */}
        <div className="livestock-card" style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Jane</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 8 }}>
            <div>
              <div style={{ color: '#888' }}>Estrus Start Date</div>
              <div>2025/01/12</div>
            </div>
            <div>
              <div style={{ color: '#888' }}>Estrus End Date</div>
              <div>2025/02/10</div>
            </div>
            <div>
              <div style={{ color: '#888' }}>Next Action</div>
              <div style={{ color: '#4CAF50', fontWeight: 600 }}>Sired</div>
            </div>
            <div>
              <div style={{ color: '#888' }}>Age</div>
              <div>34 Months</div>
            </div>
            <div>
              <div style={{ color: '#888' }}>Conception Date</div>
              <div>2025/02/11</div>
            </div>
            <div>
              <div style={{ color: '#888' }}>Gestation Period</div>
              <div>7 Months</div>
            </div>
            <div>
              <div style={{ color: '#888' }}>Delivery Date</div>
              <div>2025/03/12</div>
            </div>
            <div>
              <div style={{ color: '#888' }}>New Born</div>
              <div style={{ color: '#4CAF50', fontWeight: 600 }}>Yes</div>
            </div>
            <div>
              <div style={{ color: '#888' }}>No. of Newborns</div>
              <div style={{ fontWeight: 600 }}>1 Calf</div>
            </div>
          </div>
          <div style={{ color: '#4CAF50', fontWeight: 600, cursor: 'pointer' }}>Track Development</div>
        </div>
      </div>

      {/* Activities Section */}
      <Activities/>
      
      
    </div>
  );
};

export default Results;