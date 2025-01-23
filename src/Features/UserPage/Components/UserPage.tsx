import { useState } from 'react';
import React from 'react';
import '../Styles/UserPage.css';
import Button from '@mui/material/Button';
import SignOutContainer from './SignOutContainer.tsx';
import GreetingComponent from './GreetingComponent.tsx';
import DoctorsModalWindow from './DoctorsModalWindow.tsx';

const UserPage: React.FC = () => {
    const [isDoctorWindowOpened, setIsDoctorWindowOpened] = useState<boolean>(false);

    const handleOurDoctorsBtn = () => {
        setIsDoctorWindowOpened(true);
    }

    const closeDoctorsModalWindow = () => {
        setIsDoctorWindowOpened(false);
    }

    return (
        <div className="user-container">
            <SignOutContainer/>
            <GreetingComponent/>
            <Button variant="text" onClick={handleOurDoctorsBtn}>Our doctors</Button>
            {isDoctorWindowOpened && <DoctorsModalWindow
                closeDoctorsModalWindow={closeDoctorsModalWindow}            
            />}
        </div>
    );
}

export default UserPage;