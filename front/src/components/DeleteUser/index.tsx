import { useMutation } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Modal, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../Navigator';
import { DELETE_USER } from '../../gql/UserGql';
import { removeUserTokenFromLocalStorage } from '../../hooks/useLoginContext/localStorage';
import { UserType } from '../../types/user';
import variables from '../../variables';
import CarbonButton from '../CarbonButton';
import CarbonIconButton from '../CarbonIconButton';

interface DeleteUserProps {
  userId: string;
}

const DeleteUser: FC<DeleteUserProps> = ({ userId }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [deleteUser] = useMutation<UserType>(DELETE_USER, {
    variables: { id: userId },
    onError: (error) => {
      console.error('Mutation error: ', error);
    },
    onCompleted: () => {
      removeUserTokenFromLocalStorage();
      navigate(routes.landingPage);
    },
  });

  return (
    <Stack
      direction="row"
      alignItems="center"
      width="100%"
      sx={{ maxWidth: { xs: 650 } }}
    >
      <Stack direction="row" alignItems="center" width="85%" spacing={2}>
        <CarbonIconButton
          icon={<DeleteIcon fontSize="large" color="secondary" />}
        />
        <Typography
          sx={{
            color: variables.thirdColor,
            fontSize: '1.1rem',
          }}
        >
          Supprimer mon compte
        </Typography>
      </Stack>
      <CarbonButton
        type="button"
        color="error"
        onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
      >
        <Modal
          sx={{
            position: 'fixed',
            zIndex: 1300,
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          open={isDeleteModalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              backgroundColor: variables.bgHeaderFooter,
              width: '325px',
              height: '200px',
              padding: '15px',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Es-tu certain de vouloir supprimer ton compte ?
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
              <CarbonButton
                type="button"
                style={{ width: '100px' }}
                onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
              >
                Non
              </CarbonButton>
              <CarbonButton
                type="button"
                style={{ width: '100px' }}
                color="error"
                onClick={() => deleteUser({ variables: { id: userId } })}
              >
                Oui
              </CarbonButton>
            </Box>
          </Box>
        </Modal>
        Supprimer
      </CarbonButton>
    </Stack>
  );
};

export default DeleteUser;
