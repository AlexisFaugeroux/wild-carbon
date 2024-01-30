import { ApolloError, ApolloQueryResult, useQuery } from '@apollo/client';
import { FC, createContext, useContext, useMemo } from 'react';
import { GET_USER } from '../../gql/UserGql';
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
  console.log('userId', userId);
  const { data, error, loading, refetch } = useQuery<UserQuery>(GET_USER, {
    variables: { id: userId },
  });
  console.log('data', data);
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
