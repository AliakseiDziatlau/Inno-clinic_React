import { Doctor } from '../Types/Doctor.ts'

export const doctors: Doctor[] = [
    {
        Id: 1,
        FirstName: "Alex",
        LastName: "Doc",
        MiddleName: "Md",
        PhoneNumber: "111",
        Email: "email",
        DateOfBirth: new Date("1990-05-10"),
        AccountId: 1,
        SpecializationId: 1,
        OfficeId: "ddd",
        CareerStartYear: 2015,
        Status: "At Work",
    },
    {
        Id: 2,
        FirstName: "Name",
        LastName: "Ln",
        MiddleName: "Middle",
        PhoneNumber: "222",
        Email: "email2",
        DateOfBirth: new Date("2000-05-10"),
        AccountId: 2,
        SpecializationId: 2,
        OfficeId: "ccc",
        CareerStartYear: 2022,
        Status: "At Work",
    }
]