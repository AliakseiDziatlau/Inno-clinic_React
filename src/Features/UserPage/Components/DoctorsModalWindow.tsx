import React from 'react';
import '../Styles/DoctorsModalWindow.css';
import { DoctorsModalWindowProps } from '../Types/DoctorsModalWindowProps';

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
            </div>
        </div>
    );
}

export default DoctorsModalWindow;