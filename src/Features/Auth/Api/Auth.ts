import config from '../../../Configurations/Config.ts'

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
}): Promise<boolean> => {
    try{
        const response = await fetch(config.AuthServiceLoginUrl, {
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
    }catch(error){
        console.error(error);
        return false;
    }
}