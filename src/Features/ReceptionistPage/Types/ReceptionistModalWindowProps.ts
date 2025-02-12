import { Receptionist } from "../../../Interfaces/Receptionist.ts";
import { Office } from "../../UserPage/Types/Office.ts";

export interface ReceptionistModalWindowProps {
    receptionistsList: Receptionist[];
    officesList: Office[];
    isLoading: boolean;
    handleCloseReceptionistWindow: () => void;
    handleOpenCreateReceptionistWindow: () => void;
}