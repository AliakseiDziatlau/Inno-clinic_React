import { Receptionist } from "../../../Interfaces/Receptionist.ts";
import config from "../../../Configurations/Config.ts";

export const getAllReceptionists = async (): Promise<Receptionist[]> => {
    try {
        const response = await fetch(config.ProfilesServiceGetAllReceptionistsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }, 
        });

        if (response.status === 404) {
            console.warn("Receptionists were not found");
            return [];
        }

        if (!response.ok) {
            throw new Error("Error with receiving receptionists");
        }

        const receptionists: Receptionist[] = await response.json();
        console.log(receptionists);
        return receptionists;
    } catch (error) {
        console.error("Error with receiving receptionists", error);
        return [];
    }
};

export const registerReceptionist = async (
    accessToken,
    email: string,
    password: string,
    phoneNumber: string
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
                role: "Receptionist",
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

export const createReceptionist = async (
    accessToken,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    email: string,
    officeId: string,
    accountId?: number
): Promise<boolean> => {
    try {
        const response = await fetch(config.ProfilesServiceGetAllReceptionistsUrl, {
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
                OfficeId: officeId,
                AccountId: accountId || null
            }),
        });

        if (response.status === 201) {
            console.log("Receptionist created successfully");
            return true;
        }

        const errorData = await response.json();
        console.error("Error creating receptionist:", errorData);
        return false;
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
};

export const updateReceptionist = async (
    accessToken,
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    email: string,
    officeId: string,
    accountId?: number
): Promise<boolean> => {
    try {
        const response = await fetch(`${config.ProfilesServiceGetAllReceptionistsUrl}/${id}`, {
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
                OfficeId: officeId,
                AccountId: accountId || null
            }),
        });

        if (response.status === 204) { 
            console.log(`Receptionist ${id} updated successfully`);
            return true;
        }

        if (response.status === 404) {
            console.error(`Receptionist ${id} not found`);
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

export const deleteReceptionist = async (accessToken, id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${config.ProfilesServiceGetAllReceptionistsUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        });

        if (response.status === 204) { 
            console.log(`Receptionist with ID ${id} deleted successfully`);
            return true;
        }

        if (response.status === 404) {
            console.error(`Receptionist with ID ${id} not found`);
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