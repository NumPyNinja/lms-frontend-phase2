import { UserRoleMaps } from "./user-role-maps";

export interface User {
    userComments?: string;
    userVisaStatus?: string;
    userFirstName?: string;
    userMiddleName?:string;
    userLastName?: string;
    userPhoneNumber?: string;
    userLocation?: string;
    userLinkedinUrl?: string;
    userEduUg?: string;
    userEduPg?: string,
    userTimeZone?: string,
    user_id?:string,
    userRoleMaps?: UserRoleMaps;
    userName?: string;
    password?: string;
}
