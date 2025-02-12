import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/UserProfilePage.css';
import CardMedia from '@mui/material/CardMedia';
import UserProfileInfoContainer from './UserProfileInfoContainer.tsx';
import Button from '@mui/material/Button';
import config from '../../../Configurations/Config.ts';
import { Patient } from '../../../Interfaces/Patient.ts';

const UserProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const storedPatient = localStorage.getItem("patient");
    const patient: Patient | null = storedPatient ? JSON.parse(storedPatient) : null;

    const handleGoBackBtn = () => {
        navigate(config.PatientPageUrl);
    };

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
                    value={patient?.lastName ?? ""}
                />
                <UserProfileInfoContainer
                    title="First Name"
                    value={patient?.firstName ?? ""}
                />
                <UserProfileInfoContainer
                    title="Middle Name"
                    value={patient?.middleName ?? ""}
                />
            </div>
            <div className="inline-container">
                <UserProfileInfoContainer
                    title="Phone Number"
                    value={patient?.phoneNumber ?? ""}
                />
                <UserProfileInfoContainer
                    title="Date of Birth"
                    value={patient?.dateOfBirth ?? ""}
                />
            </div>
        </div>
    );
};

export default UserProfilePage