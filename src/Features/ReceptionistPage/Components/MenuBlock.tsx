import React from 'react';
import Button from '@mui/material/Button';
import '../Styles/MenuBlock.css';
import { MenuBlockProps } from '../Types/MenuBlockProps';


const MenuBlock: React.FC<MenuBlockProps> = ({
    handleCloseMenuBtn,
    handleOpenCreateDoctorWindow,
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
                onClick={handleOpenCreateDoctorWindow} 
            >
                Create Doctor
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