import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Paths } from '../helpers/routerPaths';
import MainPage from './pages/MainPage/MainPage';
import SignInPage from './pages/SignUpPage/SignUpPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={Paths.WelcomePage} />} />
      <Route path={Paths.WelcomePage} element={<WelcomePage />} />
      <Route path={Paths.LogInPage} element={<SignInPage />} />
      <Route path={Paths.MainPage} element={<MainPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
