import { useState } from 'react';
import FeedingSchedule from './FeedingSchedule';
import Feeds from './Feeds';
import Weight from './Weight';

const HousingNutrition = (props: any) => {
  const [activeTab, setActiveTab] = useState('feeding');

  const renderContent = () => {
    switch (activeTab) {
      case 'feeding':
        return <FeedingSchedule {...props} />;
      case 'feeds':
        return <Feeds {...props} />;
      case 'weight':
        return <Weight {...props} />;
      default:
        return <FeedingSchedule {...props} />;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
        <button onClick={() => setActiveTab('feeding')} style={{ marginRight: '1rem', fontWeight: activeTab === 'feeding' ? 'bold' : 'normal', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1rem' }}>Feeding Schedule</button>
        <button onClick={() => setActiveTab('feeds')} style={{ marginRight: '1rem', fontWeight: activeTab === 'feeds' ? 'bold' : 'normal', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1rem' }}>Feeds</button>
        <button onClick={() => setActiveTab('weight')} style={{ fontWeight: activeTab === 'weight' ? 'bold' : 'normal', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1rem' }}>Weight</button>
      </div>
      {renderContent()}
    </div>
  );
};

export default HousingNutrition;
