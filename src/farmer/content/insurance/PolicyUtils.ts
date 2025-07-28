import { PolicyData } from "./InsurancePage";

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