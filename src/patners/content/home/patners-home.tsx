import React from 'react';

import AdBanner from './components/AdBanner';
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
      <AdBanner />
     

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
