export interface EmailInputProps {
    email: string;
    setEmail: (value: string) => void;
    emailError: string;
    setEmailError: (error: string) => void;
    isSignUp: boolean;
}