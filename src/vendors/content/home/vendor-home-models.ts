import { NavigateFunction } from "react-router-dom"
import { VendorOrderStatus } from "./vendor-home-enums"


export interface VendorHomeSummaryItemProps{
    itemTitle: string,
    itemCount: number,
    itemDesc: string,
    detailsUrl: string,
    navigate: NavigateFunction
};

export interface VendorProfitItemProps{
    totalProfit: number,
    percentageDifference: number,
    differenceIndicator: string,
    detailsUrl: string,
    navigate: NavigateFunction
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


export interface VendorOrderItemProps{
    buyerName: string,
    productName: string,
    location: string,
    orderStatus: VendorOrderStatus
};

export interface VendorKeyValuePair{
    entryLabel: string,
    entryValue: string
};

export interface VendorOrderStatusViewProps{
    orderStatus: VendorOrderStatus,
    dateChanged: Date,
}