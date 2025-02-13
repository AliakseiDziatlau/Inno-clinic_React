import { Photo } from "../../../Interfaces/Photo";
import { User } from "../../../Interfaces/User";
import { Doctor } from "../../UserPage/Types/Doctor";
import { Office } from "../../UserPage/Types/Office";

export interface DoctorFiltersContainerProps {
    doctorList: Doctor[];
    filteredDoctorList: Doctor[];
    setFilteredDoctorList: (doctors: Doctor[]) => void;
    filteredUserList: User[];
    setFilteredUserList: (user: User[]) => void;
    filteredPhotoList: Photo[];
    setFilteredPhotoList: (photo: Photo[]) => void;
    officeList: Office[];
    handleOpenCreateDoctorWindow: () => void;
}