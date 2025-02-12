import { Doctor } from './Doctor.ts'
import { Office } from './Office.ts';

export interface DoctorFiltersContainerProps {
    doctorList: Doctor[];
    filteredDoctorList: Doctor[];
    setFilteredDoctorsList: (doctrs: Doctor[]) => void;
    filterOfficeFromMap: string;
    officeList: Office[];
    isLoading: boolean;
}