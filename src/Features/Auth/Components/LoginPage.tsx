import { useState } from 'react';
import React from 'react';
import SignInModalWindow from './SignInModalWindow.tsx';
import SignUpModalWindow from './SingUpModalWindow.tsx';
// import Button from './Button.tsx';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import '../Styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext.tsx';
import config from '../../../Configurations/Config.ts';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const {accessToken} = useAuth();
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

    const handleGoToUserPage = () => {
        navigate(config.PatientPageUrl);
    }

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
            <button onClick={handleGoToUserPage}>go to user page</button>
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