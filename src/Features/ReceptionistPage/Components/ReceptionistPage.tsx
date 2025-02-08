import React from 'react';
import { useState } from 'react';
import MenuContainer from './MenuContainer.tsx';
import CreateDoctorWindow from './CreateDoctorWindow.tsx';

const ReceptionistPage: React.FC = () => {
    const [isCreateDoctorWindowOpened, setIsCreateDoctorWindowOpened] = useState<boolean>(false);

    const handleOpenCreateDoctorWindow = () => {
        setIsCreateDoctorWindowOpened(true);
    }

    const handleCloseCreateDoctorWindow = () => {
        setIsCreateDoctorWindowOpened(false);
    }

    return (
        <div>
            <MenuContainer 
                handleOpenCreateDoctorWindow={handleOpenCreateDoctorWindow} 
            />
            {isCreateDoctorWindowOpened && 
                <CreateDoctorWindow 
                    handleCloseCreateDoctorWindow={handleCloseCreateDoctorWindow}
                />
            }
        </div>
    );
}

export default ReceptionistPage;