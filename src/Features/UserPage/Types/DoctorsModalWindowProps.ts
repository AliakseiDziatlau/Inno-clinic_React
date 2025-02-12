import { Doctor } from './Doctor.ts'
import { Office } from './Office.ts';

export interface DoctorsModalWindowProps {
    closeDoctorsModalWindow: () => void;
    doctorsList: Doctor[];
    filterOffice: string;
    officeList: Office[];
    isLoading: boolean;
}