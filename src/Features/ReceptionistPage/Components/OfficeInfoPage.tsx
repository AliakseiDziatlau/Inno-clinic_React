import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import config from '../../../Configurations/Config.ts';
import SimpleDataInput from './SimpleDataInput.tsx';
import { Button, ButtonGroup } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Office } from '../../UserPage/Types/Office.ts';
import { updateOffice } from '../Api/OfficeMethods.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';

const OfficeInfoPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { accessToken } = useAuth();
    const currOffice: Office = location.state?.office;

    const getCity = (address: string): string => {
        return address.split(", ").pop() || ""; 
    };

    const getStreet = (address: string): string => {
        const parts = address.split(", ")[0].split(" ");
        parts.pop(); 
        return parts.join(" ");
    };

    const getHouseNumber = (address: string): string => {
        return address.split(", ")[0].split(" ").pop() || "";
    };

    const [currCity, setCurrCity] = useState<string>(getCity(currOffice.address));
    const [currStreet, setCurrStreet] = useState<string>(getStreet(currOffice.address));
    const [currHouseNumber, setCurrHouseNumber] = useState<string>(getHouseNumber(currOffice.address));
    const [currOfficeNumber, setCurrOfficeNumber] = useState<string>('');
    const [currRegistryPhoneNumber, setCurrRegistryPhoneNumber] = useState<string>(currOffice.registryPhoneNumber);
    const [currStatus, setCurrStatus] = useState<string>((currOffice.isActive === true)?'Active' : 'Inactive');

    const [city, setCity] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [houseNumber, setHouseNumber] = useState<string>('');
    const [officeNumber, setOfficeNumber] = useState<string>('');
    const [registryPhoneNumber, setRegistryPhoneNumber] = useState<string>('');
    const [status, setStatus] = useState<string>('');    

    const [cityError, setCityError] = useState<string>('');
    const [streetError, setStreetError] = useState<string>('');
    const [houseNumberError, setHouseNumberError] = useState<string>('');
    const [officeNumberError, setOfficeNumberError] = useState<string>('');
    const [registryPhoneNumberError, setRegistryPhoneNumberError] = useState<string>('');
    const [statusError, setStatusError] = useState<string>('');   

    const [isCityTouched, setIsCityTouched] = useState<boolean>(false);
    const [isStreetTouched, setIsStreetTouched] = useState<boolean>(false);
    const [isHouseNumberTouched, setIsHouseNumberTouched] = useState<boolean>(false);
    const [isOfficeNumberTouched, setIsOfficeNumberTouched] = useState<boolean>(false);
    const [isRegistryPhoneNumberTouched, setIsRegistryPhoneNumberTouched] = useState<boolean>(false);
    const [isStatusTouched, setIsStatusTouched] = useState<boolean>(false); 
    
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const validateCity = async () => {
        if (!isEditMode) return;
        setIsCityTouched(true);

        if (!city) {
            setCityError("Please, enter the city");
        }
    }

    const validateStreet = async () => {
        if (!isEditMode) return;
        setIsStreetTouched(true);

        if (!street) {
            setStreetError("Please, enter the street");
        }
    }

    const validateHouseNumber = async () => {
        if (!isEditMode) return;
        setIsHouseNumberTouched(true);

        if (!houseNumber) {
            setHouseNumberError("Please, enter the house number");
        }
    }

    const validateOfficeNumber = async () => {
        if (!isEditMode) return;
        setIsOfficeNumberTouched(true);

        if (!officeNumber) {
            setOfficeNumberError("Please, enter the office number");
        }
    }

    const validateRegistryPhoneNumber = async () => {
        if (!isEditMode) return;
        setIsRegistryPhoneNumberTouched(true);

        if (!registryPhoneNumber) {
            setRegistryPhoneNumberError("Please, enter the registry phone number");
        }
    }

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
        if(cityError) setCityError("");
    }

    const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStreet(e.target.value);
        if(streetError) setStreetError("");
    }

    const handleHouseNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHouseNumber(e.target.value);
        if(houseNumberError) setHouseNumberError("");
    }

    const handleOfficeNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOfficeNumber(e.target.value);
        if(officeNumberError) setOfficeNumberError("");
    }

    const handleRegistryPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegistryPhoneNumber(e.target.value);
        if(registryPhoneNumberError) setRegistryPhoneNumberError("");
    }

    const handleEditBtn = () => {
        setIsEditMode(true);
        setCity(currCity);
        setStreet(currStreet);
        setHouseNumber(currHouseNumber);
        setOfficeNumber(currOfficeNumber);
        setRegistryPhoneNumber(currRegistryPhoneNumber);
        setStatus(currStatus);
    }

    const handleCancelBtn = () => {
        setIsEditMode(false);
    }

    const handleCloseBtn = () => {
        navigate(config.ReceptionistPageUrl, { state: { isOfficeWindowOpened: true } });
    }

    const createAddress = (): string => {
        return (`${street} ${houseNumber}, ${city}`);
    }

    const handleConfirmBtn = async () => {
        const address: string = createAddress();
        console.log(accessToken);
        await updateOffice(accessToken, currOffice.id, address, registryPhoneNumber, (status==='Active')?true:false);
    }

    return (
        <div className="create-doctor-container">
            <div className="edit-button">
                <Button onClick={handleEditBtn} className="edit-button">Edit</Button>
            </div>
            <h1>Doctor Information</h1>
            <div className="inline-container">
                <SimpleDataInput 
                    title="City"
                    value={isEditMode ? city : currCity}
                    isTouched={isCityTouched}
                    error={cityError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleCityChange}
                    handleBlur={validateCity}
                />
                <SimpleDataInput 
                    title="Street"
                    value={isEditMode ? street : currStreet}
                    isTouched={isStreetTouched}
                    error={streetError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleStreetChange}
                    handleBlur={validateStreet}
                />
                < SimpleDataInput 
                    title="House Number"
                    value={isEditMode ? houseNumber : currHouseNumber}
                    isTouched={isHouseNumberTouched}
                    error={houseNumberError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleHouseNumberChange}
                    handleBlur={validateHouseNumber}
                />
            </div>
            <div className="inline-container">
                < SimpleDataInput 
                    title="Office Number"
                    value={isEditMode ? officeNumber : currOfficeNumber}
                    isTouched={isOfficeNumberTouched}
                    error={officeNumberError}
                    type="date"
                    disabled={!isEditMode}
                    handleChange={handleOfficeNumberChange}
                    handleBlur={validateOfficeNumber}
                />
                <SimpleDataInput 
                    title="Registry Phone Number"
                    value={isEditMode ? registryPhoneNumber : currRegistryPhoneNumber}
                    isTouched={isRegistryPhoneNumberTouched}
                    error={registryPhoneNumberError}
                    type="text"
                    disabled={!isEditMode}
                    handleChange={handleRegistryPhoneNumberChange}
                    handleBlur={validateRegistryPhoneNumber}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={isEditMode ? status : currStatus} 
                        onChange={(e) => setStatus(e.target.value)} 
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
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

export default OfficeInfoPage;