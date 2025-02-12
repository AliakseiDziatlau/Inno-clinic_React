import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DeleteModalWindowProps } from '../Types/DeleteModalWindowProps.ts';

const DeleteModalWindow: React.FC<DeleteModalWindowProps> = ({
    handleNoOnDeleteWindow,
    handleYesOnDeleteWindow,
}) => {
    return (
        <div className="modal-overlay-cancel">
            <div className="modal-window-cancel">
            <h1 className="cancel-header">Do you really want to delete?</h1>
                <p>Data will be lost.</p>
                <ButtonGroup 
                    variant="text" 
                    aria-label="Basic button group"
                >
                    <Button onClick={handleYesOnDeleteWindow}>Yes</Button>
                    <Button onClick={handleNoOnDeleteWindow}>No</Button>
                </ButtonGroup>                
            </div>
        </div>
    );
}

export default DeleteModalWindow;