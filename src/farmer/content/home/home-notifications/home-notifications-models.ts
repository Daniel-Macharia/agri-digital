import { HomeNotificationType } from "./home-enums"

export interface NotificationProps{
    receivedAt: Date,
    notificationDesc: string,
    notificationType: HomeNotificationType
};

export interface GeneralNotificationProps extends NotificationProps{
    notificationType: HomeNotificationType.GENERAL_NOTIFICATION
}

export interface OrdertNotificationItemProps extends NotificationProps{
    username: string,
    orderItemName: string,
    orderBudget: number,
    orderUnitName: string,
    orderUnitCount: number,
    orderStatus: string,
    notificationType: HomeNotificationType.ORDER_NOTIFICATION
};

export interface SponsorshipNotificationItemProps extends NotificationProps{
    bankName: string,
    notificationTitle: string,
    sponsorshipAmount: number,
    sponsorshipStatus: string,
    sponsorshipType: string,
    notificationType: HomeNotificationType.SPONSORSHIP_NOTIFICATION
};


export interface MakeOfferProps{
    proposedPrice: string,
    response: string
};