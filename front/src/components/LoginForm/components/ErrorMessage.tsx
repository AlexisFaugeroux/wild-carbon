import { FC } from 'react';
import variables from '../../../variables';
import { Box } from '@mui/material';

interface IErrorMessage {
  message: string;
}

const ErrorMessage: FC<IErrorMessage> = ({ message }) => {
  return (
    <Box
      component="span"
      sx={{ color: variables.errorColor, fontStyle: 'italic' }}
    >
      {message}
    </Box>
  );
};

export default ErrorMessage;
