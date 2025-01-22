export interface PhoneInputProps {
    phone: string;
    setPhone: (value: string) => void;
    phoneError: string;
    setPhoneError: (error: string) => void;
}