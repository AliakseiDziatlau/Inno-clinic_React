import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SimpleDataInput from './SimpleDataInput.tsx';
import { Button, ButtonGroup } from '@mui/material';
import '../Styles/DoctorInfoPage.css';
import { useNavigate } from 'react-router-dom';
import config from '../../../Configurations/Config.ts';
import { Doctor } from '../../UserPage/Types/Doctor.ts';
import { updateUser } from '../Api/UpdateAuthUser.ts';
import { updateDoctor } from '../Api/DoctorMethods.ts';
import { Office } from '../../UserPage/Types/Office.ts';
import { getOffices } from '../../UserPage/Api/OfficeMethod.ts';

const DoctorInfoPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const doctor: Doctor  = location.state?.doctor;

    const [currFirstName, setCurrFirstName] = useState<string>(doctor.firstName);
    const [currLastName, setCurrLastName] = useState<string>(doctor.lastName);
    const [currMiddleName, setCurrMiddleName] = useState<string>(doctor.middleName);
    const [currDateOfBirth, setCurrDateOfBirth] = useState<string>(String(doctor.dateOfBirth));
    const [currEmail, setCurrEmail] = useState<string>(doctor.email);
    const [currOffice, setCurrOffice] = useState<string>(doctor.officeId);
    const [currStartYear, setCurrStartYear] = useState<string>(String(doctor.careerStartYear));
    const [currStatus, setCurrStatus] = useState<string>(doctor.status);
    const [currPhoto, setCurrPhoto] = useState<string | undefined>(doctor.photoId);
    const [currPhoneNumber, setCurrPhoneNumber] = useState<string>(doctor.phoneNumber);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [office, setOffice] = useState<string>('');
    const [startYear, setStartYear] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [photo, setPhoto] = useState<string | undefined>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [middleNameError, setMiddleNameError] = useState<string>('');
    const [dateOfBirthError, setDateOfBirthError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [officeError, setOfficeError] = useState<string>('');
    const [startYearError, setStartYearError] = useState<string>('');
    const [statusError, setStatusError] = useState<string>('');
    const [phoneNumberError, setPhoneNumberError] = useState<string>('');

    const [isFirstNameTouched, setIsFirstNameTouched] = useState<boolean>(false);
    const [isLastNameTouched, setIsLastNameTouched] = useState<boolean>(false);
    const [isMiddleNameTouched, setIsMiddleNameTouched] = useState<boolean>(false);
    const [isDateOfBirthTouched, setIsDateOfBirthTouched] = useState<boolean>(false);
    const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
    const [isOfficeTouched, setIsOfficeTouched] = useState<boolean>(false);
    const [isStartYearTouched, setIsStartYearTouched] = useState<boolean>(false);
    const [isStatusTouched, setIsStatusTouched] = useState<boolean>(false);
    const [isPhoneNumberTouched, setIsPhoneNumberTouched] = useState<boolean>(false);

    const [isEditMode, setIsEditMode] = useState<boolean>(false); 

    const validateFirstName = async () => {
        if (!isEditMode) return;
        setIsFirstNameTouched(true);

        if (!firstName) {
            setFirstNameError("Please, enter the first name");
        } 
    };

    const validateLastName = async () => {
        if (!isEditMode) return;
        setIsLastNameTouched(true);

        if (!lastName) {
            setLastNameError("Please, enter the last name");
        } 
    };

    const validateMiddleName = async () => {
        if (!isEditMode) return;
        setIsMiddleNameTouched(true);

        if (!middleName) {
            setMiddleNameError("Please, enter the middle name");
        } 
    };

    const validateDateOfBirth = async () => {
        if (!isEditMode) return;
        setIsDateOfBirthTouched(true);

        if (!dateOfBirth) {
            setDateOfBirthError("Please, enter the date of birth");
        } else {
            const selectedDate = new Date(dateOfBirth);
            const currentDate = new Date();

            if (selectedDate > currentDate) {
                setDateOfBirthError("Date of birth cannot be in the future.");
            } else {
                setDateOfBirthError("");
            }
        }
    };

    const validateOffice = async () => {
        if (!isEditMode) return;
        setIsOfficeTouched(true);

        if (!office) {
            setOfficeError("Please, enter the office");
        } 
    };

    const validateStartYear = async () => {
        if (!isEditMode) return;
        setIsStartYearTouched(true);

        if (!startYear) {
            setStartYearError("Please, enter the start year");
        } 
    };

    const validatePhoneNumber = async () => {
        if (!isEditMode) return;
        setIsPhoneNumberTouched(true);

        if (!phoneNumber) {
            setPhoneNumberError("Please, enter the phone number");
        } 
    };

    const validateStatus = async () => {
        if (!isEditMode) return;
        setIsStatusTouched(true);

        if (!status) {
            setStatusError("Please, enter the status");
        } 
    };

    const validateEmail = async () => {
        if (!isEditMode) return;
        setIsEmailTouched(true);

        if (!email) {
            setEmailError("Please, enter the email");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("You've entered an invalid email");
        } 
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
        if(firstNameError) setFirstNameError("");
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
        if (lastNameError) setLastNameError("");
    }

    const handleMiddleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMiddleName(e.target.value);
        if (middleNameError) setMiddleNameError("");
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (emailError) setEmailError("");
    }

    const handleOfficeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOffice(e.target.value);
        if (officeError) setOfficeError("");
    }

    const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartYear(e.target.value);
        if (startYear) setStartYearError("");
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value);
        if (statusError) setStatusError("");
    }

    const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateOfBirth(e.target.value);
        if (dateOfBirthError) setDateOfBirthError("");
    }

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
        if (phoneNumberError) setPhoneNumberError("");
    }

    const handleEditBtn = () => {
        setIsEditMode(true);
        setFirstName(currFirstName);
        setLastName(currLastName);
        setMiddleName(currMiddleName);
        setDateOfBirth(currDateOfBirth);
        setEmail(currEmail);
        setOffice(currOffice);
        setStartYear(currStartYear);
        setStatus(currStatus);
        setPhoto(currPhoto);
        setPhoneNumber(currPhoneNumber);
    }

    const handleCancelBtn = () => {
        setIsEditMode(false);
    }

    const handleCloseBtn = () => {
        navigate(config.ReceptionistPageUrl, { state: { isDoctorWindowOpened: true } });
    }

    const handleConfirmBtn = async () => {
        const offices: Office[] = await getOffices();
        const off: Office | undefined = offices.find(off => off.address === office);         
        await updateUser(currEmail, email, phoneNumber);
        await updateDoctor(doctor.id, firstName, lastName, middleName, phoneNumber, email, dateOfBirth, String(off?.id), Number(startYear), status);
    }

    return (
        <div className="create-doctor-container">
            <div className="edit-button">
                <Button onClick={handleEditBtn} className="edit-button">Edit</Button>
            </div>
            <h1>Doctor Information</h1>
            <div className="inline-container">
                <SimpleDataInput 
                    title="First Name"
                    value={isEditMode ? firstName : currFirstName}
                    isTouched={isFirstNameTouched}
                    error={firstNameError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleFirstNameChange}
                    handleBlur={validateFirstName}
                />
                <SimpleDataInput 
                    title="Last Name"
                    value={isEditMode ? lastName : currLastName}
                    isTouched={isLastNameTouched}
                    error={lastNameError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleLastNameChange}
                    handleBlur={validateLastName}
                />
                < SimpleDataInput 
                    title="Middle Name"
                    value={isEditMode ? middleName : currMiddleName}
                    isTouched={isMiddleNameTouched}
                    error={middleNameError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleMiddleNameChange}
                    handleBlur={validateMiddleName}
                />
            </div>
            <div className="inline-container">
                < SimpleDataInput 
                    title="Date Of Birth"
                    value={isEditMode ? dateOfBirth : currDateOfBirth}
                    isTouched={isDateOfBirthTouched}
                    error={dateOfBirthError}
                    type="date"
                    disabled={!isEditMode}
                    handleChange={handleDateOfBirthChange}
                    handleBlur={validateDateOfBirth}
                />
                <SimpleDataInput 
                    title="E-mail"
                    value={isEditMode ? email : currEmail}
                    isTouched={isEmailTouched}
                    error={emailError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleEmailChange}
                    handleBlur={validateEmail}
                />
                < SimpleDataInput 
                    title="Office"
                    value={isEditMode ? office : currOffice}
                    isTouched={isOfficeTouched}
                    error={officeError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleOfficeChange}
                    handleBlur={validateOffice}
                />
            </div>
            <div className="inline-container">
                <SimpleDataInput 
                    title="Start Year"
                    value={isEditMode ? startYear : currStartYear}
                    isTouched={isStartYearTouched}
                    error={startYearError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleStartYearChange}
                    handleBlur={validateStartYear}
                />
                <SimpleDataInput 
                    title="Status"
                    value={isEditMode ? status : currStatus}
                    isTouched={isStatusTouched}
                    error={statusError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleStatusChange}
                    handleBlur={validateStatus}
                />
                <SimpleDataInput 
                    title="Phone Number"
                    value={isEditMode ? phoneNumber : currPhoneNumber}
                    isTouched={isPhoneNumberTouched}
                    error={phoneNumberError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handlePhoneNumberChange}
                    handleBlur={validatePhoneNumber}
                />
            </div>
            {isEditMode ? 
                (<ButtonGroup 
                    variant="text" 
                    aria-label="Basic button group"
                >
                    <Button onClick={handleConfirmBtn}>Confirm</Button>
                    <Button onClick={handleCancelBtn}>Cancel</Button>
                </ButtonGroup>)
                :
                (
                    <Button onClick={handleCloseBtn}>Close</Button>
                )
            }
        </div>
    );
}

export default DoctorInfoPage;