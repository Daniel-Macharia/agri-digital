/*export interface SponsorCard {
  id: string;
  title: string;
  organization: string;
  image: string;
  badge: {
    text: string;
    variant: string;
  };
  award: {
    type: string;
    amount: string;
  };
}*/

export interface NavigationTab {
  id: string;
  label: string;
  active: boolean;
}

export interface SponsorCardProps {
  sponsor: SponsorCard;
  onViewMore: (id: string) => void;
}

export interface NavigationTabsProps {
  tabs: NavigationTab[];
  onTabChange: (tabId: string) => void;
}

export interface PageHeaderProps {
  onBack: () => void;
}

// In your Types file
export interface SponsorCard {
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
}

export interface SponsorCardProps {
  sponsor: SponsorCard;
  onViewMore: (id: string) => void;
}

export interface FundReport {
  id: string;
  title: string;
  date: string;
  time: string;
}

export interface ExpenditureItem {
  id: number;
  category: string;
  amount: number;
  remarks: string;
}

 export interface FundUtilizationData {
  name: string;
  phoneNumber: string;
  amountReceived: number;
  expenditure: ExpenditureItem[];
  receiptUploaded: boolean;
  digitalSignature: string;
}

export interface NavigationTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    active: boolean;
  }>;
  onTabChange: (tabId: string) => void;
}
