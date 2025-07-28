import React from 'react';
import SponsorCard from './SponsorsCard';

// Clean type definition without duplicates
type SponsorCardData = {
    id: string;
    title: string;
    organization: string;
    image: string;
    badge: {
        text: string;
        variant: 'warning' | 'success' | 'info' | 'danger';
    };
    award: {
        type: 'Voucher Award' | 'Cash Range' | 'Voucher Awarded' | 'Cash Awarded';
        amount: string;
    };
};

interface SponsorGridProps {
    sponsors: SponsorCardData[];
    onViewMore: (id: string) => void;
    activeTab?: string; // New prop to know which tab is active
}

const SponsorGrid: React.FC<SponsorGridProps> = ({
    sponsors,
    onViewMore,
    activeTab = 'all-sponsors'
}) => {
    const isMyRewards = activeTab === 'my-rewards';
    
    return (
        <div className="sponsors-page__grid">
            <div className="row">
                {sponsors.map((sponsor) => (
                    <SponsorCard
                        key={sponsor.id}
                        sponsor={sponsor}
                        onViewMore={onViewMore}
                        isMyRewards={isMyRewards}
                    />
                ))}
            </div>
        </div>
    );
};

export default SponsorGrid;