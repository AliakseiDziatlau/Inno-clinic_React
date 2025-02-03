import React from 'react';
import Button from '@mui/material/Button';
import '../Styles/MenuBlock.css';
import { MenuBlockProps } from '../Types/MenuBlockProps.ts';

const MenuBlock: React.FC<MenuBlockProps> = ({
    handleSignOutButton,
    handleOurDoctorsBtn,
    handleCloseMenuBtn,
    handleMyProfileBtn,
}) => {
    return (
        <div className="menu-container">
            <Button 
                variant="text" 
                onClick={handleSignOutButton}
            >
                Sign Out
            </Button>
            <Button 
                variant="text" 
                onClick={handleOurDoctorsBtn}
            >
                Our doctors
            </Button>
            <Button 
                variant="text"
                onClick={handleMyProfileBtn} 
            >
                My Profile
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