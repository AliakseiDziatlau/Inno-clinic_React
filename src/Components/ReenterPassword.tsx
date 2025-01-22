import React from 'react';
import { useState } from 'react';
import { ReenterPasswordProps } from '../Types/ReenterPasswordProps';
import {IconButton, Input, InputLabel, InputAdornment, FormHelperText, FormControl} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ReenterPassword: React.FC<ReenterPasswordProps> = ({
    passwordToMatch,
    reenterPassword,
    setReenterPassword,
    reenterPasswordError,
    setReenterPasswordError,
}) => {
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleBlur = (): void => {
        setIsTouched(true);

        if (!reenterPassword) {
            setReenterPasswordError('Please, reenter the password');
        } else if (reenterPassword.length < 6 || reenterPassword.length > 15) {
            setReenterPasswordError('Password must be between 6 and 15 characters');
        } else if (reenterPassword !== passwordToMatch) {
            setReenterPasswordError("The passwords you’ve entered don’t coincide");
        } else {
            setReenterPasswordError('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setReenterPassword(e.target.value);

        if (reenterPasswordError) {
            setReenterPasswordError('');
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
            error={isTouched && !!reenterPasswordError}
        >
            <InputLabel htmlFor="standard-adornment-password">Reenter Password</InputLabel>
            <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={reenterPassword}
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
            {reenterPasswordError && (
                <FormHelperText>{reenterPasswordError}</FormHelperText>
            )}
        </FormControl>
    );
};

export default ReenterPassword;