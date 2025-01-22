import { useState } from 'react'
import React from 'react';
import { SignInModalWindowProps } from '../Types/SignInModalWindowProps';
import Button from '@mui/material/Button';
import PasswordInputSignIn from './PasswordInputSignIn.tsx';
import EmailInput from './EmailInput.tsx';
import '../Styles/ModalWindow.css';
import config from '../Configurations/Config.ts';
import { loginUser } from '../Api/Auth.ts';

const SignInModalWindow: React.FC<SignInModalWindowProps> = ({
    closeSignInModalWindow,
    handleFromSingInToSignUp,
    signInError,
    setSignInError,
}) => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const handleSignInButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = {
            email,
            password,
        };

        const signInResult: boolean = await loginUser(formData);

        if (signInResult) {
            alert('Sign in successful!');
             closeSignInModalWindow();
        } else {
            setSignInError(true);
        }
    };

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
                    <Button
                        variant="contained"
                        onClick={handleSignInButton}
                        disabled={!isFormValid()}
                    >
                        Sign in
                    </Button>
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