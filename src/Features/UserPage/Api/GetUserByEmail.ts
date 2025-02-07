import config from '../../../Configurations/Config.ts';

export const getUserByEmail = async (email: string) => {
    try {
        const response = await fetch(`${config.ProfilesServicePatientsUrl}/email/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch patient: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching patient:", error);
        return null; 
    }
};