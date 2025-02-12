import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import React from 'react';
import Button from '@mui/material/Button';
import '../Styles/SignOutContainer.css';
import { logout } from '../../Auth/Api/Auth.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';

const SignOutContainer: React.FC = () => {
    const navigate = useNavigate();
    const { setAccessToken } = useAuth();
    
    const handleSignOutButton = async () => {
        console.log("Кнопка Sign Out нажата");
        console.log("Перед logout, accessToken:", localStorage.getItem("accessToken"));
    
        await logout(setAccessToken);
    
        console.log("После logout, accessToken:", localStorage.getItem("accessToken")); 
    
    }

    return (
        <div className="sign-out-container">
            <Button variant="text" onClick={handleSignOutButton}>Sign Out</Button>
        </div>
    );
}

export default SignOutContainer;