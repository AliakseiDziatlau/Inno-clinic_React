import React from 'react';
import '../Styles/DoctorsModalWindow.css';
import { DoctorsModalWindowProps } from '../Types/DoctorsModalWindowProps';
import DoctorCardsContainer from './DoctorsCardsContainer.tsx';

const DoctorsModalWindow: React.FC<DoctorsModalWindowProps> = ({
    closeDoctorsModalWindow,
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

                <DoctorCardsContainer/>
            </div>
        </div>
    );
}

export default DoctorsModalWindow;