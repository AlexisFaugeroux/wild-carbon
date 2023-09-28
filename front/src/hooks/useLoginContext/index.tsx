import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getUserTokenFromLocalStorage } from './localStorage';

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userToken: string | undefined;
  setUserToken: Dispatch<SetStateAction<string | undefined>>;
  userId: string | undefined;
  setUserId: Dispatch<SetStateAction<string | undefined>>;
}

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userToken: '',
  setUserToken: () => {},
  userId: '',
  setUserId: () => {},
});

export const LoginContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userTokenData = useMemo(() => getUserTokenFromLocalStorage(), []);
  const [isLoggedIn, setIsLoggedIn] = useState(!!userTokenData?.userToken);
  const [userToken, setUserToken] = useState<string | undefined>(
    userTokenData?.userToken,
  );
  const [userId, setUserId] = useState<string | undefined>(
    userTokenData?.userId,
  );

  const providerValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      userToken,
      setUserToken,
      userId,
      setUserId,
    }),
    [isLoggedIn, setIsLoggedIn],
  );

  useEffect(() => {
    if (userTokenData) {
      console.log('late setting up context:', userTokenData);
      setIsLoggedIn(!!userTokenData.userToken);
      setUserToken(userTokenData.userToken);
      setUserId(userTokenData.userId);
    }
  }, [userTokenData]);

  return (
    <LoginContext.Provider value={providerValue}>
      {children}
    </LoginContext.Provider>
  );
};
