import { NavigateFunction } from "react-router-dom"
import { ProductQuality, VendorOrderStatus } from "./vendor-home-enums"
import React from "react"


export interface VendorHomeSummaryItemProps{
    itemTitle: string,
    itemCount: number,
    itemDesc: string,
    detailsUrl: string,
    backUrl: string,
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
    itemExpiryDate: Date,
    manufacturingDate: Date,
    quality: ProductQuality
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
};

export interface VendorCalendarEvent {
  title: string,
  start: Date,
  end: Date,
};

export interface VendorHomeOrderItemProps{
    buyerName: string,
    phoneNumber: string,
    productName: string,
    time: string,
    amount: number,
    location: string,
    orderDate: Date
};

export interface AddCalendarEventModalProps{
    eventDate: Date
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    events: VendorCalendarEvent[],
    setEvents: React.Dispatch<React.SetStateAction<VendorCalendarEvent[]>>,
    orders: VendorHomeOrderItemProps[],
    setOrders: React.Dispatch<React.SetStateAction<VendorHomeOrderItemProps[]>>
}