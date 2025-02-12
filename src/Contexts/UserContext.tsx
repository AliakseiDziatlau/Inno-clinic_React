import React, { createContext, useContext, useState } from 'react';
import { getUserByEmail } from '../Features/UserPage/Api/GetUserByEmail.ts';
import { User } from '../Features/UserPage/Types/User';

interface UserContextType {
    currUser: User | null;
    setCurrUser: React.Dispatch<React.SetStateAction<User | null>>;
    fetchUser: (email: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currUser, setCurrUser] = useState<User | null>(null);

    const fetchUser = async (email: string) => {
        try {
            const user = await getUserByEmail(email);
            setCurrUser(user);
        } catch (error) {
            console.error("Ошибка загрузки пользователя:", error);
        }
    };

    return (
        <UserContext.Provider value={{ currUser, setCurrUser, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error();
    }
    return context;
};

