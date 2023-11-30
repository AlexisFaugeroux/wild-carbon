import { FC } from 'react';
import { TextField, TextFieldProps, useTheme } from '@mui/material';

const CarbonInputBase: FC<TextFieldProps> = ({ ...inputProps }) => {
  const { styleInputBase } = useTheme();

  if (inputProps.className && inputProps.className === 'input-error') {
    styleInputBase.borderColor = '#fc8181';
  }

  return (
    <TextField
      sx={styleInputBase}
      size="small"
      placeholder="..."
      {...inputProps}
    />
  );
};

export default CarbonInputBase;
