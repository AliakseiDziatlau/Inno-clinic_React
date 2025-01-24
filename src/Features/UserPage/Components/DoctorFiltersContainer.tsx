import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import '../Styles/DoctorFiltersContainer.css';
import Button from '@mui/material/Button';
import { DoctorFiltersContainerProps } from '../Types/DoctorFiltersContainerProps';

const DoctorFiltersContainer: React.FC<DoctorFiltersContainerProps> = ({
    doctorList,
    filteredDoctorList,
    setFilteredDoctorsList,
}) => {
    const [filterFirstName, setFilterFirstName] = useState<string>('');
    const [filterMiddleName, setFilterMiddleName] = useState<string>('');
    const [filterLastName, setFilterLastName] = useState<string>('');
    const [filterOffice, setFilterOffice] = useState<string>('');

    const handleApplyBtn = (e) => {
        e.preventDefault();
        setFilteredDoctorsList(doctorList);
        if (filterFirstName !== '') {
            setFilteredDoctorsList(filteredDoctorList.filter((doctor) => doctor.firstName.toLowerCase().includes(filterFirstName.toLowerCase())));
        }
        if (filterMiddleName !== '') {
            setFilteredDoctorsList(filteredDoctorList.filter((doctor) => doctor.middleName.toLowerCase().includes(filterMiddleName.toLowerCase())));
        }
        if (filterLastName !== '') {
            setFilteredDoctorsList(filteredDoctorList.filter((doctor) => doctor.lastName.toLowerCase().includes(filterLastName.toLowerCase())));
        }
        if(filterOffice !== '') {
            setFilteredDoctorsList(filteredDoctorList.filter((doctor) => doctor.officeId.toLowerCase().includes(filterOffice.toLowerCase())));
        }
    }

    return (
        <div className="filters-container">
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
                label="Office" 
                variant="standard" 
                className="filter-input" 
                value={filterOffice}
                onChange={(e) => setFilterOffice(e.target.value)}
            />
            <Button variant="text" onClick={handleApplyBtn}>Apply</Button>
        </div>
    );
}

export default DoctorFiltersContainer;