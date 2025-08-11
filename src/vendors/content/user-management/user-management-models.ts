import { UserStatus } from "./user-management-enums";

export interface UserItemProps{
    name: string,
    email: string,
    role: string,
    joinedDate: Date,
    status: UserStatus
}

export interface ModalProps{
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export interface AddUserProps{
    name: string,
    email: string,
    role: string
}