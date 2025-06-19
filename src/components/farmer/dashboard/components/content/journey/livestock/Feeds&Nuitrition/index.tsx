import { useState } from 'react';
import FeedingSchedule from './FeedingSchedule';
import Feeds from './Feeds';
import Weight from './Weight';
import FeedingLandingPage from '../ReusableLandingPage/ReusableLandingPage';
import Navigation from './Navigation';

const FeedsNutrition = (props: any) => {
  const [activeTab, setActiveTab] = useState('feeding');

  const renderContent = () => {
    switch (activeTab) {
      case 'stock':
        return <Feeds {...props} />;
      case 'feeding':
        return <FeedingSchedule {...props} />;
      case 'weight':
        return <Weight {...props} />;
      default:
        return <FeedingLandingPage {...props} />;
    }
  };

  return (
    <div className="container-fluid p-3 p-md-4 p-lg-5">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={() => {}}
      />
      <div className="tab-content">
        <div className="tab-pane active">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FeedsNutrition;
