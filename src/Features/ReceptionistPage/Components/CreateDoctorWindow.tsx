import React from "react";
import { useState } from 'react';
import { CreateDoctorWindowProps } from "../Types/CreateDoctorWindowProps";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import '../Styles/CreateDoctorWindow.css';
import CancelModalWindow from "./CancelModalWindow.tsx";
import SimpleDataInput from "./SimpleDataInput.tsx";
import { registerDoctor, createDoctorProfile } from '../Api/DoctorMethods.ts';
import { getOffices } from "../../UserPage/Api/OfficeMethod.ts";
import { Office } from "../../UserPage/Types/Office.ts";
import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


const CreateDoctorWindow: React.FC<CreateDoctorWindowProps> = ({
    handleCloseCreateDoctorWindow,
}) => {
    const [isCancelWindowOpened, setIsCancelWindowOpened] = useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [office, setOffice] = useState<string>('');
    const [startYear, setStartYear] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');
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
    
    const [loading, setLoading] = useState<boolean>(false);

    const validateFirstName = async () => {
        setIsFirstNameTouched(true);

        if (!firstName) {
            setFirstNameError("Please, enter the first name");
        } 
    };

    const validateLastName = async () => {
        setIsLastNameTouched(true);

        if (!lastName) {
            setLastNameError("Please, enter the last name");
        } 
    };

    const validateMiddleName = async () => {
        setIsMiddleNameTouched(true);

        if (!middleName) {
            setMiddleNameError("Please, enter the middle name");
        } 
    };

    const validateDateOfBirth = async () => {
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
        setIsOfficeTouched(true);

        if (!office) {
            setOfficeError("Please, enter the office");
        } 
    };

    const validateStartYear = async () => {
        setIsStartYearTouched(true);

        if (!startYear) {
            setStartYearError("Please, enter the start year");
        } 
    };

    const validatePhoneNumber = async () => {
        setIsPhoneNumberTouched(true);

        if (!phoneNumber) {
            setPhoneNumberError("Please, enter the phone number");
        } 
    };

    const validateStatus = async () => {
        setIsStatusTouched(true);

        if (!status) {
            setStatusError("Please, enter the status");
        } 
    };

    const validateEmail = async () => {
        setIsEmailTouched(true);

        if (!email) {
            setEmailError("Please, enter the email");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("You've entered an invalid email");
        } 
    };

    const isFormValid = (): boolean => {
        return [
            firstName,
            lastName,
            middleName,
            dateOfBirth,
            email,
            office,
            startYear,
            status
        ].every(field => !!field); 
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

    const handleOpenCancelModalWindow = () => {
        setIsCancelWindowOpened(true);
    }

    const handleYesOnCancelModalWindow = () => {
        setIsCancelWindowOpened(false);
        handleCloseCreateDoctorWindow();
    }

    const handleNoOnCancelModalWindow = () => {
        setIsCancelWindowOpened(false);
    } 

    const handleConfirmBtn = async () => {
        setLoading(true); 
    
        try {
            const offices: Office[] = await getOffices();
            const off: Office | undefined = offices.find(off => off.address === office);
    
            await registerDoctor(email, "MyPassword", phoneNumber);
            await createDoctorProfile(
                firstName,
                lastName,
                middleName,
                phoneNumber,
                email,
                dateOfBirth,
                1,
                String(off?.id), 
                startYear,
                status
            );
    
            handleCloseCreateDoctorWindow();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };

    return (
            <div className="modal-overlay">
                <div className="modal-window">
                    <h1>Create Doctor</h1>
                    <div className="inline-container">
                        <SimpleDataInput 
                            title="First Name"
                            value={firstName}
                            isTouched={isFirstNameTouched}
                            error={firstNameError}
                            type="text"
                            disabled={false}
                            handleChange={handleFirstNameChange}
                            handleBlur={validateFirstName}
                        />
                        <SimpleDataInput 
                            title="Last Name"
                            value={lastName}
                            isTouched={isLastNameTouched}
                            error={lastNameError}
                            type="text"
                            disabled={false}
                            handleChange={handleLastNameChange}
                            handleBlur={validateLastName}
                        />
                        < SimpleDataInput 
                            title="Middle Name"
                            value={middleName}
                            isTouched={isMiddleNameTouched}
                            error={middleNameError}
                            type="text"
                            disabled={false}
                            handleChange={handleMiddleNameChange}
                            handleBlur={validateMiddleName}
                        />
                    </div>
                    <div className="inline-container">
                        < SimpleDataInput 
                            title="Date Of Birth"
                            value={dateOfBirth}
                            isTouched={isDateOfBirthTouched}
                            error={dateOfBirthError}
                            type="date"
                            disabled={false}
                            handleChange={handleDateOfBirthChange}
                            handleBlur={validateDateOfBirth}
                        />
                        <SimpleDataInput 
                            title="E-mail"
                            value={email}
                            isTouched={isEmailTouched}
                            error={emailError}
                            type="text"
                            disabled={false}
                            handleChange={handleEmailChange}
                            handleBlur={validateEmail}
                        />
                        < SimpleDataInput 
                            title="Office"
                            value={office}
                            isTouched={isOfficeTouched}
                            error={officeError}
                            type="text"
                            disabled={false}
                            handleChange={handleOfficeChange}
                            handleBlur={validateOffice}
                        />
                    </div>
                    <div className="inline-container">
                        <SimpleDataInput 
                            title="Start Year"
                            value={startYear}
                            isTouched={isStartYearTouched}
                            error={startYearError}
                            type="text"
                            disabled={false}
                            handleChange={handleStartYearChange}
                            handleBlur={validateStartYear}
                        />
                        <SimpleDataInput 
                            title="Status"
                            value={status}
                            isTouched={isStatusTouched}
                            error={statusError}
                            type="text"
                            disabled={false}
                            handleChange={handleStatusChange}
                            handleBlur={validateStatus}
                        />
                        <SimpleDataInput 
                            title="Phone Number"
                            value={phoneNumber}
                            isTouched={isPhoneNumberTouched}
                            error={phoneNumberError}
                            type="text"
                            disabled={false}
                            handleChange={handlePhoneNumberChange}
                            handleBlur={validatePhoneNumber}
                        />
                    </div>
                    <ButtonGroup 
                        variant="text" 
                        aria-label="Basic button group"
                    >
                        <Button onClick={handleConfirmBtn} disabled={!isFormValid()}>Confirm</Button>
                        <Button onClick={handleOpenCancelModalWindow}>Cancel</Button>
                    </ButtonGroup>
                    {isCancelWindowOpened &&
                        <CancelModalWindow 
                            handleYesOnCancelModalWindow={handleYesOnCancelModalWindow}
                            handleNoOnCancelModalWindow={handleNoOnCancelModalWindow}
                        />
                    }
                </div>
            </div>
    );
}

export default CreateDoctorWindow;