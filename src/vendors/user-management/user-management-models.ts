import { UserRole, UserStatus } from "./user-management-enums";

export interface UserItemProps{
    name: string,
    email: string,
    role: string,
    joinedDate: Date,
    status: UserStatus
}

export interface ModalProps{
    show: boolean,
    setShow: Function
}

export interface AddUserProps{
    name: string,
    email: string,
    role: string
}