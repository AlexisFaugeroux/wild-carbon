import { FC, useContext, useState } from 'react';
import { User } from '../../../../types/user';
import { Box, Pagination } from '@mui/material';
import CarbonListItem from '../../../CarbonListItem';
import { PersonAdd, Spa } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../../../gql/UsersGql';
import { LoginContext } from '../../../../hooks/useLoginContext';
import { useFriendsContext } from '../../../../hooks/useFriendsContext';

interface UserListProps {
  list: User[];
}

const UserList: FC<UserListProps> = ({ list }) => {
  const { userId } = useContext(LoginContext);
  const { data: currentUser, refetch: refetchCurrentUserData } =
    useFriendsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [addFriend] = useMutation(ADD_FRIEND);

  const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const PER_PAGE = 5;
  const count = Math.ceil(list.length / PER_PAGE);

  const indexOfLastUser = currentPage * PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - PER_PAGE;
  const currentUsers = list
    .slice(indexOfFirstUser, indexOfLastUser)
    .filter(
      (user) =>
        !currentUser?.getUser.users.some(
          (currentUserFriend) => currentUserFriend.id === user.id,
        ),
    );

  const handleAdd = async (userIdToAdd: string) => {
    await addFriend({ variables: { userId, userIdToAdd } });
    await refetchCurrentUserData();
  };

  return (
    <>
      <Pagination count={count} onChange={handleChange} page={currentPage} />

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
              <PersonAdd
                color="primary"
                onClick={() => handleAdd(user.id)}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              />
            }
          />
        </Box>
      ))}
    </>
  );
};

export default UserList;
