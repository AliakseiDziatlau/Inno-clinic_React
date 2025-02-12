import React from 'react';
import Button from '@mui/material/Button';
import { logout } from '../../Auth/Api/Auth.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import config from '../../../Configurations/Config.ts';
import { MenuBlockProps } from '../Types/MenuBlockProps.ts';
import { Doctor } from '../../UserPage/Types/Doctor.ts';

const MenuBlock: React.FC<MenuBlockProps> = ({
    handleCloseMenuBtn,
    handleOpenPatientWindow,
}) => {
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

    const handleSingOutBtn = async () => {
        await logout(setAccessToken);
        navigate(config.LoginPageUrl);
    }

    const handleOpenDoctorInfoWindow = async () => {
        const storedDoctor = localStorage.getItem("doctor");
        const doctor: Doctor | null = storedDoctor ? JSON.parse(storedDoctor) : null;
    
        if (!doctor) {
            console.warn("Doctor not found in localStorage");
            return; 
        }
    
        navigate(config.ReceptionistPageChangeDoctorUrl, { state: { doctor, isReceptionist: false } });
    };

    return (
        <div className="menu-block">
            <Button 
                variant="text" 
                onClick={handleSingOutBtn}
            >
                Sign Out
            </Button>
            <Button 
                variant="text"
                onClick={handleOpenPatientWindow} 
            >
                See All Patients
            </Button>
            <Button 
                variant="text"
                onClick={handleOpenDoctorInfoWindow} 
            >
                My account
            </Button>
            <button 
                className="close-button"
                onClick={handleCloseMenuBtn}
            >
                &times;
            </button>
        </div>
    );
}

export default MenuBlock;