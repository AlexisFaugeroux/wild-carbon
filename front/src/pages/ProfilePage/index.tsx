import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import DeleteUser from '../../components/DeleteUser';
import UpdateUserForm from '../../components/UpdateUserForm';
import { getUserTokenFromLocalStorage } from '../../hooks/useLoginContext/localStorage';

const ProfilePage: FC = () => {
  const { userId } = getUserTokenFromLocalStorage() ?? {
    userId: '',
  };

  return (
    <Box
      sx={{
        height: '85vh',
        padding: '20px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <UpdateUserForm userId={userId} />

      <Divider orientation="horizontal" flexItem variant="middle" />

      <DeleteUser userId={userId} />
    </Box>
  );
};

export default ProfilePage;
