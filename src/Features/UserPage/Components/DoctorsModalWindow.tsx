import React from 'react';
import { useState } from 'react';
import { Doctor } from '../Types/Doctor.ts';
import '../Styles/DoctorsModalWindow.css';
import { DoctorsModalWindowProps } from '../Types/DoctorsModalWindowProps';
import DoctorCardsContainer from './DoctorsCardsContainer.tsx';
import DoctorFiltersContainer from './DoctorFiltersContainer.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { User } from '../../../Interfaces/User.ts';
import { Photo } from '../../../Interfaces/Photo.ts';

const DoctorsModalWindow: React.FC<DoctorsModalWindowProps> = ({
    closeDoctorsModalWindow,
    doctorsList,
    filterOffice,
    officeList,
    photoList,
    userList,
    isLoading,
}) => {
    const [filteredDoctorsList, setFilteredDoctorsList] = useState<Doctor[]>(doctorsList);
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
                            onClick={closeDoctorsModalWindow}
                        >
                            &times;
                        </button>
                        <DoctorFiltersContainer 
                            doctorList={doctorsList}
                            filteredDoctorList={filteredDoctorsList} 
                            setFilteredDoctorsList={setFilteredDoctorsList}
                            filteredUserList={filteredUserList}
                            setFilteredUserList={setFilteredUserList}
                            filteredPhotoList={filteredPhotoList}
                            setFilteredPhotoList={setFilteredPhotoList}
                            filterOfficeFromMap={filterOffice}
                            officeList={officeList}
                        />
                        <DoctorCardsContainer 
                            filteredDoctorsList={filteredDoctorsList} 
                            filteredPhotoList={filteredPhotoList}
                            filteredUserList={filteredUserList}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DoctorsModalWindow;