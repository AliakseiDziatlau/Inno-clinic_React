import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/UserProfilePage.css';
import CardMedia from '@mui/material/CardMedia';
import UserProfileInfoContainer from './UserProfileInfoContainer.tsx';
import Button from '@mui/material/Button';
import { User } from '../Types/User.ts';
import { useUser } from '../../../Contexts/UserContext.tsx';
import config from '../../../Configurations/Config.ts';

const UserProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { currUser } = useUser();
    const location = useLocation();

    const handleGoBackBtn = () => {
        navigate(config.PatientPageUrl);
    }

    return (
        <div className="user-profile">
            <Button 
                variant="text"
                onClick={handleGoBackBtn}
                sx={{ position: "absolute", top: "10px", right: "10px" }}
            >
                Go Back
            </Button>
            <h1>Personal Information</h1>
            <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
            />
            <div className="inline-container">
                <UserProfileInfoContainer
                    title="Last Name"
                    value={currUser?.lastName ?? ""}
                />
                <UserProfileInfoContainer
                    title="First Name"
                    value={currUser?.firstName ?? ""}
                />
                <UserProfileInfoContainer
                    title="Middle Name"
                    value={currUser?.middleName ?? ""}
                />
            </div>
            <div className="inline-container">
                <UserProfileInfoContainer
                    title="Phone Number"
                    value={currUser?.phoneNumber ?? ""}
                />
                <UserProfileInfoContainer
                    title="Date of Birth"
                    value={currUser?.dateOfBirth ?? ""}
                />
            </div>
        </div>
    );
}

export default UserProfilePage