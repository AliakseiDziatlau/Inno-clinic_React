import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import '../Styles/CancelModalWindow.css';
import { CancelModalWindowProps } from '../Types/CancelModalWindowProps.ts';

const CancelModalWindow: React.FC<CancelModalWindowProps> = ({
    handleYesOnCancelModalWindow,
    handleNoOnCancelModalWindow,
}) => {
    return (
        <div className="modal-overlay-cancel">
            <div className="modal-window-cancel">
                <h1 className="cancel-header">Do you really want to cancel?</h1>
                <p>Entered data will not be saved.</p>
                <ButtonGroup 
                    variant="text" 
                    aria-label="Basic button group"
                >
                    <Button onClick={handleYesOnCancelModalWindow}>Yes</Button>
                    <Button onClick={handleNoOnCancelModalWindow}>No</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default CancelModalWindow;