import { Doctor } from './Doctor.ts'

export interface DoctorFiltersContainerProps {
    doctorList: Doctor[];
    filteredDoctorList: Doctor[];
    setFilteredDoctorsList: (doctrs: Doctor[]) => void;
}