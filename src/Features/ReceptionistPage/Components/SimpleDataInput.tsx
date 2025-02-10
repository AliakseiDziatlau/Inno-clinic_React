import React from 'react';
import { Input, InputLabel, FormHelperText, FormControl} from '@mui/material';
import { SimpleDataInputProps } from '../Types/SimpleDataInputProps.ts';

const SimpleDataInput: React.FC<SimpleDataInputProps> = ({
    title,
    value,
    isTouched,
    error,
    type,
    disabled,
    handleChange,
    handleBlur,
}) => {
    return (
        <FormControl
            sx={{ m: 1, width: '25ch' }}
            variant="standard"
            error={isTouched && !!error}
        >
            <InputLabel htmlFor="standard-adornment-data">{title}</InputLabel>
            <Input
                id="standard-adornment-email"
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                required
            />
            {isTouched && error && (
                <FormHelperText>{error}</FormHelperText>
            )}
        </FormControl>
    );
}

export default SimpleDataInput