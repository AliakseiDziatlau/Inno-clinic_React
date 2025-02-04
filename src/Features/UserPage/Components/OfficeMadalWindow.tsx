import React from 'react';
import '../Styles/DoctorsModalWindow.css';
import { OfficeModalWindowProps } from '../Types/OfficeModalWindowProps.ts';
import Button from '@mui/material/Button';

const OfficeModalWindow: React.FC<OfficeModalWindowProps> = ({
    handleCloseModalWindow
}) => {

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <button 
                    className="close-button"
                    onClick={handleCloseModalWindow}
                >
                    &times;
                </button>
                <img 
                    src="/img/office.jpg" 
                    alt="Office"
                    className="modal-image"
                />
                <p>Address</p>
                <Button variant="text">Apply</Button>
            </div>
        </div>
    );
}

export default OfficeModalWindow;