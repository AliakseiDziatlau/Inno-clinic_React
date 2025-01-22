import { useState } from 'react';
import React from 'react';
import SignInModalWindow from './SignInModalWindow.tsx';
import SignUpModalWindow from './SingUpModalWindow.tsx';
import Button from './Button.tsx';
import config from '../Configurations/Config.ts'

const LoginPage: React.FC = () => {
    const [isSignUpWindow, setIsSignUpWindow] = useState<boolean>(false);
    const [isSignInWindow, setIsSignInWindow] = useState<boolean>(false);
    const [signInError, setSignInError] = useState<boolean>(false);

    const openSignUpModalWindow = () => {
        setIsSignUpWindow(true);
    };

    const closeSignUpModalWindow = () => {
        setIsSignUpWindow(false);
    };

    const openSignInModalWindow = () => {
        setIsSignInWindow(true);
    };

    const closeSignInModalWindow = () => {
        setIsSignInWindow(false);
    };

    const handleFromSignInToSignUp = () => {
        setIsSignInWindow(false);
        setIsSignUpWindow(true);
    };

    const handleFromSignUpToSignIn = () => {
        setIsSignUpWindow(false);
        setIsSignInWindow(true);
    };

    const checkIfEmailExists = async (email: string): Promise<boolean> => {
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

    return (
        <div>
            <Button onClick={openSignUpModalWindow}>Sign up</Button>
            <Button onClick={openSignInModalWindow}>Sign in</Button>
            {isSignUpWindow && (
                <SignUpModalWindow
                    closeSignUpModalWindow={closeSignUpModalWindow}
                    handleFromSignUpToSignIn={handleFromSignUpToSignIn}
                    checkIfEmailExists={checkIfEmailExists}
                />
            )}
            {isSignInWindow && (
                <SignInModalWindow
                    closeSignInModalWindow={closeSignInModalWindow}
                    handleFromSingInToSignUp={handleFromSignInToSignUp}
                    checkIfEmailExists={checkIfEmailExists}
                    signInError={signInError}
                    setSignInError={setSignInError}
                />
            )}
        </div>
    );
};

export default LoginPage;