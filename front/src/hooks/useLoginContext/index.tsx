import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';
import { getUserTokenFromLocalStorage } from './localStorage';

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const LoginContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userTokenData = useMemo(() => getUserTokenFromLocalStorage(), []);

  const [isLoggedIn, setIsLoggedIn] = useState(!!userTokenData?.userToken);

  const providerValue = useMemo(
    () => ({ isLoggedIn, setIsLoggedIn }),
    [isLoggedIn, setIsLoggedIn],
  );

  return (
    <LoginContext.Provider value={providerValue}>
      {children}
    </LoginContext.Provider>
  );
};
