import React from 'react';
import { useState } from 'react'; 
import { DoctorModalWindowProps } from '../Types/DoctorModalWindowProps.ts';
import { Doctor } from '../../UserPage/Types/Doctor.ts';
import DoctorCardsContainer from './DoctorCardsContainer.tsx';
import DoctorFiltersContainer from './DoctorFiltersContainer.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { User } from '../../../Interfaces/User.ts';
import { Photo } from '../../../Interfaces/Photo.ts';

const DoctorModalWindow: React.FC<DoctorModalWindowProps> = ({
    handleCloseDoctorWindow,
    doctorList,
    officeList,
    photoList,
    userList,
    isLoading,
    handleOpenCreateDoctorWindow,
}) => {
    const [filteredDoctorList, setFilteredDoctorList] = useState<Doctor[]>(doctorList);
    const [filteredUserList, setFilteredUserList] = useState<User[]>(userList);
    const [filteredPhotoList, setFilteredPhotoList] = useState<Photo[]>(photoList);

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
                            filteredPhotoList={filteredPhotoList}
                            filteredUserList={filteredUserList}
                        />
                        <DoctorFiltersContainer 
                            doctorList={doctorList}
                            filteredDoctorList={filteredDoctorList}
                            setFilteredDoctorList={setFilteredDoctorList}
                            filteredUserList={filteredUserList}
                            setFilteredUserList={setFilteredUserList}
                            filteredPhotoList={filteredPhotoList}
                            setFilteredPhotoList={setFilteredPhotoList}
                            officeList={officeList}
                            handleOpenCreateDoctorWindow={handleOpenCreateDoctorWindow}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DoctorModalWindow;