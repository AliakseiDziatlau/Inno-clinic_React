import { useState } from 'react';
import React from 'react';
import SignInModalWindow from './SignInModalWindow.tsx';
import SignUpModalWindow from './SingUpModalWindow.tsx';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import '../Styles/LoginPage.css';
import { LoginPageProps } from '../Types/LoginPageProps.ts';
import DoctorsModalWindow from '../../UserPage/Components/DoctorsModalWindow.tsx';
import { Doctor } from '../../UserPage/Types/Doctor.ts';
import { Office } from '../../UserPage/Types/Office.ts';
import { Photo } from '../../../Interfaces/Photo.ts';
import { User } from '../../../Interfaces/User.ts';
import { getDoctorsList } from '../../UserPage/Api/DoctorMethods.ts';
import { getOffices } from '../../UserPage/Api/OfficeMethod.ts';
import { fetchPhotos } from '../../../Methods/PhotoMethods.ts';
import { fetchUsers } from '../../../Methods/UserMethods.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';
import '../../../App.css';

const LoginPage: React.FC<LoginPageProps> = ({
    isFirstPage,
}) => {
    const { accessToken } = useAuth();
    const [isSignUpWindow, setIsSignUpWindow] = useState<boolean>(false);
    const [isSignInWindow, setIsSignInWindow] = useState<boolean>(false);
    const [isDoctorWindowOpened, setIsDoctorWindowOpened] = useState<boolean>(false);
    const [signInError, setSignInError] = useState<boolean>(false);
    const [filterOffice, setFilterOffice] = useState<string>("");
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const [officeList, setOfficeList] = useState<Office[]>([]);
    const [photoList, setPhotoList] = useState<Photo[]>([]);
    const [userList, setUserList] = useState<User[]>([]);  
    const [isLoadingDoctors, setIsLoadingDoctors] = useState<boolean>(false);  
    const handleOurDoctorsBtn = async() => {
            setIsDoctorWindowOpened(true); 
            setIsLoadingDoctors(true); 
    
            try {
                const doctors = await getDoctorsList();
                const offices = await getOffices();
                const photos = await fetchPhotos();
                const users = await fetchUsers(accessToken);
    
                setDoctorList(doctors);
                setOfficeList(offices);
                setPhotoList(photos);
                setUserList(users);
                console.log("users:")
                console.log(users);
                console.log("photos:")
                console.log(photos);
            } catch (error) {
                console.error("Error with loading data", error);
            } finally {
                setIsLoadingDoctors(false); 
            }
        }

    const closeDoctorsModalWindow = () => {
        setIsDoctorWindowOpened(false);
        setFilterOffice("");
    }

    const openSignUpModalWindow = () => {
        setIsSignUpWindow(true);
    };

    const closeSignUpModalWindow = () => {
        setIsSignUpWindow(false);
    };

    const openSignInModalWindow = () => {
        setIsSignInWindow(true);
    };

    const closeSignInModalWindow = () => {
        setIsSignInWindow(false);
    };

    const handleFromSignInToSignUp = () => {
        setIsSignInWindow(false);
        setIsSignUpWindow(true);
    };

    const handleFromSignUpToSignIn = () => {
        setIsSignUpWindow(false);
        setIsSignInWindow(true);
    }; 

    return (
        <div className='login-page-container' style={{ position: "relative" }}>
            <div className="button-top-right">
            <Button onClick={handleOurDoctorsBtn} >Our Doctors</Button>
            </div>
            <h1 className={isFirstPage ? 'inno-clinic' : ''}>
                {isFirstPage ? 'INNO-CLINIC' : 'You are not authorized for this page'}
            </h1>
            <p className={isFirstPage ? 'choosing-option' : ''}>
                {isFirstPage ? 'Choose your option' : 'Would you like to sing up or sign in?'}
            </p>
            <ButtonGroup 
                variant="text" 
                aria-label="Basic button group"
            >
                <Button onClick={openSignUpModalWindow}>Sign Up</Button>
                <Button onClick={openSignInModalWindow}>Sign In</Button>
            </ButtonGroup>
            {isSignUpWindow && (
                <SignUpModalWindow
                    closeSignUpModalWindow={closeSignUpModalWindow}
                    handleFromSignUpToSignIn={handleFromSignUpToSignIn}
                />
            )}
            {isSignInWindow && (
                <SignInModalWindow
                    closeSignInModalWindow={closeSignInModalWindow}
                    handleFromSingInToSignUp={handleFromSignInToSignUp}
                    signInError={signInError}
                    setSignInError={setSignInError}
                />
            )}
            {isDoctorWindowOpened && <DoctorsModalWindow
                    closeDoctorsModalWindow={closeDoctorsModalWindow}
                    doctorsList={doctorList}
                    filterOffice={filterOffice}
                    officeList={officeList} 
                    photoList={photoList}  
                    userList={userList}
                    isLoading={isLoadingDoctors}         
            />}
        </div>
    );
};

export default LoginPage;