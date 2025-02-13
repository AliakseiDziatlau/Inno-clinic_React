import { Photo } from "../../../Interfaces/Photo";

export interface CreatePatientWindowProps {
    photoList: Photo[];
    handleCloseCreatePatientModalWindow: () => void;
}