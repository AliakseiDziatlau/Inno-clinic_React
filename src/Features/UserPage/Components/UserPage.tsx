import { useEffect, useState } from 'react';
import React from 'react';
import '../Styles/UserPage.css';
import GreetingComponent from './GreetingComponent.tsx';
import DoctorsModalWindow from './DoctorsModalWindow.tsx';
import { getDoctorsList } from '../Api/DoctorMethods.ts';
import { Doctor } from '../Types/Doctor.ts';
import MenuContainer from './MenuContainer.tsx';
import { useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { Patient } from '../../../Interfaces/Patient.ts';
import { getAllPatients } from '../../ReceptionistPage/Api/PatientsMethods.ts';
import { getOffices } from '../Api/OfficeMethod.ts';
import { Office } from '../Types/Office.ts';

const UserPage: React.FC = () => {
    const location = useLocation();
    const [isDoctorWindowOpened, setIsDoctorWindowOpened] = useState<boolean>(false);
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const [officeList, setOfficeList] = useState<Office[]>([]);
    const [filterOffice, setFilterOffice] = useState<string>("");
    const [isLoadingDoctors, setIsLoadingDoctors] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(() => {
        return location.state?.email || localStorage.getItem("email") || "";
    });

    useEffect(() => {
        if (email) {
            localStorage.setItem("email", email); 
            const fetchAndStorePatient = async () => {
                try {
                    const patients: Patient[] = await getAllPatients();
                    const patient = patients.find((p) => p.email === email); 
    
                    if (patient) {
                        localStorage.setItem("patient", JSON.stringify(patient));
                        console.log("Patient saved in localStorage:", patient);
                    } else {
                        console.warn("Patient not found for email:", email);
                    }
                } catch (error) {
                    console.error("Error fetching patient:", error);
                }
            };
    
            fetchAndStorePatient(); 
        }
    
        if (location.state?.openModal) {
            setIsDoctorWindowOpened(true);
        }
    
        if (location.state?.selectedOffice) {
            setFilterOffice(location.state.selectedOffice);
        }
    }, [location.state, email]);

    const handleOurDoctorsBtn = async() => {
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

    const closeDoctorsModalWindow = () => {
        setIsDoctorWindowOpened(false);
        setFilterOffice("");
    }

    return (
        <div className="user-container">
            <GreetingComponent />
            <MenuContainer handleOurDoctorsBtn={handleOurDoctorsBtn} />
            {isDoctorWindowOpened && <DoctorsModalWindow
                closeDoctorsModalWindow={closeDoctorsModalWindow}
                doctorsList={doctorList}
                filterOffice={filterOffice}
                officeList={officeList}   
                isLoading={isLoadingDoctors}         
            />}
        </div>
    );
}

export default UserPage;