import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { Receptionist } from '../../../Interfaces/Receptionist.ts';
import { Button, ButtonGroup } from '@mui/material';
import config from '../../../Configurations/Config.ts';
import SimpleDataInput from './SimpleDataInput.tsx';
import { useAuth } from '../../../Contexts/AuthContext.tsx';
import { updateUser } from '../Api/UpdateAuthUser.ts';
import { updateReceptionist } from '../Api/ReceptionistMethods.ts';
import { Office } from '../../UserPage/Types/Office.ts';
import { getOffices } from '../../UserPage/Api/OfficeMethod.ts';

const ReceptionistInfoPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { accessToken } = useAuth();
    const currReceptionist: Receptionist = location.state?.receptionist;
    
    const [currFirstName, setCurrFirstName] = useState<string>('');
    const [currLastName, setCurrLastName] = useState<string>('');
    const [currMiddleName, setCurrMiddleName] = useState<string>('');
    const [currOffice, setCurrOffice] = useState<string>('');
    const [currPhoneNumber, setCurrPhoneNumber] = useState<string>('');    

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [office, setOffice] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [middleNameError, setMiddleNameError] = useState<string>('');
    const [officeError, setOfficeError] = useState<string>('');
    const [phoneNumberError, setPhoneNumberError] = useState<string>('');

    const [isFirstNameTouched, setIsFirstNameTouched] = useState<boolean>(false);
    const [isLastNameTouched, setIsLastNameTouched] = useState<boolean>(false);
    const [isMiddleNameTouched, setIsMiddleNameTouched] = useState<boolean>(false);
    const [isOfficeTouched, setIsOfficeTouched] = useState<boolean>(false);
    const [isPhoneNumberTouched, setIsPhoneNumberTouched] = useState<boolean>(false);

    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    useEffect(() => {
        if (currReceptionist) {
            setCurrFirstName(currReceptionist.firstName);
            setCurrLastName(currReceptionist.lastName);
            setCurrMiddleName(currReceptionist.middleName);
            setCurrOffice(currReceptionist.officeId);
            setCurrPhoneNumber(currReceptionist.phoneNumber);
        }
    }, [currReceptionist]);

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

    const validatePhoneNumber = async () => {
        if (!isEditMode) return;
        setIsPhoneNumberTouched(true);

        if (!phoneNumber) {
            setPhoneNumberError("Please, enter the phone number");
        } 
    };

    const validateOffice = async () => {
        if (!isEditMode) return;
        setIsOfficeTouched(true);

        if (!office) {
            setOfficeError("Please, enter the office");
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

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
        if (phoneNumberError) setPhoneNumberError("");
    }

    const handleOfficeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOffice(e.target.value);
        if (officeError) setOfficeError("");
    }

    const handleEditBtn = () => {
        setIsEditMode(true);
        setFirstName(currFirstName);
        setLastName(currLastName);
        setMiddleName(currMiddleName);
        setOffice(currOffice);
        setPhoneNumber(currPhoneNumber);
    }

    const handleCancelBtn = () => {
        setIsEditMode(false);
    }

    const handleConfirmBtn = async () => {
        const offices: Office[] = await getOffices();
        const off: Office | undefined = offices.find(off => off.address === office);        
        await updateUser(currReceptionist.email, currReceptionist.email, phoneNumber);
        await updateReceptionist(accessToken, currReceptionist.id, firstName, lastName, middleName, phoneNumber, currReceptionist.email, String(off?.id));
    }

    const handleCloseBtn = () => {
        navigate(config.ReceptionistPageUrl, { state: { isReceptionistWindowOpened: true } })
    }

    return (
        <div className="create-doctor-container">
            <div className="edit-button">
                <Button onClick={handleEditBtn} className="edit-button">Edit</Button>
            </div>
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
                    value={isEditMode ? office : currOffice}
                    isTouched={isOfficeTouched}
                    error={officeError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleOfficeChange}
                    handleBlur={validateOffice}
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

export default ReceptionistInfoPage;