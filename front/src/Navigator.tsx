import { FC, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import CanvasPage from './pages/CanvasPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import { LoginContext } from './hooks/useLoginContext';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';

export const routes = {
  home: '/home',
  dashboard: '/dashboard',
  login: '/login',
  landingPage: '/',
  canvas: '/canvas',
  profile: '/profil',
  register: '/register',
};

const Navigator: FC = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <Routes>
      <Route path={routes.landingPage} element={<LandingPage />} />
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage/>} />

      {isLoggedIn ? (
        <Route path={routes.canvas} element={<CanvasPage />} />
      ) : (
        <Route path={routes.login} element={<LoginPage />} />
      )}
      {isLoggedIn ? (
        <Route path={routes.home} element={<HomePage />} />
      ) : (
        <Route path={routes.login} element={<LoginPage />} />
      )}
      {isLoggedIn ? (
        <Route path={routes.profile} element={<ProfilePage />}></Route>
      ) : (
        <Route path={routes.login} element={<LoginPage />}></Route>
      )}

      <Route path={routes.dashboard} element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Navigator;
