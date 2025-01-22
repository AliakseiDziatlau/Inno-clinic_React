import React from 'react';
import { useState } from 'react';
import { EmailInputProps } from '../Types/EmailInputProps';
import {IconButton, Input, InputLabel, InputAdornment, FormHelperText, FormControl} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const EmailInput: React.FC<EmailInputProps> = ({
    checkIfEmailExists,
    email,
    setEmail,
    emailError,
    setEmailError,
    isSignUp,
}) => {
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const handleBlur = async (): Promise<void> => {
        setIsTouched(true);

        if (!email) {
            setEmailError('Please, enter the email');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("You've entered an invalid email");
        } else {
            const emailExists = await checkIfEmailExists(email);
            if (isSignUp) {
                emailExists
                    ? setEmailError('User with this email already exists')
                    : setEmailError('');
            } else {
                !emailExists
                    ? setEmailError('User with this email does not exist')
                    : setEmailError('');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
        if (emailError) setEmailError('');
    };

    return (
        <FormControl
            sx={{ m: 1, width: '25ch' }}
            variant="standard"
            error={isTouched && !!emailError}
        >
            <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
            <Input
                id="standard-adornment-email"
                type="text"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
            />
            {isTouched && emailError && (
                <FormHelperText>{emailError}</FormHelperText>
            )}
        </FormControl>
    );
};

export default EmailInput;