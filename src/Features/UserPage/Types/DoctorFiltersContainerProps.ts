import { Photo } from '../../../Interfaces/Photo.ts';
import { User } from '../../../Interfaces/User.ts';
import { Doctor } from './Doctor.ts'
import { Office } from './Office.ts';

export interface DoctorFiltersContainerProps {
    doctorList: Doctor[];
    filteredDoctorList: Doctor[];
    setFilteredDoctorsList: (doctrs: Doctor[]) => void;
    filteredUserList: User[];
    setFilteredUserList: (user: User[]) => void;
    filteredPhotoList: Photo[];
    setFilteredPhotoList: (photo: Photo[]) => void;
    filterOfficeFromMap: string;
    officeList: Office[];
}