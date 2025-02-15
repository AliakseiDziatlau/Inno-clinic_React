import React from 'react';
import Button from '@mui/material/Button';
import '../Styles/MenuBlock.css';
import { MenuBlockProps } from '../Types/MenuBlockProps';
import { logout } from '../../Auth/Api/Auth.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import config from '../../../Configurations/Config.ts';


const MenuBlock: React.FC<MenuBlockProps> = ({
    handleCloseMenuBtn,
    handleOpenDoctorWindow,
    handleOpenOfficeWindow,
    handleOpenPatientModalWindow,
    handleOpenReceptionistWindow,
}) => {
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

    const handleSingOutBtn = async () => {
        await logout(setAccessToken);
        localStorage.setItem("role", "");
        navigate(config.LoginPageUrl);
    }

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
                onClick={handleOpenDoctorWindow} 
            >
                See All Doctors
            </Button>
            <Button 
                variant="text"
                onClick={handleOpenPatientModalWindow} 
            >
                See All Patients
            </Button>
            <Button 
                variant="text"
                onClick={handleOpenReceptionistWindow} 
            >
                See All Receptionists
            </Button>
            <Button 
                variant="text" 
                onClick={handleOpenOfficeWindow}
            >
                See All Offices
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