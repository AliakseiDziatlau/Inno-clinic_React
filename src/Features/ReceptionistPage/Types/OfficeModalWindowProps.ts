import { Office } from "../../UserPage/Types/Office";

export interface OfficeModalWindowProps {
    officeList: Office[];
    isLoading: boolean;
    handleCloseOfficeWindow: () => void; 
    handleOpenCreateOfficeWindow: () => void;
}