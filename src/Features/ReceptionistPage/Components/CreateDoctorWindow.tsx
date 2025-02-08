import React from "react";
import { CreateDoctorWindowProps } from "../Types/CreateDoctorWindowProps";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import '../Styles/CreateDoctorWindow.css';

const CreateDoctorWindow: React.FC<CreateDoctorWindowProps> = ({
    handleCloseCreateDoctorWindow,
}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <h1>Create Doctor</h1>
                <div className="inline-container">
                    <TextField 
                        id="standard-basic" 
                        label="First Name" 
                        variant="standard" 
                        className="filter-input"
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Last Name" 
                        variant="standard" 
                        className="filter-input"
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Middle Name" 
                        variant="standard" 
                        className="filter-input"
                    />
                </div>
                <div className="inline-container">
                    <TextField 
                        id="standard-basic" 
                        label="Date Of Birth" 
                        variant="standard" 
                        className="filter-input"
                    />
                    <TextField 
                        id="standard-basic" 
                        label="E-mail" 
                        variant="standard" 
                        className="filter-input"
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Specialization" 
                        variant="standard" 
                        className="filter-input"
                    />
                </div>
                <div className="inline-container">
                    <TextField 
                        id="standard-basic" 
                        label="Office" 
                        variant="standard" 
                        className="filter-input"
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Start Year" 
                        variant="standard" 
                        className="filter-input"
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Status" 
                        variant="standard" 
                        className="filter-input"
                    />
                </div>
                <ButtonGroup 
                    variant="text" 
                    aria-label="Basic button group"
                >
                    <Button>Confirm</Button>
                    <Button onClick={handleCloseCreateDoctorWindow}>Cancel</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default CreateDoctorWindow;