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
}

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userToken: undefined,
  setUserToken: () => {},
});

export const LoginContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userTokenData = useMemo(() => getUserTokenFromLocalStorage(), []);
  const [isLoggedIn, setIsLoggedIn] = useState(!!userTokenData?.userToken);
  const [userToken, setUserToken] = useState<string | undefined>(
    userTokenData?.userToken,
  );

  const providerValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      userToken,
      setUserToken,
    }),
    [isLoggedIn, setIsLoggedIn],
  );

  useEffect(() => {
    if (userTokenData) {
      setIsLoggedIn(!!userTokenData.userToken);
      setUserToken(userTokenData.userToken);
    }
  }, [userTokenData]);

  return (
    <LoginContext.Provider value={providerValue}>
      {children}
    </LoginContext.Provider>
  );
};
