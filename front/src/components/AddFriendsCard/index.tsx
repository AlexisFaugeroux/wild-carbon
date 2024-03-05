import { useQuery } from "@apollo/client";
import { FC, useContext } from "react";
import { UserListQuery } from "../../types/user";
import { GET_ALL_USERS } from "../../gql/UserGql";
import { CircularProgress, Typography } from "@mui/material";
import CarbonCard from "../CarbonCard";
import UserList from "./components/UserList";
import { LoginContext } from "../../hooks/useLoginContext";

const AddFriendsCard: FC = () => {
  const { data, error, loading } = useQuery<UserListQuery>(GET_ALL_USERS);
  const { userId } = useContext(LoginContext);

  if (error) {
    console.log(error);
    return <Typography>Something broke !</Typography>;
  }

  if (loading || !data) {
    return <CircularProgress />;
  }

  const filteredList = data.getAllUsers.filter((user) => user.id != userId);

  return (
    <CarbonCard title="Les autres pollueurs">
      <UserList list={filteredList} />
    </CarbonCard>
  );
};

export default AddFriendsCard;
