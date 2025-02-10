export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string; 
    isLinkedToAccount: boolean;
    accountId?: number; 
}