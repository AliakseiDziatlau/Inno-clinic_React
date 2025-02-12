import React from 'react';
import { useState } from 'react';
import { Doctor } from '../Types/Doctor.ts';
import '../Styles/DoctorsModalWindow.css';
import { DoctorsModalWindowProps } from '../Types/DoctorsModalWindowProps';
import DoctorCardsContainer from './DoctorsCardsContainer.tsx';
import DoctorFiltersContainer from './DoctorFiltersContainer.tsx';

const DoctorsModalWindow: React.FC<DoctorsModalWindowProps> = ({
    closeDoctorsModalWindow,
    doctorsList,
    filterOffice,
    officeList,
    isLoading,
}) => {
    const [filteredDoctorsList, setFilteredDoctorsList] = useState<Doctor[]>(doctorsList);

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <div>
                    <button 
                        className="close-button"
                        onClick={closeDoctorsModalWindow}
                    >
                        &times;
                    </button>
                    <DoctorFiltersContainer 
                        doctorList={doctorsList}
                        filteredDoctorList={filteredDoctorsList} 
                        setFilteredDoctorsList={setFilteredDoctorsList}
                        filterOfficeFromMap={filterOffice}
                        officeList={officeList}
                        isLoading={isLoading}
                    />
                    <DoctorCardsContainer filteredDoctorsList={filteredDoctorsList} />
                </div>
            </div>
        </div>
    );
}

export default DoctorsModalWindow;