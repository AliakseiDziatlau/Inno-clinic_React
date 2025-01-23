import config from '../../../Configurations/Config.ts'
import { Doctor } from '../Types/Doctor.ts'

export const getDoctorsList = async(): Promise<Doctor[]> => {
    try{
        const response = await fetch(config.ProfilesServiceGetAllDoctorsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch doctors: ${response.statusText}`);
        }

        const data: Doctor[] = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.error("Error fetching doctors:", error);
        throw error;
    }
}