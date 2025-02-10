export interface DoctorCardProps {
    photo: string;
    firstName: string;
    middleName: string;
    lastName: string;
    experience: number;
    officeAddress: string;
    onClick: () => void;
}