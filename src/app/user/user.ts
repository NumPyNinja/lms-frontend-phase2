import { UserRoleMaps } from "./user-role-maps";

export interface User {

    userId?:string,
    firstName?: string;
    middleName?:string;
    lastName?: string;
    emailAddress?: string;
    phoneNumber?: number;
    address?: string;
    location?: string;
    timezone?: string;
    linkedUrl?: string;
    ugProgram?: string;
    pgProgram?: string;
    skill?: string;
    experience?: string;
    comments?: string;
    fileType?: string;
    userRole?: string;
    batch?: string;
    program?: string;
    visaStatus?:string;
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
    userId?:string,
    userRoleMaps?: UserRoleMaps;
    userName?: string;
    password?: string;
}
