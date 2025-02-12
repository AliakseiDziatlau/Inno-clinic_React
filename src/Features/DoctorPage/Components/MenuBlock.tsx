import React from 'react';
import Button from '@mui/material/Button';
import { logout } from '../../Auth/Api/Auth.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import config from '../../../Configurations/Config.ts';
import { MenuBlockProps } from '../Types/MenuBlockProps.ts';


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