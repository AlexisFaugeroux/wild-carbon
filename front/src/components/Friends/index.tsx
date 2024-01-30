import { FC } from 'react';

import { CircularProgress, Typography } from '@mui/material';
import CarbonCard from '../CarbonCard';
import FriendsList from './components/FriendsList';
import { useFriendsContext } from '../../hooks/useFriendsContext';

const FriendsCard: FC = () => {
  const { data, error, loading, refetch } = useFriendsContext();

  if (error) {
    console.log(error);
    return <Typography>Something broke !</Typography>;
  }

  if (loading || !data) {
    return <CircularProgress />;
  }

  return (
    <CarbonCard title="Mes émetteurs de carbone préférés">
      {data.userData.users.length ? (
        <FriendsList list={data.userData.users} refetchList={refetch} />
      ) : (
        <Typography>
          Vous n&apos;avez pas encore de pollueurs préférés !
        </Typography>
      )}
    </CarbonCard>
  );
};

export default FriendsCard;
