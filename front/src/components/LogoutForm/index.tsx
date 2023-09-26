import { FC, useContext } from 'react';
import CarbonButton from '../CarbonButton';
import { removeUserTokenFromLocalStorage } from '../../hooks/useLoginContext/localStorage';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../Navigator';
import { LoginContext } from '../../hooks/useLoginContext';

const LogoutForm: FC = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(LoginContext);

  return (
    <CarbonButton
      type="submit"
      onClick={() => {
        removeUserTokenFromLocalStorage();
        setIsLoggedIn(false);
        navigate(routes.landingPage);
      }}
    >
      Se déconnecter
    </CarbonButton>
  );
};

export default LogoutForm;
