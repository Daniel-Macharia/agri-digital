import { UserFormMode, UserStatus } from "./user-management-enums";

export interface UserItemProps{
    name: string,
    email: string,
    role: string,
    joinedDate: Date,
    status: UserStatus,
};

export interface UserItemInputData{
    userData: UserItemProps,
    users: UserItemProps[],
    setUsers: React.Dispatch<React.SetStateAction<UserItemProps[]>>,
    setCurrentMode: React.Dispatch<React.SetStateAction<UserFormMode>>,
    setShowUserForm: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedUserData: React.Dispatch<React.SetStateAction<AddUserProps|null>>
}

export interface UserModalProps{
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    mode: UserFormMode,
    userData: AddUserProps | null
};

export interface AddUserProps{
    name: string,
    email: string,
    role: string
};

export interface UserManagementModalProps{
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}