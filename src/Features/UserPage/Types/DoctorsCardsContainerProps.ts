import { Photo } from '../../../Interfaces/Photo.ts';
import { User } from '../../../Interfaces/User.ts';
import { Doctor } from './Doctor.ts' 

export interface DoctorsCardsContainerProps {
    filteredDoctorsList: Doctor[];
    filteredPhotoList: Photo[];
    filteredUserList: User[];
}