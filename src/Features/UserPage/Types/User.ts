export interface User {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string; 
    isLinkedToAccount: boolean;
    accountId?: number | null; 
}