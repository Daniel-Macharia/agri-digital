import React, { useState } from 'react';
import PreMatingForm from './PreMatingForm';
import PostMatingForm from './PostMatingForm';

const Gestigation = () => {
  const [activeTab, setActiveTab] = useState<'pre' | 'post'>('pre');
  const [showSaved, setShowSaved] = useState(false);

  return (
    <div className="w-100 rounded-4 bg-white border mt-3 p-4">
      <h5 className="mb-4 text-start" style={{ color: '#333' }}>Gestation</h5>
      <div className="d-flex mb-4">
        <button
          type="button"
          className={`btn ${activeTab === 'pre' ? 'btn-success' : 'btn-outline-success'} me-2`}
          onClick={() => setActiveTab('pre')}
        >
          Pre-Mating
        </button>
        <button
          type="button"
          className={`btn ${activeTab === 'post' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => setActiveTab('post')}
        >
          Post-Mating
        </button>
      </div>
      {activeTab === 'pre' ? (
        <PreMatingForm onSaved={() => setShowSaved(true)} />
      ) : (
        <PostMatingForm onSaved={() => setShowSaved(true)} />
      )}
    </div>
  );
};

export default Gestigation;


