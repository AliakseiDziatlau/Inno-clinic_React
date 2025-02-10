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