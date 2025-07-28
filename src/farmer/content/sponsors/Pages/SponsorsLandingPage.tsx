import React from 'react';
import NavigationTabs from '../Components/NavigationTabs';
import SponsorGrid from '../Components/SponsorGrid';
import FundReports from './FundReports'; // Ensure this exists
import SponsorDetailsPage from './SponsorDetailsPage'; // New import
import { SponsorCard, NavigationTab } from '../Types';
import ProjectProposalForm from './ProjectProposalForm';
import Crowdfunding from './CrowdfundingForm'; 

const SponsorsLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('all-sponsors');
  const [showFundUtilizationReport, setShowFundUtilizationReport] = React.useState<boolean>(false);
  const [selectedSponsor, setSelectedSponsor] = React.useState<SponsorCard | null>(null);

  const tabs: NavigationTab[] = [
    { id: 'all-sponsors', label: 'All Sponsors', active: activeTab === 'all-sponsors' },
    { id: 'my-rewards', label: 'My Rewards', active: activeTab === 'my-rewards' },
    { id: 'funds-report', label: 'Funds Report', active: activeTab === 'funds-report' },
    { id: 'project-proposal', label: 'Project Proposal', active: activeTab === 'project-proposal' },
    { id: 'crowdfunding', label: 'Crowdfunding', active: activeTab === 'crowdfunding' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Reset fund utilization report view when switching tabs
    setShowFundUtilizationReport(false);
    // Reset sponsor details view when switching tabs
    setSelectedSponsor(null);
  };

  // Function to handle when FundUtilizationReport is shown
  const handleShowFundUtilizationReport = () => {
    setShowFundUtilizationReport(true);
  };

  // Function to handle when going back from FundUtilizationReport
  const handleHideFundUtilizationReport = () => {
    setShowFundUtilizationReport(false);
  };

  // All Sponsors Data (original data with ranges)
  const allSponsorsData: SponsorCard[] = [
    {
      id: '1',
      title: 'Intervention Title',
      organization: 'GreenGrowth Foundation',
      image: 'https://media.istockphoto.com/id/181861632/photo/showing-at-a-county-fair.webp?a=1&b=1&s=612x612&w=0&k=20&c=dsTL3tWs7vphDG8gkE-BXd9fVKTsBmZ6vJuABZFzwhA=',
      badge: {
        text: '2 Slots Left',
        variant: 'warning' as 'warning' | 'success' | 'info' | 'danger'
      },
      award: {
        type: 'Voucher Award',
        amount: 'KES 55,000 - KES 70,000'
      }
    },
    {
      id: '2',
      title: 'Intervention Title',
      organization: 'Sustainable Agriculture',
      image: 'https://media.istockphoto.com/id/95552617/photo/bees.webp?a=1&b=1&s=612x612&w=0&k=20&c=oijLXisIbM_jU6ADjxJhs7djsBmSaP9XP0QeAPTR4lw=',
      badge: {
        text: '5 Slots Left',
        variant: 'warning' as 'warning' | 'success' | 'info' | 'danger'
      },
      award: {
        type: 'Cash Range',
        amount: 'KES 55,000 - KES 70,000'
      }
    },
    {
      id: '3',
      title: 'Intervention Title',
      organization: 'Sustainable Agriculture',
      image: 'https://media.istockphoto.com/id/2192220646/photo/tilapia-fish-in-aquaculture-farm-thailand.webp?a=1&b=1&s=612x612&w=0&k=20&c=7NZhSwKp6nHgHgR7W4RFJjGuU7U5jAS-ezw5PYEe7jE=',
      badge: {
        text: '3 Slots Left',
        variant: 'warning' as 'warning' | 'success' | 'info' | 'danger'
      },
      award: {
        type: 'Voucher Award',
        amount: 'KES 55,000 - KES 70,000'
      }
    },
    {
      id: '4',
      title: 'Intervention Title',
      organization: 'Sustainable Agriculture',
      image: 'https://plus.unsplash.com/premium_photo-1678344155293-1d79eb59cb4d?w=600&auto=format&fit=crop',
      badge: {
        text: '4 Slots Left',
        variant: 'warning' as 'warning' | 'success' | 'info' | 'danger'
      },
      award: {
        type: 'Cash Range',
        amount: 'KES 55,000 - KES 70,000'
      }
    },
    {
      id: '5',
      title: 'Intervention Title',
      organization: 'Sustainable Agriculture',
      image: 'https://media.istockphoto.com/id/2181996516/photo/goats-in-judging-pens-at-a-countryside-agricultural-show.webp?a=1&b=1&s=612x612&w=0&k=20&c=yx-GbOGf12wcQSRLHtC8i6TO82xiT1389V6hcqi1ykQ=',
      badge: {
        text: '7 Slots Left',
        variant: 'warning' as 'warning' | 'success' | 'info' | 'danger'
      },
      award: {
        type: 'Voucher Award',
        amount: 'KES 55,000 - KES 70,000'
      }
    },
    {
      id: '6',
      title: 'Intervention Title',
      organization: 'Sustainable Agriculture',
      image: 'https://plus.unsplash.com/premium_photo-1661848408966-ff1e956a5168?w=600&auto=format&fit=crop',
      badge: {
        text: '2 Slots Left',
        variant: 'warning' as 'warning' | 'success' | 'info' | 'danger'
      },
      award: {
        type: 'Cash Range',
        amount: 'KES 55,000 - KES 70,000'
      }
    }
  ];

  // My Rewards Data (awarded amounts instead of ranges)
  const myRewardsData: SponsorCard[] = [
    {
      id: '1',
      title: 'Intervention Title',
      organization: 'GreenGrowth Foundation',
      image: 'https://media.istockphoto.com/id/181861632/photo/showing-at-a-county-fair.webp?a=1&b=1&s=612x612&w=0&k=20&c=dsTL3tWs7vphDG8gkE-BXd9fVKTsBmZ6vJuABZFzwhA=',
      badge: {
        text: '1 Slot Left',
        variant: 'warning' as 'warning' | 'success' | 'info' | 'danger'
      },
      award: {
        type: 'Voucher Awarded',
        amount: 'KES 65,000'
      }
    },
    {
      id: '3',
      title: 'Intervention Title',
      organization: 'Sustainable Agriculture',
      image: 'https://media.istockphoto.com/id/2192220646/photo/tilapia-fish-in-aquaculture-farm-thailand.webp?a=1&b=1&s=612x612&w=0&k=20&c=7NZhSwKp6nHgHgR7W4RFJjGuU7U5jAS-ezw5PYEe7jE=',
      badge: {
        text: 'Full',
        variant: 'danger' as 'warning' | 'success' | 'info' | 'danger'
      },
      award: {
        type: 'Cash Awarded',
        amount: 'KES 58,000'
      }
    },
    {
      id: '5',
      title: 'Intervention Title',
      organization: 'Sustainable Agriculture',
      image: 'https://media.istockphoto.com/id/2181996516/photo/goats-in-judging-pens-at-a-countryside-agricultural-show.webp?a=1&b=1&s=612x612&w=0&k=20&c=yx-GbOGf12wcQSRLHtC8i6TO82xiT1389V6hcqi1ykQ=',
      badge: {
        text: '3 Slots Left',
        variant: 'warning' as 'warning' | 'success' | 'info' | 'danger'
      },
      award: {
        type: 'Voucher Awarded',
        amount: 'KES 62,500'
      }
    }
  ];

  // Helper function to find sponsor by ID from all data
  const findSponsorById = (id: string): SponsorCard | null => {
    // First check current active tab's data
    const currentData = activeTab === 'my-rewards' ? myRewardsData : allSponsorsData;
    let found = currentData.find(sponsor => sponsor.id === id);
    
    // If not found in current tab, check the other data set
    if (!found) {
      const otherData = activeTab === 'my-rewards' ? allSponsorsData : myRewardsData;
      found = otherData.find(sponsor => sponsor.id === id);
    }
    
    return found || null;
  };

  const handleViewMore = (sponsorId: string) => {
    const sponsor = findSponsorById(sponsorId);
    if (sponsor) {
      setSelectedSponsor(sponsor);
    }
  };

  const handleBackToSponsors = () => {
    setSelectedSponsor(null);
  };

  const renderTabContent = () => {
    // If sponsor details is selected, show the details page
    if (selectedSponsor) {
      return (
        <SponsorDetailsPage 
          sponsor={selectedSponsor}
          onBack={handleBackToSponsors}
          activeTab={activeTab} // Pass the active tab to determine view type
        />
      );
    }

    // Otherwise, show the regular tab content
    switch (activeTab) {
      case 'my-rewards':
        return <SponsorGrid sponsors={myRewardsData} onViewMore={handleViewMore} activeTab={activeTab} />;
      case 'all-sponsors':
        return <SponsorGrid sponsors={allSponsorsData} onViewMore={handleViewMore} activeTab={activeTab} />;
      case 'funds-report':
        return (
          <FundReports 
            onShowFundUtilizationReport={handleShowFundUtilizationReport}
            onHideFundUtilizationReport={handleHideFundUtilizationReport}
          />
        );
      case 'project-proposal':
        return <ProjectProposalForm />;
      case 'crowdfunding':
        return <Crowdfunding />;
      default:
        return null;
    }
  };

  return (
    <div className="sponsors-page container-fluid m-0 p-0" style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
      <div className="sponsors-page__container container-lg p-0 m-0">
        {/* Conditionally render NavigationTabs - hide when showing FundUtilizationReport or SponsorDetails */}
        {!showFundUtilizationReport && !selectedSponsor && (
          <NavigationTabs tabs={tabs} onTabChange={handleTabChange} />
        )}
        
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>

      <style>{`
        .sponsors-page__back-btn:hover {
          text-decoration: none;
        }

        .sponsors-page__tab--active {
          font-weight: 600;
        }

        .sponsors-page__tab--inactive {
          background-color: white;
          border-color: #e9ecef;
          color: #6c757d;
        }

        .sponsors-page__tab--inactive:hover {
          background-color: #f8f9fa;
          border-color: #6c757d;
        }

        .sponsors-page__card-inner {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        .sponsors-page__card-inner:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
        }

        .sponsors-page__card-image-container:hover .sponsors-page__card-overlay {
          opacity: 1 !important;
          background-color: rgba(0,0,0,0.3);
          transition: opacity 0.3s ease-in-out;
        }

        .sponsors-page__view-more-btn {
          background-color: #457900;
          border-color: #457900;
        }

        .sponsors-page__view-more-btn:hover {
          background-color: #4a5f29;
          border-color: #4a5f29;
        }

        @media (max-width: 768px) {
          .sponsors-page__tabs-container {
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 10px;
          }

          .sponsors-page__tab {
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SponsorsLandingPage;