import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Paths } from '../helpers/routerPaths';
import MainPage from './pages/MainPage/MainPage';
import SignInUpPage from './pages/SignInUpPage/SignInUpPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={Paths.WelcomePage} />} />
      <Route path={Paths.WelcomePage} element={<WelcomePage />} />
      <Route path={Paths.LogInPage} element={<SignInUpPage />} />
      <Route path={Paths.MainPage} element={<MainPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
