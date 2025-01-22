export interface PasswordInputSignInProps {
    password: string;
    setPassword: (value: string) => void;
    passwordError: string;
    setPasswordError: (error: string) => void;
    signInError: boolean;
    setSignInError: (error: boolean) => void;
}