import React, { useEffect } from 'react';
import { useState } from 'react';
import MenuContainer from './MenuContainer.tsx';
import CreateDoctorWindow from './CreateDoctorWindow.tsx';
import DoctorModalWindow from './DoctorModalWindow.tsx';
import { getDoctorsList } from '../../UserPage/Api/DoctorMethods.ts';
import { Doctor } from '../../UserPage/Types/Doctor.ts';
import { getOffices } from '../../UserPage/Api/OfficeMethod.ts';
import { Office } from '../../UserPage/Types/Office.ts';
import { useLocation } from 'react-router-dom';

const ReceptionistPage: React.FC = () => {
    const location = useLocation();
    const [isCreateDoctorWindowOpened, setIsCreateDoctorWindowOpened] = useState<boolean>(false);
    const [isDoctorWindowOpened, setIsDoctorWindowOpened] = useState<boolean>(false);
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const [officeList, setOfficeList] = useState<Office[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const openDoctorWindow = async () => {
            if (location.state?.isDoctorWindowOpened) {
                await handleOpenDoctorWindow(); 
            }
        };
    
        openDoctorWindow(); 
    }, [location.state]);

    const handleOpenCreateDoctorWindow = () => {
        setIsCreateDoctorWindowOpened(true);
    }

    const handleCloseCreateDoctorWindow = () => {
        setIsCreateDoctorWindowOpened(false);
    }

    const handleOpenDoctorWindow = async () => {
        setIsDoctorWindowOpened(true); 
        setIsLoading(true); 

        try {
            const doctors = await getDoctorsList();
            const offices = await getOffices();

            setDoctorList(doctors);
            setOfficeList(offices);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        } finally {
            setIsLoading(false); 
        }
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
                    doctorList={doctorList}
                    officeList={officeList}
                    isLoading={isLoading}
                />
            }
        </div>
    );
}

export default ReceptionistPage;