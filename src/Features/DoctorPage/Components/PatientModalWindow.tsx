import React from 'react';
import { PatientModalWindowProps } from '../Types/PatientModalWindowProps.ts';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../../../Interfaces/Patient.ts';
import config from '../../../Configurations/Config.ts';
import FilterPatientsModalWindow from '../../ReceptionistPage/Components/FilterPatientsModalWindow.tsx';

const PatientModalWindow: React.FC<PatientModalWindowProps> = ({
    patientList,
    isLoading,
    handleClosePatientWindow,
}) => {
    const navigate = useNavigate();

    const [isFilterWindowOpened, setIsFilterWindowOpened] = useState<boolean>(false);
    const [filterPatientList, setFilterPatientList] = useState<Patient[]>(patientList);
    const [filterFirstName, setFilterFirstName] = useState<string>('');
    const [filterMiddleName, setFilterMiddleName] = useState<string>('');
    const [filterLastName, setFilterLastName] = useState<string>('');
    const [filterPhoneNumber, setFilterPhoneNumber] = useState<string>('');

    const handleOpenFiltersBtn = () => {
        setIsFilterWindowOpened(true);
    }

    const handleCloseFiltersBtn = () => {
        setIsFilterWindowOpened(false);
    }

    const handleApplyBtn = (e: React.MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        setFilterPatientList(patientList);
        if (filterFirstName !== '') {
            setFilterPatientList(filterPatientList.filter((patient) => patient.firstName.toLowerCase().includes(filterFirstName.toLowerCase())));
        }
        if (filterMiddleName !== '') {
            setFilterPatientList(filterPatientList.filter((patient) => patient.middleName.toLowerCase().includes(filterMiddleName.toLowerCase())));
        }
        if (filterLastName !== '') {
            setFilterPatientList(filterPatientList.filter((patient) => patient.lastName.toLowerCase().includes(filterLastName.toLowerCase())));
        }
        if (filterPhoneNumber !== '') {
            setFilterPatientList(filterPatientList.filter((patient) => patient.phoneNumber.toLowerCase().includes(filterPhoneNumber.toLowerCase())));
        }
    }

    const handlePatientRowClick = (patient: Patient) => {
        navigate(config.ReceptionistPageChangePatientUrl, { state: { patient, isEditing: false }});
    }

    useEffect(() => {
        setFilterPatientList(patientList);
    }, [patientList]);

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                {isLoading ? (
                    <Box 
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh", 
                    }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <div>
                        <div className="filter-patient-button">
                            <Button onClick={handleOpenFiltersBtn}>Filter Patients</Button>
                        </div>
                        <button 
                            className="close-button"
                            onClick={handleClosePatientWindow}
                        >
                            &times;
                        </button>
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Middle Name</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {filterPatientList.map((patient) => (
                                <TableRow
                                key={patient.id}
                                onClick={() => handlePatientRowClick(patient)}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{patient.firstName}</TableCell>
                                    <TableCell>{patient.lastName}</TableCell>
                                    <TableCell>{patient.middleName}</TableCell>
                                    <TableCell>{patient.phoneNumber}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {isFilterWindowOpened && 
                        <FilterPatientsModalWindow
                            filterFirstName={filterFirstName}
                            filterLastName={filterLastName}
                            filterMiddleName={filterMiddleName}
                            filterPhoneNumber={filterPhoneNumber}
                            setFilterFirstName={setFilterFirstName}
                            setFilterLastName={setFilterLastName}
                            setFilterMiddleName={setFilterMiddleName}
                            setFilterPhoneNumber={setFilterPhoneNumber}
                            handleApplyBtn={handleApplyBtn}
                            handleCloseFiltersBtn={handleCloseFiltersBtn}
                        />
                    }
                </div>
                )}
            </div>
        </div>
    );
}

export default PatientModalWindow;