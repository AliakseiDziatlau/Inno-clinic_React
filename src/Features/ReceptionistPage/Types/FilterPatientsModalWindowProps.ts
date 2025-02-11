import { Patient } from "../../../Interfaces/Patient.ts";

export interface FilterPatientsModalWindowProps {
    filterFirstName: string;
    filterLastName: string;
    filterMiddleName: string;
    filterPhoneNumber: string;
    setFilterFirstName: (string) => void; 
    setFilterLastName: (string) => void; 
    setFilterMiddleName: (string) => void;
    setFilterPhoneNumber: (string) => void;
    handleApplyBtn: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleCloseFiltersBtn: () => void;
}