import config from '../../../Configurations/Config.ts';
import { Office } from "../Types/Office.ts";
import { getCoordinates } from './GetCoordinates.ts';

export const getOffices = async (): Promise<Office[]> => {
    try {
        const response = await fetch(`${config.OfficeServiceGetAllOffices}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`${response.statusText}`);
        }

        const offices: Office[] = await response.json();

        const officesWithCoords = await Promise.all(
            offices.map(async (office) => {
                const coords = await getCoordinates(office.address);
                return coords
                    ? { ...office, latitude: coords[0], longitude: coords[1] }
                    : office;
            })
        );

        return officesWithCoords;
    } catch (error) {
        console.error("error with offices", error);
        return [];
    }
};

