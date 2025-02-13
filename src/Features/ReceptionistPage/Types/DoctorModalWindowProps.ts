import { Photo } from "../../../Interfaces/Photo.ts";
import { User } from "../../../Interfaces/User.ts";
import { Doctor } from "../../UserPage/Types/Doctor.ts";
import { Office } from "../../UserPage/Types/Office.ts";

export interface DoctorModalWindowProps {
    handleCloseDoctorWindow: () => void;
    doctorList: Doctor[];
    officeList: Office[];
    photoList: Photo[];
    userList: User[];
    isLoading: boolean;
    handleOpenCreateDoctorWindow: () => void;
}