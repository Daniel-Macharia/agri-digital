import { InviteChannel } from "./invite-enums"


export interface BenefitItemProps
{
    benefit: string
};

export interface InviteItemProps{
    iconUrl: string,
    inviteChannel: InviteChannel,
    itemWebUrl: string
};

export interface InviteModalProps{
    show: boolean,
    setShow: Function
};

export interface FarmerEmail{
    farmerEmail: string
};

export interface InviteTypeProps{
    inviteType: string,
    setInviteType: Function
}