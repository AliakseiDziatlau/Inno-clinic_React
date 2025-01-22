export interface PasswordInputProps {
    password: string;
    setPassword: (value: string) => void;
    passwordError: string;
    setPasswordError: (error: string) => void;
}