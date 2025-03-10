import { useState } from 'react';
import React from 'react';
import { SignUpModalWindowProps } from '../Types/SignUpModalWindowProps';
import Button from '@mui/material/Button';
import PasswordInput from './PasswordInput.tsx';
import ReenterPassword from './ReenterPassword.tsx';
import EmailInput from './EmailInput.tsx';
import PhoneInput from './PhoneInput.tsx';
import '../Styles/ModalWindow.css';
import { registerUser } from '../Api/Auth.ts'


const SignUpModalWindow: React.FC<SignUpModalWindowProps> = ({
    closeSignUpModalWindow,
    handleFromSignUpToSignIn,
}) => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [reenterPassword, setReenterPassword] = useState<string>('');
    const [reenterPasswordError, setReenterPasswordError] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');

    const handleSignUpButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (password !== reenterPassword) {
            alert("Passwords do not match");
            return;
        }

        const formData = {
            email,
            PhoneNumber: phone,
            password,
            role: 'Patient',
        };

        const signUpResult: boolean = await registerUser(formData);

        if (signUpResult) {
            alert('Sign up successful!');
            closeSignUpModalWindow();
        } else {
            alert('An error occurred while signing up. Please try again.');
        }
    };

    const isFormValid = (): boolean => {
        return (
            !!email &&
            !emailError &&
            !!phone &&
            !phoneError &&
            !!password &&
            !passwordError &&
            !!reenterPassword &&
            !reenterPasswordError
        );
    };

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <button className="close-button" onClick={closeSignUpModalWindow}>
                    &times;
                </button>
                <h2>Sign Up</h2>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <EmailInput
                            email={email}
                            setEmail={setEmail}
                            emailError={emailError}
                            setEmailError={setEmailError}
                            isSignUp={true}
                        />
                        <PhoneInput
                            phone={phone}
                            setPhone={setPhone}
                            phoneError={phoneError}
                            setPhoneError={setPhoneError}
                        />
                        <PasswordInput
                            password={password}
                            setPassword={setPassword}
                            passwordError={passwordError}
                            setPasswordError={setPasswordError}
                        />
                        <ReenterPassword
                            passwordToMatch={password}
                            reenterPassword={reenterPassword}
                            setReenterPassword={setReenterPassword}
                            reenterPasswordError={reenterPasswordError}
                            setReenterPasswordError={setReenterPasswordError}
                        />
                    </div>
                    <div className="button-container">
                        <Button
                            variant="contained"
                            onClick={handleSignUpButton}
                            disabled={!isFormValid()}
                        >
                            Sign up
                        </Button>
                    </div>
                </div>
                <p>
                    Already have an account?{' '}
                    <span className="sign-link" onClick={handleFromSignUpToSignIn}>
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignUpModalWindow;