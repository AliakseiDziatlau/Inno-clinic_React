import { Doctor } from "../../UserPage/Types/Doctor.ts";
import { Office } from "../../UserPage/Types/Office.ts";

export interface DoctorModalWindowProps {
    handleCloseDoctorWindow: () => void;
    doctorList: Doctor[];
    officeList: Office[];
    isLoading: boolean;
}