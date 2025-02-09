export interface SimpleDataInputProps {
    title: string;
    value: string;
    isTouched: boolean;
    error: string;
    type: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: () => void;
}