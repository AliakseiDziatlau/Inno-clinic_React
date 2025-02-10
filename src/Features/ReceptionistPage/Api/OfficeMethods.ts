import config from "../../../Configurations/Config.ts";

export const createOffice = async (
    address: string,
    registryPhoneNumber: string,
    isActive: boolean,
    photoId?: number
): Promise<boolean> => {
    try {
        const response = await fetch(config.OfficeServiceGetAllOffices, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", 
            body: JSON.stringify({
                Address: address,
                RegistryPhoneNumber: registryPhoneNumber,
                IsActive: isActive,
                PhotoId: photoId || null, 
            }),
        });

        if (response.status === 201) {
            console.log("Office created successfully");
            return true;
        }

        const errorData = await response.json();
        console.error(errorData.message);
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};