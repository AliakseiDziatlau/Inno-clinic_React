import React from 'react';
import { useState } from 'react';
import { CreateOfficeWindowProps } from '../Types/CreateOfficeWindowProps.ts';
import SimpleDataInput from './SimpleDataInput.tsx';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CancelModalWindow from './CancelModalWindow.tsx';
import { createOffice } from '../Api/OfficeMethods.ts';
import { useAuth } from '../../../Contexts/AuthContext.tsx';

const CreateOfficeWindow: React.FC<CreateOfficeWindowProps> = ({
    photoList,
    handleCloseCreateOfficeWindow,
}) => {
    const { accessToken } = useAuth();

    const [city, setCity] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [houseNumber, setHouseNumber] = useState<string>('');
    const [officeNumber, setOfficeNumber] = useState<string>('');
    const [registryPhoneNumber, setRegistryPhoneNumber] = useState<string>('');
    const [status, setStatus] = useState<string>('Active');
    const [photo, setPhoto] = useState<string>('')

    const [cityError, setCityError] = useState<string>('');
    const [streetError, setStreetError] = useState<string>('');
    const [houseNumberError, setHouseNumberError] = useState<string>('');
    const [officeNumberError, setOfficeNumberError] = useState<string>('');
    const [registryPhoneNumberError, setRegistryPhoneNumberError] = useState<string>('');

    const [isCityTouched, setIsCityTouched] = useState<boolean>(false);
    const [isStreetTouched, setIsStreetTouched] = useState<boolean>(false);
    const [isHouseNumberTouched, setIsHouseNumberTouched] = useState<boolean>(false);
    const [isOfficeNumberTouched, setIsOfficeNumberTouched] = useState<boolean>(false);
    const [isRegistryPhoneNumberTouched, setIsRegistryPhoneNumberTouched] = useState<boolean>(false);

    const [isCancelModalWindow, setIsCancelModalWindow] = useState<boolean>(false);
    
    const validateCity = () => {
        setIsCityTouched(true);

        if(!city){
            setCityError("Please, enter the city");
        }
    }

    const validateStreet = () => {
        setIsStreetTouched(true);

        if(!street){
            setStreetError("Please, enter the street");
        }
    }

    const validateHouseNumber = () => {
        setIsHouseNumberTouched(true);

        if(!houseNumber){
            setHouseNumberError("Please, enter the house number");
        }
    }

    const validateOfficeNumber = () => {
        setIsOfficeNumberTouched(true);

        if(!officeNumber){
            setOfficeNumberError("Please, enter the office number");
        }
    }

    const validateRegistryPhoneNumberNumber = () => {
        setIsRegistryPhoneNumberTouched(true);

        if(!registryPhoneNumber){
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

    const isFormValid = (): boolean => {
        return [
            city,
            street,
            houseNumber,
            officeNumber,
            registryPhoneNumber,
        ].every(field => !!field); 
    };

    const handleCancelBtn = () => {
        setIsCancelModalWindow(true);
    }

    const handleYesOnCancelModalWindow = () => {
        setIsCancelModalWindow(false)
        handleCloseCreateOfficeWindow();
    }

    const handleNoOnCancelModalWindow = () => {
        setIsCancelModalWindow(false);
    } 

    const createAddress = (): string => {
        return (`${street} ${houseNumber}, ${city}`);
    }

    const handleConfirmBtn = async () => {
        console.log("We are in create office");
        console.log(accessToken);
        const address: string = createAddress();
        await createOffice(accessToken, address, registryPhoneNumber, (status === 'Active')?true:false, 1);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <h1>Create Office</h1>
                <div className="inline-container">
                    <SimpleDataInput 
                        title="City"
                        value={city}
                        isTouched={isCityTouched}
                        error={cityError}
                        type="text"
                        disabled={false}
                        handleChange={handleCityChange}
                        handleBlur={validateCity}
                    />
                    <SimpleDataInput 
                        title="Street"
                        value={street}
                        isTouched={isStreetTouched}
                        error={streetError}
                        type="text"
                        disabled={false}
                        handleChange={handleStreetChange}
                        handleBlur={validateStreet}
                    />
                    <SimpleDataInput 
                        title="House Number"
                        value={houseNumber}
                        isTouched={isHouseNumberTouched}
                        error={houseNumberError}
                        type="text"
                        disabled={false}
                        handleChange={handleHouseNumberChange}
                        handleBlur={validateHouseNumber}
                    />
                </div>
                <div className="inline-container">
                    < SimpleDataInput 
                        title="Office Number"
                        value={officeNumber}
                        isTouched={isOfficeNumberTouched}
                        error={officeNumberError}
                        type="date"
                        disabled={false}
                        handleChange={handleOfficeNumberChange}
                        handleBlur={validateOfficeNumber}
                    />
                    <SimpleDataInput 
                        title="Registry Phone Number"
                        value={registryPhoneNumber}
                        isTouched={isRegistryPhoneNumberTouched}
                        error={registryPhoneNumberError}
                        type="text"
                        disabled={false}
                        handleChange={handleRegistryPhoneNumberChange}
                        handleBlur={validateRegistryPhoneNumberNumber}
                    />
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)} 
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
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
                    <Button onClick={handleCancelBtn}>Cancel</Button>
                </ButtonGroup>
                {isCancelModalWindow &&
                    <CancelModalWindow 
                        handleYesOnCancelModalWindow={handleYesOnCancelModalWindow}
                        handleNoOnCancelModalWindow={handleNoOnCancelModalWindow}
                    />
                }
            </div>
        </div>
    );
}

export default CreateOfficeWindow;