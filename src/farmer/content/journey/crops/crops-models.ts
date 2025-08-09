export interface CropDetails {
  cropName: string;
  seedName: string;
  seedVariety: string;
  plantingDate: Date | null;
  expectedHarvestingDate: Date | null;
}

export interface PlantingActivity {
  activityDate: Date | null;
  activityDescription: string;
}

export interface CropsNotificationProps {
  iconUrl: string;
  message: string;
}

export interface ManagementActivityProps {
  activityName: string;
  activityDescription: string;
  activityCompletionDate: string;
  activityCompletionTime: string;
  activityCompleted: boolean;
  onStatusChanged?: (status: boolean) => void;
}

export interface ManagementNotificationProps {
  name: string;
  description: string;
  details: string;
}

export interface ManagementSummaryProps {
  title: string;
  items: ManagementSummaryItem[];
  onActionRequired?: (id?: string) => void;
  // firstItem: ManagementSummaryItem,
  // secondItem: ManagementSummaryItem,
  // thirdItem: ManagementSummaryItem,
  // fourthItem: ManagementSummaryItem
}

export interface ManagementSummaryItem {
  id?: string;
  label: string;
  value: string;
}

export interface OnelineNotificationItemProps {
  notificationDescription: string;
  urgency: number;
}

export interface StorageSpecificationItemProps {
  itemName: string;
  itemValue: string;
}

export interface SalesOfferProps {
  customerName: string;
  buyerType: string;
  orderRequest: string;
  negotiationStatus: boolean;
  proposedPrice: number;
  quantity: number;
  deliveryMethod: string;
}

export interface SalesNotificationItemProps {
  iconUrl: string;
  itemName: string;
  itemDescription: string;
  timeReceived: string;
}

export interface KeyValuePair {
  period: string;
  value: number;
}

export interface SalesNegotiationProductProps {
  productImageUrl: string;
  productName: string;
  productSeller: string;
  productUnitPrice: string;
  productUnitName: string;

    //for showing and hiding modal
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
};
