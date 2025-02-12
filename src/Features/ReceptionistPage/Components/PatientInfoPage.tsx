import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimpleDataInput from './SimpleDataInput.tsx';
import { Button, ButtonGroup } from '@mui/material';
import { Patient } from '../../../Interfaces/Patient.ts';
import config from '../../../Configurations/Config.ts';
import { updateUser } from '../Api/UpdateAuthUser.ts';
import { updatePatient } from '../Api/PatientsMethods.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';

const PatientInfoPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { accessToken } = useAuth();
    const currPatient: Patient = location.state?.patient;
    const isEditing: boolean = location.state?.isEditing;

    const [currFirstName, setCurrFirstName] = useState<string>(currPatient.firstName);
    const [currLastName, setCurrLastName] = useState<string>(currPatient.lastName);
    const [currMiddleName, setCurrMiddleName] = useState<string>(currPatient.middleName);
    const [currDateOfBirth, setCurrDateOfBirth] = useState<string>(currPatient.dateOfBirth);
    const [currPhoneNumber, setCurrPhoneNumber] = useState<string>(currPatient.phoneNumber);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [middleNameError, setMiddleNameError] = useState<string>('');
    const [dateOfBirthError, setDateOfBirthError] = useState<string>('');
    const [phoneNumberError, setPhoneNumberError] = useState<string>('');

    const [isFirstNameTouched, setIsFirstNameTouched] = useState<boolean>(false);
    const [isLastNameTouched, setIsLastNameTouched] = useState<boolean>(false);
    const [isMiddleNameTouched, setIsMiddleNameTouched] = useState<boolean>(false);
    const [isDateOfBirthTouched, setIsDateOfBirthTouched] = useState<boolean>(false);
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

    const validatePhoneNumber = async () => {
        if (!isEditMode) return;
        setIsPhoneNumberTouched(true);

        if (!phoneNumber) {
            setPhoneNumberError("Please, enter the phone number");
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
        setPhoneNumber(currPhoneNumber);
    }

    const handleCancelBtn = () => {
        setIsEditMode(false);
    }

    const handleConfirmBtn = async () => {
        await updateUser(currPatient.email, currPatient.email, phoneNumber);
        await updatePatient(accessToken, currPatient.id, firstName, lastName, middleName, phoneNumber, currPatient.email, dateOfBirth, true);
    }

    const handleCloseBtn = () => {
        if (isEditing){
            navigate(config.ReceptionistPageUrl, { state: { isPatientWindowOpened: true, } })
        } else {
            navigate(config.DoctorPageUrl, { state: { isPatientWindowOpened: true, } })
        }
    }


    return (
        <div className="create-doctor-container">
            {isEditing &&
                <div className="edit-button">
                    <Button onClick={handleEditBtn} className="edit-button">Edit</Button>
                </div>
            }
            {/* <div className="edit-button">
                <Button onClick={handleEditBtn} className="edit-button">Edit</Button>
            </div> */}
            <h1>Patient Information</h1>
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
                <SimpleDataInput 
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
                <SimpleDataInput 
                    title="Date Of Birth"
                    value={isEditMode ? dateOfBirth : currDateOfBirth}
                    isTouched={isDateOfBirthTouched}
                    error={dateOfBirthError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleDateOfBirthChange}
                    handleBlur={validateDateOfBirth}
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

export default PatientInfoPage;