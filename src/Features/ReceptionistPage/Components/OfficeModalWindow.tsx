import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OfficeModalWindowProps } from '../Types/OfficeModalWindowProps';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import '../Styles/OfficeModalWindow.css';
import { Office } from '../../UserPage/Types/Office.ts';
import config from '../../../Configurations/Config.ts';

const OfficeModalWindow: React.FC<OfficeModalWindowProps> = ({
    officeList,
    isLoading,
    handleCloseOfficeWindow,
    handleOpenCreateOfficeWindow,
}) => {
    const navigate = useNavigate();

    const handleOfficeRowClick = (office: Office) => {
        navigate(config.ReceptionistPageChangeOfficeUrl, { state: { office } } );
    }

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
                        <div className="create-office-button">
                            <Button onClick={handleOpenCreateOfficeWindow}>Create Office</Button>
                        </div>
                        <button 
                            className="close-button"
                            onClick={handleCloseOfficeWindow}
                        >
                            &times;
                        </button>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Phone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {officeList.map((office) => (
                                    <TableRow
                                    key={office.id}
                                    onClick={() => handleOfficeRowClick(office)}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{office.address}</TableCell>
                                        <TableCell>{office.isActive ? `Active` : `Closed`}</TableCell>
                                        <TableCell>{office.registryPhoneNumber}</TableCell>
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

export default OfficeModalWindow;