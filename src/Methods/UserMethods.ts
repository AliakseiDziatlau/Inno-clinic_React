import { User } from "../Interfaces/User";
import config from "../Configurations/Config.ts";

export const fetchUsers = async (accessToken): Promise<User[]> => {
    try {
        const response = await fetch(config.AuthServiceGetAllUsers, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const data: User[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const fetchUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const response = await fetch(`${config.AuthServiceUrl}/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.warn("User not found");
                return null;
            }
            throw new Error("Failed to fetch user");
        }

        const data: User = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};