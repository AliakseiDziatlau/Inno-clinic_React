import { useState, useEffect } from 'react'
import React from 'react';
import { SignInModalWindowProps } from '../Types/SignInModalWindowProps';
import Button from '@mui/material/Button';
import PasswordInputSignIn from './PasswordInputSignIn.tsx';
import EmailInput from './EmailInput.tsx';
import '../Styles/ModalWindow.css';
import { loginUser } from '../Api/Auth.ts';
import { useNavigate } from 'react-router-dom';
import { TokensObject } from '../Types/TokensObject.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';
import config from '../../../Configurations/Config.ts';
import { LoginResult } from '../Types/LoginResult.ts';

const SignInModalWindow: React.FC<SignInModalWindowProps> = ({
    closeSignInModalWindow,
    handleFromSingInToSignUp,
    signInError,
    setSignInError,
}) => {
    const { setAccessToken, accessToken, setUserRole } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>(null);

    const handleSignInButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = {
            email,
            password,
        };

        const loginResult:LoginResult | null = await loginUser(formData);

        if (loginResult !== null) {
            setIsSigningIn(true);
            setAccessToken(loginResult.accessToken);
            setUserRole(loginResult.userRole);
            setRole(loginResult.userRole);
            console.log(loginResult.accessToken);
        } else {
            setSignInError(true);
        }
    };

    useEffect(() => {
        if (accessToken && isSigningIn) {
            console.log(`Access token: ${accessToken}`);
    
            if (role === 'Patient') {
                localStorage.setItem("role", "Patient");  
                navigate(config.PatientPageUrl, { state: { email } });
            } else if (role === 'Doctor') {
                localStorage.setItem("role", "Doctor");  
                navigate(config.DoctorPageUrl, { state: { email } });
            } else if (role === 'Receptionist') {
                localStorage.setItem("role", "Receptionist");  
                navigate(config.ReceptionistPageUrl, { state: { email } });
            } else {
                console.error("role is undefined");
            }
    
            setIsSigningIn(false);
        }
    }, [accessToken, isSigningIn, navigate, email, role]); 


    const isFormValid = (): boolean => {
        return !!(email && !emailError && password && !passwordError);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <button className="close-button" onClick={closeSignInModalWindow}>
                    &times;
                </button>
                <h2>Sign In</h2>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <EmailInput
                            email={email}
                            setEmail={setEmail}
                            emailError={emailError}
                            setEmailError={setEmailError}
                            isSignUp={false}
                        />
                        <PasswordInputSignIn
                            password={password}
                            setPassword={setPassword}
                            passwordError={passwordError}
                            setPasswordError={setPasswordError}
                            signInError={signInError}
                            setSignInError={setSignInError}
                        />
                    </div>
                    <div className="button-container">
                        <Button
                            variant="contained"
                            onClick={handleSignInButton}
                            disabled={!isFormValid()}
                        >
                            Sign in
                        </Button>
                    </div>
                </div>
                <p>
                    Don't have an account?{' '}
                    <span className="sign-link" onClick={handleFromSingInToSignUp}>
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignInModalWindow;