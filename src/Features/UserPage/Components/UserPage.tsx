import { useState } from 'react';
import React from 'react';
import '../Styles/UserPage.css';
import Button from '@mui/material/Button';
import SignOutContainer from './SignOutContainer.tsx';
import GreetingComponent from './GreetingComponent.tsx';
import DoctorsModalWindow from './DoctorsModalWindow.tsx';
import { getDoctorsList } from '../Api/DoctorMethods.ts';
import { Doctor } from '../Types/Doctor.ts';
import MenuContainer from './MenuContainer.tsx';

const UserPage: React.FC = () => {
    const [isDoctorWindowOpened, setIsDoctorWindowOpened] = useState<boolean>(false);
    const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);

    const handleOurDoctorsBtn = async() => {
        setDoctorsList(await getDoctorsList());
        setIsDoctorWindowOpened(true);
    }

    const closeDoctorsModalWindow = () => {
        setIsDoctorWindowOpened(false);
    }

    return (
        <div className="user-container">
            <GreetingComponent />
            <MenuContainer handleOurDoctorsBtn={handleOurDoctorsBtn} />
            {isDoctorWindowOpened && <DoctorsModalWindow
                closeDoctorsModalWindow={closeDoctorsModalWindow}
                doctorsList={doctorsList}            
            />}
        </div>
    );
}

export default UserPage;