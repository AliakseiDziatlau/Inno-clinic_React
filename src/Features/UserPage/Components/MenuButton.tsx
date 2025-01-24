import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import '../Styles/MenuButton.css';
import { MenuButtonProps } from '../Types/MenuButtonProps';

const MenuButton: React.FC<MenuButtonProps> = ({
    handleOpenMenuBtn
}) => {
    return (
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ margin: 0, padding: 0 }}
            className="menu-button"
        >
            <MenuIcon onClick={handleOpenMenuBtn} />
        </IconButton>
    );
}

export default MenuButton;