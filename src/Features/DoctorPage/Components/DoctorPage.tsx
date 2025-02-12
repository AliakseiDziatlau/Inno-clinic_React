import React from 'react';
import { useState, useEffect } from 'react';
import MenuContainer from './MenuContainer.tsx';
import PatientModalWindow from './PatientModalWindow.tsx';
import { Patient } from '../../../Interfaces/Patient.ts';
import { getAllPatients } from '../../ReceptionistPage/Api/PatientsMethods.ts';
import { useLocation } from 'react-router-dom';

const DoctorPage: React.FC = () => {
    const [isPatientWindowOpened, setIsPatientWindowOpened] = useState<boolean>(false);
    const [isLoadingPatient, setIsLoadingPatient] = useState<boolean>(false);
    const [patientList, setPatientList] = useState<Patient[]>([]);
    const location = useLocation();

    useEffect(() => {
        const openPatientWindow = async () => {
            if (location.state?.isPatientWindowOpened) {
                await handleOpenPatientWindow(); 
            }
        };

        openPatientWindow();
    }, [location.state]);

    const handleOpenPatientWindow = async () => {
        setIsPatientWindowOpened(true);

        setIsLoadingPatient(true);
        try {
            const patients: Patient[] = await getAllPatients();
            setPatientList(patients);
        } catch (error) {
            console.error("Error with loading data", error);
        } finally {
            setIsLoadingPatient(false); 
        }
    }

    const handleClosePatientWindow = () => {
        setIsPatientWindowOpened(false);
    }

    return (
        <div>
            <MenuContainer 
                handleOpenPatientWindow={handleOpenPatientWindow}
            />
            {isPatientWindowOpened &&
                <PatientModalWindow
                    patientList={patientList}
                    isLoading={isLoadingPatient}
                    handleClosePatientWindow={handleClosePatientWindow}
                />
            }
        </div>
    );
}

export default DoctorPage;