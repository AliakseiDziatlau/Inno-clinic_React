import React from 'react';
import { PhoneInputProps } from '../Types/PhoneInputProps';
import {IconButton, Input, InputLabel, InputAdornment, FormHelperText, FormControl} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PhoneInput: React.FC<PhoneInputProps> = ({
    phone,
    setPhone,
    phoneError,
    setPhoneError,
}) => {
    const handleBlur = (): void => {
        if (!phone) {
            setPhoneError('Phone number is required');
        } else {
            setPhoneError('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPhone(e.target.value);
        if (phoneError) {
            setPhoneError('');
        }
    };

    return (
        <FormControl
            sx={{ m: 1, width: '25ch' }}
            variant="standard"
            error={!!phoneError}
        >
            <InputLabel htmlFor="standard-adornment-phone">Phone</InputLabel>
            <Input
                id="standard-adornment-phone"
                type="text"
                value={phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
            />
            {phoneError && (
                <FormHelperText>{phoneError}</FormHelperText>
            )}
        </FormControl>
    );
};

export default PhoneInput;