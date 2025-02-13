import { Photo } from "../Interfaces/Photo";
import config from "../Configurations/Config.ts";

export const fetchPhotos = async (): Promise<Photo[]> => {
    try {
        const response = await fetch(config.DocumentsServiceUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch documents");
        }

        const data: Photo[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
};

export const fetchPhotoById = async (documentId: string): Promise<Photo | null> => {
    try {
        const response = await fetch(`${config.DocumentsServiceUrl}/${documentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.warn("Photo not found");
                return null;
            }
            throw new Error("Failed to fetch photo");
        }

        const data: Photo = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching photo:", error);
        return null;
    }
};