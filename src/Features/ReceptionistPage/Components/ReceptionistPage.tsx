import React from 'react';
import { useState } from 'react';
import MenuContainer from './MenuContainer.tsx';
import CreateDoctorWindow from './CreateDoctorWindow.tsx';
import DoctorModalWindow from './DoctorModalWindow.tsx';

const ReceptionistPage: React.FC = () => {
    const [isCreateDoctorWindowOpened, setIsCreateDoctorWindowOpened] = useState<boolean>(false);
    const [isDoctorWindowOpened, setIsDoctorWindowOpened] = useState<boolean>(false);

    const handleOpenCreateDoctorWindow = () => {
        setIsCreateDoctorWindowOpened(true);
    }

    const handleCloseCreateDoctorWindow = () => {
        setIsCreateDoctorWindowOpened(false);
    }

    const handleOpenDoctorWindow = () => {
        setIsDoctorWindowOpened(true);
    }

    const handleCloseDoctorWindow = () => {
        setIsDoctorWindowOpened(false);
    }



    return (
        <div>
            <MenuContainer 
                handleOpenCreateDoctorWindow={handleOpenCreateDoctorWindow} 
                handleOpenDoctorWindow={handleOpenDoctorWindow}
            />
            {isCreateDoctorWindowOpened && 
                <CreateDoctorWindow 
                    handleCloseCreateDoctorWindow={handleCloseCreateDoctorWindow}
                />
            }
            {isDoctorWindowOpened &&
                <DoctorModalWindow 
                    handleCloseDoctorWindow={handleCloseDoctorWindow}
                />
            }
        </div>
    );
}

export default ReceptionistPage;