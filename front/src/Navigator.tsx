import { FC, useContext } from 'react';
import { LoginContext } from './hooks/useLoginContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CanvasPage from './pages/CanvasPage';

const Navigator: FC = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {isLoggedIn ? <Route path="/canvas" element={<CanvasPage />} /> : null}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Navigator;
