import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/UserProfilePage.css';
import CardMedia from '@mui/material/CardMedia';
import UserProfileInfoContainer from './UserProfileInfoContainer.tsx';
import Button from '@mui/material/Button';
import config from '../../../Configurations/Config.ts';
import { Patient } from '../../../Interfaces/Patient.ts';
import { getUserByEmail } from '../Api/GetUserByEmail.ts';
import { fetchUserByEmail } from '../../../Methods/UserMethods.ts';
import { User } from '../../../Interfaces/User.ts';
import { Photo } from '../../../Interfaces/Photo.ts';
import { fetchPhotoById } from '../../../Methods/PhotoMethods.ts';

const UserProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const storedPatient = localStorage.getItem("patient");
    const patient: Patient | null = storedPatient ? JSON.parse(storedPatient) : null;
    const [photo, setPhoto] = useState<Photo | null>(null);

    const handleGoBackBtn = () => {
        navigate(config.PatientPageUrl);
    };

    const getPhotoForPatient = async (patient: Patient): Promise<Photo | null> => {
        if (!patient) return null; 
        const user: User | null = await fetchUserByEmail(patient.email);

        if (!user) return null;
        return await fetchPhotoById(user?.documentsId);
    };

    useEffect(() => {
        const fetchPhoto = async () => {
            if (!patient) return;
            const photoData = await getPhotoForPatient(patient);
            setPhoto(photoData);
        };

        fetchPhoto();
    }, [patient]);

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
                image={photo?.url || "default.jpg"}
                alt={photo?.url || "default.alt"}
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