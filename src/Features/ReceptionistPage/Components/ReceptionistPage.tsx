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
import ReceptionistModalWindow from './ReceptionistModalWindow.tsx';
import { Receptionist } from '../../../Interfaces/Receptionist.ts';
import { getAllReceptionists } from '../Api/ReceptionistMethods.ts';
import CreateReceptionistWindow from './CreateReceptionistWindow.tsx';
import { Photo } from '../../../Interfaces/Photo.ts';
import { User } from '../../../Interfaces/User.ts';
import { fetchPhotos } from '../../../Methods/PhotoMethods.ts';
import { fetchUsers } from '../../../Methods/UserMethods.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';

const ReceptionistPage: React.FC = () => {
    const location = useLocation();
    const { accessToken } = useAuth();
    const [isCreateDoctorWindowOpened, setIsCreateDoctorWindowOpened] = useState<boolean>(false);
    const [isDoctorWindowOpened, setIsDoctorWindowOpened] = useState<boolean>(false);
    const [isOfficeWindowOpened, setIsOfficeWindowOpened] = useState<boolean>(false);
    const [isPatientWindowOpened, setIsPatientWindowOpened] = useState<boolean>(false);
    const [isReceptionistWindowOpened, setIsReceptionistWindowOpened] = useState<boolean>(false);
    const [isCreateOfficeWindowOpened, setIsCreateOfficeWindowOpened] = useState<boolean>(false);
    const [isCreatePatientWindowOpened, setIsCreatePatientWindowOpened] = useState<boolean>(false);
    const [isCreateReceptionistWindowOpened, setIsCreateReceptionistWindowOpened] = useState<boolean>(false);
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const [officeList, setOfficeList] = useState<Office[]>([]);
    const [photoList, setPhotoList] = useState<Photo[]>([]);
    const [userList, setUserList] = useState<User[]>([]);
    const [patientList, setPatientList] = useState<Patient[]>([]);
    const [receptionistList, setReceptionistList] = useState<Receptionist[]>([]);
    const [isLoadingDoctors, setIsLoadingDoctors] = useState<boolean>(false);
    const [isLoadingOffices, setIsLoadingOffices] = useState<boolean>(false);
    const [isLoadingPatients, setIsLoadingPatients] = useState<boolean>(false);
    const [isLoadingReceptionists, setIsLoadingReceptionists] = useState<boolean>(false);

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

        const openReceptionistWindow = async () => {
            if (location.state?.isReceptionistWindowOpened) {
                await handleOpenReceptionistWindow();
            }
        }
    
        openDoctorWindow(); 
        openOfficeWindow();
        openPatientWindow();
        openReceptionistWindow();
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
            const photos = await fetchPhotos();
            const users = await fetchUsers(accessToken);

            setDoctorList(doctors);
            setOfficeList(offices);
            setPhotoList(photos);
            setUserList(users);
            console.log("users:")
            console.log(users);
            console.log("photos:")
            console.log(photos);
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

    const handleOpenReceptionistWindow = async () => {
        setIsLoadingReceptionists(true);
        setIsReceptionistWindowOpened(true);
        try {
            const offices: Office[] = await getOffices();
            const receptionists: Receptionist[] = await getAllReceptionists();
            setReceptionistList(receptionists);
            setOfficeList(offices);
        } catch (error) {
            console.error("Error with loading data", error);
        } finally {
            setIsLoadingReceptionists(false);
        }
    }

    const handleCloseReceptionistWindow = () => {
        setIsReceptionistWindowOpened(false);
    }

    const handleCloseCreateReceptionistWindow = () => {
        setIsCreateReceptionistWindowOpened(false);
    }

    const handleOpenCreateReceptionistWindow = () => {
        setIsCreateReceptionistWindowOpened(true);
    }

    return (
        <div>
            <MenuContainer 
                handleOpenDoctorWindow={handleOpenDoctorWindow}
                handleOpenOfficeWindow={handleOpenOfficeWindow}
                handleOpenPatientModalWindow={handleOpenPatientModalWindow}
                handleOpenReceptionistWindow={handleOpenReceptionistWindow}
            />
            {isCreateDoctorWindowOpened && 
                <CreateDoctorWindow 
                    photoList={photoList}
                    handleCloseCreateDoctorWindow={handleCloseCreateDoctorWindow}
                />
            }
            {isDoctorWindowOpened &&
                <DoctorModalWindow 
                    handleCloseDoctorWindow={handleCloseDoctorWindow}
                    doctorList={doctorList}
                    officeList={officeList}
                    photoList={photoList}  
                    userList={userList}
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
                    photoList={photoList}
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
                    photoList={photoList}
                    handleCloseCreatePatientModalWindow={handleCloseCreatePatientModalWindow}
                />
            }
            {isReceptionistWindowOpened &&
                <ReceptionistModalWindow 
                    receptionistsList={receptionistList}
                    officesList={officeList}
                    isLoading={isLoadingReceptionists}
                    handleCloseReceptionistWindow={handleCloseReceptionistWindow}
                    handleOpenCreateReceptionistWindow={handleOpenCreateReceptionistWindow}
                />
            }
            {isCreateReceptionistWindowOpened &&
                <CreateReceptionistWindow 
                    photoList={photoList}
                    handleCloseCreateReceptionistWindow={handleCloseCreateReceptionistWindow}
                />
            }
        </div>
    );
}

export default ReceptionistPage;