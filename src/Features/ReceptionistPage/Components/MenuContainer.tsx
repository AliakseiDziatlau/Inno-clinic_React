import React from "react";
import { useState } from 'react';
import MenuBlock from "./MenuBlock.tsx";
import MenuButton from "./MenuButton.tsx";
import { MenuContainerProps } from "../Types/MenuContainerProps.ts";

const MenuContainer: React.FC<MenuContainerProps> = ({
    handleOpenOfficeWindow,
    handleOpenDoctorWindow,
    handleOpenPatientModalWindow,
    handleOpenReceptionistWindow,
}) => {
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

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
                    handleOpenDoctorWindow={handleOpenDoctorWindow}
                    handleOpenOfficeWindow={handleOpenOfficeWindow}
                    handleOpenPatientModalWindow={handleOpenPatientModalWindow}
                    handleOpenReceptionistWindow={handleOpenReceptionistWindow}
                />
                :
                <MenuButton handleOpenMenuBtn={handleOpenMenuBtn} />
            }
        </div>
    );
}

export default MenuContainer;