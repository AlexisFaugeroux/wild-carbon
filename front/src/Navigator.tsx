import { FC, useContext } from 'react';
import { LoginContext } from './hooks/useLoginContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CanvasPage from './pages/CanvasPage';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

export const routes = {
  home: '/home',
  dashboard: '/dashboard',
  login: '/login',
  landingPage: '/',
  canvas: '/canvas',
};

const Navigator: FC = () => {
  const { isLoggedIn } = useContext(LoginContext);
  console.log('isLoggedIn', isLoggedIn);
  return (
    <Routes>
      <Route path={routes.landingPage} element={<LandingPage />} />
      <Route path={routes.login} element={<LoginPage />} />

      {isLoggedIn ? (
        <Route path={routes.canvas} element={<CanvasPage />} />
      ) : null}
      {isLoggedIn ? <Route path={routes.home} element={<HomePage />} /> : null}

      <Route path={routes.dashboard} element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Navigator;
