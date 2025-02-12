import React from 'react';
import { TextField, Button } from '@mui/material';
import '../Styles/PatientModalWindow.css';
import { FilterPatientsModalWindowProps } from '../Types/FilterPatientsModalWindowProps.ts';

const FilterPatientsModalWindow: React.FC<FilterPatientsModalWindowProps> = ({
    filterFirstName,
    filterLastName,
    filterMiddleName,
    filterPhoneNumber,
    setFilterFirstName,
    setFilterLastName,
    setFilterMiddleName,
    setFilterPhoneNumber,
    handleApplyBtn,
    handleCloseFiltersBtn,
}) => {

    return (
        <div className="filter-modal-overlay">
            <div className="filter-modal-window">
                <button 
                    className="close-button"
                    onClick={handleCloseFiltersBtn}
                >
                    &times;
                </button>
                <TextField 
                    id="standard-basic" 
                    label="First Name" 
                    variant="standard" 
                    className="filter-input"
                    value={filterFirstName}
                    onChange={(e) => setFilterFirstName(e.target.value)} 
                />
                <TextField 
                    id="standard-basic" 
                    label="Middle Name" 
                    variant="standard" 
                    className="filter-input"
                    value={filterMiddleName}
                    onChange={(e) => setFilterMiddleName(e.target.value)} 
                />
                <TextField 
                    id="standard-basic" 
                    label="Last Name" 
                    variant="standard" 
                    className="filter-input"
                    value={filterLastName}
                    onChange={(e) => setFilterLastName(e.target.value)} 
                />
                <TextField 
                    id="standard-basic" 
                    label="Phone Number" 
                    variant="standard" 
                    className="filter-input"
                    value={filterPhoneNumber}
                    onChange={(e) => setFilterPhoneNumber(e.target.value)} 
                />
                <Button onClick={handleApplyBtn}>Apply</Button>
            </div>
        </div>
    );
}

export default FilterPatientsModalWindow;