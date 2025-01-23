import React from 'react';
import '../Styles/DoctorsModalWindow.css';
import { DoctorsModalWindowProps } from '../Types/DoctorsModalWindowProps';
import DoctorCardsContainer from './DoctorsCardsContainer.tsx';
import DoctorFiltersContainer from './DoctorFiltersContainer.tsx'

const DoctorsModalWindow: React.FC<DoctorsModalWindowProps> = ({
    closeDoctorsModalWindow,
    doctorsList
}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <button 
                    className="close-button"
                    onClick={closeDoctorsModalWindow}
                >
                    &times;
                </button>
                <DoctorFiltersContainer/>
                <DoctorCardsContainer doctorsList={doctorsList}/>
            </div>
        </div>
    );
}

export default DoctorsModalWindow;