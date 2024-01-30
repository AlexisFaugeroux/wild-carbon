/* eslint-disable react/no-unescaped-entities */
import { Box, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import ExpensesCard from '../../components/ExpensesCard';

import GraphicTracking from '../../components/GraphicTracking';
import AddExpenseModal from '../../components/AddExpenseModal/AddExpenseModal';
import GoodDeals from '../../components/GoodDeals';
import FriendsCard from '../../components/Friends';
import AddFriendsCard from '../../components/AddFriendsCard';
import { FriendsContextProvider } from '../../hooks/useFriendsContext';
import { Masonry } from '@mui/lab';

export default function Dashboard() {
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  return (
    <Box sx={{ height: '85vh', overflow: 'scroll', padding: '12px' }}>
      <Typography
        variant="body1"
        sx={{
          marginTop: '0.5rem',
          marginRight: '0.5rem',
          fontFamily: 'Roboto',
          textAlign: 'right',
          fontStyle: 'italic',
          fontSize: {
            xs: '1.1rem',
            sm: '1.2rem',
            md: '1.3rem',
            lg: '1.4rem',
            xl: '1.5rem',
          },
        }}
      >
        Bienvenue sur ton dashboard //NOM//
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: 'Roboto',
          fontSize: {
            xs: '1rem',
            sm: '1.1rem',
            md: '1.2rem',
            lg: '1.3rem',
            xl: '1.5rem',
          },
        }}
      >
        Aujourd'hui j'ai dépensé:{' '}
        <span style={{ color: 'green', fontWeight: 'bolder' }}> 30 kg CO²</span>
        {/*changement de la couleur du nombre à partir d'un certain seuil ? (vert orange rouge ?)*/}
      </Typography>

      <AddExpenseModal />

      <Masonry columns={isLg ? 2 : 1} spacing={2}>
        <ExpensesCard />
        <GraphicTracking />
        <GoodDeals />
        <FriendsContextProvider>
          <FriendsCard />
          <AddFriendsCard />
        </FriendsContextProvider>
      </Masonry>
    </Box>
  );
}
