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
import PatientModalWindow from './PatientModalWindow.tsx';
import { getAllPatients } from '../Api/PatientsMethods.ts';
import { Patient } from '../../../Interfaces/Patient.ts';
import CreatePatientWindow from './CreatePatientWindow.tsx';

const ReceptionistPage: React.FC = () => {
    const location = useLocation();
    const [isCreateDoctorWindowOpened, setIsCreateDoctorWindowOpened] = useState<boolean>(false);
    const [isDoctorWindowOpened, setIsDoctorWindowOpened] = useState<boolean>(false);
    const [isOfficeWindowOpened, setIsOfficeWindowOpened] = useState<boolean>(false);
    const [isPatientWindowOpened, setIsPatientWindowOpened] = useState<boolean>(false);
    const [isCreateOfficeWindowOpened, setIsCreateOfficeWindowOpened] = useState<boolean>(false);
    const [isCreatePatientWindowOpened, setIsCreatePatientWindowOpened] = useState<boolean>(false);
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const [officeList, setOfficeList] = useState<Office[]>([]);
    const [patientList, setPatientList] = useState<Patient[]>([]);
    const [isLoadingDoctors, setIsLoadingDoctors] = useState<boolean>(false);
    const [isLoadingOffices, setIsLoadingOffices] = useState<boolean>(false);
    const [isLoadingPatients, setIsLoadingPatients] = useState<boolean>(false);

    useEffect(() => {
        const openDoctorWindow = async () => {
            if (location.state?.isDoctorWindowOpened) {
                await handleOpenDoctorWindow(); 
            }
        };

        const openOfficeWindow = async () => {
            if (location.state?.isOfficeWindowOpened) {
                await handleOpenOfficeWindow(); 
            }
        };

        const openPatientWindow = async () => {
            if (location.state?.isPatientWindowOpened) {
                await handleOpenPatientModalWindow(); 
            }
        };
    
        openDoctorWindow(); 
        openOfficeWindow();
        openPatientWindow();
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
            const offices: Office[] = await getOffices();
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

    const handleOpenPatientModalWindow = async () => {
        setIsLoadingPatients(true);
        setIsPatientWindowOpened(true);

        try {
            const patients: Patient[] = await getAllPatients();
            setPatientList(patients);
        } catch (error) {
            console.error("Error with loading data", error);
        } finally {
            console.log('we are in a finally block')
            setIsLoadingPatients(false); 
        }
    }

    const handleClosePatientModalWindow = () => {
        setIsPatientWindowOpened(false);
    }

    const handleCloseCreatePatientModalWindow = () => {
        setIsCreatePatientWindowOpened(false);
    }

    const handleOpenCreatePatientWindow = () => {
        setIsCreatePatientWindowOpened(true);
    }

    return (
        <div>
            <MenuContainer 
                handleOpenDoctorWindow={handleOpenDoctorWindow}
                handleOpenOfficeWindow={handleOpenOfficeWindow}
                handleOpenPatientModalWindow={handleOpenPatientModalWindow}
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
            {isPatientWindowOpened &&
                <PatientModalWindow
                    patientList={patientList}
                    isLoading={isLoadingPatients}
                    handleClosePatientModalWindow={handleClosePatientModalWindow}
                    handleOpenCreatePatientWindow={handleOpenCreatePatientWindow}
                />
            }
            {isCreatePatientWindowOpened &&
                <CreatePatientWindow 
                    handleCloseCreatePatientModalWindow={handleCloseCreatePatientModalWindow}
                />
            }
        </div>
    );
}

export default ReceptionistPage;