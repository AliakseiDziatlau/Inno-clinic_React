export interface ReenterPasswordProps {
    passwordToMatch: string;
    reenterPassword: string;
    setReenterPassword: (value: string) => void;
    reenterPasswordError: string;
    setReenterPasswordError: (error: string) => void;
}