import { Patient } from "../../../Interfaces/Patient.ts";
import config from "../../../Configurations/Config.ts";

export const getAllPatients = async (): Promise<Patient[]> => {
    try {
        const response = await fetch(config.ProfilesServicePatientsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 404) {
            console.warn("Patients were not found");
            return [];
        }

        if (!response.ok) {
            console.log('it is not ok')
            throw new Error();
        }

        const patients: Patient[] = await response.json();
        console.log(patients);
        return patients;
    } catch (error) {
        console.error('Error in catch',error);
        return [];
    }
};

export const createPatient = async (
    accessToken,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string,
    isLinkedToAccount: boolean,
    accountId?: number
): Promise<boolean> => {
    try {
        const response = await fetch(config.ProfilesServicePatientsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                FirstName: firstName,
                LastName: lastName,
                MiddleName: middleName,
                PhoneNumber: phoneNumber,
                Email: email,
                DateOfBirth: dateOfBirth,
                IsLinkedToAccount: isLinkedToAccount,
                AccountId: accountId || null
            }),
        });

        if (response.status === 201) {
            console.log("Patient created successfully");
            return true;
        }

        const errorData = await response.json();
        console.error("Error creating patient:", errorData);
        return false;
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
};

export const updatePatient = async (
    accessToken,
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string, 
    isLinkedToAccount: boolean,
    accountId?: number
): Promise<boolean> => {
    try {
        const response = await fetch(`${config.ProfilesServicePatientsUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                FirstName: firstName,
                LastName: lastName,
                MiddleName: middleName,
                PhoneNumber: phoneNumber,
                Email: email,
                DateOfBirth: dateOfBirth,
                IsLinkedToAccount: isLinkedToAccount,
                AccountId: accountId || null
            }),
        });

        if (response.status === 204) { 
            console.log(`Patient ${id} updated successfully`);
            return true;
        }

        if (response.status === 404) {
            console.error(`Patient ${id} not found`);
            return false;
        }

        const errorData = await response.json();
        console.error("Update error", errorData);
        return false;
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
};

export const deletePatient = async (accessToken, id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${config.ProfilesServicePatientsUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        });

        if (response.status === 204) { 
            console.log(`Patient ${id} deleted successfully`);
            return true;
        }

        if (response.status === 404) {
            console.error(`Patient ${id} not found`);
            return false;
        }

        const errorData = await response.json();
        console.error("Delete error", errorData);
        return false;
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
};

export const registerPatient = async (
    accessToken,
    email: string,
    password: string,
    phoneNumber: string,
    documentsId: string,
): Promise<boolean> => {
    try {
        const response = await fetch(config.AuthServiceRegisterUrl, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                email,
                password,
                phoneNumber,
                role: "Patient",
                documentsId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration error");
        }

        console.log("Doctor has been registered successfully");
        return true;
    } catch (error) {
        console.error("Registration error", error);
        return false;
    }
};