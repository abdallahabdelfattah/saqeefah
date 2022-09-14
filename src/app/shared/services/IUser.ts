export interface IUser{
    adminId:string;
    expires?:string;
    permissions?:[];
    refreshToken?:string
    token: string;
    fullName: string;
    email: string;
    phone: string;
    active: boolean;
    roleNames:Array<string>;
}


