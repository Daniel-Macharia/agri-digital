import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  
  FaShieldAlt,
  FaCheckCircle 
} from 'react-icons/fa';
import { PiMoneyWavyFill } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";

export interface PolicyData {
  id: string;
  title: string;
  company: string;
  coverage: string;
  support: string;
  image: string;
  isPurchased: boolean;
  purchaseDate?: string;
  description?: string;
  price?: string;
  features?: string[];
}

const InsurancePage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'purchased'>('all');
  const navigate = useNavigate();

  // Sample insurance policies data
  const allPolicies: PolicyData[] = [
    {
      id: '1',
      title: 'Premium Crop Insurance',
      company: 'AgriSecure Inc.',
      coverage: 'Up to KES 500,000 coverage per crop',
      support: '24/7 claim support',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop',
      isPurchased: true,
      purchaseDate: '2024-01-15',
      price: 'KES 10,000',
      features: [
        'Up to KES 500,000 coverage per crop',
        '24/7 claim support',
        'Drought and flood protection',
        'Market price protection',
        'Pest damage coverage',
        'Expert agricultural assessment'
      ]
    },
    {
      id: '2',
      title: 'Basic Crop Insurance',
      company: 'AgriSecure Inc.',
      coverage: 'Up to KES 300,000 coverage per crop',
      support: '24/7 claim support',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop',
      isPurchased: false,
      price: 'KES 7,500',
      features: [
        'Up to KES 300,000 coverage per crop',
        '24/7 claim support',
        'Drought protection',
        'Market price protection',
        'Basic agricultural assessment'
      ]
    },
    {
      id: '3',
      title: 'Advanced Crop Insurance',
      company: 'AgriSecure Inc.',
      coverage: 'Up to KES 750,000 coverage per crop',
      support: '24/7 claim support',
      image: 'https://images.unsplash.com/photo-1589402819889-8c1b0d97acda?w=600&auto=format&fit=crop',
      isPurchased: true,
      purchaseDate: '2024-02-20',
      price: 'KES 15,000',
      features: [
        'Up to KES 750,000 coverage per crop',
        '24/7 claim support',
        'Drought and flood protection',
        'Market price protection',
        'Pest damage coverage',
        'Expert agricultural assessment',
        'Satellite monitoring'
      ]
    },
    {
      id: '4',
      title: 'Livestock Protection Plan',
      company: 'FarmGuard Ltd.',
      coverage: 'Up to KES 7,000 coverage per livestock',
      support: '24/7 claim support',
      image: 'https://images.unsplash.com/photo-1646672156366-e6182efa9adf?w=600&auto=format&fit=crop',
      isPurchased: false,
      price: 'KES 5,000',
      features: [
        'Up to KES 7,000 coverage per livestock',
        '24/7 claim support',
        'Disease protection',
        'Theft coverage',
        'Veterinary support'
      ]
    },
    {
      id: '5',
      title: 'Equipment Insurance',
      company: 'TechFarm Insurance',
      coverage: 'Up to KES 1,000 coverage per tool',
      support: '24/7 claim support',
      image: 'https://images.unsplash.com/photo-1651649130219-1234c44824cc?w=600&auto=format&fit=crop',
      isPurchased: true,
      purchaseDate: '2024-03-10',
      price: 'KES 3,000',
      features: [
        'Up to KES 1,000 coverage per tool',
        '24/7 claim support',
        'Theft protection',
        'Damage coverage',
        'Replacement support'
      ]
    },
    {
      id: '6',
      title: 'Weather Protection Insurance',
      company: 'ClimateSecure Inc.',
      coverage: 'Up to KES 600,000 coverage per season',
      support: '24/7 claim support',
      image: 'https://plus.unsplash.com/premium_photo-1661962971074-1554649d40d5?w=600&auto=format&fit=crop',
      isPurchased: false,
      price: 'KES 12,000',
      features: [
        'Up to KES 600,000 coverage per season',
        '24/7 claim support',
        'Weather monitoring',
        'Extreme weather protection',
        'Seasonal adjustments'
      ]
    }
  ];

  const purchasedPolicies = allPolicies.filter(policy => policy.isPurchased);
  const displayedPolicies = activeTab === 'all' ? allPolicies : purchasedPolicies;

  const handleViewDetails = (policyId: string) => {
    navigate(`/farmer/insurance/policy/${policyId}`);
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      {/* Tab Navigation */}
        <div className="row mt-0">
  <div className="col-12">
    <div className="d-flex px-2 px-sm-3 gap-1 gap-sm-2 flex-nowrap align-items-start">
      <button
        className={`btn px-2 px-sm-4 py-2  fw-normal  flex-fill flex-sm-grow-0 text-nowrap ${
          activeTab === 'all'
            ? 'btn-success text-white'
            : 'btn bg-light'
        }`}
        style={{ 
          width: window.innerWidth >= 576 ? 'fit-content' : 'auto', backgroundColor: '#556b2f' 
        }}
        onClick={() => setActiveTab('all')}
      >
        All Policies
      </button>
      <button
        className={`btn px-2 px-sm-4 py-2 fw-normal flex-fill flex-sm-grow-0  text-nowrap ${
          activeTab === 'purchased'
            ? 'btn-success text-white'
            : 'btn bg-light'
        }`}
        onClick={() => setActiveTab('purchased')}
         style={{ 
          width: window.innerWidth >= 576 ? 'fit-content' : 'auto', backgroundColor: '#556b2f'
        }}
      >
        Purchased Policies
      </button>
    </div>
  </div>
</div>

      {/* Policies Grid */}
      <div className="row mt-4 px-0">
        {displayedPolicies.map((policy) => (
          <div key={policy.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-0 position-relative">
              {/* Card Image */}
              <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src={policy.image} 
                  alt={policy.title}
                  className="card-img-top w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
                {/* Purchase Status Badge */}
                {policy.isPurchased && (
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-success rounded-pill d-flex align-items-center gap-1">
                      <FaCheckCircle size={12} />
                      Purchased
                    </span>
                  </div>
                )}
              </div>
              
              {/* Card Body */}
               <div className="card-body d-flex flex-column align-items-start  bottom-0 start-0 w-100 p-0">
                {/* Title and Company */}
                <div className="mb-2 pt-4">
                  <h5 className="card-title mb-1 fw-semibold">{policy.title}</h5>
                  <p className="text-start text-success small">{policy.company}</p>
                </div>

                {/* Coverage Info */}
                <div className="mb-1 flex-grow-1">
                   <div className="d-flex align-items-center mb-2">
                      <PiMoneyWavyFill className="me-2 flex-shrink-0" size={14} />
                      <span className="small lh-sm" style={{fontSize: '13px'}}>{policy.coverage}</span>
                    </div>
                   <div className="d-flex align-items-center mb-2">
                      <CiClock2 className="me-2 flex-shrink-0" size={14} />
                      <span className="small lh-sm" style={{fontSize: '13px'}}>{policy.support}</span>
                   </div>
                </div>
                {/* Action Button */}
                <div className="mt-auto w-100">
                    <button className="btn btn-success w-100 fw-semibold py-1"
                    style={{backgroundColor: '#556b2f'}}
                    onClick={() => handleViewDetails(policy.id)}
                     >
                      View Details
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {displayedPolicies.length === 0 && (
        <div className="row mt-5">
          <div className="col-12 text-center">
            <FaShieldAlt className="text-muted mb-3" size={60} />
            <h5 className="text-muted">No policies found</h5>
            <p className="text-muted">
              {activeTab === 'purchased' 
                ? "You haven't purchased any policies yet." 
                : "No policies available at the moment."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the policies data for use in other components
export const getPolicyById = (id: string): PolicyData | undefined => {
  const allPolicies: PolicyData[] = [
    {
      id: '1',
      title: 'Premium Crop Insurance',
      company: 'AgriSecure Inc.',
      coverage: 'Up to KES 500,000 coverage per crop',
      support: '24/7 claim support',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop',
      isPurchased: true,
      purchaseDate: '2024-01-15',
      price: 'KES 10,000',
      features: [
        'Up to KES 500,000 coverage per crop',
        '24/7 claim support',
        'Drought and flood protection',
        'Market price protection',
        'Pest damage coverage',
        'Expert agricultural assessment'
      ]
    },
    {
      id: '2',
      title: 'Basic Crop Insurance',
      company: 'AgriSecure Inc.',
      coverage: 'Up to KES 300,000 coverage per crop',
      support: '24/7 claim support',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop',
      isPurchased: false,
      price: 'KES 7,500',
      features: [
        'Up to KES 300,000 coverage per crop',
        '24/7 claim support',
        'Drought protection',
        'Market price protection',
        'Basic agricultural assessment'
      ]
    },
    {
      id: '3',
      title: 'Advanced Crop Insurance',
      company: 'AgriSecure Inc.',
      coverage: 'Up to KES 750,000 coverage per crop',
      support: '24/7 claim support',
      image: 'https://images.unsplash.com/photo-1589402819889-8c1b0d97acda?w=600&auto=format&fit=crop',
      isPurchased: true,
      purchaseDate: '2024-02-20',
      price: 'KES 15,000',
      features: [
        'Up to KES 750,000 coverage per crop',
        '24/7 claim support',
        'Drought and flood protection',
        'Market price protection',
        'Pest damage coverage',
        'Expert agricultural assessment',
        'Satellite monitoring'
      ]
    },
    {
      id: '4',
      title: 'Livestock Protection Plan',
      company: 'FarmGuard Ltd.',
      coverage: 'Up to KES 7,000 coverage per livestock',
      support: '24/7 claim support',
      image: 'https://images.unsplash.com/photo-1646672156366-e6182efa9adf?w=600&auto=format&fit=crop',
      isPurchased: false,
      price: 'KES 5,000',
      features: [
        'Up to KES 7,000 coverage per livestock',
        '24/7 claim support',
        'Disease protection',
        'Theft coverage',
        'Veterinary support'
      ]
    },
    {
      id: '5',
      title: 'Equipment Insurance',
      company: 'TechFarm Insurance',
      coverage: 'Up to KES 1,000 coverage per tool',
      support: '24/7 claim support',
      image: 'https://images.unsplash.com/photo-1651649130219-1234c44824cc?w=600&auto=format&fit=crop',
      isPurchased: true,
      purchaseDate: '2024-03-10',
      price: 'KES 3,000',
      features: [
        'Up to KES 1,000 coverage per tool',
        '24/7 claim support',
        'Theft protection',
        'Damage coverage',
        'Replacement support'
      ]
    },
    {
      id: '6',
      title: 'Weather Protection Insurance',
      company: 'ClimateSecure Inc.',
      coverage: 'Up to KES 600,000 coverage per season',
      support: '24/7 claim support',
      image: 'https://plus.unsplash.com/premium_photo-1661962971074-1554649d40d5?w=600&auto=format&fit=crop',
      isPurchased: false,
      price: 'KES 12,000',
      features: [
        'Up to KES 600,000 coverage per season',
        '24/7 claim support',
        'Weather monitoring',
        'Extreme weather protection',
        'Seasonal adjustments'
      ]
    }
  ];

  return allPolicies.find(policy => policy.id === id);
};

export default InsurancePage;