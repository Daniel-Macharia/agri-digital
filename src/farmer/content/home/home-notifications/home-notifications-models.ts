
export interface NotificationProps{
    receivedAt: string,
    notificationDesc: string,
    notificationType: "order" | "sponsorship" | "other"
};

export interface GeneralNotificationProps extends NotificationProps{
    notificationType: "other"
}

export interface OrdertNotificationItemProps extends NotificationProps{
    username: string,
    orderItemName: string,
    orderBudget: number,
    orderUnitName: string,
    orderUnitCount: number,
    orderStatus: string,
    notificationType: "order"
};

export interface SponsorshipNotificationItemProps extends NotificationProps{
    bankName: string,
    notificationTitle: string,
    sponsorshipAmount: number,
    sponsorshipStatus: string,
    sponsorshipType: string,
    notificationType: "sponsorship"
};


export interface MakeOfferProps{
    proposedPrice: string,
    response: string
};