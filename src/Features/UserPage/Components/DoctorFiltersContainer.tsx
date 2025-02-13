import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../Styles/DoctorFiltersContainer.css';
import { TextField, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DoctorFiltersContainerProps } from '../Types/DoctorFiltersContainerProps';
import config from '../../../Configurations/Config.ts';
import { Office } from '../Types/Office.ts';

const DoctorFiltersContainer: React.FC<DoctorFiltersContainerProps> = ({
    doctorList,
    filteredDoctorList,
    setFilteredDoctorsList,
    filteredUserList,
    setFilteredUserList,
    filteredPhotoList,
    setFilteredPhotoList,
    filterOfficeFromMap,
    officeList,
}) => {
    const [filterFirstName, setFilterFirstName] = useState<string>('');
    const [filterMiddleName, setFilterMiddleName] = useState<string>('');
    const [filterLastName, setFilterLastName] = useState<string>('');
    const [filterOffice, setFilterOffice] = useState<string>(filterOfficeFromMap);

    const navigate = useNavigate();

    const handleOpenMapBtn = () => {
        navigate(config.PatientPageMapUrl);
    }

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
            const office: Office | undefined = officeList.find((office) => office.address === filterOffice);

            setFilteredDoctorsList(filteredDoctorList.filter((doctor) => doctor.officeId === office?.id))
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
            {/* <TextField 
                id="standard-basic" 
                label="Office" 
                variant="standard" 
                className="filter-input" 
                value={filterOffice}
                onChange={(e) => setFilterOffice(e.target.value)}
            /> */}
            <Button variant="text" onClick={handleApplyBtn}>Apply</Button>
            <Button variant="text" onClick={handleOpenMapBtn}>Open Map</Button>
        </div>
    );
}

export default DoctorFiltersContainer;