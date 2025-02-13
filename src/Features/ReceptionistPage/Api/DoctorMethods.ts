import config from "../../../Configurations/Config.ts";

export const registerDoctor = async (
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
                role: "Doctor",
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

export const createDoctorProfile = async (
    accessToken,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string, 
    specializationId: number,
    officeId: string,
    careerStartYear: string,
    status: string
): Promise<boolean> => {
    try {
        const response = await fetch(config.ProfilesServiceCreateDoctorsProfileUrl, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                firstName,
                lastName,
                middleName,
                phoneNumber,
                email,
                dateOfBirth,
                specializationId,
                officeId,
                careerStartYear,
                status,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Doctors profile creating error");
        }

        console.log("Doctors profile created successfully");
        return true;
    } catch (error) {
        console.error("Creating doctors profile error", error);
        return false;
    }
};

export const updateDoctor = async (
    accessToken,
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string, 
    officeId: string,
    careerStartYear: number,
    status: string
): Promise<boolean> => {
    try {
        const response = await fetch(`${config.ProfilesServiceGetAllDoctorsUrl}${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            credentials: "include",
            body: JSON.stringify({
                firstName,
                lastName,
                middleName,
                phoneNumber,
                email,
                dateOfBirth,
                officeId,
                careerStartYear,
                status
            }),
        });

        if (response.status === 204) {
            console.log(`Doctor with ${id} successfully updated`);
            return true;
        }

        if (response.status === 404) {
            const errorData = await response.json();
            console.error(`Error: ${errorData.message}`);
            return false;
        }

        throw new Error("Undefined error");
    } catch (error) {
        console.error("Update error", error);
        return false;
    }
};
