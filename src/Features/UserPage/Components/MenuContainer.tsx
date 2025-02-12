import React from 'react';
import { MenuContainerProps } from '../Types/MenuContainer.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import MenuButton from './MenuButton.tsx';
import MenuBlock from './MenuBlock.tsx';
import { logout } from '../../Auth/Api/Auth.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';
import config from '../../../Configurations/Config.ts';

const MenuContainer: React.FC<MenuContainerProps> = ({
    handleOurDoctorsBtn,
}) => {
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

    const handleSignOutButton = async () => {
        await logout(setAccessToken);
        localStorage.removeItem("email");
        localStorage.removeItem("patient");
        navigate(config.LoginPageUrl);
    }

    const handleOpenMenuBtn = () => {
        setIsMenuOpened(true);
    }

    const handleCloseMenuBtn = () => {
        setIsMenuOpened(false);
    }

    const handleMyProfileBtn = () => {
        navigate(config.PatientPageProfileUrl);
    }

    return (
        <div>
            {isMenuOpened ?
                <MenuBlock 
                    handleCloseMenuBtn={handleCloseMenuBtn}
                    handleOurDoctorsBtn={handleOurDoctorsBtn}
                    handleSignOutButton={handleSignOutButton}
                    handleMyProfileBtn={handleMyProfileBtn}
                />
                :
                <MenuButton handleOpenMenuBtn={handleOpenMenuBtn}/>
            }
        </div>
    );
}

export default MenuContainer;