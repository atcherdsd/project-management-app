import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Paths } from '../helpers/routerPaths';
import MainPage from './pages/MainPage/MainPage';
import SignInPage from './pages/SignInPage/SignInPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import EditProfilePage from './pages/EditProfilePage/EditProfile.Page';
import SignUpPage from './pages/SignUpPage/SignUpPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={Paths.WelcomePage} />} />
      <Route path={Paths.WelcomePage} element={<WelcomePage />} />
      <Route path={Paths.SignIn} element={<SignInPage />} />
      <Route path={Paths.SignUp} element={<SignUpPage />} />
      <Route path={Paths.MainPage} element={<MainPage />} />
      <Route path={Paths.EditProfilePage} element={<EditProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
