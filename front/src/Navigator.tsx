import { FC, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginContext } from "./hooks/useLoginContext";
import CanvasPage from "./pages/CanvasPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ExpensesPage from "./pages/ExpensesPage";

export const routes = {
  home: "/home",
  dashboard: "/dashboard",
  login: "/login",
  landingPage: "/",
  canvas: "/canvas",
  profile: "/profil",
  expenses: "/my-expenses",
};

const Navigator: FC = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <Routes>
      <Route path={routes.landingPage} element={<LandingPage />} />
      <Route path={routes.login} element={<LoginPage />} />

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

      {isLoggedIn ? (
        <Route path={routes.expenses} element={<ExpensesPage />} />
      ) : (
        <Route path={routes.login} element={<LoginPage />} />
      )}
    </Routes>
  );
};

export default Navigator;
