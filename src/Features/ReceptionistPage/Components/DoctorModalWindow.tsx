import React from 'react';
import { useState } from 'react'; 
import { DoctorModalWindowProps } from '../Types/DoctorModalWindowProps.ts';
import { Doctor } from '../../UserPage/Types/Doctor.ts';
import DoctorCardsContainer from './DoctorCardsContainer.tsx';
import DoctorFiltersContainer from './DoctorFiltersContainer.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const DoctorModalWindow: React.FC<DoctorModalWindowProps> = ({
    handleCloseDoctorWindow,
    doctorList,
    officeList,
    isLoading,
}) => {
    const [filteredDoctorList, setFilteredDoctorList] = useState<Doctor[]>(doctorList);

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
                            onClick={handleCloseDoctorWindow}
                        >
                            &times;
                        </button>
                        <DoctorCardsContainer 
                            filteredDoctorList={filteredDoctorList}
                        />
                        <DoctorFiltersContainer 
                            doctorList={doctorList}
                            filteredDoctorList={filteredDoctorList}
                            setFilteredDoctorList={setFilteredDoctorList}
                            officeList={officeList}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DoctorModalWindow;