
export interface Notification{
    notificationType: "order" | "sponsorship"
};

export interface OrdertNotificationItemProps extends Notification{
    username: string,
    receivedAt: string,
    orderItemName: string,
    notificationDesc: string,
    orderBudget: number,
    orderUnitName: string,
    orderUnitCount: number,
    orderStatus: string,
    notificationType: "order"
};

export interface SponsorshipNotificationItemProps extends Notification{
    bankName: string,
    notificationTitle: string,
    notificationDesc: string,
    sponsorshipAmount: number,
    receivedAt: string,
    sponsorshipStatus: string,
    sponsorshipType: string,
    notificationType: "sponsorship"
};


export interface MakeOfferProps{
    proposedPrice: string,
    response: string
};