import { Photo } from "../../../Interfaces/Photo";

export interface CreateReceptionistWindowProps {
    photoList: Photo[]
    handleCloseCreateReceptionistWindow: () => void;
}