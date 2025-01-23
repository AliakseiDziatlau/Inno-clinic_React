import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import React from 'react';
import Button from '@mui/material/Button';
import '../Styles/SignOutContainer.css';

const SignOutContainer: React.FC = () => {
    const navigate = useNavigate();
    
    const handleSignOutButton = () => {
        navigate('/')
    }

    return (
        <div className="sign-out-container">
            <Button variant="text" onClick={handleSignOutButton}>Sign Out</Button>
        </div>
    );
}

export default SignOutContainer;