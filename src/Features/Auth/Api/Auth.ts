import config from '../../../Configurations/Config.ts';
import { TokensObject } from '../Types/TokensObject.ts';
import { LoginResult } from '../Types/LoginResult.ts';

export const checkIfEmailExists = async (email: string): Promise<boolean> => {
    try{
        const response = await fetch(`${config.AuthServiceCheckEmailUrl}${email}`);
        if (!response.ok) throw new Error('Error checking email');
        const data = await response.json();
        console.log(data);
        return data.emailExists;
    }catch(error){
        console.error(error);
        return false;
    }
} 

export const registerUser = async (userData: {
    email: string,
    PhoneNumber: string,
    password: string,
    role: string,
}): Promise<boolean> => {
    try {
        const response = await fetch(config.AuthServiceRegisterUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            return false;
        }
        console.log(await response.json());
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const loginUser = async (userData: {
    email: string,
    password: string,
}): Promise<LoginResult | null> => {
    try{
        const response = await fetch(config.AuthServiceLoginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            return null;
        }
        const loginResult:LoginResult = await response.json();
        // console.log(`Access token from login: ${token.accessToken}`);
        console.log("login result");
        console.log(loginResult);
        return loginResult;
    }catch(error){
        console.error(error);
        return null;
    }
}

export const logout = async (setAccessToken: (token: string | null) => void) => {
    console.log("logout was called")
    try {
        await fetch(config.AuthServiceLogout, {
            method: "POST",
            credentials: "include",
        });
        console.log("logout request was sent")
    } catch (error) {
        console.error("logout error", error);
    }

    console.log("to null is called");
    setAccessToken(null);
    console.log("to null was called");
    localStorage.removeItem("accessToken");
}

export const refreshAccessToken = async (setAccessToken: (token: string | null) => void) => {
    try {
        const response = await fetch(config.AuthServiceRefreshToken, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) throw new Error();

        const data = await response.json();
        setAccessToken(data.accessToken);
    } catch (error) {
        console.error(error);
        setAccessToken(null);
    }
};