import React from 'react';
import { useState } from 'react';
import { ReceptionistModalWindowProps } from '../Types/ReceptionistModalWindowProps.ts';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from "@mui/icons-material/Delete";
import { Receptionist } from '../../../Interfaces/Receptionist.ts';
import { Office } from '../../UserPage/Types/Office.ts';
import { useNavigate } from 'react-router-dom';
import config from '../../../Configurations/Config.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';
import DeleteModalWindow from './DeleteModalWindow.tsx';
import { deleteUserByEmail } from '../Api/UpdateAuthUser.ts';
import { deleteReceptionist } from '../Api/ReceptionistMethods.ts';

const ReceptionistModalWindow: React.FC<ReceptionistModalWindowProps> = ({
    receptionistsList,
    officesList,
    isLoading,
    handleCloseReceptionistWindow,
    handleOpenCreateReceptionistWindow,
}) => {
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    const [isDeleteWindowOpened, setIsDeleteWindowOpened] = useState<boolean>(false);
    const [receptionistForDeletion, setReceptionistForDeletion] = useState<Receptionist | null>(null);

    const getOfficeAddress = (receptionist: Receptionist): string | undefined => {
        const office: Office | undefined = officesList.find((office) => (office.id===receptionist.officeId));
        return office?.address;
    }

    const handleReceptionistRowClick = (receptionist: Receptionist) => {
        navigate(config.ReceptionistPageChangeReceptionistUrl, { state: { receptionist }});
    }

    const handleOpenDeleteWindow = (receptionist: Receptionist) => {
        setIsDeleteWindowOpened(true);
        setReceptionistForDeletion(receptionist);
    }

    const handleNoOnDeleteWindow = () => {
        setIsDeleteWindowOpened(false);
    }

    const handleYesOnDeleteWindow = async () => {
        if (receptionistForDeletion !== null) {
            await deleteUserByEmail(accessToken, receptionistForDeletion.email);
            await deleteReceptionist(accessToken, receptionistForDeletion.id);
        }
        setIsDeleteWindowOpened(false);
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
                        <button 
                            className="close-button"
                            onClick={handleCloseReceptionistWindow}
                        >
                            &times;
                        </button>
                        <div className="create-patient-button">
                            <Button onClick={handleOpenCreateReceptionistWindow}>Create Receptionist</Button>
                        </div>
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Middle Name</TableCell>
                                    <TableCell>Office</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {receptionistsList.map((receptionist) => (
                                <TableRow
                                key={receptionist.id}
                                onClick={() => handleReceptionistRowClick(receptionist)}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{receptionist.firstName}</TableCell>
                                    <TableCell>{receptionist.lastName}</TableCell>
                                    <TableCell>{receptionist.middleName}</TableCell>
                                    <TableCell>{getOfficeAddress(receptionist)}</TableCell>
                                    <TableCell>
                                        <DeleteIcon 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenDeleteWindow(receptionist);
                                            }}
                                            sx={{ cursor: "pointer" }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {isDeleteWindowOpened &&
                        <DeleteModalWindow 
                            handleNoOnDeleteWindow={handleNoOnDeleteWindow}
                            handleYesOnDeleteWindow={handleYesOnDeleteWindow}
                        />
                    }
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReceptionistModalWindow;