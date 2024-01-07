export type ApiResponse = DefaultResponse;
export interface DefaultResponse {
    message_id: string;
    message: string;
    result: boolean;
    object: {}
}

export type SessionUser = DefaultUser;
export interface DefaultUser {
    id?: string;
    name?: string;
    avatar?: string;
    authToken?: string
}

export type TabItemType = DefaultTabType;
export interface DefaultTabType {
    label: string;
    value: string;
}

export type LoginType = DefaultLoginType;
export interface DefaultLoginType {
    email:string;
    password:string;
}

export type RegisterType = DefaultRegisterType;
export interface DefaultRegisterType {
    email:string;
    code:string;
    userName:string;
    password:string;
}

export type ForgetType = DefaultForgetType;
export interface DefaultForgetType {
    email:string;
    code:string;
    newPassword:string;
}

export type MessageType = DefaultMessageType;
export interface DefaultMessageType {
    id: number;
    from: string;
    createTime: string;
    content: string;
    avatar: string;
}

export type UserBaseType = DefaultUserInfoType;
export interface DefaultUserInfoType {
    userId: number;
    userName: string;
    userAvatar: string;
    createTime: string;
    email: string;
    postCount: number;
    storeCount: number;
    coinCount: number;
    userLevel: string;
    member: boolean;
    memberExpireAt: string;
}