

export interface VendorHomeSummaryItemProps{
    itemTitle: string,
    itemCount: number,
    itemDesc: string,
    detailsUrl: string
};

export interface VendorProfitItemProps{
    totalProfit: number,
    percentageDifference: number,
    differenceIndicator: string,
    detailsUrl: string
};

export interface VendorServiceItemProps{
    serviceImageUrl: string,
    serviceName: string,
    serviceDuration: number,
    serviceCost: number,
    serviceUnitName: string
};

export interface VendorStockItemProps{
    itemName: string,
    itemQuantity: number,
    itemBuyingPrice:  number,
    itemSellingPrice: number,
    itemExpiryDate: Date
};