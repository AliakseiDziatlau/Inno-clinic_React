import React from 'react';
import { DoctorModalWindowProps } from '../Types/DoctorModalWindowProps.ts';

const DoctorModalWindow: React.FC<DoctorModalWindowProps> = ({
    handleCloseDoctorWindow,
}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <button 
                    className="close-button"
                    onClick={handleCloseDoctorWindow}
                >
                    &times;
                </button>
            </div>
        </div>
    );
}

export default DoctorModalWindow;