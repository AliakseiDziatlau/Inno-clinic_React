export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Date;
    accountId: number;
    specializationId: number;
    officeId: string;
    careerStartYear: number;
    status: string;
}