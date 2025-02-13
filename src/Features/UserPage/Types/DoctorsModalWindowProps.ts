import { Photo } from '../../../Interfaces/Photo.ts';
import { User } from '../../../Interfaces/User.ts';
import { Doctor } from './Doctor.ts'
import { Office } from './Office.ts';

export interface DoctorsModalWindowProps {
    closeDoctorsModalWindow: () => void;
    doctorsList: Doctor[];
    filterOffice: string;
    officeList: Office[];
    photoList: Photo[];
    userList: User[];
    isLoading: boolean;
}