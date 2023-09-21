import { FC } from 'react';
import CarbonCard from '../../../../components/CarbonCard';
import { Button, Stack, Typography } from '@mui/material';
import LeafImg from '../../../../assets/leaf.png';
import { lightGreen } from '@mui/material/colors';
import variables from '../../../../variables';

const Description: FC = () => {
  return (
    <CarbonCard
      sx={{
        backgroundColor: lightGreen[50],
        marginBottom: 0,
        paddingY: variables.spacings.abs128,
        borderRadius: 0,
      }}
    >
      <CarbonCard.Content>
        <Stack alignItems="center" justifyContent="center" spacing={2}>
          <img src={LeafImg} alt="logo" style={{ width: '100px' }} />

          <Typography fontWeight="bold" textAlign="center" variant="h3">
            Balance Ton Carbone
          </Typography>

          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Stack>
      </CarbonCard.Content>

      <CarbonCard.Actions
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button variant="outlined">Se connecter</Button>
        <Button color="success" variant="contained">
          Créer un compte
        </Button>
      </CarbonCard.Actions>
    </CarbonCard>
  );
};

export default Description;
