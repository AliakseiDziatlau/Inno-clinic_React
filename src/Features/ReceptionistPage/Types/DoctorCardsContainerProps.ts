import { Photo } from "../../../Interfaces/Photo.ts";
import { User } from "../../../Interfaces/User.ts";
import { Doctor } from "../../UserPage/Types/Doctor.ts"

export interface DoctorCardsContainerProps {
    filteredDoctorList: Doctor[];
    filteredPhotoList: Photo[];
    filteredUserList: User[];
}