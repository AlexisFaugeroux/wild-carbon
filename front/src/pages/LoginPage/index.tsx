import { FC } from 'react';
import AuthenticationForm from '../../components/AuthenticationForm';
import { Box, Typography } from '@mui/material';
import variables from '../../variables';

const LoginPage: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        padding: '1rem',
        height: `calc(100vh - ${variables.heightHeader} - ${variables.heightFooter})`,
        backgroundColor: variables.backgroundColor,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          marginTop: '0.5rem',
          marginRight: '0.5rem',
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          textAlign: 'right',
          fontStyle: 'italic',
          fontSize: {
            xs: '1.3rem',
            sm: '1.4rem',
            md: '1.5rem',
            lg: '1.6rem',
            xl: '1.7rem',
          },
          color: variables.secondaryColor,
        }}
      >
        Connexion
      </Typography>
      <AuthenticationForm />
    </Box>
  );
};

export default LoginPage;
