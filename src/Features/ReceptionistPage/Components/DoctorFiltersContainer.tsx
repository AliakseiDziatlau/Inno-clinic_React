import React from 'react';
import { useState } from 'react';
import { DoctorFiltersContainerProps } from '../Types/DoctorFiltersContainerProps.ts';
import { TextField, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Office } from '../../UserPage/Types/Office.ts'; 

const DoctorFiltersContainer: React.FC<DoctorFiltersContainerProps> = ({
    doctorList,
    filteredDoctorList,
    setFilteredDoctorList,
    filteredUserList,
    setFilteredUserList,
    filteredPhotoList,
    setFilteredPhotoList,
    officeList,
    handleOpenCreateDoctorWindow
}) => {
    const [filterFirstName, setFilterFirstName] = useState<string>('');
    const [filterMiddleName, setFilterMiddleName] = useState<string>('');
    const [filterLastName, setFilterLastName] = useState<string>('');
    const [filterOffice, setFilterOffice] = useState<string>('');

    const handleApplyBtn = (e) => {
        e.preventDefault();
        setFilteredDoctorList(doctorList);
        if (filterFirstName !== '') {
            setFilteredDoctorList(filteredDoctorList.filter((doctor) => doctor.firstName.toLowerCase().includes(filterFirstName.toLowerCase())));
        }
        if (filterMiddleName !== '') {
            setFilteredDoctorList(filteredDoctorList.filter((doctor) => doctor.middleName.toLowerCase().includes(filterMiddleName.toLowerCase())));
        }
        if (filterLastName !== '') {
            setFilteredDoctorList(filteredDoctorList.filter((doctor) => doctor.lastName.toLowerCase().includes(filterLastName.toLowerCase())));
        }
        if (filterOffice !== '') {
            const office: Office | undefined = officeList.find((office) => office.address === filterOffice);

            setFilteredDoctorList(filteredDoctorList.filter((doctor) => doctor.officeId === office?.id));
        }

        setFilteredUserList(filteredUserList.filter((user) => filteredDoctorList.some((doctor) => doctor.email === user.email)));
        setFilteredPhotoList(filteredPhotoList.filter((photo) => filteredUserList.some((user) => user.documentsId === photo.id)));
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
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Office</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Office"
                    value={filterOffice}
                    onChange={(e) => setFilterOffice(e.target.value)}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {officeList.map((office) => (
                    <MenuItem key={office.id} value={office.address}> 
                        {office.address}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <Button variant="text" onClick={handleApplyBtn}>Apply</Button>
            <Button variant="text" onClick={handleOpenCreateDoctorWindow}>Create Doctor</Button>
        </div>
    );
}

export default DoctorFiltersContainer;