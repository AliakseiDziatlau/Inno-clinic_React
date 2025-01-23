import React from 'react';
import TextField from '@mui/material/TextField';
import '../Styles/DoctorFiltersContainer.css';
import Button from '@mui/material/Button';

const DoctorFiltersContainer: React.FC = () => {
    return (
        <div className="filters-container">
            <TextField id="standard-basic" label="Full Name" variant="standard" className="filter-input" />
            <TextField id="standard-basic" label="Office" variant="standard" className="filter-input" />
            <Button variant="text">Apply</Button>
        </div>
    );
}

export default DoctorFiltersContainer;