import { Photo } from "../../../Interfaces/Photo";

export interface CreateOfficeWindowProps {
    photoList: Photo[];    
    handleCloseCreateOfficeWindow: () => void;
}