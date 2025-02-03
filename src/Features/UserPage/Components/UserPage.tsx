import { useState } from 'react';
import React from 'react';
import '../Styles/UserPage.css';
import Button from '@mui/material/Button';
import SignOutContainer from './SignOutContainer.tsx';
import GreetingComponent from './GreetingComponent.tsx';
import DoctorsModalWindow from './DoctorsModalWindow.tsx';
import { getDoctorsList } from '../Api/DoctorMethods.ts';
import { Doctor } from '../Types/Doctor.ts';
import MenuContainer from './MenuContainer.tsx';

import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const UserPage: React.FC = () => {
    const [isDoctorWindowOpened, setIsDoctorWindowOpened] = useState<boolean>(false);
    const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);

    const handleOurDoctorsBtn = async() => {
        setDoctorsList(await getDoctorsList());
        setIsDoctorWindowOpened(true);
    }

    const closeDoctorsModalWindow = () => {
        setIsDoctorWindowOpened(false);
    }

    return (
        <div className="user-container">
            <GreetingComponent />
            <MenuContainer handleOurDoctorsBtn={handleOurDoctorsBtn} />
            {isDoctorWindowOpened && <DoctorsModalWindow
                closeDoctorsModalWindow={closeDoctorsModalWindow}
                doctorsList={doctorsList}            
            />}
            {/* <MapContainer center={[48.8556, 2.3522]} zoom={13}>
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
            </MapContainer> */}
        </div>
    );
}

export default UserPage;