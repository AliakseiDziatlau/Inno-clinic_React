export interface EmailInputProps {
    checkIfEmailExists: (email: string) => Promise<boolean>;
    email: string;
    setEmail: (value: string) => void;
    emailError: string;
    setEmailError: (error: string) => void;
    isSignUp: boolean;
}