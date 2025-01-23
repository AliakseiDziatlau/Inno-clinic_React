import { Doctor } from './Doctor.ts'

export interface DoctorsModalWindowProps {
    closeDoctorsModalWindow: () => void;
    doctorsList: Doctor[];
}