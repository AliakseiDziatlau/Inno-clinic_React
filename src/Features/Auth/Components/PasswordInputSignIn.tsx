import React from 'react';
import { useState } from 'react';
import { PasswordInputSignInProps } from '../Types/PasswordinputSignInProps';
import {IconButton, Input, InputLabel, InputAdornment, FormHelperText, FormControl} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInputSignIn: React.FC<PasswordInputSignInProps> = ({
    password,
    setPassword,
    passwordError,
    setPasswordError,
    signInError,
    setSignInError,
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const handleBlur = (): void => {
        setIsTouched(true);

        if (!password) {
            setPasswordError('Please, enter the password');
        } else if (password.length < 6 || password.length > 15) {
            setPasswordError('Password must be between 6 and 15 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        setSignInError(false);

        if (passwordError) {
            setPasswordError('');
        }
    };

    const handleClickShowPassword = (): void => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
    };

    const handleMouseUpPassword = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
    };

    return (
        <FormControl
            sx={{ m: 1, width: '25ch' }}
            variant="standard"
            error={isTouched && (!!passwordError || signInError)}
        >
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={showPassword ? 'hide the password' : 'display the password'}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            {isTouched && passwordError && (
                <FormHelperText>{passwordError}</FormHelperText>
            )}
            {signInError && (
                <FormHelperText>Password is incorrect</FormHelperText>
            )}
        </FormControl>
    );
};

export default PasswordInputSignIn;