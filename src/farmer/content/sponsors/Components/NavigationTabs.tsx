import React from 'react';
import { NavigationTabsProps } from '../Types';

const NavigationTabs: React.FC<NavigationTabsProps> = ({ tabs, onTabChange }) => (
  <div className="sponsors-page__nav-tabs mb-4 pt-5">
    <div className="sponsors-page__tabs-container d-flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`sponsors-page__tab btn ${
            tab.active
              ? 'btn-success sponsors-page__tab--active'
              : 'btn-outline-secondary sponsors-page__tab--inactive'
          } rounded-pill px-3 py-2`}
          style={{
            backgroundColor: tab.active === true ? '#556B2F' : 'white',
            fontSize: '0.875rem'
          }}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);

export default NavigationTabs;