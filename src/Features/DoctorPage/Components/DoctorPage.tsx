import React from 'react';
import { useState, useEffect } from 'react';
import MenuContainer from './MenuContainer.tsx';
import PatientModalWindow from './PatientModalWindow.tsx';
import { Patient } from '../../../Interfaces/Patient.ts';
import { getAllPatients } from '../../ReceptionistPage/Api/PatientsMethods.ts';
import { useLocation } from 'react-router-dom';
import { Doctor } from '../../UserPage/Types/Doctor.ts';
import { getDoctorsList } from '../../UserPage/Api/DoctorMethods.ts';

const DoctorPage: React.FC = () => {
    const [isPatientWindowOpened, setIsPatientWindowOpened] = useState<boolean>(false);
    const [isLoadingPatient, setIsLoadingPatient] = useState<boolean>(false);
    const [patientList, setPatientList] = useState<Patient[]>([]);
    const location = useLocation();
    const [email, setEmail] = useState<string>(() => {
        return location.state?.email || localStorage.getItem("email") || "";
    });

    useEffect(() => {
        if (email) {
            localStorage.setItem("email", email);
    
            const fetchAndStoreDoctor = async () => {
                try {
                    const doctorList: Doctor[] = await getDoctorsList(); 
                    const doctor = doctorList.find((d) => d.email === email); 
    
                    if (doctor) {
                        localStorage.setItem("doctor", JSON.stringify(doctor));
                        console.log("Doctor saved in localStorage:", doctor);
                    } else {
                        console.warn("Doctor not found for email:", email);
                    }
                } catch (error) {
                    console.error("Error fetching doctor:", error);
                }
            };
    
            fetchAndStoreDoctor(); 
        }
    
        const openPatientWindow = async () => {
            if (location.state?.isPatientWindowOpened) {
                await handleOpenPatientWindow();
            }
        };
    
        openPatientWindow();
    }, [location.state, email]);

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