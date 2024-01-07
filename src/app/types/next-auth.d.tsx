import { User } from "next-auth";

declare module "next-auth" {
    interface SessionUser extends User{
        id: string;
        userName:string,
        avatar:string,
        authToken:string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub?:string;
        user_id?:string;
        iss?:string;
        exp?:number,
    }
}