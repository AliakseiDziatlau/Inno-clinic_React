import { Doctor } from "../../UserPage/Types/Doctor";
import { Office } from "../../UserPage/Types/Office";

export interface DoctorFiltersContainerProps {
    doctorList: Doctor[];
    filteredDoctorList: Doctor[];
    setFilteredDoctorList: (doctors: Doctor[]) => void;
    officeList: Office[];
}