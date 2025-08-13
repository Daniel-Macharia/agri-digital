import React from 'react';
import KeyMetrics from './components/KeyMetrics';
import MyPrograms from './components/MyPrograms';
import Beneficiaries from './components/Beneficiaries';
import MarketPlace from './components/MarketPlace';
import DonationRequests from './components/DonationRequests';
import Articles from './components/Articles';
import Trainings from './components/Trainings';
import Notifications from './components/Notifications';

const PatnersHome: React.FC = () => {
  return (
    <div className="container-fluid p-4" style={{backgroundColor: '#F9FAFB'}}>
      {/* Top Banner */}
      <div className="row g-2 mb-4">
        <div className="col">
          <div className="bg-light p-3 rounded-3 d-flex align-items-center justify-content-center" style={{minHeight: '60px'}}>
            <img src="/assets/images/home/farmer.svg" alt="Farmer" className="me-2" style={{width: '20px', height: '20px'}} />
            <span className="small fw-medium text-success">Farming Revolution in America</span>
          </div>
        </div>
        <div className="col">
          <div className="bg-light p-3 rounded-3 d-flex align-items-center justify-content-center" style={{minHeight: '60px'}}>
            <img src="/assets/images/home/farmer.svg" alt="Farmer" className="me-2" style={{width: '20px', height: '20px'}} />
            <span className="small fw-medium text-success">Farming Revolution in America</span>
          </div>
        </div>
        <div className="col">
          <div className="bg-light p-3 rounded-3 d-flex align-items-center justify-content-center" style={{minHeight: '60px'}}>
            <img src="/assets/images/home/farmer.svg" alt="Farmer" className="me-2" style={{width: '20px', height: '20px'}} />
            <span className="small fw-medium text-success">Farming Revolution in America</span>
          </div>
        </div>
        <div className="col">
          <div className="bg-light p-3 rounded-3 d-flex align-items-center justify-content-center" style={{minHeight: '60px'}}>
            <img src="/assets/images/home/farmer.svg" alt="Farmer" className="me-2" style={{width: '20px', height: '20px'}} />
            <span className="small fw-medium text-success">Farming Revolution in America</span>
          </div>
        </div>
        <div className="col">
          <div className="bg-light p-3 rounded-3 d-flex align-items-center justify-content-center" style={{minHeight: '60px'}}>
            <img src="/assets/images/home/farmer.svg" alt="Farmer" className="me-2" style={{width: '20px', height: '20px'}} />
            <span className="small fw-medium text-success">Farming Revolution in America</span>
          </div>
        </div>
      </div>

      <KeyMetrics />

      <div className="row g-4">
        {/* Left Column */}
        <div className="col-lg-8">
          <MyPrograms />
          <Beneficiaries />
          <MarketPlace />
          <DonationRequests />
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
          <Articles />
          <Trainings />
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default PatnersHome;
