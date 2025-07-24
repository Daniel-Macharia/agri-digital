import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PreMatingForm from './PreMatingForm';
import PostMatingForm from './PostMatingForm';

const Gestation = () => {
  const [activeTab, setActiveTab] = useState<'pre' | 'post'>('pre');
  const navigate = useNavigate();

  const handleSaved = () => {
    // Navigate to the results page relative to breeding
    navigate('results');
  };

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
        <PreMatingForm onSaved={handleSaved} />
      ) : (
        <PostMatingForm />
      )}
    </div>
  );
};

export default Gestation;