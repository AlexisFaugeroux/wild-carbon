import { FC, useContext, useState } from 'react';
import { Box, Pagination } from '@mui/material';
import CarbonListItem from '../../../CarbonListItem';
import { PersonRemove, Spa } from '@mui/icons-material';
import { User, UserQuery } from '../../../../types/user';
import { ApolloQueryResult, useMutation } from '@apollo/client';
import { REMOVE_FRIEND } from '../../../../gql/UsersGql';
import { LoginContext } from '../../../../hooks/useLoginContext';

interface FriendsListProps {
  list: User[];
  refetchList: () => Promise<ApolloQueryResult<UserQuery>> | void;
}

const FriendsList: FC<FriendsListProps> = ({ list, refetchList }) => {
  const { userId } = useContext(LoginContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  };

  const handleRemoveFriend = async (userIdToRemove: string) => {
    await removeFriend({ variables: { userId, userIdToRemove } });
    await refetchList();
  };

  const PER_PAGE = 5;
  const count = Math.ceil(list.length / PER_PAGE);

  const indexOfLastUser = currentPage * PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - PER_PAGE;
  const currentUsers = list.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <Pagination
        count={count}
        onChange={handlePageChange}
        page={currentPage}
      />

      {currentUsers.map((user: User) => (
        <Box
          key={user.id}
          sx={{
            '&:hover': {
              backgroundColor: 'lightgray',
            },
          }}
        >
          <CarbonListItem
            leftPart={user.pseudo}
            rightPartMain="105kg"
            rightPartSecond={<Spa color="primary" />}
            rightPartThird={
              <PersonRemove
                color="primary"
                onClick={() => handleRemoveFriend(user.id)}
              />
            }
          />
        </Box>
      ))}
    </>
  );
};

export default FriendsList;
