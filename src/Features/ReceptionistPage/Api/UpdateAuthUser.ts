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