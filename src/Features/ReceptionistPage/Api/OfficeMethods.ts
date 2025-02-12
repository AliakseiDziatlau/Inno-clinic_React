import config from "../../../Configurations/Config.ts";

export const createOffice = async (
    accessToken,
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
                "Authorization": `Bearer ${accessToken}` 
            },
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

export const updateOffice = async (
    accessToken, 
    id: string, 
    address: string, 
    registryPhoneNumber: string, 
    isActive: boolean, 
    photoId?: number
): Promise<boolean> => {
    try {
        const response = await fetch(`${config.OfficeServiceGetAllOffices}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}` 
            },
            body: JSON.stringify({
                Id: id,
                Address: address,
                RegistryPhoneNumber: registryPhoneNumber,
                IsActive: isActive,
                PhotoId: photoId || null,
            }),
        });

        if (response.status === 204) { 
            console.log(`Office ${id} updated successfully`);
            return true;
        }

        const errorData = await response.json();
        console.error("Update error", errorData.message);
        return false;
    } catch (error) {
        console.error("Fetch error ", error);
        return false;
    }
};