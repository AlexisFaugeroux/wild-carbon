import { ApolloError, ApolloQueryResult, useQuery } from '@apollo/client';
import { FC, createContext, useContext, useMemo } from 'react';
import { GET_USER } from '../../gql/UsersGql';
import { LoginContext } from '../useLoginContext';
import { UserQuery } from '../../types/user';

interface FriendsContextType {
  data: UserQuery | undefined;
  error: ApolloError | undefined;
  loading: boolean;
  refetch: () => Promise<ApolloQueryResult<UserQuery>> | void;
}

const FriendsContext = createContext<FriendsContextType>({
  data: undefined,
  error: undefined,
  loading: false,
  refetch: () => {},
});

export const FriendsContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userId } = useContext(LoginContext);
  const { data, error, loading, refetch } = useQuery<UserQuery>(GET_USER, {
    variables: { userId },
  });

  const value = useMemo(
    () => ({
      data,
      error,
      loading,
      refetch,
    }),
    [data],
  );

  return (
    <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>
  );
};

export const useFriendsContext = () => {
  return useContext(FriendsContext);
};
