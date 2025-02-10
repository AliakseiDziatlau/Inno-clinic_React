export interface SimpleDataInputProps {
    title: string;
    value: string;
    isTouched: boolean;
    error: string;
    type: string;
    disabled: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: () => void;
}