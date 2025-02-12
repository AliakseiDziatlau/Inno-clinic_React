import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { MenuButtonProps } from '../Types/MenuButtonProps';

const MenuButton: React.FC<MenuButtonProps> = ({
    handleOpenMenuBtn,
}) => {
    return (
        <div className="menu-button">
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ margin: 0, padding: 0 }}
            >
                <MenuIcon onClick={handleOpenMenuBtn} className="menu-button" />
            </IconButton>
        </div>
    );
}

export default MenuButton;