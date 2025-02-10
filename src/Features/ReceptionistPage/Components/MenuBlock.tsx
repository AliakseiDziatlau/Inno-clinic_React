import React from 'react';
import Button from '@mui/material/Button';
import '../Styles/MenuBlock.css';
import { MenuBlockProps } from '../Types/MenuBlockProps';


const MenuBlock: React.FC<MenuBlockProps> = ({
    handleCloseMenuBtn,
    handleOpenDoctorWindow,
    handleOpenOfficeWindow,
}) => {
    return (
        <div className="menu-block">
            <Button 
                variant="text" 
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