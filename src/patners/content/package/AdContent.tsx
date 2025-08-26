import React from 'react';
import { Button } from 'react-bootstrap';


const pdfs = [
  {
    name: 'Farming_Guidelines_2023.pdf',
    size: '2.5MB',
  },
  {
    name: 'Farming_Guidelines_2023.pdf',
    size: '2.5MB',
  },
];

const AdContent: React.FC = () => {
  return (
    <div className="bg-light p-3" style={{ minHeight: '100vh' }}>
      {/* Card Container */}
      <div className="bg-white rounded-4 border mx-auto mb-4" style={{ boxShadow: '0 2px 8px #0001' }}>
        {/* Image Header */}
        <div style={{ position: 'relative', borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem', overflow: 'hidden', height: 220 }}>
          <img
            src=""
            alt="Farmer with chickens"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Edit Button */}
          <Button
            variant="light"
            style={{ position: 'absolute', right: 24, bottom: 16, borderRadius: '50%', boxShadow: '0 2px 8px #0002', padding: 8 }}
          >
            <svg width="22" height="22" fill="#457900" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </Button>
        </div>
        {/* Content */}
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="mb-0" style={{ fontWeight: 700 }}>Title of the Advertisement</h4>
            <span className="text-muted small">Published on 12/08</span>
          </div>
          <div className="mb-3">
            <span className="text-success small" style={{ fontWeight: 500 }}>Target Audience</span>
          </div>
          <Button variant="warning" className="mb-3" style={{ color: '#fff', fontWeight: 600, borderRadius: 8 }}>Call to Action</Button>
          <div className="mb-3">
            <div style={{ fontWeight: 600 }}>Content of the advert</div>
            <div className="text-secondary" style={{ fontSize: 15 }}>
              Agriculture is the backbone of many economies, but one of the biggest challenges farmers face today is finding skilled labor to support their operations. Labor shortages, lack of efficiency, and high operational costs make farming more difficult, affecting productivity and profitability.<br /><br />
              This is where AgriWork comes in—a revolutionary platform designed to connect farmers with skilled laborers to optimize farm operations, reduce inefficiencies, and improve productivity. In this article, we take a deep dive into how AgriWork is transforming the agricultural workforce and making farming more efficient.
            </div>
          </div>
          <div className="mb-3">
            <div style={{ fontWeight: 600 }}>How AgriWork is Improving Farm Productivity</div>
            <div className="text-secondary" style={{ fontSize: 15 }}>
              Agriculture is the backbone of many economies, but one of the biggest challenges farmers face today is finding skilled labor to support their operations. Labor shortages, lack of efficiency, and high operational costs make farming more difficult, affecting productivity and profitability.<br /><br />
              This is where AgriWork comes in—a revolutionary platform designed to connect farmers with skilled laborers to optimize farm operations, reduce inefficiencies, and improve productivity. In this article, we take a deep dive into how AgriWork is transforming the agricultural workforce and making farming more efficient.
            </div>
          </div>
        </div>
      </div>
      {/* Attached Documents */}
      <div className="bg-white rounded-4 border mx-auto p-4" style={{boxShadow: '0 2px 8px #0001' }}>
        <div className="mb-3" style={{ fontWeight: 600 }}>
          <svg width="20" height="20" fill="#457900" className="me-2" viewBox="0 0 24 24"><path d="M4 22h16c1.1 0 2-.9 2-2V8c0-.26-.1-.52-.29-.71l-6-6A.995.995 0 0 0 15 1H4c-1.1 0-2 .9-2 2v17c0 1.1.9 2 2 2zm0-2V3h10v5h5v12H4z"/></svg>
          Attached Documents
        </div>
        {pdfs.map((pdf, idx) => (
          <div key={idx} className="d-flex align-items-center justify-content-between bg-light rounded-3 p-3 mb-2" style={{ border: '1px solid #eee' }}>
            <div className="d-flex align-items-center">
              <svg width="32" height="32" fill="#f40" className="me-3" viewBox="0 0 24 24"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 8l-5.828-5.828A2 2 0 0 0 12.172 2H6zm6 1.414L18.586 8H14a2 2 0 0 1-2-2V3.414zM6 4h5v4a4 4 0 0 0 4 4h4v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4zm2 10v2h2v-2H8zm4 0v2h2v-2h-2z"/></svg>
              <div>
                <div style={{ fontWeight: 500 }}>{pdf.name}</div>
                <div className="text-muted small">{pdf.size}</div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-success" size="sm" style={{ borderRadius: 8, fontWeight: 600 }}>Read</Button>
              <Button variant="outline-warning" size="sm" style={{ borderRadius: 8, fontWeight: 600 }}>Download</Button>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default AdContent; 