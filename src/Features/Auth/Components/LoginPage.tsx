import { useState } from 'react';
import React from 'react';
import SignInModalWindow from './SignInModalWindow.tsx';
import SignUpModalWindow from './SingUpModalWindow.tsx';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import '../Styles/LoginPage.css';

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

    return (
        <div className='login-page-container'>
            <h1 className='inno-clinic'>INNO-CLINIC</h1>
            <p className='choosing-option'>Choose your option</p>
            <ButtonGroup 
                variant="text" 
                aria-label="Basic button group"
            >
                <Button onClick={openSignUpModalWindow}>Sign Up</Button>
                <Button onClick={openSignInModalWindow}>Sign In</Button>
            </ButtonGroup>
            {isSignUpWindow && (
                <SignUpModalWindow
                    closeSignUpModalWindow={closeSignUpModalWindow}
                    handleFromSignUpToSignIn={handleFromSignUpToSignIn}
                />
            )}
            {isSignInWindow && (
                <SignInModalWindow
                    closeSignInModalWindow={closeSignInModalWindow}
                    handleFromSingInToSignUp={handleFromSignInToSignUp}
                    signInError={signInError}
                    setSignInError={setSignInError}
                />
            )}
        </div>
    );
};

export default LoginPage;