import React from 'react';
import SignOutContainer from './SignOutContainer.tsx';
import Button from '@mui/material/Button';
import { MenuContainerProps } from '../Types/MenuContainer.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import MenuButton from './MenuButton.tsx';
import MenuBlock from './MenuBlock.tsx';


const MenuContainer: React.FC<MenuContainerProps> = ({
    handleOurDoctorsBtn
}) => {
    const navigate = useNavigate();
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
    const handleSignOutButton = () => {
        navigate('/')
    }

    const handleOpenMenuBtn = () => {
        setIsMenuOpened(true);
    }

    const handleCloseMenuBtn = () => {
        setIsMenuOpened(false);
    }

    return (
        <div>
            {isMenuOpened ?
                <MenuBlock 
                    handleCloseMenuBtn={handleCloseMenuBtn}
                    handleOurDoctorsBtn={handleOurDoctorsBtn}
                    handleSignOutButton={handleSignOutButton}
                />
                :
                <MenuButton handleOpenMenuBtn={handleOpenMenuBtn}/>
            }
        </div>
    );
}

export default MenuContainer;