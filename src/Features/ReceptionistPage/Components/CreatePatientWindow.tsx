import React from 'react';
import { useState } from 'react';
import SimpleDataInput from './SimpleDataInput.tsx';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CancelModalWindow from './CancelModalWindow.tsx';
import { CreatePatientWindowProps } from '../Types/CreatePatientWindowProps.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';
import { createPatient } from '../Api/PatientsMethods.ts';
import { registerPatient } from '../Api/PatientsMethods.ts';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CreatePatientWindow: React.FC<CreatePatientWindowProps> = ({
    photoList,
    handleCloseCreatePatientModalWindow
}) => {
    const { accessToken } = useAuth();
    const [isCancelWindowOpened, setIsCancelWindowOpened] = useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [email, setEmail] = useState<string>(''); 
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');
    
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [middleNameError, setMiddleNameError] = useState<string>('');
    const [dateOfBirthError, setDateOfBirthError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');   
    const [phoneNumberError, setPhoneNumberError] = useState<string>('');
    
    const [isFirstNameTouched, setIsFirstNameTouched] = useState<boolean>(false);
    const [isLastNameTouched, setIsLastNameTouched] = useState<boolean>(false);
    const [isMiddleNameTouched, setIsMiddleNameTouched] = useState<boolean>(false);
    const [isDateOfBirthTouched, setIsDateOfBirthTouched] = useState<boolean>(false);
    const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
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

    const validatePhoneNumber = async () => {
        setIsPhoneNumberTouched(true);

        if (!phoneNumber) {
            setPhoneNumberError("Please, enter the phone number");
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
            phoneNumber,
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
        handleCloseCreatePatientModalWindow();
    }

    const handleNoOnCancelModalWindow = () => {
        setIsCancelWindowOpened(false);
    } 

    const handleConfirmBtn = async () => {
        await registerPatient(accessToken, email, "MyPassword", phoneNumber, photo);
        await createPatient(accessToken, firstName, lastName, middleName, phoneNumber, email, dateOfBirth, true);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <h1>Create Patient</h1>
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
                    <SimpleDataInput 
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
                    <SimpleDataInput 
                        title="Date Of Birth"
                        value={dateOfBirth}
                        isTouched={isDateOfBirthTouched}
                        error={dateOfBirthError}
                        type="text"
                        disabled={false}
                        handleChange={handleDateOfBirthChange}
                        handleBlur={validateDateOfBirth}
                    />
                </div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Photo</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Office"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {photoList.map((photo) => (
                        <MenuItem key={photo.id} value={photo.id}> 
                            {photo.url}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl> 
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

export default CreatePatientWindow;