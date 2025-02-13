import { Photo } from "../../../Interfaces/Photo";

export interface CreateDoctorWindowProps {
    photoList: Photo[];
    handleCloseCreateDoctorWindow: () => void;
}