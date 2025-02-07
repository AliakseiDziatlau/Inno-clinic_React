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
import { useUser } from '../../../Contexts/UserContext.tsx';

const UserPage: React.FC = () => {
    const location = useLocation();
    const { currUser, fetchUser } = useUser();
    const [isDoctorWindowOpened, setIsDoctorWindowOpened] = useState<boolean>(false);
    const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
    const [filterOffice, setFilterOffice] = useState<string>("");
    const email = location.state?.email;

    useEffect(() => {
        if(email && !currUser) {
            fetchUser(email);
        }

        if(location.state?.openModal) {
            setIsDoctorWindowOpened(true);
        }

        if(location.state?.selectedOffice) {
            setFilterOffice(location.state.selectedOffice);
        }

    }, [location.state, email]);

    const handleOurDoctorsBtn = async() => {
        setDoctorsList(await getDoctorsList());
        setIsDoctorWindowOpened(true);
    }

    const closeDoctorsModalWindow = () => {
        setIsDoctorWindowOpened(false);
        setFilterOffice("");
    }

    return (
        <div className="user-container">
            <GreetingComponent />
            <MenuContainer handleOurDoctorsBtn={handleOurDoctorsBtn} currUser={currUser}/>
            {isDoctorWindowOpened && <DoctorsModalWindow
                closeDoctorsModalWindow={closeDoctorsModalWindow}
                doctorsList={doctorsList}
                filterOffice={filterOffice}            
            />}
        </div>
    );
}

export default UserPage;