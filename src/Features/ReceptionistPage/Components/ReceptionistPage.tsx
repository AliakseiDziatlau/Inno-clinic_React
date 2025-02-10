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
import OfficeModalWindow from './OfficeModalWindow.tsx';
import CreateOfficeWindow from './CreateOfficeWindow.tsx';

const ReceptionistPage: React.FC = () => {
    const location = useLocation();
    const [isCreateDoctorWindowOpened, setIsCreateDoctorWindowOpened] = useState<boolean>(false);
    const [isDoctorWindowOpened, setIsDoctorWindowOpened] = useState<boolean>(false);
    const [isOfficeWindowOpened, setIsOfficeWindowOpened] = useState<boolean>(false);
    const [isCreateOfficeWindowOpened, setIsCreateOfficeWindowOpened] = useState<boolean>(false);
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const [officeList, setOfficeList] = useState<Office[]>([]);
    const [isLoadingDoctors, setIsLoadingDoctors] = useState<boolean>(false);
    const [isLoadingOffices, setIsLoadingOffices] = useState<boolean>(false);

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
        setIsDoctorWindowOpened(false)
    }

    const handleCloseCreateDoctorWindow = () => {
        setIsCreateDoctorWindowOpened(false);
    }

    const handleOpenDoctorWindow = async () => {
        setIsDoctorWindowOpened(true); 
        setIsLoadingDoctors(true); 

        try {
            const doctors = await getDoctorsList();
            const offices = await getOffices();

            setDoctorList(doctors);
            setOfficeList(offices);
        } catch (error) {
            console.error("Error with loading data", error);
        } finally {
            setIsLoadingDoctors(false); 
        }
    }

    const handleCloseDoctorWindow = () => {
        setIsDoctorWindowOpened(false);
    }

    const handleOpenOfficeWindow = async () => {
        setIsOfficeWindowOpened(true);
        setIsLoadingOffices(true);

        try {
            const offices = await getOffices();
            setOfficeList(offices);
        } catch (error) {
            console.error("Error with loading data", error);
        } finally {
            setIsLoadingOffices(false); 
        }
    }

    const handleCloseOfficeWindow = () => {
        setIsOfficeWindowOpened(false);
    }

    const handleOpenCreateOfficeWindow = () => {
        setIsCreateOfficeWindowOpened(true);
        setIsOfficeWindowOpened(false);
    }

    const handleCloseCreateOfficeWindow = () => {
        setIsCreateOfficeWindowOpened(false);
    }

    return (
        <div>
            <MenuContainer 
                handleOpenDoctorWindow={handleOpenDoctorWindow}
                handleOpenOfficeWindow={handleOpenOfficeWindow}
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
                    isLoading={isLoadingDoctors}
                    handleOpenCreateDoctorWindow={handleOpenCreateDoctorWindow}
                />
            }
            {isOfficeWindowOpened &&
                <OfficeModalWindow 
                    officeList={officeList}
                    isLoading={isLoadingOffices}
                    handleCloseOfficeWindow={handleCloseOfficeWindow}
                    handleOpenCreateOfficeWindow={handleOpenCreateOfficeWindow}
                />
            }
            {isCreateOfficeWindowOpened &&
                <CreateOfficeWindow 
                    handleCloseCreateOfficeWindow={handleCloseCreateOfficeWindow}
                />
            }
        </div>
    );
}

export default ReceptionistPage;