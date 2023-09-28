import {
  Box,
  Button,
  Drawer,
  DrawerProps,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { FC, useContext } from 'react';
import CarbonIconButton from '../CarbonIconButton';
import {
  Diversity1,
  Home,
  ManageAccounts,
  QueryStats,
} from '@mui/icons-material';
import smallLogo from '../../assets/leaf.png';
import logo from '../../assets/FinalLogo.png';

import variables from '../../variables';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../hooks/useLoginContext';
import CarbonCard from '../CarbonCard';
import { useQuery } from '@apollo/client';
import { GET_DONATIONS_AMOUNT } from '../../gql/DonationGql';

type MenuProps = DrawerProps & {
  isOpenMenu: boolean;
  onClose: () => void;
};

const MenuBar: FC<MenuProps> = ({ isOpenMenu, onClose }) => {
  const { isLoggedIn } = useContext(LoginContext);
  const {
    data: donationAmount,
    loading,
    error,
  } = useQuery(GET_DONATIONS_AMOUNT);

  const getDonationAmount = () => {
    if (loading) {
      return 'Please wait...';
    }

    return `${donationAmount.getDonationsAmount.amount} €`;
  };

  return (
    <Drawer
      open={isOpenMenu}
      onClose={onClose}
      PaperProps={{
        sx: { backgroundColor: variables.backgroundColor, width: '10vw' },
      }}
    >
      <Box
        sx={{
          margin: '10px auto',
          display: 'block',
        }}
      >
        <img src={logo} alt="Logo BalanceTonCarbone" height="30rem" />
      </Box>
      <List
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <ListItem>
                  <CarbonIconButton
                    icon={<Home fontSize="large" color="secondary" />}
                  />
                  <Typography
                    sx={{
                      color: variables.thirdColor,
                      fontSize: '0.75rem',
                    }}
                  >
                    Dashboard
                  </Typography>
                </ListItem>
              </Link>

              <Link to="" style={{ textDecoration: 'none' }}>
                <ListItem>
                  <CarbonIconButton
                    icon={<QueryStats fontSize="large" color="secondary" />}
                  />
                  <Typography
                    sx={{ color: variables.thirdColor, fontSize: '0.75rem' }}
                  >
                    Mes Stats
                  </Typography>
                </ListItem>
              </Link>

              <Link to="" style={{ textDecoration: 'none' }}>
                <ListItem>
                  <CarbonIconButton
                    icon={<Diversity1 fontSize="large" color="secondary" />}
                  />
                  <Typography
                    sx={{ color: variables.thirdColor, fontSize: '0.75rem' }}
                  >
                    Mes amis émetteur
                  </Typography>
                </ListItem>
              </Link>

              <Link to="" style={{ textDecoration: 'none' }}>
                <ListItem>
                  <CarbonIconButton
                    icon={<ManageAccounts fontSize="large" color="secondary" />}
                  />
                  <Typography
                    sx={{ color: variables.thirdColor, fontSize: '0.75rem' }}
                  >
                    Mon profil
                  </Typography>
                </ListItem>
              </Link>
            </>
          ) : (
            <>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <ListItem>
                  <CarbonIconButton
                    icon={<Home fontSize="large" color="secondary" />}
                  />
                  <Typography
                    sx={{
                      color: variables.thirdColor,
                      fontSize: '0.75rem',
                    }}
                  >
                    Accueil
                  </Typography>
                </ListItem>
              </Link>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <CarbonCard
            title="Pot commun"
            sx={{
              width: '80%',
              padding: '12px',
              backgroundColor: variables.bgHeaderFooter,
            }}
          >
            <CarbonCard.Content>
              <Typography fontWeight="bold">
                {error ? error.message : getDonationAmount()}
              </Typography>
            </CarbonCard.Content>
            <CarbonCard.Actions>
              <Link
                to="https://donate.stripe.com/test_aEU5lHaz01zvdVe5kk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="contained" color="success">
                  Faire un don
                </Button>
              </Link>
            </CarbonCard.Actions>
          </CarbonCard>
          <img src={smallLogo} alt="Logo BalanceTonCarbone" height="70rem" />
        </Box>
      </List>
    </Drawer>
  );
};

export default MenuBar;
