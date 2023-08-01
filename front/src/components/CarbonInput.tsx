import { FC } from 'react';
import { Input, InputProps } from '@mui/base';
import { TextField, TextFieldProps } from '@mui/material';

const TextFieldInput: FC<TextFieldProps> = ({...inputProps}) => {
    return (
        <TextField {...inputProps}/>
    )
};

export default TextFieldInput;