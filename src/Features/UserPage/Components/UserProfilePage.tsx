import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/UserProfilePage.css';
import CardMedia from '@mui/material/CardMedia';
import UserProfileInfoContainer from './UserProfileInfoContainer.tsx';
import Button from '@mui/material/Button';

const UserProfilePage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBackBtn = () => {
        navigate('/profile');
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
                    value="mln"
                />
                <UserProfileInfoContainer
                    title="First Name"
                    value="mfn"
                />
                <UserProfileInfoContainer
                    title="Middle Name"
                    value="mmn"
                />
            </div>
            <div className="inline-container">
                <UserProfileInfoContainer
                    title="Phone Number"
                    value="mpn"
                />
                <UserProfileInfoContainer
                    title="Date of Birth"
                    value="mdb"
                />
            </div>
        </div>
    );
}

export default UserProfilePage