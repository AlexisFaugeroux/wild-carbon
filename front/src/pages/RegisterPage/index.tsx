import { Box, Typography } from '@mui/material';
import { FC, useContext } from 'react';

import { LoginContext } from '../../hooks/useLoginContext';
import LogoutForm from '../../components/LogoutForm';
import RegisterForm from '../../components/RegisterForm';
import variables from '../../variables';

const LoginPage: FC = () => {
  const { isLoggedIn } = useContext(LoginContext);

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
      <RegisterForm/>
    </Box>
  );
};

export default LoginPage;
