import config from "../../../Configurations/Config.ts";

export const updateUser = async (email: string, newEmail?: string, phoneNumber?: string): Promise<boolean> => {
    try {
        const response = await fetch(`${config.AuthServiceUpdateUserUrl}?email=${encodeURIComponent(email)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Email: newEmail || undefined, 
                PhoneNumber: phoneNumber || undefined, 
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error: ${errorData.message}`);
            return false;
        }

        console.log("User was updated successfully");
        return true;
    } catch (error) {
        console.error("User update error", error);
        return false;
    }
};

export const deleteUserByEmail = async (accessToken, email: string): Promise<boolean> => {
    try {
        const response = await fetch(`${config.AuthServiceUrl}/${encodeURIComponent(email)}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        });

        if (response.status === 204) { 
            console.log(`User with email ${email} deleted successfully`);
            return true;
        }

        if (response.status === 404) {
            console.error(`User with email ${email} not found`);
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