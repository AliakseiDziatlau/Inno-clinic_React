import { Patient } from "../../../Interfaces/Patient.ts";

export interface PatientModalWindowProps {
    patientList: Patient[];
    isLoading: boolean;
    handleClosePatientWindow: () => void;
}