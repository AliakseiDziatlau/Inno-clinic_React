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
import DeleteIcon from "@mui/icons-material/Delete";
import '../Styles/PatientModalWindow.css'

const PatientModalWindow: React.FC<PatientModalWindowProps> = ({
    patientList,
    isLoading,
    handleClosePatientModalWindow,
}) => {
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
                        <div className="create-patient-button">
                            <Button>Create Patient</Button>
                        </div>
                        <div className="filter-patient-button">
                            <Button>Filter Patients</Button>
                        </div>
                        <button 
                            className="close-button"
                            onClick={handleClosePatientModalWindow}
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
                            {patientList.map((patient) => (
                                <TableRow
                                key={patient.id}
                            
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{patient.firstName}</TableCell>
                                    <TableCell>{patient.lastName}</TableCell>
                                    <TableCell>{patient.middleName}</TableCell>
                                    <TableCell>{patient.phoneNumber}</TableCell>
                                    <TableCell>
                                        <DeleteIcon/>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                )}
            </div>
        </div>
    );
}

export default PatientModalWindow;